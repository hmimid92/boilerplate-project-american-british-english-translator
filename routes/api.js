'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const local = req.body.locale;
      const textRaw = req.body.text;
      if(local === 'american-to-british') {
        res.json({
          text: textRaw,
          translation: translator.americanToBritish(textRaw)
        });
      } else if(local === 'british-to-american') {
        res.json({
          text: textRaw,
          translation: translator.britishToAmerican(textRaw)
        });
      }
    });
};
