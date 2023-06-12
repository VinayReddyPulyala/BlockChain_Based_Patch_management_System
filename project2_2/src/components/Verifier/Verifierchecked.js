import React, { useContext, useEffect, useState } from 'react'
import Web3 from "web3";
import VerifierContext from './createcontext';
function Verifierchecked() {
  let { Account, contract } = useContext(VerifierContext);
  let [Patches, setPatches] = useState([]);
  useEffect(() => {
    async function fun() {
      if (contract.methods !== undefined) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        patches = patches.filter((val, ind) => {
          return val.verifystatus !== "in Progress";
        }).reverse();
        setPatches(patches);
      }
    }
    fun();
  }, [contract]);
  let handledownload = async (patchname, version, filename) => {
    const web3 = new Web3(window.ethereum);
    let data = await contract.methods.download(patchname, version).call();
    const blob = new Blob([new Uint8Array(web3.utils.hexToBytes(data))], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}`;
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
        {Patches.map((val, ind) => {
          return (
            <div className="card my-3" key={ind}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Patch_No : {val.patchno}</h6>
                  <h5 className={(val.verifystatus === "Success") ? "text-success" : "text-danger"}>{val.verifystatus}</h5>
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
                        <td>{val.patchfeatures.split("</br>")[0]}<br />{val.patchfeatures.split("</br>")[1]}</td>
                      </tr>
                      <tr>
                        <td>version :</td>
                        <td>{val.version}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="btn btn-light" onClick={() => {
                handledownload(val.patchname, val.version, val.filename);
              }}>Download ( {val.filename} )</button>
            </div>
          )
        })}
      </>
    )
  }
}

export default Verifierchecked;
