import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import AccountContext from '../AccountContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Adminreq() {
    let { contract } = useContext(context);
    let { Account } = useContext(AccountContext);
    let [software, setSoftware] = useState("");
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let [bugindex, setbind] = useState([]);
    let [featureindex, setfid] = useState([]);
    let Navigate = useNavigate();

    useEffect(() => {
        console.log(contract);
        console.log(Account);
    }, [contract]);
    let handlesoftchange = async (event) => {
        setSoftware(event.target.value);
        let { 0: bgs, 1: ftrs } = await contract.methods.labeller(event.target.value).call();
        setBugs(bgs);
        setFeatures(ftrs);
    }
    async function handlerequest() {
        let bugind = [];
        for (let i = 0; i < bugindex.length; i++) {
            if (document.getElementById("bug-" + bugindex[i]).checked) {
                bugind.push(bugindex[i]);
            }
        }
        let featureind = [];
        for (let i = 0; i < featureindex.length; i++) {
            if (document.getElementById("feature-" + featureindex[i]).checked) {
                featureind.push(featureindex[i]);
            };
        };
        console.log(bugind, featureind);
        if (bugind.length !== 0 && featureind.length !== 0) {
            try {
                let encodedbug = "";
                let arrencodebug = [];
                let encodedfeature = "";
                let arrencodefeature = [];
                for (let i = 0; i < bugind.length; i++) {
                    encodedbug += (bugs[bugind[i]].bugname) + ((i !== bugind.length - 1) ? ", " : "");
                    arrencodebug.push(bugs[bugind[i]].bugname)
                }
                for (let i = 0; i < featureind.length; i++) {
                    encodedfeature += (features[featureind[i]].featurename) + ((i !== featureind.length - 1) ? ", " : "");
                    arrencodefeature.push(features[featureind[i]].featurename);
                }
                let res = await contract.methods.requestpatch(software, encodedbug, encodedfeature, arrencodebug, arrencodefeature).send({ from: Account });
                document.getElementById("tx").innerHTML = `Request sent, Your Transaction Hash : ${res.transactionHash}`;
                try {
                    await axios.post("http://localhost:8800/txhistory/uploadtx", {
                        role: "admin",
                        tx: res.transactionHash,
                        desc: "Request for a Patch",
                        status: "Success"
                    });
                    setTimeout(() => {
                        Navigate("/admin");
                    }, 5000);
                } catch (err) {
                    alert("Transaction Successfull Failed to Upload to database!");
                }
            } catch (err) {
                console.log(err);
                console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);
                if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
                    alert("User denied transaction signature");
                }
                else if (err.mesage.includes("[ethjs-query] while formatting outputs from RPC")) {
                    try {
                        alert("Only Admin has authority to do this..");
                        await axios.post("http://localhost:8800/txhistory/uploadtx", {
                            role: "Developer",
                            tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
                            desc: "Deploy a Patch",
                            status: "Failed"
                        });
                        setTimeout(() => {
                            Navigate("/Developer");
                        }, 5000);
                    } catch (err) {
                        alert("Transaction Successfull Failed to Upload to database!");
                    }
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
            }
        }
        else {
            alert("Select the bugs to be sent");
        }

    }
    return (
        <div className="container my-5 col-11 mx-auto">
            <div className="container my-3">
                <div className="col-6 col-sm-3 col-md-2">
                    <select id="Software" className="form-select" aria-label="Default select example" defaultValue="Software" onChange={(event) => {
                        handlesoftchange(event);
                    }}>
                        <option disabled>Software</option>
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
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Bug</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bugs.map((val, ind) => {
                                                console.log(val.status)
                                                if (val.status == "unresolved") {
                                                    bugindex.push(ind);
                                                    return (
                                                        <tr key={ind}>
                                                            <td>
                                                                <input type="checkbox" id={"bug-" + ind} />
                                                            </td>
                                                            <td>
                                                                {val.bugname}
                                                                <span title={val.bugdesc}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td>{val.priority}</td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (<></>)
                                                }
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
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Feature</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {features.map((val, ind) => {
                                                if (val.status == "unresolved") {
                                                    featureindex.push(ind);
                                                    return (
                                                        <tr key={ind}>
                                                            <td>
                                                                <input type="checkbox" id={"feature-" + ind} />
                                                            </td>
                                                            <td>
                                                                {val.featurename}
                                                                <span title={val.featuredesc}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                                    </svg>
                                                                </span>
                                                            </td>
                                                            <td>{val.priority}</td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (<></>)
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                )
                            }
                        })()}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={() => {
                            handlerequest();
                        }}>Request Patch</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminreq;
