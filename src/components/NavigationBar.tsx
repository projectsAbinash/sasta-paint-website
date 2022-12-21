import '../scss/components/navigationBar.scss'

const Navigation = (props:any)=>{
    const active = props.active
    return(
        <div id="navigationBar">
            <p>This is Navigation Bat</p>
            <p>Active Tab is {active}</p>
        </div>
    )

}

export default Navigation