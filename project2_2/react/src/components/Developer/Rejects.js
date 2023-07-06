import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import AccountContext from '../AccountContext';
import { useNavigate } from 'react-router-dom';
import Bugfeaturedesc from '../Bugfeaturedesc';
function Rejects() {
  let [Patches, setPatches] = useState([]);
  let { contract } = useContext(context);
  let [bugs,setBugs] = useState([]);
  let [features,setFeatures] = useState([]);
  let [software,setsoftware] = useState("");

  let Navigate = useNavigate();

  useEffect(() => {
    async function func() {
      if (contract.methods !== undefined) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        patches = patches.filter((val, ind) => {
          return val.verifystatus === "Fail" && val.reuploaded == 0
        });
        setPatches(patches);
      }
    }
    func();
  }, [contract]);
  async function handlereject(event, version, software, bugs, features, patchno) {
    event.preventDefault();
    Navigate('/Developer/patchregistration', { state: { "software": software, "bugs": bugs, "features": features, "from": "rejects", "version": version, "patchno": patchno } });
  }
  if (Patches.length === 0) {
    return (
      <div>No Data Available...</div>
    )
  }
  else {
    return (
      <>
        <Bugfeaturedesc bugs={bugs} features={features} software={software} />
        <div className="col-8 mx-auto my-5" id="rejects">
          {Patches.map((val, ind) => {
            return (
              <div key={ind} className="card my-3">
                <div className="card-body">
                  <h4 className="card-title">Patch_No : {val.patchno}</h4>
                  <div className="col-12">
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
                          <td>{val.patchfeatures} </td>
                        </tr>
                        <tr>
                          <td>Bug Fixes :</td>
                          <td>{val.bugfixes} </td>
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
                  <div className="d-flex justify-content-sm-end justify-content-center">
                    <button className="btn btn-primary" onClick={(event) => {
                      handlereject(event, parseInt(val.version) + 1, val.software, val.bugfixes, val.patchfeatures, val.patchno)
                    }}>Re-Upload
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
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
      </>
    )
  }
}


export default Rejects
