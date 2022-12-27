import icons from '../assets/icon'
import '../scss/components/navigationBar.scss'
import { Link } from 'react-router-dom'




const Navigation = (props: any) => {
    const active = props.active
    return (
        <div id="navigationBar">
            <Link to='/home'>
                <div className={"tab " + makeActiveClass(active, 'home')}>
                    <img src={active == 'home' ? icons.Home : icons.Home_Broken} />
                    <span className="tabTitle">Home</span>
                </div>
            </Link>
            {/* <Link to='/newOrder'>
                <div className='plus tab'>
                    <img src={icons.plus} />
                    <span className="tabTitle">Alerts</span>
                </div>
            </Link> */}
            <Link to='/cart'>
                <div className={"tab " + makeActiveClass(active, 'cart')}>
                    <img src={active == 'cart' ? icons.Wallet : icons.Wallet_Broken} />
                    <span className="tabTitle">Cart</span>
                </div>
            </Link>
            <Link to='/profile'>
                <div className={"tab " + makeActiveClass(active, 'profile')}>
                    <img src={active == 'profile' ? icons.Profile : icons.Profile_Broken} className='profile' />
                    <span className="tabTitle">Profile</span>
                </div>
            </Link>
        </div>
    )

}

export default Navigation



function makeActiveClass(active: string, current: string): string {
    if (active == current)
        return 'active'
    return ''
}