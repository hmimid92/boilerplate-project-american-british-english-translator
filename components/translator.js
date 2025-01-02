const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritish(text) {
    let mapStructAmerican = new Map();

    Object.keys(americanToBritishSpelling).forEach((e) => {
      mapStructAmerican.set(e,americanToBritishSpelling[e]);
    });
    Object.keys(americanToBritishTitles).forEach((e) => {
      mapStructAmerican.set(e,americanToBritishTitles[e]);
    });
    Object.keys(americanOnly).forEach((e) => {
      mapStructAmerican.set(e,americanOnly[e]);
    });
    Object.keys(britishOnly).forEach((e) => {
      mapStructAmerican.set(britishOnly[e],e);
    });
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    americanArr.forEach(el => {
      if(/([1-9]|1[012]):[0-5][0-9]/g.test(text)) {
        let val = text.match(/([1-9]|1[012]):[0-5][0-9]/g)[0];
        let val1 = val.split(':');
        text = text.replace(val,`<span class="highlight">${val1[0]}.${val1[1]}</span>`);
      }
      let temp = el.split('');
      let elNew = el;
      if(temp.includes('.')) {
        elNew = elNew.replace('.','\\.');
       }
      if((new RegExp(`${elNew}(?=\\s|\\.$)`, "gi")).test(text)) {
        text = text.replace((new RegExp(`${el}`,'gi')),`<span class="highlight">${mapStructAmerican.get(el)}</span>`);
       }
    });
   
    return text;
  } 
 
  britishToAmerican(text) {
    let mapStructBritish = new Map();

    Object.keys(americanToBritishSpelling).forEach((e) => {
      mapStructBritish.set(americanToBritishSpelling[e],e);
    });
    Object.keys(americanToBritishTitles).forEach((e) => {
      mapStructBritish.set(americanToBritishTitles[e],e);
    });
    Object.keys(britishOnly).forEach((e) => {
      mapStructBritish.set(e,britishOnly[e]);
    });
    Object.keys(americanOnly).forEach((e) => {
      mapStructBritish.set(americanOnly[e],e);
    });
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));
    britishArr.forEach(el => {
      if(/([1-9]|1[012])\.[0-5][0-9]/g.test(text)) {
        let val = text.match(/([1-9]|1[012])\.[0-5][0-9]/g)[0];
        let val1 = val.split('.');
        text = text.replace(val,`<span class="highlight">${val1[0]}:${val1[1]}</span>`);
      }
       if((new RegExp(`${el}(?=\\s|\\.$)`, "gi")).test(text)) {
        text = text.replace((new RegExp(`${el}`,'gi')),`<span class="highlight">${mapStructBritish.get(el)}</span>`);
       }
    });
   
    return text;
  }
}

module.exports = Translator;