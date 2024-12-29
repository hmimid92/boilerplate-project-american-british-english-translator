const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  americanToBritishTest(text) {
    let britishArr = Object.values(americanToBritishSpelling);
    britishArr.push(...Object.values(americanToBritishTitles));
    britishArr.push(...Object.keys(britishOnly));
    britishArr.push(...Object.values(americanOnly));
    let arrText = text.split(/\s|\.$/g);
    let decide = false;
    arrText.forEach((el) => {
      if(britishArr.includes(el)) 
        {
          decide = true;
        } 
    }); 
    if(!decide)
      {const regResult2 = text.match(/\d\d?:\d\d?/g);
          if(regResult2 !== null) {
            return true;
          } else {
            return false;
          }
      }
      return decide;
  }
  americanToBritish(text) {
    let americanArr = Object.keys(americanToBritishSpelling);
    americanArr.push(...Object.keys(americanToBritishTitles));
    americanArr.push(...Object.values(britishOnly));
    americanArr.push(...Object.keys(americanOnly));
    let britishArr = Object.values(americanToBritishSpelling);
    britishArr.push(...Object.values(americanToBritishTitles));
    britishArr.push(...Object.keys(britishOnly));
    britishArr.push(...Object.values(americanOnly));
    let mapStructure = new Map();
    americanArr.forEach((el,i) => {
       mapStructure.set(el,britishArr[i]);
    });
      const regResult3= text.match(/\d\d?:\d\d?/g);
      if(regResult3 === null) {
        let arrText = text.split(/\s|\.$/g);
        let textTranslated = text;
        arrText.forEach(el => {
        if(americanArr.includes(el)) {
           textTranslated = textTranslated.replace(el, `<span class="highlight">${Object.fromEntries(mapStructure)[el]}</span>`);
          }
        });
       return textTranslated;
      } else {
        const el = regResult3[0];
        const arr = regResult3[0].split(":");
        if((arr[0].length <= 2 && arr[1].length <= 2) &&
               (Number(arr[0]) <= 12 && Number(arr[0]) > 0 ) &&
               (Number(arr[1]) <= 59 && Number(arr[0]) > 0 ) 
              ) {
           return text.replace(el, `<span class="highlight">${arr[0]}.${arr[1]}</span>`);
         }
      }
   }

   britishToAmericanTest(text) {
    let americanArr = Object.keys(americanToBritishSpelling);
    americanArr.push(...Object.keys(americanToBritishTitles));
    americanArr.push(...Object.values(britishOnly));
    americanArr.push(...Object.keys(americanOnly));
    let arrText = text.split(/\s|\.$/g);
    let decide = false;
    arrText.forEach((el) => {
      if(americanArr.includes(el)) 
        {
          decide = true;
        } 
    }); 
    if(!decide)
      {
        const regResult2 = text.match(/\d\d?:\d\d?/g);
          if(regResult2 !== null) {
            return true;
          } else {
            return false;
          }
      }
      return decide;
   }

   britishToAmerican(text) {
    let americanArr = Object.keys(americanToBritishSpelling);
    americanArr.push(...Object.keys(americanToBritishTitles));
    americanArr.push(...Object.values(britishOnly));
    americanArr.push(...Object.keys(americanOnly));
    let britishArr = Object.values(americanToBritishSpelling);
    britishArr.push(...Object.values(americanToBritishTitles));
    britishArr.push(...Object.keys(britishOnly));
    britishArr.push(...Object.values(americanOnly));
    let mapStructure = new Map();
    britishArr.forEach((el,i) => {
      mapStructure.set(el,americanArr[i]);
     });

      const regResult3= text.match(/\d\d?\.\d\d?/g);
      if(regResult3 === null) {
        let arrText = text.split(/\s|\.$/g);
        let textTranslated = text;
        arrText.forEach((el,i) => {
            if(britishArr.includes(el)) {
              textTranslated = textTranslated.replace(el, `<span class="highlight">${Object.fromEntries(mapStructure)[el]}</span>`);             
            }
         });
         return textTranslated;
      } else {
        const el = regResult3[0];
        const arr = regResult3[0].split(".");
        if((arr[0].length <= 2 && arr[1].length <= 2) &&
                 (Number(arr[0]) <= 12 && Number(arr[0]) > 0 ) &&
                 (Number(arr[1]) <= 59 && Number(arr[0]) > 0 ) 
                ) {
              return text.replace(el, `<span class="highlight">${arr[0]}:${arr[1]}</span>`)
        } 
      }
   }
}

module.exports = Translator;