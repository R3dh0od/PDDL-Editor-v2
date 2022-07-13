export default function ExportXMLPreds(aux){
    var builder = require('xmlbuilder');
    var root = builder.create('all-predicates');
    aux.map(value => {
            var item = root.ele('predicate');
            item.att('description', value[0]);
            item.att('persistent', value[1]);
            item.att('static', value[2]);
            item.att('dynamic', value[3]);
            item.att('internal', value[4]);
            item.att('sensed', value[5]);
            const params = value[6];
            if(params!==undefined){
                for (let i=0; i<params.length; i++){
                    var itemChild=item.ele('object');
                    itemChild.att('name', params[i].name);
                    itemChild.att('type', params[i].type);
                }

            }
        }
    )
    var xml = root.end({ pretty: true, allowEmpty: true});
    let result = xml.replace("<?xml version=\"1.0\"?>", "").slice(1);
    console.log(result);
}