import builder from "xmlbuilder";

export default function ExportXMLProblems(aux){
    var builder = require('xmlbuilder');
    var root = builder.create('all-problems');
    aux.map(value => {
            var item = root.ele('problem');
            item.att('name', value[0]);
            item.att('operator', value[1]);
            item.att('metric', value[2]);

        }
    )
    var xml = root.end({ pretty: true, allowEmpty: true});
    let result = xml.replace("<?xml version=\"1.0\"?>", "").slice(1);
    return(
        result
    );
}