import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import TitleHeader from "../components/TitleHeader"
import joinLinks from "../linker"
import '../scss/pages/addNewAddress.scss'
import token, { makeRequestData } from "../tokens"
import AlertBox from "../components/AlertBox"
import { useNavigate } from "react-router-dom"
//import debounce from "../debounce"
import icons from "../assets/icon"
import images from "../assets/image"

const addNewAddressAPILink = joinLinks('profile/Address/New')
const fetch_from_pin_code = joinLinks('profile/Address/Fetch')
function AddNewAddress() {
    const [addAddressStatus, updateAddAddressStatus] = useState('Add this Address')
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })
    const address_home = useRef<any>()
    const address_work = useRef<any>()
    const address_other = useRef<any>()
    const [btn_disable, u_btn_disable] = useState<any>(true)
    const [state, u_state] = useState<any>('')
    const [all_cities, u_all_cities] = useState([])
    const [img_loading, u_img_loading] = useState(false)
    const navigate = useNavigate()

    const [addressDataState, setAddressData] = useState<any>({
        // Address_1: '',
        // Address_2: '',
        // Landmark: '',
        // City: '',
        // PinCode: '',
        // State: 'Madhya Pradesh',
        // Address_Type: '',
        // Alternate_number: null,
    })


    function setNewAddress() {
        // console.log(addressData)
        console.log(addressDataState)
        if (btn_disable) {
            updateAlertBoxDetails({
                active: true,
                title: 'Alert',
                content: 'Please enter your information correctly. Especially the pincode.',
                buttonText: 'OK'
            })
            return
        }
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

                <span className="label">Pin Code</span>
                <div className="imgContainer">


                    <input type="number" className="inp pincode" placeholder="Pin code" onInput={(e) => {
                        setAddressData({ ...addressDataState, PinCode: val(e) })
                        u_btn_disable(true)
                        u_all_cities([])
                        u_state('')
                        const reqData: any = makeRequestData()
                        const pincode = val(e)
                        
                        reqData.body = JSON.stringify({ pincode })
                        if (pincode.length >= 6) {
                            fetchCityData()
                        }
                        function fetchCityData() {
                            u_img_loading(true)
                            console.log(reqData)
                            fetch(fetch_from_pin_code, reqData)
                                .then(data => data.json())
                                .then(data => {
                                    if (data.status === 'false') {
                                        updateAlertBoxDetails({
                                            active: true,
                                            title: 'Alert',
                                            content: 'This pincode is not deliverable',
                                            buttonText: 'OK'
                                        })
                                        return
                                    }
                                    else if (data.status === 'true') {
                                        console.log(data.city)
                                        u_all_cities(data.city)
                                        u_state(data.state)
                                        u_btn_disable(false)
                                        setAddressData({ ...addressDataState, State: val(e) })
                                    }
                                    u_img_loading(false)
                                    console.log(data)
                                })
                        }
                    }
                    } />
                    {img_loading ? <img src={icons.preloader} alt="" className="loadingImagePincode" /> : <></>}
                </div>
                <span className="label">City</span>
                {/* <input type="text" className="inp city" placeholder="City" onInput={(e) => setAddressData({ ...addressDataState, City: val(e) })} /> */}
                <select name="state" id="state" placeholder="Select State" className="select state" onInput={(e) => setAddressData({ ...addressDataState, City: val(e) })} value={addressDataState.City}>
                    <option value="Select State" disabled defaultChecked>Select City</option>
                    {all_cities.map((city: string) => <option value={city} key={crypto.randomUUID()} onSelect={(e: any) => console.log(city)}>{city}</option>)}
                </select>

                <span className="label">State</span>
                <input type="text" className="inp state" placeholder="State" value={state} disabled />
                {/* <select name="state" id="state" placeholder="Select State" className="select state" onInput={(e) => setAddressData({ ...addressDataState, State: val(e) })}>
                    <option value="Select State" disabled defaultChecked>Select State</option>
                    <option value="Select State">Select State</option>
                    {state ? <option value={state}>{state}</option> : <></>}
                </select> */}

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
