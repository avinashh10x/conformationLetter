import { useContext, useEffect } from 'preact/hooks';
import { MyContext } from '../context/LetterContext';
import Loading from '../component/Loading';
import signature from '../assets/signature.jpg';
import NCimg from '../assets/novem_controls-removebg-preview.webp'
import ToolBar from '../component/ToolBar';


function LetterLayout() {
    const { selectedLetter, setSelectedLetter } = useContext(MyContext);



    if (!selectedLetter) {
        return <Loading />;
    }

    return (

        <div className="min-h-screen bg-gray-100">
            <ToolBar/>

            <div className="max-w-3xl mx-auto mt-6 bg-gray-300 border border-[#684df4] my-5 p-10 shadow-2xl shadow-red-500 rounded-lg">
            <div className='flex justify-between items-start mb-6'>
                    <img src={NCimg} alt='Novem Controls Logo' className='h-28' />
                    <div className='text-left'>
                        <p className='text-2xl font-bold text-blue-700'>Novem Controls</p>
                        <p>Plot No. 218, Ind. Area Phase-IX, Mohali-160062</p>
                        <p>Chandigarh (INDIA)</p>
                        <p>Ph.: +91 172-5099200, +91 98153-58800</p>
                        <p>Email: novemcontrols@gmail.com</p>
                        <p>Web: <a href='http://www.novemcontrols.com' className='text-blue-600'>www.novemcontrols.com</a></p>
                    </div>
                </div>

                <div className='flex justify-between border-b pb-2 mb-4'>
                    <p><strong>Ref.No:</strong> {selectedLetter.ReferenceNo || "Reference Number"}</p>
                    <p><strong>Dated:</strong> {new Date(selectedLetter.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>

                <p><strong>To,</strong></p>
                <p>The Director <br />Training & Placement Office <br />I.K. Gujral Punjab Technical University Mohali Campus - I <br />Mohali, Punjab</p>

                <h3 className='mt-4 text-lg font-bold'>Subject: CONFIRMATION OF {selectedLetter.trainingPeriod.toUpperCase()} INTERNSHIP PROGRAM</h3>

                <div className='mt-4 space-y-4 leading-relaxed'>
                    <p>Dear Sir/Madam,</p>
                    <p>
                        We are pleased to inform you that <strong>{selectedLetter.name || "[Student Name]"}</strong>
                        {selectedLetter.gender === 'female' ? ' D/O ' : ' S/O '}
                        <strong>{selectedLetter.FatherName || "Father Name"}</strong> has been successfully enrolled
                        in our {selectedLetter.trainingPeriod} industrial Internship program from <strong>
                            {new Date(selectedLetter.enrollmentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </strong> in our esteemed organization.
                    </p>
                    <p>
                        During the training, the student will have the opportunity to work on various projects and gain hands-on
                        experience in their chosen field. Our team is eager to mentor and support students throughout the
                        internship, and we encourage the students to actively participate in our daily activities.
                    </p>
                    <p>
                        The management will assess the candidate’s performance throughout this period. We look forward to a
                        productive and enriching 6 months ahead with the candidate.
                    </p>
                </div>

                <div className='mt-6'>
                    <p>Best regards,</p>
                    <p>Yours Faithfully,</p>
                    <p>For <strong>NOVEM CONTROLS</strong></p>
                    <img src={signature} alt='Signature' className='h-20 mt-2' />
                </div>
            </div>
        </div>

    );
}

export default LetterLayout;
