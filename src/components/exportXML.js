
export default function XMLGenerator(){
   const toXML = require("to-xml").toXML;
   const data = {
      "xml": {
        "css": {
         "@aaa": "adios"},
        "javascript": {
          "html": "hola"
        }
      }
    };
   const xml = toXML(data, null, 2);
   console.log(xml);
    


/*
const xmlText= {
   name: 'Library', attributes: {}, value: '', children: [
       {
           name: 'Books', attributes: { count: '1' }, value: '', children: [
               {
                   name: 'Book', attributes: { id: '1' }, value: '', children: [
                       {
                           name: 'Name', attributes: {}, value: 'Me Before You', children: []
                       }, {
                           name: 'Author', attributes: {}, value: 'Jojo Moyes', children: []
                       }
                   ]
               }
           ]
       },
       {
           name: 'Music', attributes: { count: '1' }, value: '', children: [
               {
                   name: 'CD', attributes: { id: '2' }, value: '', children: [
                       {
                           name: 'Name', attributes: {}, value: 'Houses of the Holy', children: []
                       }, {
                           name: 'Artist', attributes: {}, value: 'Led Zeppelin', children: []
                       }
                   ]
               }
           ]
       }
   ]
};
var XMLParser = require('react-xml-parser');
var xml = new XMLParser().toString(xmlText);    // Assume xmlText contains the example XML
console.log(xml);
*/
}
