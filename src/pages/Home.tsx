import { Link } from "react-router-dom"
import images from '../assets/images/image'
import icons from '../assets/icons/icons'

import '../scss/pages/home.scss'
import { useEffect } from "react"
const Home = () => {
    useEffect(()=> {document.title = 'Welcome to Sasta Paint'}, [])
    return (
        <div id="home">
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
                    <p>Skip Now</p>
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