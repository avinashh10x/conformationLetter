import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { getSearchedLetter } from '../services/LetterServices';
import { MyContext } from '../context/LetterContext';
import { useNavigate } from "react-router-dom";



function FilterBtn() {
    const [showModal, setShowModal] = useState(false);
    const [filterLetter, setFilterLetter] = useState('');
    const [error, setError] = useState(null);
    const [collegeName, setCollegeName] = useState('');
    const [courseName, setCourseName] = useState('');
    const { setSearchResults } = useContext(MyContext)

    const navigate = useNavigate();




    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };


    const handleFilterLetter = async (e) => {
        e.preventDefault();
        try {
            const filteredLettersFromApi = await getSearchedLetter(collegeName, courseName);

            if (!filteredLettersFromApi.length) {
                setError("No matching letters found.");
                return;
            }
            await setSearchResults(filteredLettersFromApi);
            navigate("/result", { state: {collegeName,courseName} });


            //    console.log();

        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error(error);
        }
    };


    return (
        <div>
            <button
                className="bg-[#684df4] text-white cursor-pointer flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg"
                onClick={() => setShowModal(true)}
            >
                Filter Letter
                <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
            </button>

            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-10"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Filter Letter</h2>

                        <form onSubmit={handleFilterLetter} className="flex justify-between space-x-4">
                            <div className="w-1/2" >
                                <label className="block text-left text-gray-700">Name</label>
                                <select
                                    name="collegeName"
                                    value={collegeName}
                                    onChange={(e) => {
                                        setCollegeName(e.target.value);
                                        setError(null);
                                    }}
                                    className="w-full p-3 border rounded-lg text-lg"
                                >
                                    <option value="" disabled>Select College</option>
                                    <option value="CT Institute of Engineering, Management & Technology">CT Institute of Engineering, Management & Technology</option>
                                    <option value="Lovely Professional">Lovely Professional University (LPU)</option>
                                    <option value="Chandigarh ">Chandigarh University (CU)</option>
                                    <option value="Guru Nanak Dev University (GNDU)">Guru Nanak Dev University (GNDU)</option>
                                    <option value="Punjab Engineering College (PEC)">Punjab Engineering College (PEC)</option>
                                </select>
                            </div>

                            <div className="w-1/2">
                                <label className="block text-left text-gray-700">Course</label>
                                <select
                                    name="course"
                                    value={courseName}
                                    onChange={(e) => {
                                        setCourseName(e.target.value);
                                        setError(null);
                                    }}
                                    className="w-full p-3 border rounded-lg text-lg"
                                >
                                    <option value="" disabled>Select Course</option>
                                    <option value="web development">web development</option>
                                    <option value="data science">data science</option>
                                    <option value="AI & ML">AI & ML</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
                            // onClick={}
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterBtn;
