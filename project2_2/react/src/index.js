import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Web3 from 'web3';
import context from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
async function set() {
  const web3 = new Web3(window.ethereum);
  // let abi = [

  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Accept",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Reject",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "no",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bytes",
  //         "name": "metadata",
  //         "type": "bytes"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "filename",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "sft",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "features",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "addpatch",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "adminrequests",
  //     "outputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "timestamp",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "no",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "software",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "bugs",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "features",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "status",
  //             "type": "string"
  //           }
  //         ],
  //         "internalType": "struct request[]",
  //         "name": "",
  //         "type": "tuple[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "deploy",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "download",
  //     "outputs": [
  //       {
  //         "internalType": "bytes",
  //         "name": "",
  //         "type": "bytes"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "hash",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "getpatch",
  //     "outputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "patchno",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "bytes",
  //             "name": "patchfile",
  //             "type": "bytes"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "filename",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "patchname",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "software",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "patchfeatures",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "timestamp",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "verifystatus",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "deploystatus",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "deploytime",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "version",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "reuploaded",
  //             "type": "uint256"
  //           }
  //         ],
  //         "internalType": "struct patch",
  //         "name": "",
  //         "type": "tuple"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "getpatchhash",
  //     "outputs": [
  //       {
  //         "internalType": "string[]",
  //         "name": "",
  //         "type": "string[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "software",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "labeller",
  //     "outputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "string",
  //             "name": "bugdesc",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "status",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "priority",
  //             "type": "string"
  //           }
  //         ],
  //         "internalType": "struct bug[]",
  //         "name": "",
  //         "type": "tuple[]"
  //       },
  //       {
  //         "components": [
  //           {
  //             "internalType": "string",
  //             "name": "featurename",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "status",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "priority",
  //             "type": "string"
  //           }
  //         ],
  //         "internalType": "struct feature[]",
  //         "name": "",
  //         "type": "tuple[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "str",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "patchhistory",
  //     "outputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "string",
  //             "name": "usname",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "timestamp",
  //             "type": "uint256"
  //           }
  //         ],
  //         "internalType": "struct userdwnd[]",
  //         "name": "",
  //         "type": "tuple[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "software",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256[]",
  //         "name": "bugindex",
  //         "type": "uint256[]"
  //       },
  //       {
  //         "internalType": "string[]",
  //         "name": "imp",
  //         "type": "string[]"
  //       },
  //       {
  //         "internalType": "uint256[]",
  //         "name": "featureindex",
  //         "type": "uint256[]"
  //       },
  //       {
  //         "internalType": "string[]",
  //         "name": "fimp",
  //         "type": "string[]"
  //       }
  //     ],
  //     "name": "prioritychange",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "sft",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "ptchcount",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "no",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "reqsta",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "software",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256[]",
  //         "name": "bugsind",
  //         "type": "uint256[]"
  //       },
  //       {
  //         "internalType": "uint256[]",
  //         "name": "featuresind",
  //         "type": "uint256[]"
  //       }
  //     ],
  //     "name": "requestpatch",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "returndwndpatches",
  //     "outputs": [
  //       {
  //         "internalType": "string[]",
  //         "name": "",
  //         "type": "string[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "reupldstts",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "pchname",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "version",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "usname",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "userdownload",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "software",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "string[]",
  //         "name": "rptdbugs",
  //         "type": "string[]"
  //       },
  //       {
  //         "internalType": "string[]",
  //         "name": "rptdfeatures",
  //         "type": "string[]"
  //       }
  //     ],
  //     "name": "userreport",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }
  // ];
  let abi =[
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
        },
        {
          "internalType": "uint256",
          "name": "reqno",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "software",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "bugnames",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "featurenames",
          "type": "string[]"
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
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "reqno",
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
          "internalType": "string",
          "name": "cid",
          "type": "string"
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
          "name": "bugfixes",
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
        },
        {
          "internalType": "uint256",
          "name": "rno",
          "type": "uint256"
        }
      ],
      "name": "addPatchandUpdateRequest",
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
          "internalType": "string",
          "name": "cid",
          "type": "string"
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
          "name": "bugfixes",
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
        },
        {
          "internalType": "uint256",
          "name": "prev_version",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reqno",
          "type": "uint256"
        }
      ],
      "name": "addPatchandUpdateReuploadStatus",
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
        },
        {
          "internalType": "uint256",
          "name": "reqno",
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
              "internalType": "string",
              "name": "cid",
              "type": "string"
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
              "internalType": "string",
              "name": "bugfixes",
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
            },
            {
              "internalType": "string",
              "name": "rejectmessage",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "reqno",
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
              "name": "bugname",
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
            },
            {
              "internalType": "string",
              "name": "bugdesc",
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
            },
            {
              "internalType": "string",
              "name": "featuredesc",
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
          "name": "software",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "bugname",
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
            },
            {
              "internalType": "string",
              "name": "bugdesc",
              "type": "string"
            }
          ],
          "internalType": "struct bug[]",
          "name": "rptdbugs",
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
            },
            {
              "internalType": "string",
              "name": "featuredesc",
              "type": "string"
            }
          ],
          "internalType": "struct feature[]",
          "name": "rptdfeatures",
          "type": "tuple[]"
        }
      ],
      "name": "labellerreport",
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
      "name": "patchcid",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
          "internalType": "string[]",
          "name": "bugnames",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "featurenames",
          "type": "string[]"
        }
      ],
      "name": "patchdetails",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
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
          "internalType": "string",
          "name": "software",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "bughashes",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "featurehashes",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "bugnames",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "featurenames",
          "type": "string[]"
        }
      ],
      "name": "requestpatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  // let address = "0xcFf4D5e7d63e981557cc6cECd5Fa775cCbfb9557";
  let address = "0xEd346d4698b99B1332478bD705F546D8F24FcF37";
  let contractobj = new web3.eth.Contract(abi, address);
  root.render(
      <context.Provider value={{ contract: contractobj }}>
        <App />
      </context.Provider>
  );
}
set();

