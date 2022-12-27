import { useEffect, useRef, useState } from 'react'
import icons from '../assets/icon'
import AlertBox from '../components/AlertBox'
import TitleHeader from '../components/TitleHeader'
import joinLinks from '../linker'
import '../scss/pages/newOrder.scss'
import token from '../tokens'

const fileUploadAPILink = joinLinks('Orders/UploadDoc/')

function uuid(len: number) {
    const min = 10 ** (len - 1)
    const max = 10 ** len - 1
    const rand = Math.floor(min + Math.random() * (max - min))
    return "SSTPRNT" + rand
}


function NewOrder() {
    const [alertBoxDetails, updateAlertBoxDetails] = useState({ active: false, title: '', content: '', buttonText: '' })

    const [noOfCopies, uNoOfCopies] = useState<any>(1)
    const [files, updateFiles] = useState([{ fileName: '', uploaded: false, selected: false, failed: false }])
    const colorRadio1 = useRef<any>()
    const colorRadio2 = useRef<any>()
    const pageSide1 = useRef<any>()
    const pageSide2 = useRef<any>()

    const allFileInputs = useRef<any>([])
    // let fileCount = 0

    function addNewButtonClick() {
        // files
        const newFilesData = [...files]
        newFilesData.push({ fileName: '', uploaded: false, selected: false, failed: false })
        updateFiles(newFilesData)
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
            currentFileData.selected = true
            // currentFileData.uploaded = true
            updateFiles(newFilesData)
        }
    }
    function showFileStatus(file: any) {
        if (file.failed)
            return <img src={icons.circle_exclamation_solid}></img>
        if (file.selected) {
            if (file.uploaded)
                return <img src={icons.check_solid_accent}></img>
            else
                return <img src={icons.preloader} className='loading'></img>
        }
        else
            return <img src={icons.plus_solid} />
    }

    useEffect(() => {
        // const hello = randomUUID.
        const randomUUID = uuid(7)
        // console.log(randomUUID)
        localStorage.setItem('currentOrderID', randomUUID)
    }, [])

    function uploadFile(index: number) {
        return function () {
            const currentFile = allFileInputs.current[index].files[0]
            const bodyFormData = new FormData()
            bodyFormData.append('doc', currentFile)
            bodyFormData.append('order_id', localStorage.getItem('currentOrderID') || 'no-id')

            const reqData = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token.get('registrationToken')
                },
                body: bodyFormData
            }

            console.log(reqData)

            fetch(fileUploadAPILink, reqData)
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    const newFilesData = [...files]
                    if (data.status === 'true') {
                        // Show success icon
                        newFilesData[index].uploaded = true
                        updateFiles(newFilesData)
                    }
                    else {
                        // Show the failed icon
                        newFilesData[index].failed = true
                        updateFiles(newFilesData)
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
            />
            <TitleHeader title='Printing Details' />
            <div className="container">
                {/* <form action=""> */}
                {
                    files.map((file, index) => {
                        // console.log("Rendered Files")
                        return (
                            // <>
                            <div className="fileDiv" key={crypto.randomUUID() + '22'} onClick={() => (!files[index].selected) ? allFileInputs.current[index].click() : () => { }} onChange={uploadFile(index)}>
                                <input type="file" name="fileInput"
                                    ref={(element) => allFileInputs.current[index] = element}
                                    onChange={handelEachFileChange(index)}
                                />
                                <div className="left">
                                    <img src={icons.file_pdf_solid} />
                                    {file.selected ?
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
                    <input type="text" className='inp title' placeholder='Title of your document' />
                    <textarea name="Instructions" id="instructions" rows={2}
                        placeholder='Enter any instructions that should be carried out while printing your file.'
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
                            <input ref={colorRadio1} type="radio" name="printColor" id="color1" value='b&w' checked onChange={() => { }} />
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
                            <input ref={pageSide2} type="radio" name="pageSide" id="color1" value='2' checked onChange={() => { }} />
                            <div className="text">
                                <span >Two-Sided</span>
                                <div className="price">
                                    <span className='price cancel'>$1.00</span>
                                    <span className='price'>$0.55/page</span>
                                </div>
                            </div>
                        </div>
                        <div className="select" onClick={() => { pageSide1.current.click() }}>
                            <input ref={pageSide1} type="radio" name="pageSide" id="color1" value='1' />
                            <div className="text">
                                <span >One-Sided</span>
                                <div className="price">
                                    <span className='price cancel'>$1.5.00</span>
                                    <span className='price'>$0.65/page</span>
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
        // Check if all files are submitted or noSelect

        let isOk = true
        files.forEach(file => {
            if (file.uploaded == true || file.failed == true)
                return
            else
                isOk = false
        })

        if (!isOk) {
            updateAlertBoxDetails({
                active: true,
                title: 'Please Wait',
                content: 'Please wait, your documents are uploading',
                buttonText: 'OK'
            })
            return
        }
        const orderID = localStorage.getItem('currentOrderID')
        
        // Now store other details in localStorage and go to next page
        

        event.preventDefault()
        console.log("Submit")
        console.log(event)
    }
}

export default NewOrder