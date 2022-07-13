export default function ExportXMLTypes(aux){
    var builder = require('xmlbuilder');
    var root = builder.create('all-types');
    aux.map(value => {
        var item = root.ele('type');
        item.att('name', value[0]);
        item.att('subtype', value[1]);
        }
    )
    var xml = root.end({ pretty: true, allowEmpty: true});
    let result = xml.replace("<?xml version=\"1.0\"?>", "").slice(1);
    console.log(result);
}