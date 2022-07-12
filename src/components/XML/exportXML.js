
export default function ExportXML(){
    const aux=['ho6la', 'hola2', 'peppa', 'liorch'];

    var builder = require('xmlbuilder');

    var root = builder.create('all-types');

    aux.map(value => {
        var item = root.ele('type');
        item.att('name', value);
        item.att('subtype', value);
        }
    )
    /*
    for(var i = 0; i < aux.length; i++)
    {
        var item = root.ele('type');
        item.att('name', aux[i]);
        item.att('subtype', aux[i]);
    }*/

    var xml = root.end({ pretty: true, allowEmpty: true});
    console.log(xml);
}