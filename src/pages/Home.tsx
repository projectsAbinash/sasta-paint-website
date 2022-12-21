import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navigation from "../components/NavigationBar"
import '../scss/pages/home.scss'
import joinLinks from "../linker"
import token from "../tokens"
import icons from "../assets/icon"
import images from "../assets/image"


const profileApiLink = joinLinks('profile')
function makeRequestData(): object {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token.get('registrationToken')
        },
        // body: JSON.stringify({
        //     phone: id,
        //     password: pass
        // })
    }
}


const requestData: object = makeRequestData()
const Home = () => {
    // const [fuckingName, updateFuckingName] = useState()
    // const [fetchData, updateFetchedData] = useState(0)

    // useEffect(() => { fetchDataAPI() })

    // (function fetchDataAPI() {
    //     fetch(profileApiLink, requestData).then(data => data.json())
    //         .then(data => {
    //             updateFetchedData(data)
    //         })
    // })()


    return (
        <div id="home">
            <div className="container">
                <div className="greet">
                    <img src={images.pp} />
                    <h2 className="helloName">Hello Abinash</h2>
                </div>


                <h1 className="bigText">Enjoy! <br />Super Fast Service</h1>

                <div className="banner">This is banner area</div>

                {/* <button onClick={() => 0}>Fetch</button>
                <Link to='/t&c'>Terms and Conditions</Link>

                 */}



                <div className="cards">
                    <Link to='/t&c'>
                        <div className="card">
                            <div className="left">
                                <h2>Place new Order</h2>
                                <p>Click here to place a new order.</p>
                            </div>
                            <div className="right">
                                <img src={images.undraw_mobile_user_re_xta4} alt="" />
                            </div>
                        </div>
                    </Link>
                    
                    <Link to='/login'>
                        <div className="card">
                            <div className="left">
                                <h2>Print Your Near</h2>
                                <p>Click here to check print near you.</p>
                            </div>
                            <div className="right">
                                <img src={images.undraw_printing_invoices} alt="" />
                            </div>
                        </div>
                    </Link>
                    
                </div>
            </div>
            <Navigation active='home' />
        </div>
    )
}

export default Home
