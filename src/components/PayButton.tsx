import { useCallback, useEffect, useState } from "react";
import { makeRequestData } from "../tokens";
import AlertBox from "./AlertBox";
import joinLinks from "../linker";
import useRazorpay from "react-razorpay";
import Loading from "../pages/Loading";
import { useNavigate } from "react-router-dom";



const PayButton = () => {
    const paymentAPILink = joinLinks('Orders/PaymentStart')
    const reqData: any = makeRequestData()
    // const [orderData, updateOrderData] = useState<any>(null)
    const [alertBoxDetails, updateAlertBoxDetails] = useState<any>({ active: false, title: '', content: '', buttonText: '' })
    const [orderDataStatus, uOrderDataStatus] = useState('Confirm and Pay')
    const [isDisabled, uIsDisabled] = useState(false)

    const Razorpay = useRazorpay();
    const navigate = useNavigate()

    const handelPayment = useCallback(async (e: any) => {
        if (isDisabled) { return }
        uOrderDataStatus('Please Wait...')
        uIsDisabled(true)
        const fetchData = await fetch(paymentAPILink, reqData)
        let data = await fetchData.json()
        data = data.data
        console.log(data)
        uOrderDataStatus('Confirm and pay')
        console.log(data)
        uIsDisabled(false)

        const options: any = {
            key: data.razorpayId,
            amount: data.amount,
            currency: data.currency,
            name: data.name,
            description: "Test Transaction",
            image: "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg?auto=compress&cs=tinysrgb&h=350",
            order_id: data.orderId,
            handler: successHandler,
            prefill: { name: data.name, email: data.email, contact: data.mobile_number, },
            notes: { address: "Razorpay Corporate Office", },
            theme: { color: "#23cd8d", },
        }
        console.log(options)
        console.log('Payment')
        const rzpay = new Razorpay(options)
        rzpay.open();
    }, [Razorpay])

    reqData.body = JSON.stringify({
        order_id: localStorage.getItem('currentOrderID')
    })

    function successHandler(res: any) {
        console.log(res)
        const url = joinLinks('Orders/PaymentStart/Callback')
        const reqData: any = makeRequestData()
        reqData.body = JSON.stringify({
            product_order_id: localStorage.getItem('currentOrderID'),
            rzp_paymentid : res.razorpay_payment_id,
            rzp_orderid : res.razorpay_order_id,
            rzp_signature : res.razorpay_signature
        })
        updateAlertBoxDetails({
            active: true,
            ui: Loading
            // btnNoText: 'No',
        })
        console.log(reqData)

        fetch(url, reqData).then(data => data.json())
            .then(data => {
                console.log(data)
                if (!data.errors) {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Successful',
                        content: 'Payment successful',
                        buttonText: 'Ok',
                        cb: () => { navigate('/home') }
                    })
                    console.log("Now redirect to home")
                } else {
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Payment Failed',
                        content: 'Payment Failed!',
                        buttonText: 'Ok',
                        cb: () => { navigate('/home') }
                    })
                    console.log("Payment Failed")
                }
            })
    }

    return (
        <>
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
                cb={alertBoxDetails.cb}
                cbNo={alertBoxDetails.cbNo}
                btnNoText={alertBoxDetails.btnNoText}
                ui={alertBoxDetails.ui}
            />
            <input type='submit' className='btnFullWidth' value={orderDataStatus} onClick={handelPayment} disabled={isDisabled}></input>
        </>
    )
}



export default PayButton