import React, { useContext, useEffect, useState } from "react";
import { getAllLetters } from "../services/LetterServices";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/LetterContext";
import Loading from "./Loading";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import EditLetter from "./EditLetter";
import DeleteLetter from "./DeleteLetter";

function RecentLetter() {
  const [letters, setLetters] = useState([]);
  const { setSelectedLetter } = useContext(MyContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const data = await getAllLetters();
        setLetters(data.letters);
      } catch (error) {
        console.error("Error fetching letters:", error);
      }
    };
    fetchLetters();
  }, []);

  const handleClick = (letter) => {
    setSelectedLetter(letter);
    navigate("/letter");
  };

  const toggleMenu = (letterId) => {
    setMenuOpen(menuOpen === letterId ? null : letterId);
  };

  const handleDeleteSuccess = (referenceNo) => {
    setLetters(letters.filter((letter) => letter.ReferenceNo !== referenceNo));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col gap-5 mt-4 p-4 text-lg">

      {letters.length > 0 ? (
        letters.map((letter) => (
          <div
            key={letter._id || "N/A"}
            className="relative border border-[#684df4] cursor-pointer text-gray-800 flex w-full max-w-3xl rounded-2xl p-5 shadow-md bg-gray-100 hover:bg-gray-200"
          >
            <div className="flex flex-col w-full" onClick={() => handleClick(letter)}>
              <h4 className="text-xl font-semibold">{letter.name || "N/A"}</h4>
              <p className="text-sm text-gray-600">Father's Name: <b>{letter.FatherName || "N/A"}</b></p>
              <p className="text-sm text-gray-600">Ref No: {letter.ReferenceNo || "N/A"}</p>
              <p className="text-sm text-gray-600">college Name: {letter.collegeName || "N/A"}</p>
              <p className="text-sm text-gray-600">Roll No: {letter.rollNo || "N/A"}</p>
              <p className="text-sm text-gray-600">Course: {letter.courseName || "N/A"}</p>
            </div>

            <div className="flex flex-col items-end justify-between ml-4 relative">
              <div className="relative menu-container">
                <EllipsisVerticalIcon
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(letter._id);
                  }}
                />
                {menuOpen === letter._id && (
                  <div className="absolute right-0 top-8 w-32 bg-white flex flex-col gap-2 p-2 border border-gray-300 rounded-lg shadow-lg z-10">
                    <EditLetter letterData={letter} onUpdateSuccess={() => setMenuOpen(null)} />
                    <DeleteLetter referenceNo={letter.ReferenceNo} onDeleteSuccess={handleDeleteSuccess} />
                  </div>
                )}
              </div>

              <span className="text-sm text-gray-500 mt-auto">
                {letter.createdAt ? new Date(letter.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default RecentLetter;
