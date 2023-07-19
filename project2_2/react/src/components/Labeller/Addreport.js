import React, { useContext, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import AccountContext from '../AccountContext';
import context from '../../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Addreport = () => {
    let bugref = useRef(null);
    let featureref = useRef(null);
    let { Account } = useContext(AccountContext);
    let [bugcount, setbugCount] = useState(1);
    let [featurecount, setFeaturecount] = useState(1);
    let { contract } = useContext(context);
    let [software, setsoftware] = useState("");
    let Navigate = useNavigate();

    console.log(contract);
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

    let upload = async (e) => {
        e.preventDefault();
        let bugs = [];
        let features = [];
        for (let i = 1; i <= bugcount; i++) {
            let obj = {};
            obj["bugname"] = document.getElementById("Bugname" + i).value;
            obj["status"] = "unresolved";
            obj["priority"] = document.getElementById("bugpriority" + i).value;
            obj["bugdesc"] = document.getElementById("bugDescription" + i).value;
            if(obj["bugdesc"] == "" || obj["bugname"] == "" || obj["priority"==""] || obj["status"]==""){
                generateerror("Please fill the form completely");
                return ;
            }
            bugs.push(obj);
        }
        for (let i = 1; i <= featurecount; i++) {
            let obj = {};
            obj["featurename"] = document.getElementById("Featurename" + i).value;
            obj["status"] = "unresolved";
            obj["priority"] = document.getElementById("featurepriority" + i).value;
            obj["featuredesc"] = document.getElementById("featureDescription" + i).value;
            if(obj["featuredesc"] == "" || obj["featurename"] == "" || obj["priority"==""] || obj["status"]==""){
                generateerror("Please fill the form completely");
                return ;
            }
            features.push(obj);
        }
        console.log(software, bugs, features);
        console.log(Account + "GHJK");
        try {
            let res = await contract.methods.labellerreport(software, bugs, features).send({ from: Account });
            try {
                generatesuccess(`Transaction Successfull Your Transaction hash : ${res.transactionHash}`);
                await axios.post("http://localhost:8800/txhistory/uploadtx", {
                    role: "labeller",
                    tx: res.transactionHash,
                    desc: "Bug and Feature Upload",
                    status: "Success"
                });
            } catch (err) {
                generateerror("Transaction Successfull Failed to Upload to database!");
            }
            setTimeout(() => {
                Navigate("/labeller");
            }, 3000);
        } catch (err) {
            console.log(err);
            console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);
            if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
                generateerror("User denied transaction signature");
            }
            else if (err.message.includes("[ethjs-query] while formatting outputs from RPC")) {
                try {
                    generateerror("Only labeller has authority to do this..");
                    await axios.post("http://localhost:8800/txhistory/uploadtx", {
                        role: "labeller",
                        tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
                        desc: "Bug and feature upload",
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
    let addbug = () => {
        setbugCount(bugcount + 1);
        let bugElement = (
            <div className="mb-2 border border-light p-3 pt-4">
                <div className="row mb-3">
                    <label className="col-sm-4 form-label" htmlFor={"Bugname" + (bugcount + 1)}>Bugname</label>
                    <div className="col-sm col-sm-5 col-lg-6">
                        <input type="text" className="form-control" id={"Bugname" + (bugcount + 1)} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 form-label" htmlFor={"bugpriority" + (bugcount + 1)}>Priority</label>
                    <div className="col-sm col-sm-3 col-lg-5">
                        <select className="form-select" id={"bugpriority" + (bugcount + 1)} required>
                            <option value="0">NA</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 form-label" htmlFor={"bugDescription" + (bugcount + 1)}>Description</label>
                    <div className="col-sm col-sm-5 col-lg-8">
                        <textarea className="form-control" cols="30" rows="2" id={"bugDescription" + (bugcount + 1)} required></textarea>
                    </div>
                </div>
            </div>
        );
        let bugNode = ReactDOM.render(bugElement, document.createElement('div'));
        bugref.current.appendChild(bugNode);
    }
    let addfeature = () => {
        setFeaturecount(featurecount + 1);
        let featureElement = (
            <div className="mb-2 border border-light p-3 pt-4">
                <div className="row mb-3">
                    <label className="col-sm-4 form-label" htmlFor={"Featurename" + (featurecount + 1)}>Featurename</label>
                    <div className="col-sm col-sm-5 col-lg-6">
                        <input type="text" className="form-control" id={"Featurename" + (featurecount + 1)} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 form-label" htmlFor={"featurepriority" + (featurecount + 1)}>Priority</label>
                    <div className="col-sm col-sm-3 col-lg-5">
                        <select className="form-select" id={"featurepriority" + (featurecount + 1)} required>
                            <option value="0">NA</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 form-label" htmlFor={"featureDescription" + (featurecount + 1)}>Description</label>
                    <div className="col-sm col-sm-5 col-lg-8">
                        <textarea className="form-control" cols="30" rows="2" id={"featureDescription" + (featurecount + 1)} required></textarea>
                    </div>
                </div>
            </div>
        );
        let featureNode = ReactDOM.render(featureElement, document.createElement('div'));
        featureref.current.appendChild(featureNode);
    }
    let handlesoftchange = (e) => {
        setsoftware(e.target.value);
    }
    return (
        <div className='col-11 mx-auto my-3'>
            <div className="col-6 col-sm-3 col-md-2 my-3">
                <select id="Software" className="form-select" defaultValue="Software" aria-label="Default select example" onChange={handlesoftchange}>
                    <option disabled>Software</option>
                    <option value="Software1">Software_1</option>
                    <option value="Software2">Software_2</option>
                    <option value="Software3">Software_3</option>
                </select>
            </div>
            <div className='row'>
                <div className='col-lg'>
                    <h4>
                        Bugs
                    </h4>
                    <div className='col p-4 overflow-y-auto mb-2' ref={bugref} style={{ height: "300px" }}>
                        <div className="mb-2 border border-light p-3 pt-4">
                            <div className="row mb-3">
                                <label className="col-sm-4 form-label" htmlFor="Bugname1">Bugname</label>
                                <div className="col-sm col-sm-5 col-lg-6">
                                    <input type="text" className="form-control" id="Bugname1" required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 form-label" htmlFor="bugpriority1">Priority</label>
                                <div className="col-sm col-sm-3 col-lg-5">
                                    <select className="form-select" id="bugpriority1" required>
                                        <option value="0" disabled>NA</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 form-label" htmlFor="bugDescription1">Description</label>
                                <div className="col-sm col-sm-5 col-lg-8">
                                    <textarea className="form-control" cols="30" rows="2" id="bugDescription1" required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-info btn-sm ms-2 mb-3" onClick={addbug}>Add
                        bug</button>
                </div>
                <div className='col-lg'>
                    <h4>
                        Features
                    </h4>
                    <div className='col p-4 overflow-y-auto mb-2' ref={featureref} style={{ height: "300px" }}>
                        <div className="mb-2 border border-light p-3 pt-4">
                            <div className="row mb-3">
                                <label className="col-sm-4 form-label" htmlFor="Featurename1">Featurename</label>
                                <div className="col-sm col-sm-5 col-lg-6">
                                    <input type="text" className="form-control" id="Featurename1" required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 form-label" htmlFor="featurepriority1">Priority</label>
                                <div className="col-sm col-sm-3 col-lg-5">
                                    <select className="form-select" id="featurepriority1" required>
                                        <option value="0" disabled>NA</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 form-label" htmlFor="featureDescription1">Description</label>
                                <div className="col-sm col-sm-5 col-lg-8">
                                    <textarea className="form-control" cols="30" rows="2" id="featureDescription1" required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-info btn-sm ms-2 mb-3" onClick={addfeature}>Add
                        Feature</button>
                </div>
                <div className='d-flex justify-content-center my-3'>
                    <button className='btn btn-primary' onClick={(e) => {
                        upload(e);
                    }}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Addreport;
