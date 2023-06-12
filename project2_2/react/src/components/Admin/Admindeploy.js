import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import AdminContext from './createcontext';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
function Admindeploy() {
    let { contract, Account } = useContext(AdminContext);
    let [Patches, setPatches] = useState([]);
    useEffect(() => {
        async function fun() {
            if (contract.methods !== undefined) {
                let pchhashes = await contract.methods.getpatchhash().call();
                let patches = await Promise.all(pchhashes.map(async (hash) => {
                    return await contract.methods.getpatch(hash).call();
                }));
                setPatches((patches.filter((val) => {
                    return val.verifystatus === "Success";
                })).reverse()
                );
            }
            $(function () {
                $('#tableId').DataTable();
            })
        }
        fun();
    }, [contract]);
    function handledeploychange(name) {
        console.log(Account);
    }
    if (Patches.length !== 0) {
        return (
            <div className="container my-5 table-responsive col-11 mx-auto" id="patchdpl">
                <table className="table table-striped table-borderless" id="tableId">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Patch_Name</th>
                            <th>Software</th>
                            <th>Features</th>
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
                                    <td>{val.patchname}</td>
                                    <td>{val.software}</td>
                                    <td>{val.patchfeatures.split("</br>")[0]} <br /> {val.patchfeatures.split("</br>")[1]} </td>
                                    <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                                    <td>{val.verifystatus}</td>
                                    <td>
                                        {(() => {
                                            if (val.deploystatus === "Deployed") {
                                                return "Deployed";
                                            } else {
                                                return <button className="btn btn-primary" onClick={() => {
                                                    handledeploychange(val.patchname);
                                                }}>Deploy</button>;
                                            }
                                        })()}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div> No data Available...</div>
        )
    }
}

export default Admindeploy
