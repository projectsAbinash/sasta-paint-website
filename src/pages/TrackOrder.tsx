import { useEffect } from "react"
import { useParams } from "react-router-dom"
import TitleHeader from "../components/TitleHeader"
import joinLinks from "../linker"
import '../scss/pages/trackOrder.scss'
import { makeRequestData } from "../tokens"

const getByIdApiLink = joinLinks('Orders/GetbyId/')
function TrackOrder() {
    const { id } = useParams()
    useEffect(()=>{
        const reqData:any = makeRequestData()
        reqData.body = JSON.stringify({order_id : id})
        
        fetch(getByIdApiLink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
            })
    },[])
    return (
        <div id="trackOrder">
            <TitleHeader title="Track Order" />
            <div className="container">
                <h3 className="orderId">Order Id is {id}</h3>
                address
                Amount
                pdf details
            </div>
        </div>
    )
}

export default TrackOrder