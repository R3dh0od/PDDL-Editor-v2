import builder from "xmlbuilder";

export default function ExportXMLProblems(problem, object, pred, func, goal){
    var builder = require('xmlbuilder');
    var root = builder.create('all-problems');
    problem.map(value => {
            var item = root.ele('problem');
            item.att('name', value[0]);
            item.att('operator', value[1]);
            item.att('metric', value[2]);

            object.map((value2)=>{
                if(value2[3]==value[0]){
                    var itemChild=item.ele('object');
                    itemChild.att('name', value2[0]);
                    itemChild.att('type', value2[1]);
                    itemChild.att('constant', value2[2]);
                }

            });

            pred.map((value3)=>{
                if(value3[3]==value[0]){
                    var itemChild=item.ele('predicate');
                    itemChild.att('name', value3[0]);
                    if(value3[1]){
                        value3[2].map((value4, index)=>{
                            var itemChild2=itemChild.ele('object');
                            itemChild2.att('name', value4.name);
                            itemChild2.att('object', value3[1][index]);
                        })

                    }
                }
            });

            func.map((value5)=>{
                if(value5[4]==value[0]){
                    var itemChild=item.ele('function');
                    itemChild.att('description', value5[0]);
                    itemChild.att('value', value5[3]);
                    if(value5[1]){
                        value5[2].map((value6, index)=>{
                            var itemChild2=itemChild.ele('object');
                            itemChild2.att('name', value6.name);
                            itemChild2.att('object', value5[1][index]);
                        })

                    }
                }
            });

            goal.map((value3)=>{
                if(value3[3]==value[0]){
                    var itemChild=item.ele('goal');
                    itemChild.att('name', value3[0]);
                    if(value3[1]){
                        value3[2].map((value4, index)=>{
                            var itemChild2=itemChild.ele('object');
                            itemChild2.att('name', value4.name);
                            itemChild2.att('object', value3[1][index]);
                        })

                    }
                }
            });

           /* for(let i=0; i<object.length; i++){
                var itemChild=item.ele('object');
                itemChild.att('name', 'hola');
                itemChild.att('type', 'hola2');
                //itemChild.att('constant', value2.constant);
            }*/



        }
    )
    var xml = root.end({ pretty: true, allowEmpty: true});
    let result = xml.replace("<?xml version=\"1.0\"?>", "").slice(1);
    return(
        result
    );
}