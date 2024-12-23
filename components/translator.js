const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
   americanToBritish(text) {
    let decide = false;
    let arrText = text.split(" ");
    arrText.forEach((el,i) => {  
      if(Object.keys(americanToBritishSpelling).includes(el)) 
       {
         arrText[i] = `<span class="highlight">${americanToBritishSpelling[el]}</span>`;
         decide = true;
       } else if( Object.keys(americanToBritishTitles).includes(el) ) {
         arrText[i] = `<span class="highlight">${americanToBritishTitles[el]}</span>`;
         decide = true;
       } 
     });
     if(!decide) {
      const regResult = text.match(/\d\d+:\d\d+/g);
      if(regResult === null) {
        return "an error!";
      } else {
        const el = regResult[0];
        const arr = regResult[0].split(":");
        if((arr[0].length <= 2 && arr[1].length <= 2) &&
           (Number(arr[0]) <= 12 && Number(arr[0]) > 0 ) &&
           (Number(arr[1]) <= 59 && Number(arr[0]) > 0 ) 
          ) {
            return text.replace(el, `<span class="highlight">${arr[0]}.${arr[1]}</span>`);
        } else {
          return "Everything looks good to me!";
        }
      }
     }
    return decide ? arrText.join(' ') : undefined;
   }

   britishToAmerican(text) {
    let decide = false;
    let valuesArr = Object.values(americanToBritishSpelling);
    let keysArr = Object.keys(americanToBritishSpelling);
    valuesArr.push(...Object.values(americanToBritishTitles));
    keysArr.push(...Object.keys(americanToBritishTitles));
    let arrText = text.split(" ");
    arrText.forEach((el,i) => {
     if(valuesArr.includes(el)) {
       let k = 'begin';
       let n = 0;
       while(k === 'begin') {
         if(valuesArr[n] === el) {
           k = 'end';
           break;
         }
         n++;
       }
       arrText[i] = `<span class="highlight">${keysArr[n]}</span>`;
       decide = true;
     }
   });
   if(!decide) {
    const regResult = text.match(/\d\d+.\d\d+/g);
    if(regResult === null) {
      return "error";
    } else {
      const el = regResult[0];
      const arr = regResult[0].split(".");
      if((arr[0].length <= 2 && arr[1].length <= 2) &&
         (Number(arr[0]) <= 12 && Number(arr[0]) > 0 ) &&
         (Number(arr[1]) <= 59 && Number(arr[0]) > 0 ) 
        ) {
          return text.replace(el, `<span class="highlight">${arr[0]}:${arr[1]}</span>`)
      } else {
       return "Everything looks good to me!";
      }
    }
   }

   return decide ? arrText.join(' ') : undefined;
   }

   toAmericanOnly(text) {
    let textTranslated = '';
    const arr = Object.keys(americanOnly);
    arr.forEach(el => {
     if(text.match(new RegExp(el,"g"))) {
       textTranslated = text.replace(el, americanOnly[el]);
     }
    });
    return textTranslated === ""? "looks good" : textTranslated;
   }

   toBritishOnly(text) {
    let textTranslated = '';
    const arr = Object.keys(britishOnly);
    arr.forEach(el => {
     if(text.match(new RegExp(el,"g"))) {
            
       textTranslated = text.replace(el, britishOnly[el]);
     }
    });
    return textTranslated === ""? "looks good" : textTranslated;
   }
}

module.exports = Translator;