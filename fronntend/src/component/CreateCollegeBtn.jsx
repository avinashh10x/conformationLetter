import { PlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { saveCollageName } from '../services/LetterServices'
import toast from 'react-hot-toast';

export default function CreateCollegeBtn() {
    const [showModal, setShowModal] = React.useState(false);
    const [collegeName, setCollegeName] = React.useState('');

    const createCollage = async (e) => {
        try {
            e.preventDefault();
            const response = await saveCollageName(collegeName)

            toast.success("Collage created successfully")
            console.log(response);
            // setShowModal(false)
            setCollegeName('')

        } catch (error) {
            console.error("Error creating collage:", error);
            toast.error("Error creating collage")
        }
    }



    function openModel() {
        setShowModal(true)
    }

    return (
        <>
            <PlusIcon onClick={openModel} className="size-9 p-1 cursor-pointer" title='Add College' />
            {showModal && (
                <>
                    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-[5px]" onClick={() => setShowModal(false)}>
                        <div
                            className="bg-gray-100 border-2 my-2 border-[#684df4] rounded-lg shadow-lg p-8 max-w-3xl sm:w-1/3 w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-800 text-2xl">✖</button>

                            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Add College</h2>
                            <form onSubmit={createCollage} className="">

                                <input type="text" name="name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="Name" required className="w-full p-3 border text-black text-2xl border-blue-950 rounded-lg" />


                                <div className="col-span-2 mt-4">
                                    <button type="submit" className="w-full bg-[#684df4] text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300">Add</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
