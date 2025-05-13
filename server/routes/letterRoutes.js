const express = require('express');
const { 

    hello,
    createLetter,
    getAllLetters,
    getSearchedLetter,
    updateLetter,
    deleteLetter, 
    getCollageNames,
    saveCollageName
} = require('../controllers/letterControllers');


const router = express.Router();

router.get('/letter', hello);
router.post('/letterCreate', createLetter);  
router.get('/getAllLetters', getAllLetters);  
router.post('/getSearchedLetter', getSearchedLetter);  
router.put('/updateLetter', updateLetter);  
router.delete('/deleteLetter', deleteLetter);

router.get('/getAllColleges', getCollageNames)
router.post('/savecollage', saveCollageName)


module.exports = router;
