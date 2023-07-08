import React, { useState } from 'react'
import Adminreq from './Adminreq';
import GetRequests from './GetRequests';
const Requests = () => {
    let [req, setreq] = useState(0);
    return (
        <>
            <div className='d-flex flex-row justify-content-start'>
                <div className="form-check m-3 mb-1">
                    <input className="form-check-input" type="radio" defaultChecked  name="flexRadioDefault" id="flexRadioDefault1" onClick={()=>{
                        setreq(0)}
                        }/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Get Requests
                    </label>
                </div>

                <div className="form-check m-3 mb-1">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={()=>{
                        setreq(1)
                    }}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Request a Patch
                    </label>
                </div>
            </div>
            <div>
                {
                    (()=>{
                        if(req){
                            return (
                                <Adminreq />
                            )
                        }
                        else{
                            return (
                                <GetRequests/>
                            )
                        }
                    })()
                }
            </div>
        </>
    )
}

export default Requests
