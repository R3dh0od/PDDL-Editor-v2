import React, { useEffect } from 'react';
import '../../../Styles/index.css';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useSelector } from 'react-redux';
import {selectCurrentProject, selectSwitchDiagram} from '../../../features/userSlice';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseconfig';
import { useStateIfMounted } from 'use-state-if-mounted';



// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */

function mouseEnter(e, obj) {
    var shape = obj.findObject("SHAPE");
    shape.fill = "#f24333";
    shape.stroke = "#A6E6A1";
    var text = obj.findObject("TEXT");
    text.stroke = "white";
};

function mouseLeave(e, obj) {
    var shape = obj.findObject("SHAPE");
    // Return the Shape's fill and stroke to the defaults
    shape.fill = obj.data.color;
    shape.stroke = null;
    // Return the TextBlock's stroke to its default
    var text = obj.findObject("TEXT");
    text.stroke = "black";
};

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        //'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },

        model: new go.GraphLinksModel(
          {
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          })
      });

  // define a simple Node template
  diagram.nodeTemplate =
    $(go.Node, 'Auto', { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc").makeTwoWay(), // the Shape will go around the TextBlock
        {
            mouseEnter: mouseEnter,
            mouseLeave: mouseLeave
        },
        { // when the user clicks on a Node, highlight all Links coming out of the node
            // and all of the Nodes at the other ends of those Links.
            click: function(e, node) {
                // highlight all Links and Nodes coming out of a given Node
                var diagram = node.diagram;
                diagram.startTransaction("highlight");
                // remove any previous highlighting
                diagram.clearHighlighteds();
                // for each Link coming out of the Node, set Link.isHighlighted
                node.findLinksOutOf().each(function(l) { l.isHighlighted = true; });
                // for each Node destination for the Node, set Node.isHighlighted
                node.findNodesOutOf().each(function(n) { n.isHighlighted = true; });
                diagram.commitTransaction("highlight");
            }},
      //new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: false },  // some room around the text
        new go.Binding('text').makeTwoWay()
      ),
    );

    // define the Link template
    diagram.linkTemplate =
        $(go.Link,
            $(go.Shape,
                // the Shape.stroke color depends on whether Link.isHighlighted is true
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : "gray"; })
                    .ofObject(),
                // the Shape.strokeWidth depends on whether Link.isHighlighted is true
                new go.Binding("strokeWidth", "isHighlighted", function(h) { return h ? 3 : 1; })
                    .ofObject()),
            $(go.Shape,
                { toArrow: "Standard", strokeWidth: 0 },
                // the Shape.fill color depends on whether Link.isHighlighted is true
                new go.Binding("fill", "isHighlighted", function(h) { return h ? "red" : "gray"; })
                    .ofObject()),
            $(go.TextBlock,
                { alignmentFocus: new go.Spot(0.5, 0.5, 3, -10) },
                //{ segmentOffset: new go.Point(0, -10) }, // centered multi-line text
                new go.Binding("text", "text"))
        );

    diagram.click = function(e) {
        e.diagram.commit(function(d) { d.clearHighlighteds(); }, "no highlighteds");
    };

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
  //alert('GoJS model changed!');
}

// render function...
export default function Diagrama1() {
    const color_palette=[
        '#b2d3a8', '#aaffe5', '#cffcff',
        '#ffc2e2', '#eee5e9', '#f9e900',
        '#f6af65', '#aeb8fe'
    ];

    const id=useSelector(selectCurrentProject).id;
    const [stateList, setStateList] = useStateIfMounted([{}]);
    const [actionList, setActionList] = useStateIfMounted([{}]);

    const ref="/Projects/"+id+"/States";
    const ref2="/Projects/"+id+"/Actions";

    const q = query(collection(db, ref));
    const q2 = query(collection(db, ref2));
    const states=[];
    const actions=[];

    useEffect(()=> {
        onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                states.push(doc.data());
            })

            setStateList(states);

        })
        onSnapshot(q2, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                actions.push(doc.data());
            })

            setActionList(actions);

        })

    },[]);
    //  console.log(stateList[0].name);


    let nodeDataArray=[];
    let linkDataArray=[];
    let aux=0;
        stateList.map((value, index)=>(
            nodeDataArray.push(
                {
                    key: value.name,
                    text: value.name,
                    color: go.Brush.randomColor(),

                }
            )
        ))

        actionList.map((value, index)=>(
            linkDataArray.push(
                {
                    key: index, from: value.InitialState, to: value.EndState, text: value.name
                }
            )
        ))





  return (


      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        onModelChange={handleModelChange}
      />

  );
  }
