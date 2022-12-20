import images from "../assets/image"
import { Link, useNavigate } from "react-router-dom"
import '../scss/pages/signup.scss'
import { useRef, useState } from "react"
import joinLinks from "../linker"

import token from "../tokens"

const registerAPILink = joinLinks('register')

// function makeErrorData(errors: string[]): string {
//     let errorData = ""
//     for (let err of errors)
//         errorData += err
//     return errorData
// }


/**
 * 
 * @param name is name of the user
 * @param num is mobile number of the user
 * @param pass is password of the user
 * @returns true if registration is successful else false
 */
function register(name: string, num: string, pass: string): boolean {
    // const fetchedData = await fetch(registerAPILink, header)
    // return fetchedData.json()
    return true
}

const Signup = () => {
    const fullName = useRef() as React.MutableRefObject<HTMLInputElement>
    const phoneNumber = useRef() as React.MutableRefObject<HTMLInputElement>
    const password = useRef() as React.MutableRefObject<HTMLInputElement>
    const confirmPassword = useRef() as React.MutableRefObject<HTMLInputElement>
    const emailInput = useRef() as React.MutableRefObject<HTMLInputElement>
    const [signingUpStatus, updateSigningUpStatus] = useState('Sign Up')

    const navigate = useNavigate()

    function networkSignUp() {
        const name = fullName.current.value
        const num = phoneNumber.current.value
        const email = emailInput.current.value
        const pass = password.current.value
        const confPass = confirmPassword.current.value

        if (name && num && pass && confPass && email) {
            // Check if password matches
            if (pass != confPass) {
                alert("Make sure you use the same password in Confirm Password.")
                return
            }

            updateSigningUpStatus('Signing Up...')
            // Now register online
            const body = {
                name,
                email,
                phone: num,
                password: pass,
                password_confirmation: confPass
            }
            const reqData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            }


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
                        alert(data.message)
                        updateSigningUpStatus('Sign Up')
                    }

                    if (data.status == 'true') {
                        // Store Verification token
                        token.set('registrationToken', data.access_token)
                        if (data.verification === 'false') {
                            navigate('/verifyOTP')
                        }
                    }

                })
                .catch((error) => {
                    console.error('Error in JavaScript Fetch');
                    alert("Error Signing Up, Check your network")
                    console.log(error)
                    updateSigningUpStatus('Sign Up')
                });

        } else {
            alert("Enter Your Information correctly!")
        }
    }


    console.log('rendered')
    return (
        <div id="signup">
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
                    <span>Email</span>
                    <input type="email" id='email' placeholder='example@abc.com' ref={emailInput} />
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" id='password' placeholder='********' ref={password} />
                </div>
                <div>
                    <span>Confirm Password</span>
                    <input type="password" id='confirmPassword' placeholder='********' ref={confirmPassword} />
                </div>
                <input type="submit" value={signingUpStatus} onClick={networkSignUp} />
                <p className='text-center signup'>Already have an account? <Link to='/login'>Log In</Link></p>
            </div>

            <div className="end">
                <p>By continuing you are accepting our <Link to="./t&c">terms and conditions</Link></p>
            </div>
        </div>
    )
}

export default Signup