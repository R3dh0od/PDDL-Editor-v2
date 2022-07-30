export default function ExportXMLFunctions(aux){
    var builder = require('xmlbuilder');
    var root = builder.create('all-functions');
    aux.map(value => {
            var item = root.ele('function');
            item.att('description', value[0]);
            item.att('persistent', value[1]);
            item.att('static', value[2]);
            item.att('dynamic', value[3]);
            item.att('internal', value[4]);
            item.att('sensed', value[5]);
            item.att('default', value[6]);
            const params = value[7];
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
    return(
        result
    );
}