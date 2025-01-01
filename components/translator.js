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
      const searched = (new RegExp(`${el}(?=\\s)|\\d\\d?\\.\\d\\d?`, 'gi')).exec(text);
      if(searched !== null) {
        decide = true;
      }
    });
    if(!decide) {
      americanArr.forEach(el => {
        let searched = (new RegExp(`${el}(?=\\s)|[0|1][0-9]:[0-5][0-9]`, 'gi')).exec(text);
        if(searched !== null) {
          if(searched[0] === el) {
            text = text.replace((new RegExp(`${el}`,'gi')),`<span class="highlight">${mapStructAmerican.get(el)}</span>`);
          } else {
            let val = searched[0].split(":")
            text = text.replace(searched[0],`<span class="highlight">${val[0]}.${val[1]}</span>`);
          }
        } 
      });
    }
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
    const americanArr = Object.keys(Object.fromEntries(mapStructAmerican));
    const britishArr = Object.keys(Object.fromEntries(mapStructBritish));
    let decide = false;
    americanArr.forEach(el => {
      let searched = (new RegExp(`${el}(?=\\s)|[0|1][0-9]:[0-5][0-9]`, 'gi')).exec(text);
      if(searched !== null) {
        console.log(el)
        decide = true;
      } 
    });
    if(!decide) {
      britishArr.forEach(el => {
        let searched = (new RegExp(`${el}(?=\\s)|\\d\\d?\\.\\d\\d?`, 'gi')).exec(text);
        if(searched !== null) {
          if(searched[0] === el) {
            text = text.replace((new RegExp(`${el}`,'gi')),`<span class="highlight">${mapStructBritish.get(el)}</span>`);
          } else {
            let val = searched[0].split(".")
            text = text.replace(searched[0],`<span class="highlight">${val[0]}:${val[1]}</span>`);
          }
        } 
      });
    }
    return decide ? "" : text;
  }
}

module.exports = Translator;