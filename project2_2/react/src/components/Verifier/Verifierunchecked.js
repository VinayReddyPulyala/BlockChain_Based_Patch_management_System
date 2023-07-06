import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import AccountContext from '../AccountContext';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Bugfeaturedesc from '../Bugfeaturedesc';

function Verifierunchecked() {
  const { contract } = useContext(context);
  let { Account } = useContext(AccountContext);
  let [Patches, setPatches] = useState([]);
  let [bugs,setBugs] = useState([]);
  let [features,setFeatures] = useState([]);
  let [software,setsoftware] = useState("");
  let Navigate = useNavigate();

  useEffect(() => {
    async function fun() {
      if (contract.methods !== undefined) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        setPatches(patches.filter((val, ind) => {
          return val.verifystatus !== "in Progress";
        }));
      }
    }
    fun();
  }, [contract]);
  console.log(Account);


  let handleconfirm = async (patchname, version) => {
    try {
      let res = await contract.methods.Accept(patchname, version).send({ from: Account });
      try {
        await axios.post("http://localhost:8800/txhistory/uploadtx", {
          role: "verifier",
          tx: res.transactionHash,
          desc: "Patch Verification",
          status: "Success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (err) {
        alert("Transaction Successfull Failed to Upload to database!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

    } catch (err) {
      console.log(err);
      console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);

      if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
        alert("User denied transaction signature");
      }
      else if (err.message.includes("[ethjs-query] while formatting outputs from RPC")) {
        try {
          await axios.post("http://localhost:8800/txhistory/uploadtx", {
            role: "verifier",
            tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
            desc: "Patch Verification",
            status: "Failed"
          });
          setTimeout(() => {
            Navigate("/verifier");
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


  let handledeny = async (patchname, version) => {
    try {
      let res = await contract.methods.Reject(patchname, version).send({ from: Account });
      try {
        await axios.post("http://localhost:8800/txhistory/uploadtx", {
          role: "verifier",
          tx: res.transactionHash,
          desc: "Patch Verification",
          status: "Success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (err) {
        alert("Transaction Successfull Failed to Upload to database!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

    } catch (err) {
      console.log(err);
      console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);

      if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
        alert("User denied transaction signature");
      }
      else if (err.message.includes("[ethjs-query] while formatting outputs from RPC")) {
        try {
          await axios.post("http://localhost:8800/txhistory/uploadtx", {
            role: "verifier",
            tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
            desc: "Patch Verification",
            status: "Failed"
          });
          setTimeout(() => {
            Navigate("/verifier");
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


  let handledownload = async (cid, filename) => {
    let client = new Web3Storage({ token: process.env.REACT_APP_apikey });
    let file = await client.get(cid);
    const data = await file.files();
    const url = URL.createObjectURL(data[0]);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }


  if (Patches.length === 0) {
    return (
      <div>
        No Data Available..
      </div>
    )
  }

  else {
    return (
      <>
        <Bugfeaturedesc bugs={bugs} features={features} software={software}/>
        {Patches.map((val, ind) => {
          return (
            <div className="card my-3" key={ind}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Patch_No : {val.patchno}</h6>
                  <div className="d-flex justify-content-between">
                    <button className="btn mx-3 btn-primary" onClick={() => {
                      handleconfirm(val.patchname, val.version);
                    }}>Confirm</button>
                    <button className="btn mx-3 btn-danger" onClick={() => {
                      handledeny(val.patchname, val.version);
                    }}>Deny</button>
                  </div>
                </div>
                <div className="col-6 col-sm-4 col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>patchname :</td>
                        <td>{val.patchname}</td>
                      </tr>
                      <tr>
                        <td>software :</td>
                        <td>{val.software}</td>
                      </tr>
                      <tr>
                        <td>timestamp :</td>
                        <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>patchfeatures :</td>
                        <td>{val.patchfeatures}</td>
                      </tr>
                      <tr>
                        <td>Bug Fixes :</td>
                        <td>{val.bugfixes}</td>
                      </tr>
                      <tr>
                        <td>version :</td>
                        <td>{val.version}</td>
                      </tr>
                      <tr>
                          <td colSpan={2}>
                            <i className='fw-semibold' >Bugs and Features Description</i>
                            <span title="click to get the description" data-bs-toggle="modal"
                              data-bs-target="#exampleModal1" onClick={async () => {
                                setBugs(val.bugs.split(", "));
                                setFeatures(val.features.split(", "));
                                setsoftware(val.software);
                              }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                            </span>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="btn btn-light" onClick={() => {
                handledownload(val.cid, val.filename);
              }}>Download ( {val.filename} )</button>
            </div>
          )
        })}
      </>
    )
  }
}

export default Verifierunchecked;
