import { Link, useNavigate } from "react-router-dom"
import images from '../assets/image'
import icons from '../assets/icon'

import '../scss/pages/start.scss'
import { useEffect } from "react"
import token from "../tokens"
const Home = () => {
    // let message = "Welcome to Sasta Paint"
    // let speech = new SpeechSynthesisUtterance(message)
    // window.speechSynthesis.speak(speech)
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Welcome to Sasta Paint'
        if (token.get('registrationToken'))
            navigate('/home', { replace: true })
    }, [])
    return (
        <div id="start">
            <div className="top">
                <h1>Fully Secured Service</h1>
            </div>
            <div className="middle">
                <img src={images.homeStart} alt="" />
            </div>
            <div className="bottom">
                Welcome to Sasta Paint<br /> We give you print online and on time
            </div>
            <div className="controls">
                <div className="left">
                    <Link to='./login'>
                        <button><img src={icons.chevron_right_solid} /> Hello</button>
                    </Link>
                </div>
                <div className="center">
                    <Link to='/start'><p>Skip Now</p></Link>
                </div>
                <div className="right">
                    <Link to='./login'>
                        <button><img src={icons.chevron_right_solid} /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Home