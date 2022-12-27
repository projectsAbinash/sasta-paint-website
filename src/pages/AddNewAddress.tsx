import TitleHeader from "../components/TitleHeader"
import '../scss/pages/addNewAddress.scss'
function AddNewAddress() {
    return (
        <div id="addNewAddress">
            <TitleHeader title="Add new address" />
            <div className="container">
                <span className="label">Address Line 1</span>
                <input type="text" className="inp address" placeholder="Address Line 1" />
                <span className="label">Address Line 2</span>
                <input type="text" className="inp address" placeholder="Address Line 2" />
                <span className="label">Landmark</span>
                <input type="text" className="inp landmark" placeholder="Landmark" />
                <span className="label">City</span>
                <input type="text" className="inp city" placeholder="City" />
                <span className="label">Pin Code</span>
                <input type="number" className="inp pincode" placeholder="Pin code" />
                <span className="label">State</span>
                <input type="text" className="inp state" placeholder="State" />
                <span className="label">Address Name</span>
                <div className="addressType">
                    <div className="select" >
                        <input type="radio" name="addressType" value='Home' />
                        <span>Home</span>
                    </div>
                    <div className="select" >
                        <input type="radio" name="addressType" value='Work' />
                        <span>Work</span>
                    </div>
                    <div className="select" >
                        <input type="radio" name="addressType" value='Other' />
                        <span>Other</span>
                    </div>
                </div>
                <span className="label">Alternate Number</span>
                <input type="number" className="inp" placeholder="Alternate number" />
                <input type="submit" className="btnLarge" value='Add this Address' />
            </div>
        </div >
    )
}

export default AddNewAddress