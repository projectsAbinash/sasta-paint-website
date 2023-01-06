import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icon'
import AlertBox from '../components/AlertBox'
import TitleHeader from '../components/TitleHeader'
import joinLinks from '../linker'
import '../scss/pages/newOrder.scss'
import token, { makeRequestData } from '../tokens'

const fileUploadAPILink = joinLinks('Orders/UploadDoc')
const updateDocumentLink = joinLinks('Orders/UploadDoc/Update')

function uuid(len: number) {
    const min = 10 ** (len - 1)
    const max = 10 ** len - 1
    const rand = Math.floor(min + Math.random() * (max - min))
    return "SSTPRNT" + rand
}


function NewOrder() {

    function addNewButtonClick() {
        // Check if the last input file is selected or not
        const lastFile = files[files.length - 1]
        if (lastFile.status === 'initial' || lastFile.status === 'failed') {
            updateAlertBoxDetails({
                active: true,
                title: 'Select File',
                content: 'Please Upload a PDF file before adding a new file',
                buttonText: 'OK'
            })
            return
        }

        if (lastFile.status === 'uploading') {

            updateAlertBoxDetails({
                active: true,
                title: 'Please Wait',
                content: 'Please wait, your file is uploading.',
                buttonText: 'OK'
            })
            return
        }

        // Now send previous data to server
        sendCurrentData()


        // files
        const newFilesData = [...files]
        // newFilesData.push({ fileName: '', uploaded: false, selected: false, failed: false })
        newFilesData.push({ fileName: '', status: 'initial' })




        updateFiles(newFilesData)
    }

    function sendCurrentData() {
        const data: any = {
            //     copies_count: noOfCopies,
            //     doc_id: currentDocId,
            //     print_config: printConfig,
            //     page_config: pageConfig,
            //     binding_config: binding_status,
            //     title: title,
            //     instructions: instructions
        }
        data.copies_count = noOfCopies
        data.doc_id = currentDocId
        data.print_config = printConfig
        data.page_config = pageConfig
        data.binding_config = binding_status
        if (title) data.title = title
        if (instructions) data.instructions = instructions

        const reqData: any = makeRequestData()
        reqData.body = JSON.stringify(data)


        fetch(updateDocumentLink, reqData)
            .then(data => data.json())
            .then(data => {
                console.log(data)
            })

        // Make data


        // Make Everything Blank
        titleInput.current.value = ''
        instructionInput.current.value = ''
        uNoOfCopies(1)
        uCurrentDocId(null)
        colorRadio1.current.click()
        // updatePrintConfig('black_and_white') 
        loose_paper.current.click()
        pageSide2.current.click()
        // updatePageConfig('two_side')
        updateTitle('')
        updateInstructions('')
        console.log(data)
    }


    function changeNoOfCopies(n: number) {
        if ((noOfCopies === 1 || noOfCopies === null) && n < 0) {
            return
        } else
            uNoOfCopies(noOfCopies + n)
    }

    function updateCopyByInput(e: any) {
        let num = Number(e.target.value)
        if (num < 1) {
            uNoOfCopies(null)
        }
        else
            uNoOfCopies(num)
    }
    function getFileName(i: number) {
        const file = allFileInputs.current[i].value
        let fileName = file.split('\\')
        return fileName[fileName.length - 1]
    }
    function handelEachFileChange(i: number) {
        return function () {
            // update the file name here
            const newFilesData = [...files]
            const fileName = getFileName(i)
            let currentFileData = newFilesData[i]
            currentFileData.fileName = fileName
            currentFileData.status = 'uploading'
            // currentFileData.uploaded = true
            updateFiles(newFilesData)
        }
    }
    function showFileStatus(file: (typeof files[0])) {
        if (file.status == 'initial')
            return <img src={icons.plus_solid} />
        if (file.status === 'uploading')
            return <img src={icons.preloader} className='loading'></img>
        if (file.status === 'uploaded')
            return <img src={icons.check_solid_accent}></img>
        if (file.status === 'failed')
            return <img src={icons.circle_exclamation_solid}></img>
    }


    function changeBindingStatus(e: any) {
        uBinding_status(e.target.value)
        console.log(binding_status)
    }
    function changePageConfig(e: any) {
        updatePageConfig(e.target.value)
    }
    function changePrintConfig(e: any) {
        updatePrintConfig(e.target.value)
    }

    const navigate = useNavigate()

    const [alertBoxDetails, updateAlertBoxDetails] = useState<any>({ active: false, title: '', content: '', buttonText: '' })

    const [noOfCopies, uNoOfCopies] = useState<any>(1)
    const [files, updateFiles] = useState([{ fileName: '', status: 'initial' }])
    const colorRadio1 = useRef<any>()
    const colorRadio2 = useRef<any>()
    const pageSide1 = useRef<any>()
    const pageSide2 = useRef<any>()
    const titleInput = useRef<any>()
    const instructionInput = useRef<any>()
    const [currentDocId, uCurrentDocId] = useState<null | string>(null)
    const spiral = useRef<any>()
    const stapled = useRef<any>()
    const loose_paper = useRef<any>()
    const [title, updateTitle] = useState('')
    const [instructions, updateInstructions] = useState('')
    const [pageConfig, updatePageConfig] = useState('two_side')
    const [printConfig, updatePrintConfig] = useState('black_and_white')

    const [binding_status, uBinding_status] = useState('loose_paper')

    const allFileInputs = useRef<any>([])
    // let fileCount = 0

    useEffect(() => {
        // const hello = randomUUID.
        const randomUUID = uuid(7)
        // console.log(randomUUID)
        localStorage.setItem('currentOrderID', randomUUID)
        console.log(randomUUID)
    }, [])

    function uploadFile(index: number) {
        return function () {
            const currentFile = allFileInputs.current[index].files[0]
            const bodyFormData = new FormData()
            bodyFormData.append('doc', currentFile)
            bodyFormData.append('order_id', localStorage.getItem('currentOrderID') || 'no-id')
            const header = {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': token.get('registrationToken')
            }
            // delete header['content-type']
            const reqData = {
                method: 'POST',
                headers: header,
                body: bodyFormData
            }

            console.log(reqData)

            fetch(fileUploadAPILink, reqData)
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    let newFilesData = [...files]
                    if (data.status === 'true') {
                        // Show success icon
                        updateFiles(newFilesData)
                        uCurrentDocId(data.doc_id)
                        newFilesData[index].status = 'uploaded'
                    }
                    else {
                        newFilesData[index].status = 'failed'
                        updateAlertBoxDetails({
                            active: true,
                            title: 'Error',
                            content: data.message,
                            buttonText: 'OK'
                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                    updateAlertBoxDetails({
                        active: true,
                        title: 'Upload Failed',
                        content: 'There is an error uploading the file. Maybe it is network error. Check your internet connection.',
                        buttonText: 'OK'
                    })
                })

        }
    }
    return (

        <div id="newOrder">
            <AlertBox
                active={alertBoxDetails.active}
                title={alertBoxDetails.title}
                content={alertBoxDetails.content}
                buttonText={alertBoxDetails.buttonText}
                updater={updateAlertBoxDetails}
                cb={alertBoxDetails.cb}
                cbNo={alertBoxDetails.cbNo}
                btnNoText={alertBoxDetails.btnNoText}
            />
            <TitleHeader title='Printing Details' back={() => {
                updateAlertBoxDetails({
                    active: true,
                    title: 'Are you sure?',
                    content: 'Are you sure you want to discard this order?',
                    buttonText: 'Yes',
                    btnNoText: 'No',
                    cb: () => {
                        navigate(-1)
                    }
                })
            }} />
            <div className="container">
                {/* <form action=""> */}
                {
                    files.map((file, index) => {
                        // console.log("Rendered Files")
                        return (
                            // <>
                            <div className="fileDiv" key={uuid(5)} onClick={() => (files[index].status == 'initial' || files[index].status == 'failed') ? allFileInputs.current[index].click() : () => { }} onChange={uploadFile(index)}>
                                <input type="file" name="fileInput" accept="application/pdf"
                                    ref={(element) => allFileInputs.current[index] = element}
                                    onChange={handelEachFileChange(index)}
                                />
                                <div className="left">
                                    <img src={icons.file_pdf_solid} />
                                    {!(file.status === 'initial') ?
                                        <span className="fileName">
                                            {file.fileName}
                                        </span> :
                                        <span className="fileName noSelect">
                                            Attach a PDF file
                                        </span>
                                    }
                                </div>

                                <div className="right">
                                    {showFileStatus(file)}
                                    {/* <img src={file.uploaded ? icons.check_solid_accent : icons.plus_solid} /> */}
                                </div>
                            </div>
                            // </>
                        )
                    })
                }




                <div className="details">
                    <p className="label">Details</p>
                    <input type="text" className='inp title' placeholder='Title of your document'
                        onInput={(e: any) => updateTitle(e.target.value)} ref={titleInput} />
                    <textarea name="Instructions" id="instructions" rows={2} onInput={(e: any) => updateInstructions(e.target.value)}
                        placeholder='Enter any instructions that should be carried out while printing your file.'
                        ref={instructionInput}
                    ></textarea>
                    <p className="label">Number of Copies</p>
                    <div className="copies">
                        <input
                            type="number" className='inp' name="noOfCopies" max={1000}
                            id="noOfCopies" placeholder='Number of copies' min={1}
                            value={noOfCopies} onInput={(e: any) => { updateCopyByInput(e) }}
                        />
                        <button className='btn-' onClick={() => { changeNoOfCopies(-1) }}><img src={icons.minus_solid} /></button>
                        <button className='btn+' onClick={() => { changeNoOfCopies(1) }}><img src={icons.plus_solid} /></button>
                    </div>
                </div>


                <div className="config">
                    <p className="label">Print Configurations</p>
                    <div className="selectColor">
                        <div className="select" onClick={() => { colorRadio1.current.click() }}>
                            <input ref={colorRadio1} type="radio" name="printColor" id="color1" value='black_and_white' defaultChecked onChange={changePrintConfig} />
                            <span>Black & White</span>
                        </div>
                        <div className="select" onClick={() => {
                            // colorRadio2.current.click()
                            updateAlertBoxDetails({
                                active: true,
                                title: 'Alert',
                                content: 'Feature is coming Soon',
                                buttonText: 'OK'
                            })
                        }}>
                            <input ref={colorRadio2} type="radio" name="printColor" id="color1" value='color' disabled />
                            <span>Color</span>
                        </div>
                    </div>
                </div>

                <div className="selectPage">
                    <p className="label">Page Sides</p>
                    <div className="selectPage">
                        <div className="select" onClick={() => { pageSide2.current.click() }}>
                            <input ref={pageSide2} type="radio" name="pageSide" id="color1" value='two_side'
                                defaultChecked onChange={changePageConfig} />
                            <div className="text">
                                <span >Two-Sided</span>
                                <div className="price">
                                    <span className='price cancel'>₹0.55</span>
                                    <span className='price'>₹0.50/page</span>
                                </div>
                            </div>
                        </div>
                        <div className="select" onClick={() => { pageSide1.current.click() }}>
                            <input ref={pageSide1} type="radio" name="pageSide" id="color1" value='one_side'
                                onChange={changePageConfig} />
                            <div className="text">
                                <span >One-Sided</span>
                                <div className="price">
                                    <span className='price cancel'>₹0.80</span>
                                    <span className='price'>₹0.70/page</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="selectPage">
                    <p className="label">Binding Configuration</p>
                    <div className="selectPage">
                        <div className="select" onClick={() => loose_paper.current.click()}>
                            <input ref={loose_paper} type="radio" name="binding" value='loose_paper' defaultChecked onChange={changeBindingStatus} />
                            <div className="text">
                                <span >Loose Paper</span>
                                <div className="price">
                                    {/* <span className='price calcel'>$0.65/page</span> */}
                                    <span className='price'>₹0.00 / Page</span>
                                </div>
                            </div>
                        </div>
                        <div className="select" onClick={() => stapled.current.click()}>
                            <input ref={stapled} type="radio" name="binding" value='stapled' onChange={changeBindingStatus} />
                            <div className="text">
                                <span >Stapled</span>
                                <div className="price">
                                    {/* <span className='price cancel'>$1.5.00</span> */}
                                    <span className='price'>₹0.00/page</span>
                                </div>
                            </div>
                        </div>

                        <div className="select" onClick={() => spiral.current.click()}>
                            <input ref={spiral} type="radio" name="binding" value='spiral_binding' onChange={changeBindingStatus} />
                            <div className="text">
                                <span >Spiral Binding</span>
                                <div className="price">
                                    {/* <span className='price cancel'>$25.00</span> */}
                                    <span className='price'>₹9/- Upto 100 Pages</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="buttons">
                    <input type="submit" name="" id="" value={'Add New'} className='btnLarge' onClick={addNewButtonClick} />
                    <input type="submit" name="" id="" value={'Next'} className='btnLarge' onClick={handelSubmit} />

                </div>

                {/* </form> */}
            </div>
        </div>
    )

    function handelSubmit(event: any) {

        let isSingleSuccess = false
        let fileLen = files.length

        for (let i = 0; i < fileLen; i++) {
            // Check uploading
            if (files[i].status === 'uploading') {
                updateAlertBoxDetails({
                    active: true,
                    title: 'Please Wait',
                    content: 'Please wait, your documents are uploading.',
                    buttonText: 'OK'
                })
                return
            }

            // Count uploaded files
            if (files[i].status === 'uploaded' && !isSingleSuccess)
                isSingleSuccess = true
        }

        if (!isSingleSuccess) {
            updateAlertBoxDetails({
                active: true,
                title: 'Select File',
                content: 'Please upload a PDF file to continue.',
                buttonText: 'OK'
            })
            return
        }



        // const orderID = localStorage.getItem('currentOrderID')
        sendCurrentData()
        // Now store other details in localStorage and go to next page
        // const formData = {
        //     'order_id': orderID,
        // }
        // localStorage.setItem('currentOrderDetails', JSON.stringify(formData))
        navigate('/deliveryAddress', { replace: true })
    }
}

export default NewOrder