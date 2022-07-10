import { toXML } from 'jstoxml';

export default function XMLGenerator(){

    const type=['hola','hola2'];
// toXML(content, config)
    const content = GenerateTypes(type);
    const config = {
        indent: '    '
    };

    console.log(toXML(content, config))
    //console.log(xml.getElementsByTagName('Name'));
 /*   var xml = builder.create('all-types')

    var feedObj = {
        'all-types': {

            'type': { '@name': 'text', '@subtype': 'text'},


            }

    }

    var feed = builder.create(feedObj, { encoding: 'utf-8' })
    console.log(feed.end({ pretty: true }));*/
}
