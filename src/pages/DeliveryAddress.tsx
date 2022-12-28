import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import icons from "../assets/icon"
import images from "../assets/image"
import TitleHeader from "../components/TitleHeader"
import joinLinks from "../linker"
import '../scss/pages/deliveryAddress.scss'
import { makeRequestData } from "../tokens"

const deliveryAddressAPILink = joinLinks('profile/Address')
const reqData = makeRequestData()

function DeliveryAddress() {
    const [addresses, updateAddresses] = useState<any[]>([])
    const [addressStatus, updateAddressStatus] = useState('loading')
    const [activeAddress, updateActiveAddress] = useState(0)
    // const addressDOM = useRef()
    useEffect(() => {
        fetch(deliveryAddressAPILink, reqData).then(data => data.json())
            .then(data => {
                updateAddressStatus('fetched')  
                updateActiveAddress(data.data[0]?.id)
                updateAddresses(data.data)
                console.log(data)
            })
    }, [])

    function deleteAddressById(index: number, id: number | string) {
        const deleteLink = joinLinks('profile/Address/Delete')
        const reqData: any = makeRequestData()

        reqData.body = JSON.stringify({ id })
        const newAddresses = [...addresses]
        newAddresses.splice(index, 1)
        console.log(reqData)
        updateAddresses(newAddresses)
        console.log(id)
        fetch(deleteLink, reqData).then(data => data.json())
            .then(data => {
                console.log(data)
            })
    }


    let addressCount = 0

    if (addressStatus === 'loading')
        return (
            <div id="deliveryAddress" className="loading">
                <TitleHeader title='Delivery Address' />
                <div className="container">
                    <img src={images.undraw_fast_loading_re_8oi3} alt="" />
                    <p>Loading Addresses...</p>
                </div>
            </div>
        )
    else if (addressStatus === 'fetched' && addresses.length === 0) {
        return (
            <div id="deliveryAddress" className="loading">
                <TitleHeader title='Delivery Address' />
                <div className="container">
                    <p>No Address found</p>
                    <img src={images.undraw_map_dark_re_36sy} alt="" />
                    <Link to='/addNewAddress' className="linkBtn">Add new Address</Link>
                </div>
            </div>
        )
    }

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
                        {addresses.map(add => {
                            return (
                                <div className={`address${activeAddress == add.id ? ' active' : ''}`} key={add.id} onClick={() => updateActiveAddress(add.id)}>
                                    <div className="left">
                                        <h3 className="name">{add.City || ''}</h3>
                                        <p className="title">
                                            {add.Address_1} <br />
                                            {add.State} {add.PinCode}
                                        </p>
                                    </div>
                                    <div className="right" >
                                        <img src={icons.trash} className='delete' onClick={() => deleteAddressById(addressCount++, add.id)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <input type="submit" value="Deliver to this address" className="btnFullWidth" />
            </div>
        </div>
    )
}

export default DeliveryAddress