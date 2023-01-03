import '../scss/components/alertBox.scss'


const AlertBox = (props: any) => {
    const updater = props.updater
    const cb = props.cb
    const cbNo = props.cbNo
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
                <div className="buttons">
                    <button className='alertButton'
                        onClick={() => {
                            updater({ active: false })
                            cb ? cb() : undefined
                        }}>{buttonText}
                    </button>
                    {props.btnNoText ?
                        <button className='alertButton no'
                            onClick={() => {
                                updater({ active: false })
                                cbNo ? cbNo() : undefined
                            }}>
                            {props.btnNoText || 'No'}
                        </button>
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default AlertBox