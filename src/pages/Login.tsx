import { Link } from 'react-router-dom'

import images from '../assets/images/image'
import '../scss/pages/login.scss'

const Login = () => {
    return (
        <div id="login">
            <div className="top">
                <img src={images.login} alt="" />
                <h1>Login</h1>
                <p className='smallText'>Welcome to the best online printing company</p>
            </div>

            <div className="middle">
                <div>
                    <span>Mobile Number</span>
                    <input type="tel" id='number' placeholder='+91 123 456 78790'/>
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" id='password' placeholder='********'/>
                </div>
                <div className="forgetPassword">
                    <Link to='/forgetPassword'>Forget Password?</Link>
                </div>
                <input type="submit" value="Login"/>
            </div>
            <p className='text-center signup'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
 
            <div className="end">
                <p>By continuing you are accepting our <Link to="./t&c">terms and conditions</Link></p>
            </div>
        </div>
    )
}

export default Login