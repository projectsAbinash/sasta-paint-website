import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import images from '../assets/image'
import joinLinks from '../linker'
import '../scss/pages/verifyOTP.scss'
import token from '../tokens'

const verifyotpAPILink = joinLinks('login/verifyotp')


function min0Max5(n: number): number {
    return n < 0 ?
        0 :
        n > 5 ?
            5 :
            n
}
function getCurrentOTP(otp: any[]): string {
    let otpStr = ""
    for (const elem of otp)
        otpStr += elem.current.value
    return otpStr
}
function clearOTPFields(otps : any[]){
    for(const otp of otps)
        otp.current.value = ''
    otps[0].current.focus()
}

const VerifyOTP = () => {
    const navigate = useNavigate()
    const [otpVerifyStatus, updateOtpVerifyStatus] = useState('Verify OTP')
    let otp: any[] = []
    for (let i = 0; i < 6; i++)
        otp[i] = useRef()
    function focusElement(n: number) {
        const index = min0Max5(n)
        otp[index].current.focus()
        setTimeout(function () { otp[index].current.selectionStart = otp[index].selectionEnd = 10000; }, 0);
    }


    function verifyEnteredOTP() {
        let currentOTP: string = getCurrentOTP(otp)
        if (currentOTP.length != 6) {
            console.log("Enter OTP correctly")
            return
        }

        // Verify OTP here
        const reqData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token.get('registrationToken')
            },
            body: JSON.stringify({
                'otp': currentOTP
            })
        }

        // Verify OTP
        updateOtpVerifyStatus('Verifying OTP...')

        fetch(verifyotpAPILink, reqData).then(data => data.json())
            .then(data => {
                console.log(data)
                if (data.status == 'true') {
                    navigate('/home')
                } else {
                    alert(data.message)
                    updateOtpVerifyStatus('Verify OTP')
                    // Clear OTP fields
                    clearOTPFields(otp);
                }
            })



        // console.log('Entered OTP : ' + currentOTP)
    }

    function focusNext(n: number) {
        if (n == 5) {
            if (otp[5].current.value.length == 0) {
                focusElement(n - 1)
                return
            }
            otp[n].current.blur()
            verifyEnteredOTP()
            return
        }
        if (otp[n].current.value.length == 0) {
            focusElement(n - 1)
        } else {
            focusElement(n + 1)
        }
    }

    return (
        <div id='verifyOTP'>
            <div className="top">
                <img src={images.otp} />
            </div>
            <div className="middle">
                <h1>Verify OTP</h1>
                <div className='inputs'>
                    <div className="input">
                        <input className="otp" type="text" ref={otp[0]} maxLength={1} onChange={() => focusNext(0)} autoFocus />
                    </div>
                    <div className="input">
                        <input className="otp" type="text" ref={otp[1]} maxLength={1} onChange={() => focusNext(1)} />
                    </div>
                    <div className="input">
                        <input className="otp" type="text" ref={otp[2]} maxLength={1} onChange={() => focusNext(2)} />
                    </div>
                    <div className="input">
                        <input className="otp" type="text" ref={otp[3]} maxLength={1} onChange={() => focusNext(3)} />
                    </div>
                    <div className="input">
                        <input className="otp" type="text" ref={otp[4]} maxLength={1} onChange={() => focusNext(4)} />
                    </div>
                    <div className="input">
                        <input className="otp" type="text" ref={otp[5]} maxLength={1} onChange={() => focusNext(5)} />
                    </div>
                </div>
                <button onClick={() => verifyEnteredOTP()}>{otpVerifyStatus}</button>
            </div>
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="blank"></div>
            <div className="bottom">
                <p>Didn't receive OTP? <Link to='/resendOTP'>Resend</Link></p>
            </div>
        </div>
    )
}

export default VerifyOTP