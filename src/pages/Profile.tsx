import Navigation from "../components/NavigationBar"
import '../scss/pages/profile.scss'
function Profile() {
    return (
        <div id="profile">
            <div className="container">
                <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa eaque accusantium aliquid sed quidem hic, at error sit ex ab beatae magnam perspiciatis ipsum voluptates tempora excepturi illo expedita similique, ad, animi eum. Ipsam, est impedit. Sequi, maiores. Laudantium accusantium earum eos quae quia! Sint placeat et praesentium, ad eos error. Maxime dicta, repellendus dolore itaque assumenda velit nam eaque ipsum sit cupiditate magnam, quae in reiciendis culpa tempora saepe enim. Vero, delectus iure quia ex obcaecati nesciunt nobis enim ipsa nulla, ipsam expedita harum quod esse doloremque dolorum, quae explicabo? Eum nam aliquam quidem a provident voluptatem illum facere!</h2>
                {/* <Link to='/t&c'>Terms and Conditions</Link> */}
            </div>
            <Navigation active='profile' />
        </div>
    )
}
export default Profile