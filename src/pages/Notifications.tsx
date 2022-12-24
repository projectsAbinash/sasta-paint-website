import { useState } from "react"
import images from "../assets/image"
import Navigation from "../components/NavigationBar"
import '../scss/pages/notification.scss'


function Profile() {

    const [notiCount, uNotiCount] = useState(0)


    if (notiCount === 0) {
        return (
            <div id="notifications">
                <div className="container">
                    <div className="noNotification">
                        <img src={images.undraw_new_notifications_re_xpcv} className="mainImage" />
                        <p className="text">No Notifications</p>
                    </div>
                </div>
                <Navigation active='notifications' />
            </div>
        )
    }

    return (
        <div id="notifications">
            <div className="container">
                <h1 className="title">Notifications</h1>

            </div>
            <Navigation active='notifications' />
        </div>
    )
}
export default Profile