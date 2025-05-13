import { useEffect } from 'react';
import { getCollageNames } from '../services/LetterServices';
import { useState } from 'react';

function SelectCollege({ collegeName, setFormData }) {
    const [collegeNames, setCollegeNames] = useState([]);

    async function fetchCollegeNames() {
        const collegeNameResult = await getCollageNames();
        console.log("this is from select component... ", collegeNameResult.collageNames);
        setCollegeNames(collegeNameResult.collageNames);

    }

    useEffect(() => {
        fetchCollegeNames();
    }, []);

    return (
        <>
            <select
                name="collegeName"
                value={collegeName} // Use the collegeName prop
                required
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData((prev) => ({ ...prev, collegeName: e.target.value }))}
            >
                <option value="" disabled>Select College</option>
                {collegeNames.map((college, index) => (
                    <option key={index} value={college.name}>{college.name}</option>
                ))}
            </select>
        </>
    );
}

export default SelectCollege;