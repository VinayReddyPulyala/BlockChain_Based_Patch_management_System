import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import Axios from "axios";
function Labeller() {
    let [software, setSoftware] = useState("");
    let [account, setAccount] = useState("");
    let [contract, setContract] = useState({});
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let { ethereum } = window;
    useEffect(() => {
        async function func1() {
            let accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            const web3 = new Web3(window.ethereum);
            let abi = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        }
                    ],
                    "name": "Accept",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        }
                    ],
                    "name": "Reject",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "no",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "metadata",
                            "type": "bytes"
                        },
                        {
                            "internalType": "string",
                            "name": "filename",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "sft",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "features",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        }
                    ],
                    "name": "addpatch",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "adminrequests",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "timestamp",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "no",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "software",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "bugs",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "features",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "status",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct request[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        }
                    ],
                    "name": "deploy",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        }
                    ],
                    "name": "download",
                    "outputs": [
                        {
                            "internalType": "bytes",
                            "name": "",
                            "type": "bytes"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "hash",
                            "type": "string"
                        }
                    ],
                    "name": "getpatch",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "patchno",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "patchfile",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "string",
                                    "name": "filename",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "software",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "patchfeatures",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "timestamp",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "verifystatus",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "deploystatus",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deploytime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "version",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "reuploaded",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct patch",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getpatchhash",
                    "outputs": [
                        {
                            "internalType": "string[]",
                            "name": "",
                            "type": "string[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "software",
                            "type": "string"
                        }
                    ],
                    "name": "labeller",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "bugdesc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "status",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "priority",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct bug[]",
                            "name": "",
                            "type": "tuple[]"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "featurename",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "status",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "priority",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct feature[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "str",
                            "type": "string"
                        }
                    ],
                    "name": "patchhistory",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "usname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "timestamp",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct userdwnd[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "software",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "bugindex",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "imp",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "featureindex",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "fimp",
                            "type": "string[]"
                        }
                    ],
                    "name": "prioritychange",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "sft",
                            "type": "string"
                        }
                    ],
                    "name": "ptchcount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "no",
                            "type": "uint256"
                        }
                    ],
                    "name": "reqsta",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "software",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "bugsind",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "featuresind",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "requestpatch",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "returndwndpatches",
                    "outputs": [
                        {
                            "internalType": "string[]",
                            "name": "",
                            "type": "string[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        }
                    ],
                    "name": "reupldstts",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "pchname",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "version",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "usname",
                            "type": "string"
                        }
                    ],
                    "name": "userdownload",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "software",
                            "type": "string"
                        },
                        {
                            "internalType": "string[]",
                            "name": "rptdbugs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "rptdfeatures",
                            "type": "string[]"
                        }
                    ],
                    "name": "userreport",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ];
            let address = "0xcFf4D5e7d63e981557cc6cECd5Fa775cCbfb9557";
            let Contract = new web3.eth.Contract(abi, address);
            setContract(Contract);
        }
        func1();
        async function retrieve() {
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
        retrieve();
    }, [bugs]);
    let handlesoftwarechange = (event) => {
        setSoftware(event.target.value);
    }
    return (
        <div className="container my-5 border border-secondary">
            <h3>LABELLER</h3>
            <div className="container my-3">
                <div className="col-6 col-sm-3 col-md-2">
                    <select id="Software" className="form-select" defaultValue="Software" aria-label="Default select example" onChange={handlesoftwarechange}>
                        <option disabled>Software</option>
                        <option value="Software1">Software_1</option>
                        <option value="Software2">Software_2</option>
                        <option value="Software3">Software_3</option>
                    </select>
                </div>
                <div className="row my-5">
                    <div id="bugs" className="col-lg border border-secondary m-1 p-3 mb-2">
                        {(() => {
                            if (bugs.length === 0) {
                                return (
                                    <div>No Data Available....</div>
                                )
                            }
                            else {
                                return (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Bug</th>
                                                <th>Priority</th>
                                                <th>status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bugs.map((val, ind) => {
                                                return (
                                                    <tr key={ind}>
                                                        <td>{ind + 1}</td>
                                                        <td>{val.bugdesc}</td>
                                                        {(() => {
                                                            if (val.bugpriority !== 0) {
                                                                return (
                                                                    <td>{val.bugpriority}</td>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <td>
                                                                        <select className="form-select">
                                                                            <option>NA</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                    </td>
                                                                )
                                                            }
                                                        })()}
                                                        <td>{val.bugstatus}</td>
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
                            if (features.length === 0) {
                                return (
                                    <div>No Data Available....</div>
                                )
                            }
                            else {
                                return (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Feature</th>
                                                <th>Priority</th>
                                                <th>status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {features.map((val, ind) => {
                                                return (
                                                    <tr key={ind}>
                                                        <td>{ind + 1}</td>
                                                        <td>{val.featuredescription}</td>
                                                        {(() => {
                                                            if (val.featurepriority !== 0) {
                                                                return (
                                                                    <td>{val.featurepriority}</td>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <td>
                                                                        <select className="form-select">
                                                                            <option>NA</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                    </td>
                                                                )
                                                            }
                                                        })()}
                                                        <td>{val.featurestatus}</td>
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
                        <button className="btn btn-primary">Commit Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Labeller
