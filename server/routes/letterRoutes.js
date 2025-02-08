const express = require('express');
const { 

    hello,
    createLetter,
    getAllLetters,
    getSingleLetter,
    updateLetter,
    deleteLetter 
} = require('../controllers/letterControllers');


const router = express.Router();

router.get('/letter', hello);
router.post('/letterCreate', createLetter);  
router.get('/getAllLetters', getAllLetters);  
router.post('/getSingleLetter', getSingleLetter);  
router.put('/updateLetter', updateLetter);  
router.delete('/deleteLetter', deleteLetter);  

module.exports = router;
