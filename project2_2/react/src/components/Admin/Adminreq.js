import React, { useContext, useEffect, useState } from 'react'
import AdminContext from './createcontext';
import Axios from "axios";
function Adminreq() {
    let { contract, Account } = useContext(AdminContext);
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    useEffect(() => {
        console.log(contract);
        console.log(Account);
    }, [contract]);
    let handlesoftchange = (event) => {
        let software = event.target.value;
        Axios.get("http://localhost:8800/bugs", {
            params: {
                "software": software
            }
        }).then((res) => {
            let arr = res.data;
            let bgs = arr.filter((val,ind)=>{
                return (val.bugpriority !== 0);
            });
            console.log(bgs);
            setBugs(bgs);
        }).catch((error) => {
            console.log(error);
        });
        Axios.get("http://localhost:8800/features", {
            params: {
                "software": software
            }
        }).then((res) => {
            let arr = res.data;
            let ftrs = arr.filter((val,ind)=>{
                return (val.featurepriority !== 0);
            })
            console.log(ftrs);
            setFeatures(ftrs);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="container my-5">
            <div className="container my-3">
                <div className="col-6 col-sm-3 col-md-2">
                    <select id="Software" className="form-select" aria-label="Default select example" onChange={handlesoftchange}>
                        <option selected disabled>Software</option>
                        <option value="Software1">Software_1</option>
                        <option value="Software2">Software_2</option>
                        <option value="Software3">Software_3</option>
                    </select>
                </div>
                <div className="row my-3">
                    <div id="bugs" className="col-lg border border-secondary m-1 p-3 mb-2">
                        {(() => {
                            if (bugs.length == 0) {
                                return (
                                    <div>
                                        No Data Available.....
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Bug</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bugs.map((val, ind) => {
                                                return (
                                                    <tr key={ind}>
                                                        <td>
                                                            <input type="checkbox" id={"bug-" + ind} />
                                                        </td>
                                                        <td>{val.bugdesc}</td>
                                                        <td>{val.bugpriority}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )
                            }
                        })()}
                    </div>
                    <div id="features" className="col-lg border border-secondary m-1 p-3 mb-2">
                    {(() => {
                            if (features.length == 0) {
                                return (
                                    <div>
                                        No Data Available.....
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Bug</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {features.map((val, ind) => {
                                                return (
                                                    <tr key={ind}>
                                                        <td>
                                                            <input type="checkbox" id={"feature-" + ind} />
                                                        </td>
                                                        <td>{val.featuredescription}</td>
                                                        <td>{val.featurepriority}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )
                            }
                        })()}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary">Request Patch</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminreq;
