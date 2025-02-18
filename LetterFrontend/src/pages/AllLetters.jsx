import React, { useContext, useEffect, useState } from "react";
import { getAllLetters } from "../services/LetterServices";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Loading from "../component/Loading";
import DeleteLetter from "../component/DeleteLetter";
import EditLetter from "../component/EditLetter";
import { MyContext } from "../context/LetterContext";
import { useNavigate } from "react-router-dom";

function AllLetters() {
  const [letters, setLetters] = useState(null);
  const { setSelectedLetter } = useContext(MyContext);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();
  const limit = 10;

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const data = await getAllLetters(page, limit);
        console.log("Fetched Data:", data);

        setLetters(data || []);
        setTotalPages(Math.ceil((data.totalCount || 1) / limit));
      } catch (error) {
        console.error("Error fetching letters:", error);
      }
    };
    fetchLetters();
  }, [page]);

  const handleClick = (letter) => {
    setSelectedLetter(letter);
    navigate('/letter');
  }

  const toggleMenu = (letterId) => {
    setMenuOpen(menuOpen === letterId ? null : letterId);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">All Letters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {letters ? (
          letters.map((letter) => (
            <div
              key={letter._id}
              onClick={() => handleClick(letter)}
              className="relative bg-white shadow-lg cursor-pointer rounded-lg p-6 border border-gray-300 hover:shadow-xl transition duration-200"
            >
              <h3 className="text-lg font-semibold text-indigo-600">{letter.name || "N/A"}</h3>
              <p className="text-gray-700 text-sm">Father's Name: <b>{letter.FatherName || "N/A"}</b></p>
              <p className="text-gray-700 text-sm">Ref No: {letter.ReferenceNo || "N/A"}</p>
              <p className="text-gray-700 text-sm">Roll No: {letter.rollNo || "N/A"}</p>
              <p className="text-gray-700 text-sm">Course: {letter.courseName || "N/A"}</p>
              <p className="text-gray-600 text-sm mt-2">Date: {letter.createdAt ? new Date(letter.createdAt).toLocaleDateString() : "N/A"}</p>

              <div className="absolute top-3 right-3">
                <EllipsisVerticalIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    toggleMenu(letter._id);
                  }}
                />
                {menuOpen === letter._id && (
                  <div
                    className="absolute cursor-pointer right-0 top-6 bg-white shadow-md rounded-lg p-2 border border-gray-300 w-32"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <EditLetter letterData={letter} />
                    <DeleteLetter referenceNo={letter.ReferenceNo} />
                  </div>

                )}
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer mr-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-md ml-2 disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllLetters;
