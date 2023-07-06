import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import AccountContext from '../AccountContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Web3Storage } from 'web3.storage'
import axios from 'axios';

function DevReg() {
  let { contract } = useContext(context);
  let { Account } = useContext(AccountContext);
  let [Patchno, setPatchno] = useState(0);
  let [file, setFile] = useState([]);
  let [patchname, setPatchname] = useState("");
  let [progress,setProgress] = useState(0);
  const location = useLocation();
  let Navigate = useNavigate();

  useEffect(() => {
    async function func() {
      let pcthno = await contract.methods.ptchcount(location.state.software).call();
      if (location.state.from == "request") {
        setPatchno(parseInt(pcthno) + 1);
        setPatchname(location.state.software + " - " + (parseInt(pcthno) + 1));
      }
      else {
        setPatchno(location.state.patchno);
        setPatchname(location.state.software + " - " + location.state.patchno);
      }
    }
    func();
  }, [contract]);
  let upload = async (event) => {
    event.preventDefault();
    console.log(file);
    let client = new Web3Storage({ token: process.env.REACT_APP_apikey });
    const { cid } = await client.putWithProgress(file, {
      onProgress: (progress) => {
        setProgress(progress * 100);
      },
    });
    console.log(cid);
    try {
      let res;
      if (location.state["from"] == "request") {
        res = await contract.methods.addPatchandUpdateRequest(Patchno, cid, file[0].name, patchname, location.state.software, location.state.bugs, location.state.features, parseInt(location.state.version), Number(location.state["reqno"]) - 1).send({ from: Account });
      }
      else if (location.state["from"] == "rejects") {
        res = await contract.methods.addPatchandUpdateReuploadStatus(Patchno, cid, file[0].name, patchname, location.state.software, location.state.bugs, location.state.features, parseInt(location.state.version), location.state.version - 1).send({ from: Account });
      }
      try {
        await axios.post("http://localhost:8800/txhistory/uploadtx", {
          role: "Developer",
          tx: res.transactionHash,
          desc: "Upload a Patch",
          status: "Success"
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
    } catch (err) {
      console.log(err);
      console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);
      if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
        alert("User denied transaction signature");
      }
      else if (err.message.includes("[ethjs-query] while formatting outputs from RPC")) {
        try {
          alert("Only Developer has authority to do this..");
          await axios.post("http://localhost:8800/txhistory/uploadtx", {
            role: "Developer",
            tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
            desc: "Upload a Patch",
            status: "Failed"
          });
          setTimeout(() => {
            Navigate("/Developer");
          }, 5000);
        } catch (err) {
          alert("Transaction Failed to Upload to database!");
        }
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }
  }
  return (
    <div className="col-8 mx-auto my-5">
      <form>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="patchFile">Patch_File.</label>
          <div className="col-sm col-sm-5 col-lg-4">
            <input type="file" className="form-control" id="patchFile" onChange={(event) => {
              setFile(event.target.files);
            }} required />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="patchNo">Patch_No.</label>
          <div className="col-sm col-sm-3 col-lg-2">
            <input type="number" className="form-control" id="patchNo" value={Patchno} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="Software">Software</label>
          <div className="col-sm col-sm-4">
            <input type="text" className="form-control" id="Software" value={location.state.software} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="patchname">Patch_Name</label>
          <div className="col-sm col-sm-5">
            <input type="text" className="form-control" id="patchname" value={patchname} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="version">Version</label>
          <div className="col-sm col-sm-3 col-lg-2">
            <input type="text" className="form-control" id="Version" value={location.state.version} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="bugs">BugFixes</label>
          <div className="col-sm col-sm-6">
            <textarea id="bugs" className="form-control" rows="4" value={location.state.bugs} readOnly></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" htmlFor="features">Features</label>
          <div className="col-sm col-sm-6">
            <textarea id="features" className="form-control" rows="4" value={location.state.features} readOnly></textarea>
          </div>
        </div>
        <input type="submit" className="d-block btn btn-primary" value="Register" onClick={upload} />
      </form>
    </div>
  )
}

export default DevReg;
