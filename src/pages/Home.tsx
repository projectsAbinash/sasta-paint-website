import Navigation from "../components/NavigationBar"
import TitleHeader from "../components/TitleHeader"
import '../scss/pages/home.scss'
import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div id="home">
            <div className="container">
                <h2>Hello Abinash</h2>
                <h1>lorem100</h1>
                <Link to='./t&c'>Terms and Conditions</Link>
            </div>
            <Navigation active='home' />
        </div>
    )
}

export default Home
