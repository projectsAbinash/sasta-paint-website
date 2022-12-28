import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icon'
import AlertBox from '../components/AlertBox'
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
const deleteDocumtAPILink = joinLinks('Orders/UploadDoc/Removed')
const reqData: any = makeRequestData()


function OrderReview() {
    const [orderReview, uOrderReview] = useState<any>(null)
    const navigate = useNavigate()

    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })


    useEffect(() => {
        reqData.body = JSON.stringify({
            order_id: localStorage.getItem('currentOrderID')
        })
        console.log(reqData)
        fetch(getOrderStatusAPILink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                uOrderReview(data.order_data)
                if (data?.order_data?.userdocs.length === 0) {
                    navigate('/newOrder', { replace: true })
                }
                console.log(data)
            })
    }, [])

    if (orderReview === null)
        return <Loading />



    return (
        <div id="orderReview">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />
            <TitleHeader title='Order Review' />
            <div className="container">
                {/* <h1>Review Order</h1> */}

                <div className="top">
                    {orderReview.userdocs.map((doc: any) => {
                        return (
                            <div className="eachFile" key={crypto.randomUUID()}>
                                {/* <div className="deleteButton">
                                    <img src={icons.trash} />
                                </div> */}
                                <span className="label fileNameHeading"><span>File Name</span> <span className='red' onClick={() => removeDocument(doc.id)}>Remove</span></span>
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


    function removeDocument(id: string) {
        updateAlertBoxDetails({
            active: true,
            title: 'Alert',
            content: 'Removing Document',
            buttonText: 'OK'
        })
        const reqData: any = makeRequestData()
        const body = { doc_id: id }

        reqData.body = JSON.stringify(body)

        // 
        console.log(reqData.body)
        fetch(deleteDocumtAPILink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                navigate(0)
            }).catch(err => {
                updateAlertBoxDetails({
                    active: true,
                    title: 'Error',
                    content: 'Remove Failed, check your network connection',
                    buttonText: 'OK'
                })
            })
    }
}
export default OrderReview