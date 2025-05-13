const Letter = require('../model/Letter.model.js');
const Counter = require('../model/Counter.model.js');
const CollageModel = require('../model/Collage.model.js');


function getAcademicYear() {
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    return Month <= 3 ? `${Year - 1}-${Year}` : `${Year}-${Year + 1}`;
}

const hello = async (req, res) => {
    res.send('this is letter route ');
}



// create new Confirmation Letter api
const createLetter = async (req, res) => {
    try {
        let { name, FatherName, rollNo, gender, courseName, collegeName, enrollmentDate, trainingPeriod } = req.body;

        if (!name || !FatherName || !rollNo || !gender || !courseName || !enrollmentDate || !trainingPeriod) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let counter = await Counter.findOne().sort({ _id: -1 });

        if (!counter) {
            counter = new Counter({ value: 100 }); // Start with 100 if no counter exists
            await counter.save();
        }

        const newCounterValue = counter.value + 1;

        await Counter.findByIdAndUpdate(counter._id, { value: newCounterValue });

        // Format the name and father's name
        const formattedName = name.split(" ").map(word => word ? word[0].toUpperCase() + word.slice(1) : "").join(" ");
        const formattedFatherName = FatherName.split(" ").map(word => word ? word[0].toUpperCase() + word.slice(1) : "").join(" ");

        const academicYear = getAcademicYear();

        // Initialize currentAcademicYear and refNoAtLast
        let currentAcademicYear = academicYear;


        // Reset refNoAtLast if the academic year has changed
        if (academicYear !== currentAcademicYear) {
            currentAcademicYear = academicYear;

        }

        // Generate the final reference number using the counter value
        const finalReferenceNo = `NCPL/${academicYear}/${newCounterValue}`;

        // Create the new letter
        const letter = new Letter({
            name: formattedName,
            FatherName: formattedFatherName,
            rollNo,
            gender,
            courseName,
            collegeName,
            enrollmentDate,
            trainingPeriod,
            ReferenceNo: finalReferenceNo
        });

        await letter.save();
        res.status(201).json({ success: true, message: 'Letter created successfully', letter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



const saveCollageName = async (req, res) => {
    try {
        const { collegeName } = req.body;

        if (!collegeName) {
            return res.status(400).json({ message: "collegeName is required" });
        }

        const collage = new CollageModel({ name: collegeName });
        await collage.save();


        res.status(201).json({ message: "College name saved successfully", collage });

    } catch (error) {
        res.status(500).json({ message: "Server error while saving collage name", error: error.message });
    }
}

const getCollageNames = async (req, res) => {
    try {
        const collageNames = await CollageModel.find().collation({ locale: "en" }).sort({ name: 1 });
        if (!collageNames) {
            return res.status(404).json({ message: "No college names found" });
        }
        res.status(200).json({ collageNames });
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching college names", error: error.message });
    }
}




// get all Confirmation Letters API with pagination

const getAllLetters = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const totalCount = await Letter.countDocuments();
        const letters = await Letter.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

        res.status(200).json({ letters, totalCount });
    } catch (error) {
        res.status(500).json({ message: "Error fetching letters", error });
    }
};



//   get filter products API
// const getFilterLetters = async (req, res) => {
//     try {

//         let { courseName, collegeName } = req.body;
//         if (!courseName || !collegeName) {
//             return res.status(400).json({ success: false, message: "Course name or college name are required for filtering" });
//         }
//         const Letters = await Letter.find({
//             $or: [
//                 { courseName: { $search: courseName } },
//                 { collegeName: { $search: collegeName } }
//             ]
//         })

//     } catch (error) {
//         res.status(500).json({ success: false, message: error });
//     }
// }




// get single Confirmation Letter api

const getSearchedLetter = async (req, res) => {
    try {
        const { queryValue1, queryValue2 } = req.body;

        if (!queryValue1?.trim() && !queryValue2?.trim()) {
            return res.status(400).json({ success: false, message: "Search value is required" });
        }

        let letter;


        if (queryValue1 && queryValue2) {
            letter = await Letter.aggregate([
                {
                    "$search": {
                        "index": "default",
                        "compound": {
                            "must": [
                                {
                                    "phrase": {
                                        "query": queryValue1,
                                        "path": "collegeName", // Searching only in the collegeName field
                                        "score": { "boost": { "value": 5 } }
                                    }
                                },
                                {
                                    "phrase": {
                                        "query": queryValue2,
                                        "path": "courseName"  // Searching only in the courseName field
                                    }
                                }
                            ]
                        }
                    }
                }
            ]);
        } else {
            letter = await Letter.aggregate([
                {
                    "$search": {
                        "index": "default",
                        "text": {
                            "query": queryValue1 || queryValue2,
                            "path": {
                                "wildcard": "*"
                            }
                        }
                    }
                }
            ]);
        }

        if (!letter?.length) {
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
        const { ReferenceNo, name, FatherName, courseName, collegeName, rollNo, gender, enrollmentDate, trainingPeriod } = req.body;

        if (!ReferenceNo) {
            return res.status(400).json({ message: "ReferenceNo is required." });
        }

        const updatedLetter = await Letter.findOneAndUpdate(
            { ReferenceNo },
            { name, FatherName, courseName, rollNo, gender, enrollmentDate, trainingPeriod, collegeName },
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
    getSearchedLetter,
    updateLetter,
    deleteLetter,
    saveCollageName,
    getCollageNames
};