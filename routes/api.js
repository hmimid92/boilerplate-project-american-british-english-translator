'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const local = req.body.locale;
      let textRaw = req.body.text;
    
 
      if(local === 'american-to-british') {
        if(translator.americanToBritish(textRaw) === 'same') {
          res.json({
            text: textRaw,
            translation: "Everything looks good to me!"
          });
          return;
        } else {
          res.json({
            text: textRaw,
            translation: translator.americanToBritish(textRaw)
          });
          return; 
        }
      } else if(local === 'british-to-american') {
        if(translator.britishToAmerican(textRaw) === 'same') {
          res.json({
            text: textRaw,
            translation: "Everything looks good to me!"
          });
          return;
        } else {
          res.json({
            text: textRaw,
            translation: translator.britishToAmerican(textRaw)
          });
          return;
        }
      } 
    });
};
