import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { BrowserRouter, json, useNavigate } from "react-router-dom"
import icons from "../assets/icon"
import images from "../assets/image"
import checkBlock from "../checkBlock"
import Navigation from "../components/NavigationBar"
import joinLinks from "../linker"
import '../scss/pages/profile.scss'
import token from "../tokens"
import AlertBox from "../components/AlertBox"
const profileApiGetLink = joinLinks('profile')
const profileApiUpdateLink = joinLinks('profile/update')

const requestData = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token.get('registrationToken')
    },
}




function Profile() {
    // let message = "This is Your Profile Page"
    // let speech = new SpeechSynthesisUtterance(message)
    // window.speechSynthesis.speak(speech)
    const pp = useRef<any>()
    const [selectedFileName, updateSelectedFileName] = useState('')
    const [isStudent, uIsStudent] = useState<any>(null)
    const [userData, updateUserData] = useState<any>({})
    const navigate = useNavigate()
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })

    const [saveChangesStatus, uSaveChangesStatus] = useState('Save Changes')


    const [name, uName] = useState('')
    const [pic, uPic] = useState(null)
    const [email, uEmail] = useState('')
    const [dob, uDob] = useState('')
    const [gender, uGender] = useState('')
    const [college_Name, uCollege_Name] = useState('')
    const [course, uCourse] = useState('')
    const [year, uYear] = useState('')
    const [semester, uSemester] = useState('')
    const [occupation, uOccupation] = useState('')
    // const [isStudent, uIsStudent] = useState('')


    function checkBlockLocal(status: string) {
        if (status === '0') {
            navigate('/login')
        } // else seems everything ok
        else if (status === '1') {
        } else {
            updateAlertBoxDetails({
                active: true,
                title: 'Alert',
                content: status,
                buttonText: 'OK'
            })
            navigate('/login')
        }
    }

    useEffect(() => {
        fetch(profileApiGetLink, requestData).then(data => data.json())
            .then(data => {
                console.log(data)
                const blockStatus: any = checkBlock(data)
                console.log(blockStatus)
                checkBlockLocal(blockStatus)
                const user = data.user_main

                uPic(user.pic)
                uName(user.name)
                uEmail(user.email)
                // user.dob = '2002-02-07'
                uDob(user.dob || '12/12/2002')
                uGender(user.gender || 'Other')
                uIsStudent(user.student || null)
                uCollege_Name(user.Collage_Name || '')
                uCourse(user.Course || '')
                uOccupation(user.occupation || '')
                uYear(user.year || '')
                uSemester(user.Semester || '')
            })
    }, [])


    return (
        <div id="profile">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={pic ? pic : images.pp} onClick={selectFile} className='pp' />
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
                        <input
                            type="text" id='name' name="name" placeholder='Your Name'
                            className="inp" value={name} onInput={(e: any) => uName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Your Email</span>
                        <input
                            type="email" name="email" id='email' placeholder='e.g. helloUser@emal.com'
                            value={email} onInput={(e: any) => uEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Date of Birth</span>
                        <input
                            type="date" id='dob' placeholder='Date of Birth' name="dob"
                            value={dob} onInput={(e: any) => uDob(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Your Gender</span>
                        <select id="gender" name="gender" defaultValue={gender} onInput={(e: any) => { uGender(e.target.value) }}>
                            <option value="" disabled>Select Your Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female" >Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>


                    <div>
                        <span>Are you a student?</span>
                        <div className="options">
                            <div className={`option ${(isStudent === true) ? ' active' : ''}`} onClick={() => { uIsStudent(true) }}>Yes</div>
                            <div className={`option ${(isStudent === false) ? ' active' : ''}`} onClick={() => { uIsStudent(false) }}>No</div>
                        </div>
                    </div>



                    {/* Condition for isStudent */}
                    {[isStudent].map((s) => {
                        if (s === true)
                            return <div id="studentDetails">
                                <div className="input">
                                    <span>College Name</span>
                                    <input
                                        type="text" id='collegeName' placeholder='Hello World College' name="college" className="inp"
                                        value={college_Name} onInput={(e: any) => uCollege_Name(e.target.value)}
                                    />
                                </div>
                                <div className="input">
                                    <span>Course of Study</span>
                                    <input
                                        type="text" id='course' placeholder='e.g. B.tech in CSE' name="course" className="inp"
                                        value={course} onInput={(e: any) => uCourse(e.target.value)}
                                    />
                                </div>
                                <div className="input">
                                    <span>Year</span>
                                    <select id="year" name="year" defaultValue={year} onInput={(e: any) => { uYear(e.target.value) }}>
                                        <option value="" disabled>Select Your year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                                <div className="input">
                                    <span>Semester</span>
                                    <input
                                        type="number" id='semester' placeholder='e.g. 2nd Semester' name="semester" className="inp"
                                        value={semester} onInput={(e: any) => uSemester(e.target.value)}
                                    />
                                </div>
                            </div>
                        else if (s === false) {
                            return <div id="professionalDetails">
                                <div className="input">
                                    <span>Occupation</span>
                                    <input
                                        type="text" id='work' placeholder='e.g. Web Developer' name="work" className="inp"
                                        value={occupation} onInput={(e: any) => uOccupation(e.target.value)}
                                    />
                                </div>
                            </div>
                        }
                        else
                            return <></>
                    })}

                    <div>
                        <input type="submit" value={saveChangesStatus} onClick={updateDetails} />
                    </div>

                </div>
            </div>
            <Navigation active='profile' />
        </div>
    )

    function updateDetails() {
        const body: any = {
            name: name,
            email: email,
            // pic: pp.current.files[0],
            // dob: dob,
        }

        if (isStudent) body.isStudent = isStudent
        if (college_Name) body.College_name = college_Name
        if (course) body.Course = course
        if (year) body.Year = year
        if (semester) body.semester = semester
        if (occupation) body.occupation = occupation

        const newReqData: any = { ...requestData, body: JSON.stringify(body) }
        console.log(newReqData)
        uSaveChangesStatus('Saving Changes...')
        fetch(profileApiUpdateLink, newReqData).then(data => data.json())
            .then(data => {
                console.log(data)
                if (data.status === 'true') {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Successful',
                        content: data.message,
                        buttonText: 'OK'
                    })
                }
                uSaveChangesStatus('Save Changes')
            })

    }


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
                <div className="input">
                    <span>College Name</span>
                    <input
                        type="text" id='collegeName' placeholder='Hello World College' name="college" className="inp"
                        value={college_Name} onInput={(e: any) => uCollege_Name(e.target.value)}
                    />
                </div>
                <div className="input">
                    <span>Course of Study</span>
                    <input
                        type="text" id='course' placeholder='e.g. B.tech in CSE' name="course" className="inp"
                        value={course} onInput={(e: any) => uCourse(e.target.value)}
                    />
                </div>
                <div className="input">
                    <span>Year</span>
                    <select id="year" name="year" defaultValue={year} onInput={(e: any) => { uYear(e.target.value) }}>
                        <option value="" disabled>Select Your year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
                <div className="input">
                    <span>Semester</span>
                    <input
                        type="number" id='semester' placeholder='e.g. 2nd Semester' name="semester" className="inp"
                        value={semester} onInput={(e: any) => uSemester(e.target.value)}
                    />
                </div>
            </div>
        )
    }
    function ProfessionalSection() {
        return (
            <div id="professionalDetails">
                <div className="input">
                    <span>Occupation</span>
                    <input
                        type="text" id='work' placeholder='e.g. Web Developer' name="work" className="inp"
                        value={occupation} onInput={(e: any) => uOccupation(e.target.value)}
                    />
                </div>
            </div>
        )
    }

}
export default Profile