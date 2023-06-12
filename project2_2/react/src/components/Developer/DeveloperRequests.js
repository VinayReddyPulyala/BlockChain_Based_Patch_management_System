import React, { useContext, useEffect, useState } from 'react'
import DeveloperContext from './createcontext'
import { useNavigate } from 'react-router-dom';
function DeveloperRequests() {
  let { Account, contract } = useContext(DeveloperContext);
  let [requests, setRequests] = useState([]);
  let Navigate = useNavigate();
  useEffect(() => {
    async function fun() {
      if (contract.methods !== undefined) {
        let reqsts = await contract.methods.adminrequests().call();
        reqsts = reqsts.filter((val,ind)=>{
          return val.status !== "resolved";
        });
        reqsts.reverse();
        setRequests(reqsts);
      }
    }
    fun();
  }, [contract]);
  console.log(requests);
  return (
    <div className="col-8 mx-auto my-5" id="requests">
      {requests.map((val, ind) => {
        return (
          <div className="card my-3" key = {ind}>
            <div className="card-body">
              <h4 className="card-title">Request_No : {val.no}</h4>
              <div className="col-12">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>software :</td>
                      <td>{val.software}</td>
                    </tr>
                    <tr>
                      <td>Requested On :</td>
                      <td>{new Date(val.timestamp*1000).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>features :</td>
                      <td>Bug Fixes  - {val.bugs} <br /> Additional Features  - {val.features}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-sm-end justify-content-center">
                <button className="btn btn-primary" onClick={()=>{
                  Navigate('/Developer/patchregistration');
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
  )
}

export default DeveloperRequests
