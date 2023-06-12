import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
function End_Userpatches() {
  let [Patches, setPatches] = useState([]);
  const web3 = new Web3(window.ethereum);
  let abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        }
      ],
      "name": "Accept",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        }
      ],
      "name": "Reject",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "no",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "metadata",
          "type": "bytes"
        },
        {
          "internalType": "string",
          "name": "filename",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "sft",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "features",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        }
      ],
      "name": "addpatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "adminrequests",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "no",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "software",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "bugs",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "features",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            }
          ],
          "internalType": "struct request[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        }
      ],
      "name": "deploy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        }
      ],
      "name": "download",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "getpatch",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "patchno",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "patchfile",
              "type": "bytes"
            },
            {
              "internalType": "string",
              "name": "filename",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "patchname",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "software",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "patchfeatures",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "verifystatus",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "deploystatus",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "deploytime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "version",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reuploaded",
              "type": "uint256"
            }
          ],
          "internalType": "struct patch",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getpatchhash",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "software",
          "type": "string"
        }
      ],
      "name": "labeller",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "bugdesc",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "priority",
              "type": "string"
            }
          ],
          "internalType": "struct bug[]",
          "name": "",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "featurename",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "priority",
              "type": "string"
            }
          ],
          "internalType": "struct feature[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "str",
          "type": "string"
        }
      ],
      "name": "patchhistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "usname",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct userdwnd[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "software",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "bugindex",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "imp",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "featureindex",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "fimp",
          "type": "string[]"
        }
      ],
      "name": "prioritychange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "sft",
          "type": "string"
        }
      ],
      "name": "ptchcount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "no",
          "type": "uint256"
        }
      ],
      "name": "reqsta",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "software",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "bugsind",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "featuresind",
          "type": "uint256[]"
        }
      ],
      "name": "requestpatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "returndwndpatches",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        }
      ],
      "name": "reupldstts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "pchname",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "usname",
          "type": "string"
        }
      ],
      "name": "userdownload",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "software",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "rptdbugs",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "rptdfeatures",
          "type": "string[]"
        }
      ],
      "name": "userreport",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  let address = "0xcFf4D5e7d63e981557cc6cECd5Fa775cCbfb9557";
  let contract = new web3.eth.Contract(abi, address);
  useEffect(() => {
    async function func1() {
      if (contract.methods !== {}) {
        let pchhashes = await contract.methods.getpatchhash().call();
        let patches = await Promise.all(pchhashes.map(async (hash) => {
          return await contract.methods.getpatch(hash).call();
        }));
        patches = patches.filter((val,ind)=>{
          return val.deploystatus === "Deployed";
        })
        setPatches(patches);
        $(function () {
          $('#tableId').DataTable();
        })
      }
    }
    func1();
  }, []);
  let handledownload = async (patchname, version, filename) => {
    const web3 = new Web3(window.ethereum);
    let data = await contract.methods.download(patchname, version).call();
    const blob = new Blob([new Uint8Array(web3.utils.hexToBytes(data))], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}`;
    a.click();
  }
  console.log(Patches);
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
                      handledownload(val.patchname, val.version, val.filename);
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
