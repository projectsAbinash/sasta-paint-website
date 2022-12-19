import images from "../assets/image"
import { Link } from "react-router-dom"
import '../scss/pages/signup.scss'

const Signup = ()=>{
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
                    <input type="text" id='name' placeholder='Full Name' className="inp" />
                </div>
                <div>
                    <span>Mobile Number</span>
                    <input type="tel" id='number' placeholder='+91 123 456 78790' />
                </div>
                <div>
                    <span>Password</span>
                    <input type="password" id='password' placeholder='********' />
                </div>
                <input type="submit" value="Sign Up" />
                <p className='text-center signup'>Already have an account? <Link to='/login'>Log In</Link></p>
            </div>

            <div className="end">
                <p>By continuing you are accepting our <Link to="./t&c">terms and conditions</Link></p>
            </div>
        </div>
    )
}

export default Signup