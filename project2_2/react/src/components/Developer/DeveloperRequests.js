import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../AccountContext';
import Bugfeaturedesc from '../Bugfeaturedesc';

function DeveloperRequests() {
  const { contract } = useContext(context);
  let [requests, setRequests] = useState([]);
  let Navigate = useNavigate();
  let [bugs, setBugs] = useState([]);
  let [features, setFeatures] = useState([]);
  let [software, setsoftware] = useState("");

  useEffect(() => {
    async function fun() {
      if (contract.methods !== undefined) {
        let reqsts = await contract.methods.adminrequests().call();
        reqsts = reqsts.filter((val, ind) => {
          return val.status !== "resolved";
        });
        reqsts.reverse();
        setRequests(reqsts);
      }
    }
    fun();
  }, [contract]);
  if (requests.length == 0) {
    return (
      <div>
        No Pending Requests....
      </div>
    )
  }
  else {
    return (
      <>
        <Bugfeaturedesc bugs={bugs} features={features} software={software}/>

        <div className="col-8 mx-auto my-5" id="requests">
          {requests.map((val, ind) => {
            return (
              <div className="card my-3 rounded-4 mb-5" key={ind}>
                <div className="card-body">
                  <h4 className="card-title">Request_No : {val.no}</h4>
                  <div className="col-12">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td>software :</td>
                          <td>{val.software}</td>
                        </tr>
                        <tr>
                          <td>Requested On :</td>
                          <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>Bug Fixes :</td>
                          <td>{val.bugs}</td>
                        </tr>
                        <tr>
                          <td>
                            Additional Features :
                          </td>
                          <td>
                            {val.features}
                          </td>
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
                    <button className="btn btn-primary" onClick={() => {
                      Navigate('/Developer/patchregistration', { state: { "software": val.software, "bugs": val.bugs, "features": val.features, "from": "request", "version": 0, "reqno": val.no } });
                    }}>Upload
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

export default DeveloperRequests
