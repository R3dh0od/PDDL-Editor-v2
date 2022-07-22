export default function ExportXMLStates(aux){
    var builder = require('xmlbuilder');
    var root = builder.create('all-states');
    aux.map(value => {
            var item = root.ele('state');
            item.att('name', value[0]);
            item.att('checkpoint', value[1]);
            let params = value[2];
            if(params!==undefined){
                for (let i=0; i<params.length; i++){
                    var itemChild=item.ele('predicate');
                    itemChild.att('description', params[i].predicate);
                    itemChild.att('not', params[i].not);
                    if(params[i].params!==undefined){
                        for(let j=0; j<params[i].params.length; j++){
                            var predChild=itemChild.ele('object');
                            predChild.att('variable', params[i].variables[j].variable);
                            predChild.att('type', params[i].params[j].type);
                        }
                    }
                }

            }
            params=value[3];
            if(params!==undefined){
                for (let i=0; i<params.length; i++){
                    var itemChild=item.ele('function');
                    itemChild.att('operator', params[i].operator);
                    itemChild.att('firstValue', params[i].function);
                    itemChild.att('secondValue', params[i].function2);
                    if(params[i].fParams!==undefined){
                        var fxChild=itemChild.ele('firstVal');
                        for(let j=0; j<params[i].fParams.length; j++){
                            var fxChildElement= fxChild.ele('object')
                            fxChildElement.att('variable', params[i].fVariables[j].variable);
                            fxChildElement.att('type', params[i].fParams[j].type);
                        }
                    }
                    if(params[i].f2Params!==undefined){
                        var fxChild=itemChild.ele('secondVal');
                        for(let j=0; j<params[i].f2Params.length; j++){
                            var fxChildElement= fxChild.ele('object')
                            fxChildElement.att('variable', params[i].f2Variables[j].variable);
                            fxChildElement.att('type', params[i].f2Params[j].type);
                        }
                    }
                }

            }
        }
    )
    var xml = root.end({ pretty: true, allowEmpty: true});
    let result = xml.replace("<?xml version=\"1.0\"?>", "").slice(1);
    console.log(result);
}