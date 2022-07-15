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
                }

            }
            params=value[3];
            if(params!==undefined){
                for (let i=0; i<params.length; i++){
                    var itemChild=item.ele('function');
                    itemChild.att('operator', params[i].operator);
                    itemChild.att('firstValue', params[i].function);
                    itemChild.att('secondValue', params[i].function2);
                }

            }
        }
    )
    var xml = root.end({ pretty: true, allowEmpty: true});
    let result = xml.replace("<?xml version=\"1.0\"?>", "").slice(1);
    console.log(result);
}