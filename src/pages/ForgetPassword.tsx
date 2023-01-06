import { useState } from "react"
import images from "../assets/image"
import AlertBox from "../components/AlertBox"
import joinLinks from "../linker"
import '../scss/pages/forgetPassword.scss'
import TitleHeader from "../components/TitleHeader"
import { useNavigate } from "react-router-dom"



const send_otp_api_link = joinLinks('login/forget')


export default function ForgetPassword() {
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })
    const [send_otp_status, u_send_otp_status] = useState('Send OTP')
    const [mobile_number, u_mobile_number] = useState(null)
    const navigate = useNavigate()
    return (
        <>
            <TitleHeader title="Forget Password" />
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />

            <div id="forgetPassword">

                <div className="top">
                    <img src={images.undraw_secure_login_pdn4} />
                    {/* <h1>Reset Password</h1> */}
                    <p>Enter the phone number associated with your account and we'll send an OTP to reset your password.</p>
                    <span className="label">Mobile Number</span>
                    <input type="tel" id='number' placeholder='+91 123 456 7879' onChange={updateMobileNumber} autoComplete="off" />
                    <input type="submit" value={send_otp_status} className='btnFullWidth' onClick={send_otp} />
                </div>

                <div className="middle">
                </div>
                <div>
                </div>
                <div className="end">
                    <p className="endText">&copy; Sasta Print Powered By Jignesh Prints & Packaging</p>
                </div>
            </div>
        </>
    )
    function send_otp() {
        u_send_otp_status('Sending OTP...')
        if (!mobile_number) {
            updateAlertBoxDetails({
                active: true,
                title: 'Alert',
                content: 'Enter your Mobile Number correctly.',
                buttonText: 'OK',
            })
            return
        }
        const reqData: any = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                phone: mobile_number
            })
        }
        console.log(reqData)

        fetch(send_otp_api_link, reqData)
            .then(data => data.json())
            .then(data => {
                u_send_otp_status('Send OTP')
                console.log(data)
                if (data.status === 'true') {
                    navigate('/resetPassword', { replace: true })
                } else {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Error',
                        content: data.message,
                        buttonText: 'OK',
                    })
                }
            })
            .catch(err => {
                console.log(err)
                u_send_otp_status('Send OTP')
                updateAlertBoxDetails({
                    active: true,
                    title: 'Alert',
                    content: 'Check your internet connection.',
                    buttonText: 'OK',
                })
            })
    }
    function updateMobileNumber(e: any) {
        u_mobile_number(e.target.value)
    }
}



