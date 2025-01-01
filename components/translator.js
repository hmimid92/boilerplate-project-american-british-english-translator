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
    let britishHour = text.match(/\d{1,2}\.\d{1,2}/g);
    if(britishHour !== null) {
     return true;
    } else {
      let arrText = text.toLowerCase().split(/\s/).filter(e => e !== '');
      britishArr.forEach(el => {
        let elNew = el.toLowerCase().split(/\s/g);
        if(elNew.length === 1) {
          if(arrText.includes(elNew[0])) {
           decide = true;
           }
        } else if(elNew.length === 2) {
          if(arrText.includes(elNew[0]) && arrText.includes(elNew[1]) ) {
            decide = true;
           }
        } else {
          if(arrText.includes(elNew[0]) &&
          arrText.includes(elNew[1]) &&
          arrText.includes(elNew[2]) ) {
            decide = true;
          }
        }
      });
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
    Object.keys(britishOnly).forEach((e) => {
      mapStructAmerican.set(britishOnly[e],e);
    });
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    let decide = false;
    let americanHour = text.match(/\d{1,2}:\d{1,2}/g);
    if(americanHour !== null) {
         return true;
     } else {
      let arrText = text.toLowerCase().split(/\s|\./).filter(e => e !== '');
      americanArr.forEach(el => {
        let elNew = el.toLowerCase().split(/\s/g);
        if(elNew.length === 1) {
          if(arrText.includes(elNew[0])) {
           decide = true;
           }
        } else if(elNew.length === 2) {
          if(arrText.includes(elNew[0]) && arrText.includes(elNew[1]) ) {
            decide = true;
           }
        } else {
          if(arrText.includes(elNew[0]) &&
          arrText.includes(elNew[1]) &&
          arrText.includes(elNew[2]) ) {
            decide = true;
          }
        }
      });
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