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
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));

    let decide = false;
    let textTranslated = text.toLowerCase();
    britishArr.forEach(e => {
     if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\.$`,'g')).test(textTranslated)) {
      decide = true;
     }     
    });
    if(!decide) {
     let britishHour = textTranslated.match(/\d{1,2}\.\d{1,2}/g);
     if(britishHour === null) {
      let americanHour =  textTranslated.match(/\d{1,2}:\d{1,2}/g);
      if(americanHour !== null) {
        let val = americanHour[0].split(":")
        if((Number(val[0]) <= 12 && Number(val[0]) >= 1 ) && 
            Number(val[1]) <= 59 && Number(val[1]) >= 0) {
             textTranslated = textTranslated.replace(americanHour[0],`<span class="highlight">${val[0]}.${val[1]}</span>`);
         }
      }
      americanArr.forEach(e => {
       if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\.$`,'g')).test(textTranslated)) {
       textTranslated = textTranslated.replace(e,`<span class="highlight">${mapStructAmerican.get(e)}</span>`);
      } 
     });
     } else {
      decide = true;
     }
    }
    return decide ? "same" : textTranslated;
   }

   britishToAmerican(text) {
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
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));

    let decide = false;
    let textTranslated = text.toLowerCase();
    americanArr.forEach(e => {
      if(e.split("").includes(".")) {
        e=e.replace('.','\\.'); 
      }
     if((new RegExp(`\\s${e}\\s[^\\.]|${e}[^\\.]\\s|\\s${e}\.$`,'g')).test(textTranslated)) {
      decide = true;
     }     
    });
    if(!decide) {
     let americanHour =  textTranslated.match(/\d{1,2}:\d{1,2}/g);
     if(americanHour === null) {
     let britishHour =  textTranslated.match(/\d{1,2}\.\d{1,2}/g);
      if(britishHour !== null) {
        let val = britishHour[0].split(".")
        if((Number(val[0]) <= 12 && Number(val[0]) >= 1 ) && 
            Number(val[1]) <= 59 && Number(val[1]) >= 0) {
             textTranslated = textTranslated.replace(britishHour[0],`<span class="highlight">${val[0]}:${val[1]}</span>`);
         }
      }
      britishArr.forEach(e => {
       if((new RegExp(`\\s${e}\\s|${e}\\s|\\s${e}\.$`,'g')).test(textTranslated)) {
       textTranslated = textTranslated.replace(e,`<span class="highlight">${mapStructBritish.get(e)}</span>`);
      } 
     });
     } else {
      decide = true;
     }
    }
    return decide ? "same" : textTranslated;
   }
}

module.exports = Translator;