import images from "../assets/image"
import { Link, useNavigate } from "react-router-dom"
import '../scss/pages/signup.scss'
import { useRef, useState } from "react"
import joinLinks from "../linker"
import AlertBox from "../components/AlertBox"
import token from "../tokens"

const registerAPILink = joinLinks('register')


const Signup = () => {
    const fullName = useRef() as React.MutableRefObject<HTMLInputElement>
    const phoneNumber = useRef() as React.MutableRefObject<HTMLInputElement>
    const password = useRef() as React.MutableRefObject<HTMLInputElement>
    // const confirmPassword = useRef() as React.MutableRefObject<HTMLInputElement>
    const emailInput = useRef() as React.MutableRefObject<HTMLInputElement>
    const [signingUpStatus, updateSigningUpStatus] = useState('Sign Up')
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })

    const navigate = useNavigate()

    function networkSignUp() {
        const name = fullName.current.value
        const num = phoneNumber.current.value
        const email = emailInput.current.value
        const pass = password.current.value
        // const confPass = confirmPassword.current.value



        if (name && num && pass /*&& confPass&& email*/ ) {
            // Check if password matches
            // if (pass != confPass) {
            //     updateAlertBoxDetails({
            //         active: true,
            //         title: 'Warning',
            //         content: 'Make sure you use the same password in Confirm Password.',
            //         buttonText: 'OK'
            //     })
            //     return
            // }

            updateSigningUpStatus('Signing Up...')
            // Now register online
            const body:any = {
                name,
                phone: num,
                password: pass,
                // password_confirmation: confPass
            }
            if(email) body.email = email
            const reqData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            }

            console.log(reqData)

            // fetch(registerAPILink, reqData).then(data => data.json())
            //     .then(data => {
            //         console.log(data)
            //     })

            // const data = { username: 'example' };

            fetch(registerAPILink, reqData)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.errors) {
                        updateAlertBoxDetails({
                            active: true,
                            title: 'Error',
                            content: data.message,
                            buttonText: 'OK'
                        })
                        updateSigningUpStatus('Sign Up')
                    }

                    if (data.status == 'true') {
                        // Store Verification token
                        token.set('registrationToken', data.access_token)
                        localStorage.lastOtpSentTime = (new Date().getTime())
                        if (data.verification === 'false') {
                            navigate('/verifyOTP')
                        }
                    }

                })
                .catch((error) => {
                    console.error('Error in JavaScript Fetch');
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Error',
                        content: 'Error Signing Up, Check your network',
                        buttonText: 'OK'
                    })
                    console.log(error)
                    updateSigningUpStatus('Sign Up')
                });

        } else {
            updateAlertBoxDetails({
                active: true,
                title: 'Alert',
                content: 'Enter your Information correctly',
                buttonText: 'OK'
            })
        }
    }

    return (
        <div id="signup">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />
            <div className="top">
                <img src={images.printing} alt="" />
                <h1>Sign Up</h1>
                <p className='smallText'>Welcome to the best online printing company</p>
            </div>

            <div className="middle">
                <div>
                    <span>Full Name</span>
                    <input type="text" id='name' placeholder='Full Name' className="inp" ref={fullName} />
                </div>
                <div>
                    <span>Mobile Number</span>
                    <input type="tel" id='number' placeholder='+91 123 456 78790' ref={phoneNumber} />
                </div>
                <div>
                    <span>Email (Optional)</span>
                    <input type="email" id='email' placeholder='example@abc.com' ref={emailInput} />
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" id='password' placeholder='********' ref={password} />
                </div>
                {/* <div>
                    <span>Confirm Password</span>
                    <input type="password" id='confirmPassword' placeholder='********' ref={confirmPassword} />
                </div> */}
                <input type="submit" value={signingUpStatus} onClick={networkSignUp} />
                <p className='text-center signup'>Already have an account? <Link to='/login'>Log In</Link></p>
            </div>

            <div className="end">
                <p>By continuing you are accepting our <Link to="/t&c">terms and conditions</Link></p>
            </div>
        </div>
    )
}

export default Signup