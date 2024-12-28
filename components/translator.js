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
    for(let i = 0; i < britishArr.length; i++) {
      if((new RegExp(britishArr[i][0],"g")).test(text)) 
        {
          return true;
        } else {
          const regResult2 = text.match(/\d\d?:\d\d?/g);
          if(regResult2 !== null) {
              return true;
          } else {
            return false;
          }
        }
    }
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
    const regResult2= text.match(/\d\d?:\d\d?/g);
    if(regResult2 === null) {
      const regResult3= text.match(/\d\d?:\d\d?/g);
      if(regResult3 === null) {
        let textTranslated = text;
        americanArr.forEach(el => {
        if((new RegExp(el,"g")).test(text)) {
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
   }

   britishToAmericanTest(text) {
    let americanArr = Object.keys(americanToBritishSpelling);
    americanArr.push(...Object.keys(americanToBritishTitles));
    americanArr.push(...Object.values(britishOnly));
    americanArr.push(...Object.keys(americanOnly));
    for(let i = 0; i < americanArr.length; i++) {
      if((new RegExp(americanArr[i],"g")).test(text)) 
        {
          return true;
        } else {
          const regResult2 = text.match(/\d\d?:\d\d?/g);
          if(regResult2 !== null) {
              return true;
          } else {
            return false;
          }
        }
     }; 
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
    const regResult2 = text.match(/\d\d?:\d\d?/g);
    if(regResult2 === null) {
      const regResult3= text.match(/\d\d?\.\d\d?/g);
      if(regResult3 === null) {
        let textTranslated = text;
        britishArr.forEach((el,i) => {
            if((new RegExp(`${el}\\s`,"g")).test(textTranslated)) {
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
}

module.exports = Translator;