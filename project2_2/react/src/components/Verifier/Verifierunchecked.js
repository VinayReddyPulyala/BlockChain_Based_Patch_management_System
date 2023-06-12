import React, { useContext, useEffect, useState } from 'react'
import VerifierContext from './createcontext';
function Verifierunchecked() {
  let { Account, contract } = useContext(VerifierContext);
  let [Patches, setPatches] = useState([]);
  useEffect(() => {
    async function fun() {
      if (contract.methods !== undefined) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        setPatches(patches.filter((val, ind) => {
          return val.verifystatus === "in Progress";
        }));
      }
    }
    fun();
  }, [contract]);
  let handleconfirm = async (patchname, version) => {
    try {
      await contract.methods.Accept(patchname, version).send({ from: Account });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      alert("Error : This Action can be performed only by the Verifier");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
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
            <div className="card my-3">
              <div className="card-body" key={ind}>
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Patch_No : 7</h6>
                  <div className="d-flex justify-content-between">
                    <button className="btn mx-3 btn-primary" onClick={() => {
                      handleconfirm(val.patchname, val.version);
                    }}>Confirm</button>
                    <button className="btn mx-3 btn-danger">Deny</button>
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
            </div>
          )
        })}
      </>
    )
  }
}

export default Verifierunchecked;
