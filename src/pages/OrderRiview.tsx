import icons from '../assets/icon'
import TitleHeader from '../components/TitleHeader'
import '../scss/pages/orderReview.scss'

function OrderReview() {
    const arr = [1, 2]
    return (
        <div id="orderReview">
            <TitleHeader title='Order Review' />
            <div className="container">
                {/* <h1>Review Order</h1> */}

                <div className="top">
                    {arr.map(elem => {
                        return (
                            <>
                                <div className="eachFile">
                                    <span className="label">File Name</span>
                                    <div className="fileName">
                                        <div className="left">
                                            <span className="name">Hello.pdf</span>
                                        </div>
                                        <div className="right">
                                            <img src={icons.file_pdf_solid} />
                                        </div>
                                    </div>
                                    <span className="label">Order Details</span>
                                    <div className="printCharge">
                                        <div className="left">
                                            <span>Print Charges</span>
                                            <span className="printType">Two-sided</span>
                                            <span className="calc">7 pages * $0.22/ page <img src={false ? icons.color : icons.bAndW} alt="" /></span>
                                        </div>
                                        <div className="right">
                                            <div className="price accent">$35</div>
                                        </div>
                                    </div>
                                    <div className="spiral">
                                        <span>Spiral Binding</span>
                                        <span className="price accent">$65</span>
                                    </div>

                                    <div className="copies">
                                        <span>Number of Copies <span className='gray'></span></span>
                                        <span className="price accent">$645</span>
                                    </div>
                                </div>



                            </>

                        )
                    })}
                    <div className="deliveryCharge">
                        <div className="left">
                            <span>Delivery Charge</span>
                        </div>
                        <div className="right">
                            <span className="noPrice">$0.33</span>
                            <span className="price accent">$0.22</span>
                        </div>
                    </div>

                </div>
                <div className="bottom">
                    <div className="total">
                        <span>Total Payable Amount</span>
                        <span className='accent'>$10.33</span>
                    </div>
                    <input type='submit' className='btnFullWidth' value='Confirm and Pay'></input>
                </div>
            </div>
        </div>
    )
}
export default OrderReview