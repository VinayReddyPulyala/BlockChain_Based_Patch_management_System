import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import context from '../../context';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import Bugfeaturedesc from '../Bugfeaturedesc';
function End_Userpatches() {
  let [Patches, setPatches] = useState([]);
  let { contract } = useContext(context);
  let [user, setUser] = useState("");
  let [bugs, setBugs] = useState([]);
  let [features, setFeatures] = useState([]);
  let [software, setsoftware] = useState("");
  let [retrievestts, setretrievestts] = useState(null);
  useEffect(() => {
    async function func1() {

      let { data: { user } } = await axios.post("http://localhost:8800", { role: "End_User" }, {
        withCredentials: true
      });
      setUser(user);
      let { data } = await axios.get("http://localhost:8800/downloadhistory/userdwndpatches", {
        params: {
          username: user
        }
      });
      let dwndpatches = data.map((val) => {
        return val.patchname;
      });

      if (contract.methods !== {}) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        patches = patches.filter((val, ind) => {
          return val.deploystatus === "Deployed" && !dwndpatches.includes(val.patchname);
        })
        setPatches(patches);
        $(function () {
          $('#tableId').DataTable();
        })
      }
    }
    func1();
  }, []);
  let handledownload = async (cid, filename, patchname) => {
    setretrievestts(true);
    let client = new Web3Storage({ token: process.env.REACT_APP_apikey });
    let file = await client.get(cid);
    const data = await file.files();
    const url = URL.createObjectURL(data[0]);
    let a = document.createElement("a");
    a.href = url;
    setretrievestts(false);
    a.download = filename;
    a.click();
    try {
      console.log(user);
      await axios.post("http://localhost:8800/downloadhistory", {
        username: user,
        patchname: patchname
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  if (Patches.length !== 0) {
    return (
      <>
        <Bugfeaturedesc bugs={bugs} features={features} software={software} />
        {
          retrievestts && (
            <div className="loading-overlay">
              <div className=' fw-semibold fs-5 text-light'>Your requested patch is being processed and will be made available for download shortly..</div>
              <div className="loading"></div>
            </div>
          )
        }
        <div className="container my-5 table-responsive col-11 mx-auto">
          <table className="table table-striped table-borderless" id="tableId">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Patch_Name</th>
                <th>Software</th>
                <th>BugFixes</th>
                <th>Features</th>
                <th>timestamp</th>
                <th>Download</th>
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
                    <td>{val.bugfixes}</td>
                    <td>{val.patchfeatures.split("</br>")[0]} <br /> {val.patchfeatures.split("</br>")[1]} </td>
                    <td>{new Date(val.deploytime * 1000).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => {
                        handledownload(val.cid, val.filename, val.patchname);
                      }}>Download</button>
                    </td>
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

export default End_Userpatches;
