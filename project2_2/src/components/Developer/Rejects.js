import React, { useContext, useEffect, useState } from 'react'
import DeveloperContext from './createcontext';
function Rejects() {
  let [Patches, setPatches] = useState([]);
  let { Account, contract } = useContext(DeveloperContext);
  useEffect(() => {
    async function func() {
      if (contract.methods !== undefined) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        console.log(patches);
        patches = patches.filter((val, ind) => {
          return val.verifystatus === "Fail" && val.reuploaded == 0
        });
        setPatches(patches);
      }
    }
    func();
  }, [contract]);
  if (Patches.length === 0) {
    return (
      <div>No Data Available...</div>
    )
  }
  else {
    return (
      <div class="col-8 mx-auto my-5" id="rejects">
        {Patches.map((val, ind) => {
          return (
            <div class="card my-3">
              <div class="card-body">
                <h4 class="card-title">Patch_No : {val.patchno}</h4>
                <div class="col-12">
                  <table class="table table-borderless">
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
                        <td>{new Date(val.timestamp*1000).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>patchfeatures :</td>
                        <td>{val.patchfeatures.split("</br>")[0]} <br /> {val.patchfeatures.split("</br>")[1]} </td>
                      </tr>
                      <tr>
                        <td>version :</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-sm-end justify-content-center">
                  <button class="btn btn-primary">Re-Upload
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}


export default Rejects
