import { Link } from "react-router-dom"
import icons from "../assets/icon"
import TitleHeader from "../components/TitleHeader"
import '../scss/pages/deliveryAddress.scss'

function DeliveryAddress() {
    return (
        <div id="deliveryAddress">
            <TitleHeader title='Delivery Address' />
            <div className="container">
                <div className="top">

                    <div className="addNewArea">
                        <div className="left"><span>Addresses</span></div>
                        <div className="right"><Link to='/addNewAddress'>Add new</Link></div>
                    </div>
                    <div className="addresses">
                        <div className="address active">
                            <div className="left">
                                <h3 className="name">Kolkata</h3>
                                <p className="title">abcdefgh road d/98 <br /> west bengal 722132</p>
                            </div>
                            <div className="right">
                                {/* <img src={icons.edit} className='edit' /> */}
                                <img src={icons.trash} className='delete' />
                            </div>
                        </div>
                        <div className="address">
                            <div className="left">
                                <h3 className="name">Kolkata</h3>
                                <p className="title">abcdefgh road d/98 <br /> west bengal 722132</p>
                            </div>
                            <div className="right">
                                {/* <img src={icons.edit} className='edit' /> */}
                                <img src={icons.trash} className='delete' />
                            </div>
                        </div>
                        <div className="address">
                            <div className="left">
                                <h3 className="name">Kolkata</h3>
                                <p className="title">abcdefgh road d/98 <br /> west bengal 722132</p>
                            </div>
                            <div className="right">
                                {/* <img src={icons.edit} className='edit' /> */}
                                <img src={icons.trash} className='delete' />
                            </div>
                        </div>
                    </div>
                </div>

                <input type="submit" value="Deliver to this address" className="btnFullWidth" />

            </div>
        </div>
    )
}

export default DeliveryAddress