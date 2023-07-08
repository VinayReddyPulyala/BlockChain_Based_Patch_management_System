import React, { useContext, useEffect, useState } from 'react'
import context from '../../context';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import Bugfeaturedesc from '../Bugfeaturedesc';
const GetRequests = () => {
    let { contract } = useContext(context);
    let [request, setrequests] = useState([]);
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let [software, setsoftware] = useState("");
    useEffect(() => {
        async function func() {
            if (contract.methods != undefined) {
                let requests = await contract.methods.adminrequests().call();
                setrequests(requests);
                console.log(requests);
            }
            $(function () {
                $('#tableId').DataTable();
            })
        }
        func();
    }, [contract]);
    if (request.length !== 0) {
        return (
            <>
                <Bugfeaturedesc bugs={bugs} features={features} software={software}/>
                <div className="container my-5 table-responsive col-11 mx-auto">
                    <table className="table table-striped table-borderless" id="tableId">
                        <thead>
                            <tr>
                                <th>Request_No</th>
                                <th>Software</th>
                                <th>bugFixes</th>
                                <th>Features</th>
                                <th>timestamp</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {request.map((val, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>
                                            <span title="click to get the description" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1" onClick={async () => {
                                                    setBugs(val.bugs.split(", "));
                                                    setFeatures(val.features.split(", "));
                                                    setsoftware(val.software);
                                                }}>
                                                    Request_No: {val.no}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                </svg>
                                            </span>
                                        </td>
                                        <td>{val.software}</td>
                                        <td>{val.bugs}</td>
                                        <td>{val.features} </td>
                                        <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                                        <td>{val.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    else {
        return (
            <div> No data Available...</div>
        )
    }
}

export default GetRequests
