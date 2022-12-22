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

    return (
        <div id="profile">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={images.pp} onClick={selectFile} className='pp' />
                        <input type="file" ref={pp} onChange={onChangeFileSelect}/>
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
                        <input type="text" id='name' placeholder='Your Name' className="inp" />
                    </div>
                    <div>
                        <span>Mobile Number</span>
                        <input type="tel" id='number' placeholder='+91 123 456 78790' />
                    </div>
                    <div>
                        <span>Your Email</span>
                        <input type="email" id='email' placeholder='+91 123 456 78790' />
                    </div>
                    <div>
                        <span>Date of Birth</span>
                        <input type="date" id='dob' placeholder='' />
                    </div>


                    <div>
                        <span>Are you a student?</span>
                        <div className="options">
                            <div className="option">Yes</div>
                            <div className="option">No</div>
                        </div>
                    </div>

                    <div>
                        <input type="submit" value='Save Changes'/>
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
        let file:string = pp.current.value
        let fileName = file.split('\\')
        updateSelectedFileName(fileName[fileName.length - 1])
        return 0
    }
    function selectFile() {
        pp.current.click()
    }
    function StudentDetails() {
        return (
            <div id="studentDetails">

            </div>
        )
    }

}
export default Profile