import { useRef, useState } from "react"
import icons from "../assets/icon"
import images from "../assets/image"
import Navigation from "../components/NavigationBar"
import '../scss/pages/profile.scss'


function Profile() {
    // let message = "This is Your Profile Page"
    // let speech = new SpeechSynthesisUtterance(message)
    // window.speechSynthesis.speak(speech)
    const pp = useRef<any>()
    const [selectedFileName, updateSelectedFileName] = useState('')
    const [isStudent, uIsStudent] = useState<any>(null)


    return (
        <div id="profile">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={images.pp} onClick={selectFile} className='pp' />
                        <input type="file" ref={pp} onChange={onChangeFileSelect} />
                        <div className="editImageContainer" onClick={selectFile} >
                            <img src={icons.pen_solid} className='editIcon' />
                        </div>
                    </div>
                    <div className="right">
                        <span className="count">15</span>
                        <p>Pages Printed</p>
                    </div>
                </div>
                <p className="selectedFileName">{selectedFileName}</p>
                <div className="details">
                    <div>
                        <span>Your Name</span>
                        <input type="text" id='name' name="name" placeholder='Your Name' className="inp" />
                    </div>
                    <div>
                        <span>Mobile Number</span>
                        <input type="tel" id='number' name="number" placeholder='+91 123 456 78790' />
                    </div>
                    <div>
                        <span>Your Email</span>
                        <input type="email" name="email" id='email' placeholder='+91 123 456 78790' />
                    </div>
                    <div>
                        <span>Date of Birth</span>
                        <input type="date" id='dob' placeholder='Date of Birth' name="dob" />
                    </div>
                    <div>
                        <span>Your Gender</span>
                        <select id="gender" name="gender">
                            <option value="" disabled>Select Your Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Female">Other</option>
                            <option value="na">Don't Tell</option>
                        </select>
                    </div>


                    <div>
                        <span>Are you a student?</span>
                        <div className="options">
                            <div className={`option ${(isStudent === true) ? ' active' : ''}`} onClick={() => { uIsStudent(true) }}>Yes</div>
                            <div className={`option ${(isStudent === false) ? ' active' : ''}`} onClick={() => { uIsStudent(false) }}>No</div>
                        </div>
                    </div>

                    {showStudentOrProfessional(isStudent)}

                    <div>
                        <input type="submit" value='Save Changes' />
                    </div>

                </div>
            </div>
            <Navigation active='profile' />
        </div>
    )

    function getFile() {
        return 0
    }
    function onChangeFileSelect() {
        let file: string = pp.current.value
        let fileName = file.split('\\')
        updateSelectedFileName(fileName[fileName.length - 1])
        return 0
    }
    function selectFile() {
        pp.current.click()
    }
    function StudentSection() {
        return (
            <div id="studentDetails">
                <h4>Enter your college details</h4>
                <div className="input">
                    <span>College Name</span>
                    <input type="text" id='collegeName' placeholder='Abcd Efg0h College' name="college" className="inp" />
                </div>
                <div className="input">
                    <span>Course of Study</span>
                    <input type="text" id='course' placeholder='e.g. B.tech in CSE' name="course" className="inp" />
                </div>
                <div className="input">
                    <span>Year</span>
                    <input type="text" id='year' placeholder='e.g. 1st Year' name="year" className="inp" />
                </div>
                <div className="input">
                    <span>Semester</span>
                    <input type="text" id='semester' placeholder='e.g. 2nd Semester' name="semester" className="inp" />
                </div>
            </div>
        )
    }
    function ProfessionalSection() {
        return (
            <div id="professionalDetails">
                <h4>Enter your college details</h4>
                <div className="input">
                    <span>Occupation</span>
                    <input type="text" id='work' placeholder='e.g. Web Developer' name="work" className="inp" />
                </div>
            </div>
        )
    }
    function showStudentOrProfessional(isStudent: boolean | null) {
        if (isStudent === true)
            return <StudentSection />
        else if (isStudent === false)
            return <ProfessionalSection />
        else
            return <></>
    }
}
export default Profile