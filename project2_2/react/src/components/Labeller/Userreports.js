import React, { useState } from 'react'
import Axios from 'axios';
import useAuth from '../useAuth';
const Userreports = () => {
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let handlesoftwarechange = (event) => {
        let software = event.target.value;
        Axios.get("http://localhost:8800/bugs", {
            params: {
                "software": software,
            }
        }).then((res) => {
            setBugs(res.data);
        }).catch((error) => {
            console.log(error);
        })
        Axios.get("http://localhost:8800/features", {
            params: {
                "software": software,
            }
        }).then((res) => {
            setFeatures(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="container my-3">
            <div className="col-6 col-sm-3 col-md-2">
                <select id="Software" className="form-select" defaultValue="Software" aria-label="Default select example" onChange={handlesoftwarechange}>
                    <option disabled>Software</option>
                    <option value="Software1">Software_1</option>
                    <option value="Software2">Software_2</option>
                    <option value="Software3">Software_3</option>
                </select>
            </div>
            <div className="row my-2 p-2">
                <div className='col-lg'>
                    <h3>
                        Bugs
                    </h3>
                    <div id="bugs" className="border border-secondary p-3 my-1 mb-2 me-1 overflow-y-auto" style={{ height: "400px" }}>
                        {(() => {
                            if (bugs.length === 0) {
                                return (
                                    <div>No Data Available....</div>
                                )
                            }
                            else {
                                return (
                                    <>
                                        {bugs.map((val, ind) => {
                                            return (
                                                <div className='border rounded p-2 m-2' key={ind}>
                                                    {val.bugdesc}
                                                </div>
                                            )
                                        })}
                                    </>
                                )
                            }
                        })()}
                    </div>
                </div>
                <div className='col-lg'>
                    <h3>
                        Features
                    </h3>
                    <div id="features" className="col-lg border border-secondary p-3 my-1 mb-2 me-1 overflow-y-auto" style={{ height: "400px" }}>
                        {(() => {
                            if (features.length === 0) {
                                return (
                                    <div>No Data Available....</div>
                                )
                            }
                            else {
                                return (
                                    <>
                                        {features.map((val, ind) => {
                                            return (
                                                <div className='border rounded p-2 m-2' key={ind}>
                                                    {val.featuredescription}
                                                </div>
                                            )
                                        })}
                                    </>
                                )
                            }
                        })()}
                    </div>
                </div>
                {/* <div className="d-flex justify-content-center">
                    <button className="btn btn-primary">Commit Changes</button>
                </div> */}
            </div>
        </div>
    )
}

export default Userreports
