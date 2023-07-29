import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import AccountContext from '../AccountContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OverlayTrigger, Popover } from 'react-bootstrap';

function Adminreq() {
    let { contract } = useContext(context);
    let { Account } = useContext(AccountContext);
    let [software, setSoftware] = useState("");
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let [bugindex, setbind] = useState([]);
    let [featureindex, setfid] = useState([]);
    let [name, setname] = useState("");
    let [desc, setdesc] = useState("");

    let Navigate = useNavigate();

    useEffect(() => {
        console.log(contract);
        console.log(Account);
    }, [contract]);

    let PopoverContent = (
        <Popover id="popover-basic">
            <Popover.Header as="h4">{name}</Popover.Header>
            <Popover.Body>{desc}</Popover.Body>
        </Popover>
    );


    let handlesoftchange = async (event) => {
        setSoftware(event.target.value);
        let { 0: bgs, 1: ftrs } = await contract.methods.labeller(event.target.value).call();
        setBugs(bgs);
        setFeatures(ftrs);
    }

    let generateerror = (err) => {
        toast.error(err, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    let generatesuccess = (mes) => {
        toast.success(mes, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    async function handlerequest() {
        let bugind = [];
        let bugidx = Array.from(new Set(bugindex));
        let featureidx = Array.from(new Set(featureindex));
        console.log(bugidx,featureidx);
        for (let i = 0; i < bugidx.length; i++) {
            if (document.getElementById("bug-" + bugidx[i]).checked) {
                bugind.push(bugidx[i]);
            }
        }
        let featureind = [];
        for (let i = 0; i < featureidx.length; i++) {
            if (document.getElementById("feature-" + featureidx[i]).checked) {
                featureind.push(featureidx[i]);
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
                try {
                    generatesuccess(`Transaction Successfull Your Transaction hash : ${res.transactionHash}`);
                    await axios.post("http://localhost:8800/txhistory/uploadtx", {
                        role: "admin",
                        tx: res.transactionHash,
                        desc: "Request for a Patch",
                        status: "Success"
                    });
                } catch (err) {
                    generateerror("Error while storing the transaction hash");
                }
                setTimeout(() => {
                    Navigate("/admin");
                }, 4000);
            } catch (err) {
                console.log(err);
                console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);
                if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
                    generateerror("User denied transaction signature");
                }
                else if (err.mesage.includes("[ethjs-query] while formatting outputs from RPC")) {
                    try {
                        generateerror("Only Admin has authority to do this..");
                        await axios.post("http://localhost:8800/txhistory/uploadtx", {
                            role: "Developer",
                            tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
                            desc: "Deploy a Patch",
                            status: "Failed"
                        });
                    } catch (err) {
                        generateerror("Error while storing the transaction hash");
                    }
                }
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            }
        }
        else {
            generateerror("Please select bugs and features to send a request");
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
                    <div className='col-lg'>
                        <h3>
                            Bugs
                        </h3>
                        <div id="bugs" className="col-lg border border-secondary m-1 p-3 mb-2 overflow-y-auto" style={{ height: "300px" }}>
                            {(() => {
                                if (bugs.length === 0) {
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
                                                                    <OverlayTrigger trigger="click" placement="right" overlay={PopoverContent} rootClose={true} >
                                                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                                                            setname(val.bugname);
                                                                            setdesc(val.bugdesc);
                                                                        }}>
                                                                            {val.bugname}{' '}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                                            </svg>
                                                                        </span>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                <td>{val.priority}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                    <div className='col-lg'>
                        <h3>
                            Features
                        </h3>
                        <div id="features" className="col-lg border border-secondary m-1 p-3 mb-2 overflow-y-auto" style={{ height: "300px" }}>
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
                                                                    <OverlayTrigger trigger="click" placement="right" overlay={PopoverContent} rootClose={true} >
                                                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                                                            setname(val.featurename);
                                                                            setdesc(val.featuredesc);
                                                                        }}>
                                                                            {val.featurename}{' '}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                                            </svg>
                                                                        </span>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                <td>{val.priority}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                            </tbody>
                                        </table>
                                    )
                                }
                            })()}
                        </div>
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
