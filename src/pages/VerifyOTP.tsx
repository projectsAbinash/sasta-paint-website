import { useReducer, useRef } from 'react'
import { Link } from 'react-router-dom'
import images from '../assets/image'
import '../scss/pages/verifyOTP.scss'

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

const VerifyOTP = () => {

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
        console.log('Entered OTP : ' + currentOTP)
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
                <button onClick={() => verifyEnteredOTP()}>Verify OTP</button>
            </div>
            <div className="bottom">
                <p>Didn't receive OTP? <Link to='/resendOTP'>Resend</Link></p>
            </div>
        </div>
    )
}

export default VerifyOTP