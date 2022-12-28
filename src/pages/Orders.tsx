import { useEffect, useState } from "react"
import images from "../assets/image"
import Navigation from "../components/NavigationBar"
import '../scss/pages/orders.scss'
import { Link, Navigate, useNavigate } from "react-router-dom"
import joinLinks from "../linker"
import { makeRequestData } from "../tokens"


const ordersAPILink = joinLinks('Orders/list/')
const reqData = makeRequestData()

function getColoredClass(status : string){
    if(status === 'Placed')
        return 'orange'
    if(status === 'Shipped')
        return 'blue'
    if(status === 'Delivered')
        return 'green'
    else
        return 'red'
}

function Orders() {
    const [ordersData, uOrderData] = useState<any | any[]>(null)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(ordersAPILink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                uOrderData(data.data)
            })

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
    // 'Placed', 'Shipped', 'Delivered'

    return (
        <div id="orders">
            <div className="container">
                <h3 className="text-center">Your Orders</h3>
                <div className="orders">
                    {ordersData.map((o: any) => {
                        return (
                            <div className="order" key={crypto.randomUUID()} onClick={()=>navigate(`/trackOrder/${o.order_id}`)}>
                                <div className="left">
                                    <img src={images.undraw_printing_invoices} />
                                </div>
                                <div className="right">
                                    <div className="top"><span>Order ID : {o.order_id}</span></div>
                                    <div className="bottom">
                                        <span className="amount">₹{o.amount}</span>
                                        <span className={"status " + getColoredClass(o.status)}>{o.status}</span>
                                        <span className="date">{new Date(o.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Navigation active='orders' />
        </div>
    )
}
export default Orders