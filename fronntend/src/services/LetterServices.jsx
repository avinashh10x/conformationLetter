import axios from "axios";

const API_URL = "http://localhost:3000/api";
// const API_URL = "https://confirmationletter.onrender.com/api";

//  Get all Letters
const getAllLetters = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/getAllLetters?page=${page}&limit=${limit}`);
        console.log('from services', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching letters:", error);
        throw error;
    }
};




//  Create a new Letter
const createLetter = async (letterData) => {
    try {
        const response = await axios.post(`${API_URL}/letterCreate`, letterData);
        console.log("from services", response.data);

        return response.data.letter;
    } catch (error) {
        console.error("Error creating letter:", error);
        throw error;
    }
};

const getSearchedLetter = async (searchTerm1, searchTerm2) => {
    try {
        const response = await axios.post(`${API_URL}/getSearchedLetter`, { 
            queryValue1: searchTerm1, 
            queryValue2: searchTerm2 
        });

        console.log(response.data);
        

        return response.data.letter;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn("No letter found.");
            return []; // Return empty array instead of throwing an error
        }
        console.error("Error fetching letter:", error);
        throw error; // Rethrow other errors
    }
};


const updateLetter = async (letterData) => {
    try {
        const response = await axios.put(`${API_URL}/updateLetter`, letterData);
        return response.data.letter;
    } catch (error) {
        console.error("Error updating letter:", error);
        throw error;
    }
};

// Delete a Letter by ReferenceNo
const deleteLetter = async (referenceNo) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteLetter`, { data: { ReferenceNo: referenceNo } });
        console.log("from services", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting letter:", error);
        throw error;
    }
};


export {
    getAllLetters,
    createLetter,
    getSearchedLetter,
    updateLetter,
    deleteLetter
};