import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import icons from "../assets/icon"
import images from "../assets/image"
import checkBlock from "../checkBlock"
import AlertBox from "../components/AlertBox"
import Navigation from "../components/NavigationBar"
import joinLinks from "../linker"
import '../scss/pages/profile.scss'
import token from "../tokens"
import Loading from "./Loading"
const profileApiGetLink = joinLinks('profile')
const profileApiUpdateLink = joinLinks('profile/update')





function Profile() {
    // let message = "This is Your Profile Page"
    // let speech = new SpeechSynthesisUtterance(message)
    // window.speechSynthesis.speak(speech)
    const requestData = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token.get('registrationToken')
        },
    }
    const pp = useRef<any>()
    const [selectedFileName, updateSelectedFileName] = useState('')
    // const [userData, updateUserData] = useState<any>(null)
    const navigate = useNavigate()
    const [alertBoxDetails, updateAlertBoxDetails] = useState<any>({ active: false, })

    const [saveChangesStatus, uSaveChangesStatus] = useState('Save Changes')
    const [isFetched, uIsFetched] = useState(false)

    const [name, uName] = useState('')
    const [pic, uPic] = useState<any>(null)
    const [email, uEmail] = useState('')
    const [dob, uDob] = useState('')
    const [gender, uGender] = useState('')
    const [college_Name, uCollege_Name] = useState('')
    const [course, uCourse] = useState('')
    const [year, uYear] = useState('')
    const [semester, uSemester] = useState('')
    const [occupation, uOccupation] = useState('')
    const [pagesCount, uPagesCount] = useState('')
    const [isStudent, uIsStudent] = useState<any>(null)
    const navigateHome = () => { navigate('/home') }


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
                buttonText: 'OK',
            })
            navigate('/login')
        }
    }

    useEffect(() => {
        fetch(profileApiGetLink, requestData).then(data => {
            // console.log(data.)
            return data.json()
        })
            .then(data => {
                console.log(data)
                uIsFetched(true)
                const blockStatus: any = checkBlock(data)
                // console.log(blockStatus)
                checkBlockLocal(blockStatus)
                const user = data.user_main
                const user_extra = data.user_extra

                uName(user.name)
                uEmail(user.email)
                // uPic(user_extra.pic || icons.Profile)

                uDob(user_extra.dob || '')
                uGender(user_extra.gender || null)
                uIsStudent(user_extra.student)
                uCollege_Name(user_extra.Collage_Name || '')
                uCourse(user_extra.Course || '')
                uOccupation(user_extra.occupation || '')
                uYear(user_extra.Year || '')
                uSemester(user_extra.Semester || '')
                uPic(user_extra.pic || null)
                // console.log(user_extra.gender).total_pages
                uPagesCount(user_extra.total_pages || 0)
            })
    }, [])

    if (!isFetched)
        return <Loading />
    return (
        <div id="profile">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
                cb={alertBoxDetails.cb}
                cbNo={alertBoxDetails.cbNo}
                btnNoText={alertBoxDetails.btnNoText}
            />
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={pic ? pic : images.pp} onClick={selectFile} className='pp' />
                        <input type="file" ref={pp} onChange={onChangeFileSelect} key={6626} />
                        <div className="editImageContainer" onClick={selectFile} >
                            <img src={icons.pen_solid} className='editIcon' />
                        </div>
                    </div>
                    <div className="right">
                        <span className="count">{pagesCount}</span>
                        <p>Pages Printed</p>
                    </div>
                </div>
                {/* <p className="selectedFileName">{selectedFileName}</p> */}
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
                            type="text" id='dob' placeholder='Date of Birth' name="dob" className="inp"
                            value={dob} onInput={(e: any) => uDob(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Your Gender</span>
                        <select id="gender" name="gender" onInput={(e: any) => { uGender(e.target.value) }} value={gender}>
                            <option value="" disabled>Select Your Gender</option>
                            <option value="Male" >Male</option>
                            <option value="Female" >Female</option>
                            <option value="Other" >Other</option>
                            {/* <option value="Male" selected={gender === 'Male' ? true : false}>Male</option>
                            <option value="Female" selected={gender === 'Female' ? true : false}>Female</option>
                            <option value="Other" selected={gender === 'Other' ? true : false}>Other</option> */}
                        </select>
                    </div>
                    <div>
                        <span>Are you a student?</span>
                        <div className="options">
                            <div className={`option ${(isStudent == 1) ? ' active' : ''}`} onClick={() => { uIsStudent(1) }}>Yes</div>
                            <div className={`option ${(isStudent == 0) ? ' active' : ''}`} onClick={() => { uIsStudent(0) }}>No</div>
                        </div>
                    </div>



                    {/* Condition for isStudent */}
                    {[isStudent].map((s) => {
                        if (s === 1)
                            return <div id="studentDetails" key={1233}>
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
                                        <option value="1">1 Year</option>
                                        <option value="2">2 Year</option>
                                        <option value="3">3 Year</option>
                                        <option value="4">4 Year</option>
                                    </select>
                                </div>
                                <div className="input">
                                    <span>Semester</span>
                                    <input
                                        type="text" id='semester' placeholder='e.g. 2nd Semester' name="semester" className="inp"
                                        value={semester} onInput={(e: any) => uSemester(e.target.value)}
                                    />
                                </div>
                            </div>
                        else if (s === 0) {
                            return <div id="professionalDetails" key={9999}>
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

                    <div>
                        <input type="submit" value='Log Out' onClick={logOut} />
                    </div>

                </div>
            </div>
            <Navigation active='profile' />
        </div>
    )
    function logOut() {
        updateAlertBoxDetails({
            active: true,
            title: 'Are you sure?',
            content: 'Are you sure you want to log out?',
            buttonText: 'Yes',
            btnNoText: 'No',
            cb: () => {
                localStorage.clear()
                navigate('/')
            }
        })
    }

    function updateDetails() {
        const body: any = {
            name: name,
            email: email
        }

        if (isStudent === 1 || isStudent === 0) {
            body.student = isStudent
        }

        if (pp.current.files[0]) {
            body.pic = pp.current.files[0] || null
            uPic(URL.createObjectURL(pp.current.files[0]))
        }
        // URL.createObjectURL()
        if (college_Name) body.Collage_Name = college_Name
        if (course) body.Course = course
        if (year) body.Year = year
        if (semester) body.Semester = semester
        if (occupation) body.occupation = occupation
        if (gender) body.gender = gender
        if (dob) body.dob = dob


        const formData = new FormData()
        // formData.append('name', name)
        // formData.append('email', email)
        // formData.append('course', )

        Object.entries(body).forEach(entry => {
            const [key, value]: any = entry;
            if (value === 0 || value)
                formData.append(key, value)
        })




        const newReqData: any = { ...requestData, body: formData }
        // console.log(newReqData)
        uSaveChangesStatus('Saving Changes...')
        fetch(profileApiUpdateLink, newReqData).then(data => data.json())
            .then(data => {
                console.log(data)
                if (data.status === 'true') {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Successful',
                        content: data.message,
                        buttonText: 'OK',
                        cb: navigateHome
                    })
                } else {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Error',
                        content: data.message,
                        buttonText: 'OK',
                    })
                }
                uSaveChangesStatus('Save Changes')
            }).catch(err => {
                updateAlertBoxDetails({
                    active: true,
                    title: 'Error',
                    content: err,
                    buttonText: 'OK',
                })
            })
    }


    // function getFile() {
    //     return 0
    // }
    function onChangeFileSelect() {
        let file: string = pp.current.value
        let fileName = file.split('\\')
        updateSelectedFileName(fileName[fileName.length - 1])
        return 0
    }
    function selectFile() {
        pp.current.click()
    }
    // function StudentSection() {
    //     return (
    //         <div id="studentDetails">
    //             <div className="input">
    //                 <span>College Name</span>
    //                 <input
    //                     type="text" id='collegeName' placeholder='Hello World College' name="college" className="inp"
    //                     value={college_Name} onInput={(e: any) => uCollege_Name(e.target.value)}
    //                 />
    //             </div>
    //             <div className="input">
    //                 <span>Course of Study</span>
    //                 <input
    //                     type="text" id='course' placeholder='e.g. B.tech in CSE' name="course" className="inp"
    //                     value={course} onInput={(e: any) => uCourse(e.target.value)}
    //                 />
    //             </div>
    //             <div className="input">
    //                 <span>Year</span>
    //                 <select id="year" name="year" defaultValue={year} onInput={(e: any) => { uYear(e.target.value) }}>
    //                     <option value="" disabled>Select Your year</option>
    //                     <option value="1">1</option>
    //                     <option value="2">2</option>
    //                     <option value="3">3</option>
    //                     <option value="5">5</option>
    //                     <option value="6">6</option>
    //                     <option value="7">7</option>
    //                     <option value="8">8</option>
    //                 </select>
    //             </div>
    //             <div className="input">
    //                 <span>Semester</span>
    //                 <input
    //                     type="number" id='semester' placeholder='e.g. 2nd Semester' name="semester" className="inp"
    //                     value={semester} onInput={(e: any) => uSemester(e.target.value)}
    //                 />
    //             </div>
    //         </div>
    //     )
    // }
    // function ProfessionalSection() {
    //     return (
    //         <div id="professionalDetails">
    //             <div className="input">
    //                 <span>Occupation</span>
    //                 <input
    //                     type="text" id='work' placeholder='e.g. Web Developer' name="work" className="inp"
    //                     value={occupation} onInput={(e: any) => uOccupation(e.target.value)}
    //                 />
    //             </div>
    //         </div>
    //     )
    // }
}
export default Profile