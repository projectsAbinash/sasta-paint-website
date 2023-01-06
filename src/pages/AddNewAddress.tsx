import { useEffect, useReducer, useRef, useState } from "react"
import TitleHeader from "../components/TitleHeader"
import joinLinks from "../linker"
import '../scss/pages/addNewAddress.scss'
import token, { makeRequestData } from "../tokens"
import AlertBox from "../components/AlertBox"
import { useNavigate } from "react-router-dom"

const addNewAddressAPILink = joinLinks('profile/Address/New')

function AddNewAddress() {
    const [addAddressStatus, updateAddAddressStatus] = useState('Add this Address')
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })
    const address_home = useRef<any>()
    const address_work = useRef<any>()
    const address_other = useRef<any>()
    const navigate = useNavigate()
    const [addressDataState, setAddressData] = useState<any>({
        // Address_1: '',
        // Address_2: '',
        // Landmark: '',
        // City: '',
        // PinCode: '',
        State: 'Madhya Pradesh',
        // Address_Type: '',
        // Alternate_number: null,
    })


    function setNewAddress() {
        // console.log(addressData)
        console.log(addressDataState)

        const reqData: any = makeRequestData()
        reqData.body = JSON.stringify(addressDataState)
        // console.log(reqData)
        updateAddAddressStatus('Adding Address...')
        fetch(addNewAddressAPILink, reqData).then(data => data.json())
            .then(data => {
                if (data?.errors) {
                    updateAddAddressStatus('Add this Address')
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Error',
                        content: data.message,
                        buttonText: 'OK'
                    })
                }
                if (data.status === 'true') {
                    navigate(-1)
                }
                console.log(data)
            })
    }

    useEffect(() => {

    }, [])
    function setAddressType(e: any) {
        setAddressData({ ...addressDataState, Address_Type: val(e) })
    }

    return (
        <div id="addNewAddress">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
            />
            <TitleHeader title="Add new address" />
            <div className="container">
                <span className="label">Address Line 1</span>
                <input type="text" className="inp address" placeholder="Address Line 1" onInput={(e) => { setAddressData({ ...addressDataState, Address_1: val(e) }) }} />
                <span className="label">Address Line 2</span>
                <input type="text" className="inp address" placeholder="Address Line 2" onInput={(e) => setAddressData({ ...addressDataState, Address_2: val(e) })} />
                <span className="label">Landmark</span>
                <input type="text" className="inp landmark" placeholder="Landmark" onInput={(e) => setAddressData({ ...addressDataState, Landmark: val(e) })} />
                <span className="label">City</span>
                <input type="text" className="inp city" placeholder="City" onInput={(e) => setAddressData({ ...addressDataState, City: val(e) })} />
                <span className="label">Pin Code</span>
                <input type="number" className="inp pincode" placeholder="Pin code" onInput={(e) => setAddressData({ ...addressDataState, PinCode: val(e) })} />
                <span className="label">State</span>
                <select name="state" id="state" className="select state" onInput={(e) => setAddressData({ ...addressDataState, State: val(e) })}>
                    <option value="" disabled defaultChecked>Select State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                </select>

                <span className="label">Address Name</span>
                <div className="addressType">
                    <div className="select" onClick={() => { address_home.current.click() }}>
                        <input type="radio" name="addressType" value='Home' ref={address_home} onClick={setAddressType} />
                        <span>Home</span>
                    </div>
                    <div className="select" onClick={() => { address_work.current.click() }}>
                        <input type="radio" name="addressType" value='Work' ref={address_work} onClick={setAddressType} />
                        <span>Work</span>
                    </div>
                    <div className="select" onClick={() => { address_other.current.click() }}>
                        <input type="radio" name="addressType" value='Other' ref={address_other} onClick={setAddressType} />
                        <span>Other</span>
                    </div>
                </div>
                <span className="label">Alternate Number</span>
                <input type="number" className="inp" placeholder="Alternate number" onChange={(e) => setAddressData({ ...addressDataState, Alternate_number: val(e) })} />
                <input type="submit" className="btnLarge" value={addAddressStatus} onClick={() => { setNewAddress() }} />
            </div>
        </div >
    )
}

export default AddNewAddress






function val(e: any): string {
    return e.target.value
}
