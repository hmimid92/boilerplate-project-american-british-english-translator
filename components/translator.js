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
    Object.keys(americanOnly).forEach((e) => {
      mapStructBritish.set(americanOnly[e],e);
    });
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));
    let decide = false;
    let decide1 = true;
    let arrText = text.split(" ");
    Object.keys(americanToBritishTitles).forEach(e => {
      if(arrText.includes(e)) {
        decide1 = false;
      }
    });
    if(decide1) {
      britishArr.forEach(e => {
        if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\\.`,'gi')).test(text)) {
         decide = true;
        }     
       });
       let britishHour = text.match(/\d{1,2}\.\d{1,2}/g);
       if(britishHour !== null) {
        decide = true;
       }
    }
   
     return decide1 ? decide : decide1;
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
    Object.keys(britishOnly).forEach((e) => {
      mapStructAmerican.set(britishOnly[e],e);
    });
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    let decide = false;
    let decide1 = true;
    let arrText = text.split(" ");
    Object.values(americanToBritishTitles).forEach(e => {
      if(arrText.includes(e)) {
        decide1 = false;
      }
    });
    if(decide1) {
      americanArr.forEach(e => {
        if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\.$`,'gi')).test(text)) {
         decide = true;
        }     
       });
        let americanHour = text.match(/\d{1,2}:\d{1,2}/g);
        if(americanHour !== null) {
         decide = true;
        }
    }
   
     return decide1 ? decide : decide1;
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
      americanArr.forEach(e => {
       if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\.$`,'gi')).test(text)) {
       text = text.replace((new RegExp(`${e}`,'gi')),`<span class="highlight">${mapStructAmerican.get(e)}</span>`);
      } 
     });
     let americanHour =  text.match(/\d{1,2}:\d{1,2}/g);
      if(americanHour !== null) {
        let val = americanHour[0].split(":")
        text = text.replace(americanHour[0],`<span class="highlight">${val[0]}.${val[1]}</span>`);
      }
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

   
      britishArr.forEach(e => {
       if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\.$`,'gi')).test(text)) {
        text = text.replace((new RegExp(`${e}`,'gi')),`<span class="highlight">${mapStructBritish.get(e)}</span>`);
      } 
     });
     let britishHour =  text.match(/\d{1,2}\.\d{1,2}/g);
     if(britishHour !== null) {
      let val = britishHour[0].split(".")
      text = text.replace(britishHour[0],`<span class="highlight">${val[0]}:${val[1]}</span>`);
    }
    return text;
   }
}

module.exports = Translator;