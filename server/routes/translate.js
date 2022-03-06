const express = require('express');
const cache = require('../translateCache');
const router = express.Router();
const googleTranslate = require('@vitalets/google-translate-api');

//on translate route use fetch data from above mentioned api
router.get('/translate',cache,async(req,res,next)=>{
    var queryResponse = {}
    try{
        const answer = await googleTranslate(req.query.sourceText, {to: req.query.targetLanguage});

        queryResponse.finalText = answer.text;
        queryResponse.from = answer.from.language;
    } catch (error)
    {
        console.log(error);
    }

    //return 200 ok status code if everything goes ok
    res.status(200).json({
        success: true,
        data: queryResponse,
    })
});

//export router to be used by the app
module.exports = router;