import { useParams } from "react-router-dom"
import TitleHeader from "../components/TitleHeader"
import '../scss/pages/trackOrder.scss'
function TrackOrder() {
    const { id } = useParams()
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