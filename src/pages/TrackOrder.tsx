import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TitleHeader from "../components/TitleHeader"
import joinLinks from "../linker"
import '../scss/pages/trackOrder.scss'
import { makeRequestData } from "../tokens"
import images from "../assets/image"
import icons from "../assets/icon"
import { Link } from "react-router-dom"

import uuid from "../randomId"


function getColoredClass(status: string) {
    if (status === 'Placed')
        return 'orange'
    if (status === 'Shipped')
        return 'blue'
    if (status === 'Delivered')
        return 'green'
    else
        return 'red'
}
function snakeToSpace(str: string): string {
    const words = str.split('_')
    const upp: string[] = words.map(w => {
        return w[0].toUpperCase() + w.substring(1)
    })
    return upp.join(' ')
}

const getByIdApiLink = joinLinks('Orders/GetbyId')
function TrackOrder() {
    const { id } = useParams()
    const [orderData, uOrderData] = useState<any>(null)


    useEffect(() => {
        const reqData: any = makeRequestData()
        reqData.body = JSON.stringify({ order_id: id })

        fetch(getByIdApiLink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                // data.order_data.tracking_link = "https://google.com"
                uOrderData(data.order_data)
            })
    }, [])

    if (orderData === null)
        return (
            <div id="trackOrder" className="loading">
                <TitleHeader title="Order Details" />
                <div className="container">
                    <img src={images.undraw_fast_loading_re_8oi3} />
                    <p>Loading Order Details...</p>
                </div>
            </div>
        )

    return (
        <div id="trackOrder">
            <TitleHeader title="Order Details" />
            <div className="container">
                <div className="top">
                    <h3 className="orderId">Order Id : <span className="accent">{id}</span></h3>
                    <p className="label">Documents Details</p>
                    <div className="docs">
                        {orderData.userdocs.map((doc: any) => {
                            return (
                                <div className="eachFile" key={uuid(5)}>
                                    {/* <div className="deleteButton">
                                    <img src={icons.trash} />
                                </div> */}
                                    {/* <span className="label fileNameHeading"><span>File Name</span> <span className='red' onClick={() => removeDocument(doc.id)}>Remove</span></span> */}
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


                    </div>
                    <p className="label">Order Details</p>
                    <div className="details">
                        <div className="detail">
                            <span>Order Date</span>
                            <span className="accent">{new Date(orderData.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="detail">
                            <span>Status</span>
                            <span className={getColoredClass(orderData.status)}>{orderData.status}</span>
                        </div>

                        {orderData.assigned_store ?
                            (
                                <div className="detail">
                                    <span>Store Name</span>
                                    <span className='accent address'>{orderData.assigned_store}</span>
                                </div>
                            ) : ""
                        }

                        <div className="detail">
                            <span>Address</span>
                            <span className="address">
                                {orderData.get_address.City} {orderData.get_address.Address_1} {orderData.get_address.State} {orderData.get_address.PinCode}
                            </span>
                        </div>
                        <div className="detail">
                            <span>Delivery Charge</span>
                            <span className="accent">₹{orderData.delivery_charge}</span>
                        </div>
                        <div className="detail">
                            <span>Total Amount</span>
                            <span className="accent">₹{orderData.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    {(orderData.tracking_link != null) ? <TrackLinkButton trackLink={orderData.tracking_link} /> : ""}
                </div>
            </div>
        </div >
    )
}

export default TrackOrder


function TrackLinkButton({ trackLink }: any) {
    console.log(trackLink)
    return (
        <a href={trackLink} target='_blank'>
            <input type="submit" value='Track Order' className="btnLarge" />
        </a>
    )
}