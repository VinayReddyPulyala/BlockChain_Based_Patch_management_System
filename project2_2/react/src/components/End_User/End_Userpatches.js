import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import context from '../../context';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
function End_Userpatches() {
  let [Patches, setPatches] = useState([]);
  let { contract } = useContext(context);
  let [user, setUser] = useState("");

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
    let client = new Web3Storage({token:process.env.REACT_APP_apikey});
    let file = await client.get(cid);
    const data = await file.files();
    const url = URL.createObjectURL(data[0]);
    let a = document.createElement("a");
    a.href = url;
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
  // console.log(Patches);
  if (Patches.length !== 0) {
    return (
      <div className="container my-5 table-responsive col-11 mx-auto" id="patchdtls">
        <table className="table table-striped table-borderless" id="tableId">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Patch_Name</th>
              <th>Software</th>
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
                  <td>{val.patchname}</td>
                  <td>{val.software}</td>
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
    )
  }
  else {
    return (
      <div> No data Available...</div>
    )
  }
}

export default End_Userpatches
