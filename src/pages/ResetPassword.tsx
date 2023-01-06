import TitleHeader from "../components/TitleHeader"
import AlertBox from "../components/AlertBox"
import { useState } from "react"
import '../scss/pages/resetPassword.scss'
import { Link, useNavigate } from "react-router-dom"
import images from "../assets/image"
import joinLinks from "../linker"

const reset_password_api_link = joinLinks('login/forget/reset')



export default function ResetPassword() {
    const [alertBoxDetails, updateAlertBoxDetails] = useState<any>({ active: false, title: '', content: '', buttonText: ''})
    const [reset_password_status, u_reset_password_status] = useState('Reset Password')
    const navigate = useNavigate()
    const [otp, u_top] = useState(null)
    const [pass, u_pass] = useState(null)
    const [pass_confirm, u_pass_confirm] = useState(null)


    return (
        <>
            <TitleHeader title="Reset Password" />
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
                cb={alertBoxDetails.cb}
            />
            <div id="resetPassword">
                <div className="top">
                    <img src={images.undraw_authentication_re_svpt} />
                    <p>Enter the following details to reset your password.</p>
                    <div>
                        <span className="label">Enter OTP</span>
                        <input type="number" id='number' placeholder='xxx-xxx' className="inp otp" onChange={(e: any) => { u_top(e.target.value) }} />
                    </div>
                    <div>
                        <span className="label">Password</span>
                        <input type="password" id='password' placeholder='********' onChange={(e: any) => { u_pass(e.target.value) }} />
                    </div>
                    <div>
                        <span className="label">Confirm Password</span>
                        <input type="password" id='password' placeholder='********' onChange={(e: any) => { u_pass_confirm(e.target.value) }} />
                    </div>
                    <input type="submit" value={reset_password_status} className='btnFullWidth' onClick={reset_password} />
                </div>
                <div className="end">
                    <p className="endText">&copy; Sasta Print Powered By Jignesh Prints & Packaging</p>
                </div>
            </div>

        </>
    )


    function reset_password() {
        u_reset_password_status('Resetting Password')
        if (!pass || !otp || !pass_confirm) {
            updateAlertBoxDetails({
                active: true,
                title: 'Alert',
                content: 'Enter details correctly correctly.',
                buttonText: 'OK',
            })
            return
        }

        if (pass != pass_confirm) {
            updateAlertBoxDetails({
                active: true,
                title: 'Alert',
                content: 'Password did not match with confirm password.',
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
                otp,
                password: pass,
                password_confirmation: pass_confirm
            })
        }
        console.log(reqData)
        fetch(reset_password_api_link, reqData)
            .then(data => data.json())
            .then(data => {
                u_reset_password_status('Reset Password')
                console.log(data)
                if (data.status === 'true') {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Successful',
                        content: 'Password reset successfully!',
                        buttonText: 'OK',
                        cb: () => {
                            navigate('/login', { replace: true })
                        }
                    })
                }
            })
            .catch(err => {
                u_reset_password_status('Reset Password')
                updateAlertBoxDetails({ active: true, title: 'Error', content: 'Network error!', buttonText: 'OK', })
            })
    }
}
