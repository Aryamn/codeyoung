const express = require('express');
const cache = require('../translateCache');
const router = express.Router();
const googleTranslate = require('@vitalets/google-translate-api');


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

    res.status(200).json({
        success: true,
        data: queryResponse,
    })
});

module.exports = router;