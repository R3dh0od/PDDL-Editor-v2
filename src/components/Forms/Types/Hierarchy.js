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

function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
        $(go.Diagram,
            {
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                //'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },

                model: new go.TreeModel(
                    {
                      //  linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    })
            });
    diagram.layout = $(go.TreeLayout);
    // define a simple Node template
    diagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: go.Brush.randomColor(), strokeWidth: 0 }),
            $(go.TextBlock, {margin: 8},
                new go.Binding("text", "key")),
        );

    // define the Link template
    diagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape));



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
export default function Diagrama2() {
    const color_palette=[
        '#b2d3a8', '#aaffe5', '#cffcff',
        '#ffc2e2', '#eee5e9', '#f9e900',
        '#f6af65', '#aeb8fe'
    ];

    const id=useSelector(selectCurrentProject).id;
    const [typeList, setTypeList] = useStateIfMounted([{}]);

    const ref="/Projects/"+id+"/Types";

    const q = query(collection(db, ref));
    const types=[];

    useEffect(()=> {
        onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                types.push(doc.data());
            })

            setTypeList(types);

        })

    },[]);
    //  console.log(stateList[0].name);


    let nodeDataArray=[];


    typeList.map((value)=>(
        nodeDataArray.push(
            {
                key: value.name,
                text: value.name,
                color: go.Brush.randomColor(),
                parent: value.subtypeOf,
            }
        )
    ))







    return (


        <ReactDiagram
            initDiagram={initDiagram}
            divClassName='diagram-component'
            nodeDataArray={nodeDataArray}
            //linkDataArray={linkDataArray}
            onModelChange={handleModelChange}
        />

    );
}
