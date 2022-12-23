import '../scss/pages/newOrder.scss'
import TitleHeader from '../components/TitleHeader'
import icons from '../assets/icon'
import { useCallback, useRef, useState } from 'react'
function NewOrder() {
    const [noOfCopies, uNoOfCopies] = useState<any>(null)

    const colorRadio1 = useRef<any>()
    const colorRadio2 = useRef<any>()
    const colorRadio3 = useRef<any>()
    const pageSide1 = useRef<any>()
    const pageSide2 = useRef<any>()



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
    return (
        <div id="newOrder">
            <TitleHeader title='Printing Details' />
            <div className="container">

                <div className="fileDiv">
                    <div className="left">
                        <img src={icons.file_pdf_solid} />
                        <span className="fileName noSelect">Attach a PDF file</span>
                    </div>

                    <div className="right">
                        <img src={icons.plus_solid} />
                    </div>
                </div>



                <div className="details">
                    <p className="label">Details</p>
                    <input type="text" className='inp title' placeholder='Title of your document' />
                    <textarea name="Instructions" id="instructions" rows={2}
                        placeholder='Enter any instructions that should be carried out while printing your file.'
                    ></textarea>
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
                            <input ref={colorRadio1} type="radio" name="printColor" id="color1" value='b&w' />
                            <span>Black & White</span>
                        </div>
                        <div className="select" onClick={() => { colorRadio2.current.click() }}>
                            <input ref={colorRadio2} type="radio" name="printColor" id="color1" value='color' />
                            <span>Color</span>
                        </div>
                        <div className="select" onClick={() => { colorRadio3.current.click() }}>
                            <input ref={colorRadio3} type="radio" name="printColor" id="color1" value='multicolor' />
                            <span>Multicolor</span>
                        </div>
                    </div>
                </div>

                <div className="selectPage">
                    <p className="label">Page Sides</p>
                    <div className="selectPage">
                        <div className="select" onClick={() => { pageSide2.current.click() }}>
                            <input ref={pageSide2} type="radio" name="pageSide" id="color1" value='b&w' />
                            <div className="text">
                                <span >Two-Sided</span>
                                <div className="price">
                                    <span className='price cancel'>$1.00</span>
                                    <span className='price'>$0.55/page</span>
                                </div>
                            </div>
                        </div>
                        <div className="select" onClick={() => { pageSide1.current.click() }}>
                            <input ref={pageSide1} type="radio" name="pageSide" id="color1" value='b&w' />
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
                <input type="submit" name="" id="" value={'Next'} className='btnLarge' />

            </div>
        </div>
    )
}

export default NewOrder