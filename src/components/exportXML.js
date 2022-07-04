import builder from "xmlbuilder";

export default function XMLGenerator(){
    var builder = require('xmlbuilder');

    const data=["hola","hola2","hola3","hola4"];

    //types
    var root = builder.create('all-types');

    data.map((value, index, array)=>(
       root.ele('type', {'name': value, 'subtype': value})
    ));
    var xml = root.end({ pretty: true});
    var xml2= xml.replace('<?xml version="1.0"?>','').slice(1)
    console.log(xml2);

    //predicates


 /*   var xml = builder.create('all-types')

    var feedObj = {
        'all-types': {

            'type': { '@name': 'text', '@subtype': 'text'},


            }

    }

    var feed = builder.create(feedObj, { encoding: 'utf-8' })
    console.log(feed.end({ pretty: true }));*/
}
