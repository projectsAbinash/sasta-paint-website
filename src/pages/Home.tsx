import { useDeferredValue, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navigation from "../components/NavigationBar"
import '../scss/pages/home.scss'
import joinLinks from "../linker"
import token from "../tokens"
import icons from "../assets/icon"
import images from "../assets/image"
import Banner from "../components/Banner"
import Loading from "./Loading"
import AlertBox from "../components/AlertBox"


const profileApiLink = joinLinks('profile')

function makeRequestData(): object {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token.get('registrationToken')
        },
    }
}


const requestData: object = makeRequestData()
const Home = () => {
    const [profileData, updateProfileData] = useState<any>(null)
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })
    const navigate = useNavigate()


    useEffect(() => {
        fetch(profileApiLink, requestData).then(data => data.json())
            .then(data => {
                if (data) {

                    updateProfileData({
                        name: data.user_main.name.split(' ')[0]
                    })
                }

                console.log(data)
            }).catch(err => {

                console.log(err)
                updateAlertBoxDetails({
                    active: true,
                    title: 'Error',
                    content: err,
                    buttonText: 'OK'
                })
                navigate('/login')
            })
    }, [])


    // if (!profileData)
    //     return <Loading />

    return (
        <div id="home">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />
            <div className="container">
                <div className="greet">
                    <div className="left">

                        <img src={images.pp} />
                        <h2 className="helloName">Hello, <br />{profileData?.name || ''}👋🏻</h2>
                    </div>
                    <div className="right">
                        <div className="countDiv">
                            <span className="count">15</span>
                            {/* <span className="text">Pages Printed</span> */}
                        </div>
                    </div>
                </div>

                <Banner />

                <div className="cards">
                    <Link to='/newOrder'>
                        <div className="card glow">
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
