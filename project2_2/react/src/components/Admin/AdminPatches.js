import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import context from '../../context';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import AccountContext from '../AccountContext';
import Bugfeaturedesc from '../Bugfeaturedesc';

function AdminPatches() {
    const { contract } = useContext(context);
    let { Account } = useContext(AccountContext);
    let [Patches, setPatches] = useState([]);
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let [software, setsoftware] = useState("");

    useEffect(() => {
        async function fun() {
            if (contract.methods !== undefined) {
                let pchhashes = await contract.methods.getpatchhash().call();
                let patches = await Promise.all(pchhashes.map(async (hash) => {
                    return await contract.methods.getpatch(hash).call();
                }));
                setPatches(patches.reverse());
                $(function () {
                    $('#tableId').DataTable();
                })
            }
        }
        fun();
    }, [contract]);
    if (Patches.length !== 0) {
        return (
            <>
                <Bugfeaturedesc bugs={bugs} features={features} software={software} />
                <div className="container my-5 table-responsive col-11 mx-auto" id="patchdtls">
                    <table className="table table-striped table-borderless" id="tableId">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Patch_Name</th>
                                <th>Software</th>
                                <th>Version</th>
                                <th>Features</th>
                                <th>Bug Fixes</th>
                                <th>timestamp</th>
                                <th>Verification Status</th>
                                <th>Deploy Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Patches.map((val, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{ind + 1}</td>
                                        <td>{val.patchname}
                                            <span title="click to get the description" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1" onClick={async () => {
                                                    setBugs(val.bugfixes.split(", "));
                                                    setFeatures(val.patchfeatures.split(", "));
                                                    setsoftware(val.software);
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                </svg>
                                            </span>
                                        </td>
                                        <td>{val.software}</td>
                                        <td>{val.version}</td>
                                        <td>{val.patchfeatures} </td>
                                        <td>{val.bugfixes} </td>
                                        <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                                        <td>{val.verifystatus}</td>
                                        <td>{val.deploystatus}</td>
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

export default AdminPatches
