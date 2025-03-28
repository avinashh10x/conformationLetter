import React, { useState, useContext } from 'react';
import { createLetter, getAllLetters } from '../services/LetterServices';
import { data, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/LetterContext';
import { PlusIcon } from '@heroicons/react/24/solid';

function CreateBtn() {
    const [showModal, setShowModal] = useState(false);
    const { setSelectedLetter, setLetters } = useContext(MyContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        FatherName: '',
        rollNo: '',
        gender: '',
        courseName: '',
        collegeName: '',
        enrollmentDate: '',
        trainingPeriod: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newLetter = await createLetter(formData);

            setSelectedLetter(newLetter);

            alert('Letter created successfully');
            setShowModal(false);

            navigate('/letter');
        } catch (error) {
            alert('Error creating letter', error);
        }
    };


    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-[#684df4] text-white cursor-pointer flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg"
            >
                Create Letter
                <PlusIcon className="h-6 w-6 text-white" />
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
                    <div
                        className="bg-gray-100 border-2 border-[#684df4] rounded-lg shadow-lg p-8 max-w-3xl w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-800 text-2xl">✖</button>

                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Create Letter</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-3 border rounded-lg" />

                            <input type="text" name="FatherName" value={formData.FatherName} onChange={handleChange} placeholder="Father's Name" required className="w-full p-3 border rounded-lg" />

                            <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll No" required className="w-full p-3 border rounded-lg" />

                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border rounded-lg">

                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Course Name" required className="w-full p-3 border rounded-lg" />

                            <select
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg"
                            >
                                <option value="" disabled>Select College</option>
                                <option value="CT Institute of Engineering, Management & Technology">CT Institute of Engineering, Management & Technology</option>
                                <option value="Lovely Professional University (LPU)">Lovely Professional University (LPU)</option>
                                <option value="Chandigarh University (CU)">Chandigarh University (CU)</option>
                                <option value="Guru Nanak Dev University (GNDU)">Guru Nanak Dev University (GNDU)</option>
                                <option value="Punjab Engineering College (PEC)">Punjab Engineering College (PEC)</option>
                            </select>


                            <input type="date" min={"2025-01-01"} max={new Date().toISOString().split("T")[0]} name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} required className="w-full p-3 border rounded-lg" />

                            <select name="trainingPeriod" value={formData.trainingPeriod} onChange={handleChange} className="w-full p-3 border rounded-lg">
                                <option value="" disabled>Select Training Period</option>
                                <option value="6 months">6 months</option>
                                <option value="45 days">45 days</option>
                                <option value="21 days">21 days</option>
                                <option value="30 days">30 days</option>
                                {/* '21 days', '30 days */}
                            </select>

                        {/* <input type="text" name="ReferenceNo" value={formData.ReferenceNo} onChange={handleChange} placeholder="Reference No" required className="w-full p-3 border rounded-lg" /> */}

                            <div className="col-span-2 mt-4">
                                <button type="submit" className="w-full bg-[#684df4] text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateBtn;
