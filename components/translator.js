const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritish(text) {
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
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));
    let decide = false;
    britishArr.forEach(el => {
     if(/([1-9]|1[012])\.[0-5][0-9]/g.test(text) || (new RegExp(`${el}(?=\\s|\\.$)`, "gi")).test(text)) {
       decide = true;
     } 
    });
   
    return decide? "" : text;
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
    Object.keys(americanOnly).forEach((e) => {
      mapStructAmerican.set(e,americanOnly[e]);
    });
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));
    let decide = false;
    americanArr.forEach(el => {
      let temp = el.split('');
     if(temp.includes('.')) {
      el = el.replace('.','\\.');
     }
     if(/([1-9]|1[012]):[0-5][0-9]/g.test(text) || (new RegExp(`${el}(?=\\s|\\.$)`, "gi")).test(text)) {
       decide = true;
     }
    });
   
    return decide? "" : text;
  }
}

module.exports = Translator;