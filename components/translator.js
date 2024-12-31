const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritishTest(text) {
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
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));
    let decide = false;
    britishArr.forEach(e => {
      if(text.toLowerCase().includes(e.toLowerCase())) {
       decide = true;
      }     
     });
     let britishHour = text.match(/\d{1,2}\.\d{1,2}/g);
     if(britishHour !== null) {
      decide = true;
     }
     return decide;
  }

  britishToAmericanTest(text) {
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
    let decide = false;
    americanArr.forEach(e => {
     if(text.toLowerCase().includes(e.toLowerCase())) {
      decide = true;
     }     
    });
     let americanHour = text.match(/\d{1,2}:\d{1,2}/g);
     if(americanHour !== null) {
      decide = true;
     }
     return decide;
  }

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
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    
      let americanHour =  text.match(/\d{1,2}:\d{1,2}/g);
      if(americanHour !== null) {
        let val = americanHour[0].split(":")
        if((Number(val[0]) <= 12 && Number(val[0]) >= 1 ) && 
            Number(val[1]) <= 59 && Number(val[1]) >= 0) {
             text = text.replace(americanHour[0],`<span class="highlight">${val[0]}.${val[1]}</span>`);
         }
      }
      americanArr.forEach(e => {
       if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}`,'gi')).test(text)) {
       text = text.replace((new RegExp(`${e}`,'gi')),`<span class="highlight">${mapStructAmerican.get(e)}</span>`);
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
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));

   
     let britishHour =  text.match(/\d{1,2}\.\d{1,2}/g);
      if(britishHour !== null) {
        let val = britishHour[0].split(".")
        if((Number(val[0]) <= 12 && Number(val[0]) >= 1 ) && 
            Number(val[1]) <= 59 && Number(val[1]) >= 0) {
              text = text.replace(britishHour[0],`<span class="highlight">${val[0]}:${val[1]}</span>`);
         }
      }
      britishArr.forEach(e => {
       if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}`,'gi')).test(text)) {
        text = text.replace((new RegExp(`${e}`,'gi')),`<span class="highlight">${mapStructBritish.get(e)}</span>`);
      } 
     });
    return text;
   }
}

module.exports = Translator;