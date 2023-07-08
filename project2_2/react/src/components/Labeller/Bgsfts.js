import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';

const Bgsfts = () => {
  let [bugs, setBugs] = useState([]);
  let [features, setFeatures] = useState([]);
  let { contract } = useContext(context);
  useEffect(() => {
    console.log(contract);
  }, [contract]);
  let handlesoftwarechange = async (event) => {
    let { 0: bgs, 1: ftrs } = await contract.methods.labeller(event.target.value).call();
    console.log(bgs, ftrs);
    setBugs(bgs);
    setFeatures(ftrs);
  }
  return (
    <div className="container my-3">
      <div className="col-6 col-sm-3 col-md-2">
        <select id="Software" className="form-select" defaultValue="Software" aria-label="Default select example" onChange={handlesoftwarechange}>
          <option disabled>Software</option>
          <option value="Software1">Software_1</option>
          <option value="Software2">Software_2</option>
          <option value="Software3">Software_3</option>
        </select>
      </div>
      <div className="row my-2 p-2">
        <div className='col-lg'>
          <h3>
            Bugs
          </h3>
          <div id="bugs" className="col-lg border border-secondary my-1 p-3 mb-2 me-1 overflow-y-auto" style={{ height: "400px" }}>
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
                        <th>BugName</th>
                        <th>Priority</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bugs.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>
                              {val.bugname}
                              <span title={val.bugdesc}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                              </span>
                            </td>
                            {(() => {
                              if (val.priority !== 0) {
                                return (
                                  <td>{val.priority}</td>
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
                            <td>{val.status}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )
              }
            })()}
          </div>
        </div> 

        <div className='col-lg'>
        <h3>
            Features
          </h3>
          <div id="features" className="col-lg border border-secondary my-1 p-3 mb-2 me-1 overflow-y-auto" style={{ height: "400px" }}>
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
                        <th>Featurename</th>
                        <th>Priority</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>
                              {val.featurename}
                              <span title={val.featuredesc}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                              </span>
                            </td>
                            {(() => {
                              if (val.priority !== 0) {
                                return (
                                  <td>{val.priority}</td>
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
                            <td>{val.status}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )
              }
            })()}
          </div>
        </div>
        {/* <div className="d-flex justify-content-center">
          <button className="btn btn-primary">Commit Changes</button>
        </div> */}
      </div>
    </div>
  )
}

export default Bgsfts;
