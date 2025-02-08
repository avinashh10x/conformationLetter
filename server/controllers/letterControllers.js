const Letter = require('../model/Letter.model.js');

const hello = async (req, res) => {
    res.send('this is letter route ');
}


// create new Confirmation Letter api
const createLetter = async (req, res) => {
    try {
        const { name, FatherName, rollNo, gender, courseName,collageName, enrollmentDate, trainingPeriod, ReferenceNo } = req.body;

        if (!name || !FatherName || !rollNo || !gender || !courseName || !enrollmentDate || !trainingPeriod || !ReferenceNo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const letter = new Letter({
            name,
            FatherName,
            rollNo,
            gender,
            courseName,
            collageName,
            enrollmentDate,
            trainingPeriod,
            ReferenceNo
        });

        await letter.save();
        res.status(201).json({ success: true, message: 'Letter created successfully', letter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// get all Confirmation Letters API with pagination
const getAllLetters = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page = 1
        const limit = parseInt(req.query.limit) || 10; // Default limit = 10
        const skip = (page - 1) * limit;

        // Fetch letters with pagination
        const letters = await Letter.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalLetters = await Letter.countDocuments();

        res.json({
            success: true,
            count: letters.length,
            totalLetters,
            totalPages: Math.ceil(totalLetters / limit),
            currentPage: page,
            letters,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// get single Confirmation Letter api

const getSingleLetter = async (req, res) => {
    try {
        const { ReferenceNo } = req.body;

        if (!ReferenceNo) {
            return res.status(400).json({ success: false, message: "ReferenceNo is required" });
        }

        const letter = await Letter.findOne({ ReferenceNo });  // Find document by ReferenceNo

        if (!letter) {
            return res.status(404).json({ success: false, message: "Letter not found" });
        }

        res.status(200).json({ success: true, letter });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// update Confirmation Letter api
const updateLetter = async (req, res) => {
    try {
        const { ReferenceNo, name, FatherName, courseName,collageName, rollNo, gender, enrollmentDate, trainingPeriod } = req.body;

        if (!ReferenceNo) {
            return res.status(400).json({ message: "ReferenceNo is required." });
        }

        const updatedLetter = await Letter.findOneAndUpdate(
            { ReferenceNo },
            { name, FatherName, courseName, rollNo, gender, enrollmentDate, trainingPeriod, collageName },
            { new: true, runValidators: true }
        );

        if (!updatedLetter) {
            return res.status(404).json({ message: "Letter not found." });
        }

        res.status(200).json({ message: "Letter updated successfully.", updatedLetter });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// delete Confirmation Letter api
const deleteLetter = async (req, res) => {
    try {
        const { ReferenceNo } = req.body;

        if (!ReferenceNo) {
            return res.status(400).json({ message: "ReferenceNo is required." });
        }

        const letter = await Letter.findOneAndDelete({ ReferenceNo });

        if (!letter) {
            return res.status(404).json({ message: "Letter not found." });
        }

        res.status(200).json({ message: "Letter deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = {
    hello,
    createLetter,
    getAllLetters,
    getSingleLetter,
    updateLetter,
    deleteLetter,
};