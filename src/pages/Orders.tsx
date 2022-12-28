import { useEffect, useState } from "react"
import images from "../assets/image"
import Navigation from "../components/NavigationBar"
import '../scss/pages/orders.scss'
import { Link } from "react-router-dom"
import joinLinks from "../linker"


const ordersAPILink = joinLinks('blank')


function Orders() {
    const [ordersData, uOrderData] = useState<any | any[]>([, ,])
    useEffect(() => {

    }, [])

    if (ordersData === null) {
        // console.log("Loading Your ")
        return (
            <div id="orders" className="loading">
                <div className="container">
                    <img src={images.undraw_fast_loading_re_8oi3} />
                    <p>Your orders are loading...</p>
                </div>
                <Navigation active='orders' />
            </div>
        )
    }

    if (ordersData.length === 0) {
        // console.log("Loading Your ")
        return (
            <div id="orders" className="loading">
                <div className="container">
                    <p>No Orders found</p>
                    <img src={images.undraw_reminder_re_fe15} alt="" />
                    <Link to='/newOrder' className="linkBtn">Place new order</Link>
                </div>
                <Navigation active='orders' />
            </div>
        )
    }

    return (
        <div id="orders">
            <div className="container">
                <h3 className="text-center">Your Orders</h3>
                <div className="orders">
                    <div className="order">
                        <div className="left">
                            <img src={images.undraw_printing_invoices} />
                        </div>
                        <div className="right">
                            <div className="top">Order ID : {'6965645'}</div>
                            <div className="bottom">
                                <span className="amount">{'$45.55'}</span>
                                <span className="status success">{'Success'}</span>
                                <span className="date">15/12/22</span>

                            </div>
                        </div>
                    </div>
                    <div className="order">
                        <div className="left">
                            <img src={images.undraw_printing_invoices} />
                        </div>
                        <div className="right">
                            <div className="top">Order ID : {'6965645'}</div>
                            <div className="bottom">
                                <span className="amount">{'$45.55'}</span>
                                <span className="status pending">{'Pending'}</span>
                                <span className="date">15/12/22</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Navigation active='orders' />
        </div>
    )
}
export default Orders