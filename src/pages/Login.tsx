import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import images from '../assets/image'
import AlertBox from '../components/AlertBox'
import joinLinks from '../linker'
import '../scss/pages/login.scss'
import token from '../tokens'

const loginAPILink = joinLinks('login')

function makeRequestData(id: string, pass: string) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token.get('registrationToken')
        },
        body: JSON.stringify({
            phone: id,
            password: pass
        })
    }
}


const Login = () => {
    const navigate = useNavigate()
    useEffect(() => { document.title = 'Login to Sasta Paint' }, [])

    const userIDElem = useRef() as React.MutableRefObject<HTMLInputElement>
    const passElem = useRef() as React.MutableRefObject<HTMLInputElement>
    const [loginStatus, updateLoginStatus] = useState('Log In')
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })



    function APILogIn() {
        const id = userIDElem.current.value
        const pass = passElem.current.value

        if (id && pass) {
            // Fetch data
            const reqData = makeRequestData(id, pass)
            updateLoginStatus('Logging in...')
            fetch(loginAPILink, reqData).then(data => data.json())
                .then(data => {
                    console.log(data)
                    // Check for errors
                    if (data.status == 'false') {
                        updateAlertBoxDetails({
                            active: true,
                            title: 'Alert',
                            content: 'Username or Password is incorrect!',
                            buttonText: 'OK'
                        })
                        updateLoginStatus('Log in Again')
                        return
                    }

                    token.set('registrationToken', data.access_token)

                    if (data.verification == 'false') {
                        navigate('/verifyOTP')
                        return
                    }
                    else if (data.verification == 'true') {
                        navigate('/home')
                        return
                    }
                    navigate('/home')
                }).catch(err => {
                    console.log(err)
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Error',
                        content: 'Error Logging in. Check your internet connection.',
                        buttonText: 'OK'
                    })
                    updateLoginStatus('Log In Again')
                })

        } else {
            updateAlertBoxDetails({
                active: true,
                title: 'Wrong Information',
                content: 'Enter your Information correctly',
                buttonText: 'OK'
            })
            return
        }

        // console.log(id, pass)
    }





    return (
        <div id="login">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />
            <div className="top">
                <img src={images.login} alt="" />
                <h1>Login</h1>
                <p className='smallText'>Welcome to the best online printing company</p>
            </div>

            <div className="middle">
                <div>
                    <span>Mobile Number</span>
                    <input type="tel" id='number' placeholder='+91 123 456 78790' ref={userIDElem} />
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" id='password' placeholder='********' ref={passElem} />
                </div>
                <div className="forgetPassword">
                    <Link to='/forgetPassword'>Forget Password?</Link>
                </div>
                <input type="submit" value={loginStatus} onClick={APILogIn} />
                <p className='text-center signup'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
            </div>

            <div className="end">
                <p>By continuing you are accepting our <Link to="/t&c">terms and conditions</Link></p>
            </div>
        </div>
    )
}

export default Login