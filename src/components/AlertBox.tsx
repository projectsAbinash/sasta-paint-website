import '../scss/components/alertBox.scss'


const AlertBox = (props: any) => {
    const updater = props.updater

    const UI: any = props.ui
    if (UI) {
        return <UI />
    }
    const buttonText: string = props.buttonText || 'Ok'
    const alertTitle: string = props.title || 'Alert'
    const alertText: string = props.content || 'Sample Alert Text'

    return (
        <div id="alertBox" className={props.active ? 'active' : 'hidden'}>
            <div id="box">
                <p className='alertTitle'>{alertTitle}</p>
                <p className="alertText">{alertText}</p>
                <button className='alertButton' onClick={() => { updater({ active: false }) }}>{buttonText}</button>
            </div>
        </div>
    )
}

export default AlertBox