import { useEffect, useId, useState } from 'react'
import icons from '../assets/icon'
import TitleHeader from '../components/TitleHeader'
import joinLinks from '../linker'
import '../scss/pages/orderReview.scss'
import { makeRequestData } from '../tokens'
import Loading from './Loading'


function snakeToSpace(str: string): string {
    const words = str.split('_')
    const upp: string[] = words.map(w => {
        return w[0].toUpperCase() + w.substring(1)
    })
    return upp.join(' ')
}


const getOrderStatusAPILink = joinLinks('Orders/GetbyId/')
const reqData: any = makeRequestData()
reqData.body = JSON.stringify({
    order_id: localStorage.getItem('currentOrderID')
})

function OrderReview() {
    const arr = [1, 2]
    const [orderReview, uOrderReview] = useState<any>(null)
    useEffect(() => {
        console.log(reqData)
        fetch(getOrderStatusAPILink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                uOrderReview(data.order_data)
                // console.log(orderReview)
            })
    }, [])

    if (orderReview === null)
        return <Loading />

    return (
        <div id="orderReview">
            <TitleHeader title='Order Review' />
            <div className="container">
                {/* <h1>Review Order</h1> */}

                <div className="top">
                    {orderReview.userdocs.map((doc: any) => {
                        return (
                            <div className="eachFile" key={crypto.randomUUID()}>
                                <span className="label">File Name</span>
                                <div className="fileName">
                                    <div className="left">
                                        <span className="name">{doc.doc_name}</span>
                                    </div>
                                    <div className="right">
                                        <img src={icons.file_pdf_solid} />
                                    </div>
                                </div>
                                <span className="label">Order Details</span>
                                <div className="printCharge">
                                    <div className="left">
                                        <span>Print Charges</span>
                                        <span className="printType">{snakeToSpace(doc.page_config)}</span>
                                        <span className="calc">{doc.total_pages} page(s) * ₹{doc.page_config === 'two_side' ? 0.50 : 0.70}/ page
                                            <img src={doc.print_configicons === 'black_and_white' ? icons.color : icons.bAndW} alt="" />
                                        </span>
                                    </div>
                                    <div className="right">
                                        <div className="price accent">₹{doc.print_charges}</div>
                                    </div>
                                </div>
                                <div className="spiral">
                                    <span>{snakeToSpace(doc.binding_config)}</span>
                                    <span className="price accent">₹{doc.binding_charge}</span>
                                </div>

                                <div className="copies">
                                    <span>Number of Copies <span className='gray'> x{doc.copies_count}</span></span>
                                    <span className="price accent">₹{doc.total_copies_charge}</span>
                                </div>
                            </div>
                        )
                    })}
                    <div className="deliveryCharge">
                        <div className="left">
                            <span>Delivery Charge</span>
                        </div>
                        <div className="right">
                            <span className="noPrice">₹{orderReview.delivery_charge * 2}</span>
                            <span className="price accent">₹{orderReview.delivery_charge}</span>
                        </div>
                    </div>

                </div>
                <div className="bottom">
                    <div className="total">
                        <span>Total Payable Amount</span>
                        <span className='accent'>₹{orderReview.amount}</span>
                    </div>
                    <input type='submit' className='btnFullWidth' value='Confirm and Pay'></input>
                </div>
            </div>
        </div>
    )
}
export default OrderReview