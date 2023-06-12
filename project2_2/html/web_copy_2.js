let account;
console.log(window.ethereum);
if (window.ethereum !== "undefined") {
	ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
		console.log(accounts);
		account = accounts[0];
		document.getElementById("account").innerHTML = `Your Account : ${account}`;
		document.getElementById("account").classList.add("fs-4");
	});
}
const web3 = new Web3(window.ethereum);
let abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
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
		"inputs": [],
		"name": "getdetails",
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
					}
				],
				"internalType": "struct patch[]",
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
			}
		],
		"name": "getpatch",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patches",
		"outputs": [
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pchname",
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
				"name": "pchname",
				"type": "string"
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
let address = "0x469145997dF8D47d604a8C358C73898A024b43Cd";
let contract = new web3.eth.Contract(abi, address);
async function patch() {
	let obj = JSON.parse(localStorage.getItem("object"));
	if (Object.keys(obj).length != 0) {
		document.getElementById("Software").value = obj["Software"];
		document.getElementById("features").value = obj["Features"];
		document.getElementById("patchNo").value = Number(obj["patchno"]) + 1;
		document.getElementById("patchname").value = obj["Software"] + "-" + `${Number(obj["patchno"]) + 1}`;
	}
}
async function register(event) {
	event.preventDefault();
	let obj = JSON.parse(localStorage.getItem("object"));
	try {
		await contract.methods.reqsta(Number(obj["reqno"]) - 1).send({ from: account });
	} catch (error) {
		alert("Error : This Action can be performed only by the Developer");
		setTimeout(()=>{
			window.open("devreq.html", "_self");
		},5000);
	}
	let num = document.getElementById("patchNo").value;
	let Software = document.getElementById("Software").value;
	let patch_name = document.getElementById("patchname").value;
	let patch_features = document.getElementById("features").value;
	let fileinput = document.getElementById("patchFile");

	const file = fileinput.files[0];
	console.log(file.name);
	const reader = new FileReader();
	reader.readAsArrayBuffer(file);

	reader.onload = async () => {
		const fileData = new Uint8Array(reader.result);
		console.log(fileData);
		console.log(account);
		let res = await contract.methods.addpatch(num, fileData, file.name, patch_name, Software, patch_features).send({ from: account });
		document.getElementById("tx").innerHTML=`Patch info successfully added to blockchain Your Transaction Hash : ${res.transactionHash}`;
		setTimeout(()=>{
			window.open("devreq.html", "_self");
		},5000);
	}

}
let getdetails = async () => {
	let patches = await contract.methods.getdetails().call();
	console.log(patches);
	let head = "<thead><tr><th>S.No</th><th>Patch_Name</th><th>Software</th><th>Features</th><th>timestamp</th><th>Verification Status</th><th>Deploy Status</th></tr></thead>"
	let a = ["S.No", "patchname", "software", "patchfeatures", "timestamp", "verifystatus", "deploystatus"];
	let patchtable = document.createElement("table");
	patchtable.innerHTML = head;
	let tbody = document.createElement("tbody");
	let i = 0;
	for (let patch of patches) {
		let tr = document.createElement("tr");
		for (let p of a) {
			let td = document.createElement("td");
			if (p === "timestamp") {
				td.innerHTML = `${new Date(patch[p] * 1000).toLocaleString()}`;
			}
			else if (p === "S.No") {
				td.innerHTML = `${++i}`;
			}
			else {
				td.innerHTML = patch[p];
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	patchtable.classList.add("table", "table-striped", "table-borderless");
	patchtable.appendChild(tbody);
	patchtable.setAttribute("id", "tableId");
	$(function () {
		$('#tableId').DataTable();
	})
	document.getElementById("patchdtls").appendChild(patchtable);
}
let verifier = async () => {
	let a = ["patchname", "software", "timestamp", "patchfeatures"]
	let patches = await contract.methods.getdetails().call();
	let body = document.getElementById("cards");
	for (let patch of patches) {
		if (patch["verifystatus"] != "in Progress") {
			continue;
		}
		let card = document.createElement("div");
		card.classList.add("card", "my-3");
		let cardbody = document.createElement("div");
		cardbody.classList.add("card-body");
		let header = document.createElement("div");
		header.classList.add("d-flex", "justify-content-between");
		let pn = document.createElement("h6");
		pn.classList.add("card-title");
		pn.innerHTML = `Patch_No : ${patch["patchno"]}`;
		let btns = document.createElement("div");
		btns.classList.add("d-flex", "justify-content-between");
		let accept = document.createElement("button");
		accept.classList.add("btn", "mx-3", "btn-primary");
		accept.innerHTML = "Confirm";
		accept.onclick = async () => {
			try {
				let res = await contract.methods.Accept(patch["patchname"]).send({ from: account });
				document.getElementById("tx").innerHTML=`Successfully Updated, Your Transaction Hash : ${res.transactionHash}`;
				setTimeout(()=>{
					window.location.reload();
				},3000);
			} catch (error) {
				alert("Error : This Action can be performed only by the Verifier");
				setTimeout(()=>{
					window.location.reload();
				},3000);
			}
		}
		let reject = document.createElement("button");
		reject.classList.add("btn", "mx-3", "btn-danger");
		reject.innerHTML = "Deny";
		reject.onclick = async () => {
			try {
				let res = await contract.methods.Reject(patch["patchname"]).send({ from: account });
				document.getElementById("tx").innerHTML=`Successfully Updated, Your Transaction Hash : ${res.transactionHash}`;
				setTimeout(()=>{
					window.location.reload();
				},3000);
			} catch (error) {
				alert("Error : This Action can be performed only by the Verifier");
				setTimeout(()=>{
					window.location.reload();
				},3000);
			}
		}
		btns.appendChild(accept);
		btns.appendChild(reject);
		header.appendChild(pn);
		header.appendChild(btns);
		let ptdt = document.createElement("div");
		ptdt.classList.add("col-6", "col-sm-4", "col-md-6");
		let ptable = document.createElement("table");
		ptable.classList.add("table", "table-borderless");
		let ptbody = document.createElement("tbody");
		for (let i of a) {
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			td1.innerHTML = `${i} :`;
			let td2 = document.createElement("td");
			if (i == "timestamp") {
				td2.innerHTML = `${new Date(patch[i] * 1000).toLocaleString()}`;
			}
			else {
				td2.innerHTML = `${patch[i]}`;
			}
			tr.append(td1, td2);
			ptbody.appendChild(tr);
		}
		ptable.appendChild(ptbody);
		ptdt.appendChild(ptable);
		cardbody.append(header, ptdt);
		let dnwld = document.createElement("button");
		dnwld.classList.add("btn", "btn-light");
		dnwld.innerHTML = `Download ( ${patch["filename"]} )`;
		dnwld.onclick = async () => {
			let data = await contract.methods.download(patch["patchfile"]).call();
			const blob = new Blob([new Uint8Array(web3.utils.hexToBytes(data))], { type: 'application/octet-stream' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${patch["filename"]}`;
			document.body.appendChild(a);
			a.click();
		}
		card.append(cardbody, dnwld);
		body.appendChild(card);
	}
}
let verified = async () => {
	let a = ["patchname", "software", "timestamp", "patchfeatures"]
	let patches = await contract.methods.getdetails().call();
	let body = document.getElementById("cards");
	for (let patch of patches) {
		if (patch["verifystatus"] == "in Progress") {
			continue;
		}
		let card = document.createElement("div");
		card.classList.add("card", "my-3");
		let cardbody = document.createElement("div");
		cardbody.classList.add("card-body");
		let header = document.createElement("div");
		header.classList.add("d-flex", "justify-content-between");
		let pn = document.createElement("h6");
		pn.classList.add("card-title");
		pn.innerHTML = `Patch_No : ${patch["patchno"]}`;
		let sts = document.createElement("h5");
		sts.classList.add(patch["verifystatus"] == "Success" ? "text-success" : "text-danger");
		sts.innerHTML = `${patch["verifystatus"]}`;
		header.append(pn, sts);
		let ptdt = document.createElement("div");
		ptdt.classList.add("col-6", "col-sm-4", "col-md-6");
		let ptable = document.createElement("table");
		ptable.classList.add("table", "table-borderless");
		let ptbody = document.createElement("tbody");
		for (let i of a) {
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			td1.innerHTML = `${i} :`;
			let td2 = document.createElement("td");
			if (i == "timestamp") {
				td2.innerHTML = `${new Date(patch[i] * 1000).toLocaleString()}`;
			}
			else {
				td2.innerHTML = `${patch[i]}`;
			}
			tr.append(td1, td2);
			ptbody.appendChild(tr);
		}
		ptable.appendChild(ptbody);
		ptdt.appendChild(ptable);
		cardbody.append(header, ptdt);
		let dnwld = document.createElement("button");
		dnwld.classList.add("btn", "btn-light");
		dnwld.innerHTML = `Download ( ${patch["filename"]} )`;
		dnwld.onclick = async () => {
			let data = await contract.methods.download(patch["patchfile"]).call();
			const blob = new Blob([new Uint8Array(web3.utils.hexToBytes(data))], { type: 'application/octet-stream' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${patch["filename"]}`;
			document.body.appendChild(a);
			a.click();
		}
		card.append(cardbody, dnwld);
		body.appendChild(card);
	}

}
let getdeploy = async () => {
	let patches = await contract.methods.getdetails().call();
	console.log(patches);
	let head = "<thead><tr><th>S.No</th><th>Patch_Name</th><th>Software</th><th>Features</th><th>timestamp</th><th>Deploy</th></tr></thead>"
	let a = ["S.No", "patchname", "software", "patchfeatures", "timestamp", "deploystatus"];
	let patchtable = document.createElement("table");
	patchtable.innerHTML = head;
	let tbody = document.createElement("tbody");
	let i = 0;
	for (let patch of patches) {
		if (patch["verifystatus"] != "Success") {
			continue;
		}
		let tr = document.createElement("tr");
		for (let p of a) {
			let td = document.createElement("td");
			if (p === "timestamp") {
				td.innerHTML = `${new Date(patch[p] * 1000).toLocaleString()}`;
			}
			else if (p === "S.No") {
				td.innerHTML = `${++i}`;
			}
			else if (p == "deploystatus" && patch[p] != "Deployed") {
				let btn = document.createElement("button");
				btn.classList.add("btn", "btn-primary");
				btn.innerHTML = "Deploy";
				btn.onclick = async () => {
					try {
						let res = await contract.methods.deploy(patch["patchname"]).send({ from: account });
						document.getElementById("tx").innerHTML=`Successfully Deployed, Your Transaction Hash : ${res.transactionHash}`;
						setTimeout(()=>{
							window.location.reload();
						},5000);
					} catch (error) {
						alert("Error : This Action can only be performed by the Admin");
						setTimeout(()=>{
							window.location.reload();
						},5000);
					}
				}
				td.appendChild(btn);
			}
			else {
				td.innerHTML = patch[p];
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	patchtable.classList.add("table", "table-striped");
	patchtable.appendChild(tbody);
	patchtable.setAttribute("id", "dtableId");
	$(function () {
		$('#dtableId').DataTable();
	})
	document.getElementById("patchdpl").appendChild(patchtable);

}
let user = { "Username": "vinay", "password": "Vinay@123" };
let user2 = { "Username": "Vamsi", "password": "Vamsi@123" };
let userpatch2 = async () => {
	let patches = await contract.methods.getdetails().call();
	let head = "<thead><tr><th>S.No</th><th>Patch_Name</th><th>Software</th><th>Features</th><th>timestamp</th><th>Download</th></tr></thead>";
	let a = ["S.No", "patchname", "software", "patchfeatures", "deploytime", "Download"];
	let patchtable = document.createElement("table");
	patchtable.innerHTML = head;
	let tbody = document.createElement("tbody");
	let i = 0;
	patches = patches.filter((val) => {
		return val.deploystatus == "Deployed";
	});

	for (let patch of patches) {
		let pchname = patch["patchname"];
		let arr = await contract.methods.patchhistory(pchname).call();
		arr = arr.map((val) => {
			return val.usname;
		})
		if (arr.includes(user2.Username)) {
			continue;
		}
		let tr = document.createElement("tr");
		for (let p of a) {
			let td = document.createElement("td");
			if (p === "deploytime") {
				td.innerHTML = `${new Date(patch[p] * 1000).toLocaleString()}`;
			}
			else if (p === "S.No") {
				td.innerHTML = `${++i}`;

			}
			else if (p == "Download") {
				let btn = document.createElement("button");
				btn.classList.add("btn", "btn-primary");
				btn.innerHTML = "Download";
				btn.onclick = async () => {
					let data = await contract.methods.download(patch["patchfile"]).call();
					const blob = new Blob([new Uint8Array(web3.utils.hexToBytes(data))], { type: 'application/octet-stream' });
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = `${patch["filename"]}`;
					a.click();
					contract.methods.userdownload(patch["patchname"], user2["Username"]).send({ from: account }).then(() => {
						window.location.reload();
					});
				}
				td.appendChild(btn);
			}
			else {
				td.innerHTML = patch[p];
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	patchtable.classList.add("table", "table-striped");
	patchtable.appendChild(tbody);
	patchtable.setAttribute("id", "userdtableId");
	$(function () {
		$('#userdtableId').DataTable();
	})
	document.getElementById("userpths").appendChild(patchtable);
}
let userpatch = async () => {
	let patches = await contract.methods.getdetails().call();
	let head = "<thead><tr><th>S.No</th><th>Patch_Name</th><th>Software</th><th>Features</th><th>timestamp</th><th>Download</th></tr></thead>";
	let a = ["S.No", "patchname", "software", "patchfeatures", "deploytime", "Download"];
	let patchtable = document.createElement("table");
	patchtable.innerHTML = head;
	let tbody = document.createElement("tbody");
	let i = 0;
	patches = patches.filter((val) => {
		return val.deploystatus == "Deployed";
	});

	for (let patch of patches) {
		let pchname = patch["patchname"];
		let arr = await contract.methods.patchhistory(pchname).call();
		if (arr.length != 0) {
			continue;
		}
		let tr = document.createElement("tr");
		for (let p of a) {
			let td = document.createElement("td");
			if (p === "deploytime") {
				td.innerHTML = `${new Date(patch[p] * 1000).toLocaleString()}`;
			}
			else if (p === "S.No") {
				td.innerHTML = `${++i}`;

			}
			else if (p == "Download") {
				let btn = document.createElement("button");
				btn.classList.add("btn", "btn-primary");
				btn.innerHTML = "Download";
				btn.onclick = async () => {
					let data = await contract.methods.download(patch["patchfile"]).call();
					const blob = new Blob([new Uint8Array(web3.utils.hexToBytes(data))], { type: 'application/octet-stream' });
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = `${patch["filename"]}`;
					a.click();
					contract.methods.userdownload(patch["patchname"], user["Username"]).send({ from: account }).then(() => {
						window.location.reload();
					});
				}
				td.appendChild(btn);
			}
			else {
				td.innerHTML = patch[p];
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	patchtable.classList.add("table", "table-striped");
	patchtable.appendChild(tbody);
	patchtable.setAttribute("id", "userdtableId");
	$(function () {
		$('#userdtableId').DataTable();
	})
	document.getElementById("userpths").appendChild(patchtable);
}
let addfeature = () => {
	let features = document.getElementById("features");
	let feature = document.createElement("div");
	feature.classList.add("mb-2")
	let featuredes = document.createElement("textarea");
	featuredes.cols = "30";
	featuredes.rows = "2";
	featuredes.classList.add("featuredesc", "form-control");
	feature.appendChild(featuredes);
	features.appendChild(feature);
}
let addbug = () => {
	let bugs = document.getElementById("bugs");
	let bug = document.createElement("div");
	bug.classList.add("mb-2")
	let bugdes = document.createElement("textarea");
	bugdes.cols = "30";
	bugdes.rows = "2";
	bugdes.classList.add("bugdesc", "form-control");
	bug.appendChild(bugdes);
	bugs.appendChild(bug);
}
let report = () => {
	let bugs = (Array.from(document.querySelectorAll(".bugdesc"), (val) => val.value)).filter((val) => {
		let re = /[a-zA-Z0-9]/;
		return re.test(val);
	});
	let features = (Array.from(document.querySelectorAll(".featuredesc"), (val) => val.value)).filter((val) => {
		let re = /[a-zA-Z0-9]/;
		return re.test(val);
	});

	contract.methods.userreport(document.getElementById("Software").value, bugs, features).send({ from: account }).then((result) => {
		document.getElementById("tx").innerHTML=`Report Sent : Your Transaction Hash : ${result.transactionHash}`;
		setTimeout(() => {
			window.location.reload();
		}, 5000);
	});
}
let bugspr = {}
let featurespr = {}
let prioritize = () => {
	let software = document.getElementById("Software").value;
	let bugs = document.getElementById("bugs");
	let features = document.getElementById("features");
	bugs.innerHTML = '';
	features.innerHTML = '';
	let bugstable = document.createElement("table");
	let featurestable = document.createElement("table");
	let btbody = document.createElement("tbody");
	let ftbody = document.createElement("tbody");
	bugstable.classList.add("table");
	featurestable.classList.add("table");
	let bthead = document.createElement("thead");
	bthead.innerHTML = "<tr><th>S.No</th><th>Bug</th><th>Priority</th><th>status</th></tr>";
	let fthead = document.createElement("thead");
	fthead.innerHTML = "<tr><th>S.No</th><th>Feature</th><th>Priority</th><th>status</th></tr>";
	let b = ["S.No", "bugdesc", "priority", "status"];
	let f = ["S.No", "featurename", "priority", "status"];
	let bugsarr = [];
	let featuresarr = [];
	bugstable.appendChild(bthead);
	featurestable.appendChild(fthead);
	contract.methods.labeller(software).call().then((result) => {
		bugsarr = result[0];
		featuresarr = result[1];
	}).then(() => {
		let j = 1;
		for (let bug of bugsarr) {
			let tr = document.createElement("tr");
			for (let i of b) {
				let td = document.createElement("td");
				if (i == "S.No") {
					td.innerHTML = `${j++}`
				}
				else if (i == "priority" && bug[i] == "undefined") {
					let slct = document.createElement("select");
					slct.classList.add("form-select");
					slct.index = Number(j - 2);
					let opt0 = document.createElement("option");
					opt0.innerHTML = "NA";
					let opt1 = document.createElement("option");
					opt1.innerHTML = "1";
					opt1.value = 1;
					let opt2 = document.createElement("option");
					opt2.innerHTML = "2";
					opt2.value = 2;
					let opt3 = document.createElement("option");
					opt3.innerHTML = "3";
					opt3.value = 3;
					let opt4 = document.createElement("option");
					opt4.innerHTML = "4";
					opt4.value = 4;
					let opt5 = document.createElement("option");
					opt5.innerHTML = "5";
					opt5.value = 5;
					slct.append(opt0, opt1, opt2, opt3, opt4, opt5);
					td.appendChild(slct);
					console.log(slct);
					slct.onchange = () => {
						bugspr[slct.index] = slct.value;
					}
				}
				else {
					td.innerHTML = `${bug[i]}`;
				}
				tr.appendChild(td);
			}
			btbody.appendChild(tr);
		}
		bugstable.appendChild(btbody);
		let j1 = 1;
		for (let feature of featuresarr) {
			let tr = document.createElement("tr");
			for (let i of f) {
				let td = document.createElement("td");
				if (i == "S.No") {
					td.innerHTML = `${j1++}`
				}
				else if (i == "priority" && feature[i] == "undefined") {
					let slct = document.createElement("select");
					slct.index = Number(j1 - 2);
					slct.classList.add("form-select");
					let opt0 = document.createElement("option");
					opt0.innerHTML = "NA";
					let opt1 = document.createElement("option");
					opt1.innerHTML = "1";
					opt1.value = 1;
					let opt2 = document.createElement("option");
					opt2.innerHTML = "2";
					opt2.value = 2;
					let opt3 = document.createElement("option");
					opt3.innerHTML = "3";
					opt3.value = 3;
					let opt4 = document.createElement("option");
					opt4.innerHTML = "4";
					opt4.value = 4;
					let opt5 = document.createElement("option");
					opt5.innerHTML = "5";
					opt5.value = 5;
					slct.append(opt0, opt1, opt2, opt3, opt4, opt5);
					td.appendChild(slct);
					slct.onchange = () => {
						featurespr[slct.index] = slct.value;
						console.log(featurespr);
					}
				}
				else {
					td.innerHTML = `${feature[i]}`;
				}
				tr.appendChild(td);
			}
			ftbody.appendChild(tr);
		}
		featurestable.appendChild(ftbody);
		bugs.appendChild(bugstable);
		features.appendChild(featurestable);
	});
}

let commit = async () => {
	if (Object.keys(bugspr).length == 0 && Object.keys(featurespr).length == 0) {
		alert("No changes Found");
	}
	else {
		try {
			let res = await contract.methods.prioritychange(document.getElementById("Software").value, Object.keys(bugspr), Object.values(bugspr), Object.keys(featurespr), Object.values(featurespr)).send({ from: account });
			document.getElementById("tx").innerHTML=`Commited changes, Your Transaction Hash : ${res.transactionHash}`;
			setTimeout(()=>{
				window.location.reload();
			},5000);
		} catch (error) {
			alert("Error : This Action can be performed only by Labeller");
			setTimeout(()=>{
				window.location.reload();
			},3000);
		}
	}
}
let bugind = [];
let featureind = [];
let req = () => {
	let software = document.getElementById("Software").value;
	let bugs = document.getElementById("bugs");
	let features = document.getElementById("features");
	bugs.innerHTML = '';
	features.innerHTML = '';
	let bugstable = document.createElement("table");
	let featurestable = document.createElement("table");
	let btbody = document.createElement("tbody");
	let ftbody = document.createElement("tbody");
	bugstable.classList.add("table", "table-hover");
	featurestable.classList.add("table", "table-hover");
	let bthead = document.createElement("thead");
	bthead.innerHTML = "<tr><th>Select</th><th>Bug</th><th>Priority</th></tr>";
	let fthead = document.createElement("thead");
	fthead.innerHTML = "<tr><th>Select</th><th>Feature</th><th>Priority</th></tr>";
	let b = ["Select", "bugdesc", "priority"];
	let f = ["Select", "featurename", "priority"];
	let bugsarr = [];
	let featuresarr = [];
	bugstable.appendChild(bthead);
	featurestable.appendChild(fthead);
	contract.methods.labeller(software).call().then((result) => {
		bugsarr = result[0];
		featuresarr = result[1];
	}).then(() => {
		let j = 0;
		for (let bug of bugsarr) {
			if (bug["status"] != "unresolved" || bug["priority"] == "undefined") {
				j++;
				continue;
			}
			let tr = document.createElement("tr");
			for (let i of b) {
				let td = document.createElement("td");
				if (i == "Select") {
					let check = document.createElement("input");
					check.type = "checkbox";
					check.id = `${j}`
					bugind.push(j);
					td.appendChild(check);
				}
				else {
					td.innerHTML = `${bug[i]}`;
				}
				tr.appendChild(td);
			}
			btbody.appendChild(tr);
			j++;
		}
		bugstable.appendChild(btbody);
		let j1 = 0;
		for (let feature of featuresarr) {
			if (feature["status"] != "unadded" || feature["priority"] == "undefined") {
				j1++;
				continue;
			}
			let tr = document.createElement("tr");
			for (let i of f) {
				let td = document.createElement("td");
				if (i == "Select") {
					let check = document.createElement("input");
					check.type = "checkbox";
					check.id = "ft" + `${j1}`;
					featureind.push(j1);
					td.appendChild(check);
				}
				else {
					td.innerHTML = `${feature[i]}`;
				}
				tr.appendChild(td);

			}
			ftbody.appendChild(tr);
			j1++;
		}
		featurestable.appendChild(ftbody);
		bugs.appendChild(bugstable);
		features.appendChild(featurestable);
	});
}
let Request_patch = async () => {
	let software = document.getElementById("Software").value;
	let bgind = bugind.filter((val) => {
		return document.getElementById(`${val}`).checked;
	});
	let ftind = featureind.filter((val) => {
		return document.getElementById("ft" + `${val}`).checked;
	});
	if (bgind.length != 0 && ftind.length != 0) {
		console.log(software, bgind, ftind);
		try {
			let res = await contract.methods.requestpatch(software, bgind, ftind).send({ from: account });
			document.getElementById("tx").innerHTML=`Request sent, Your Transaction Hash : ${res.transactionHash}`;
			setTimeout(()=>{
				window.open("admin.html", "_self");
			},5000);
		} catch (error) {
			alert("Error : This Action can be performed only By the Admin");
			setTimeout(()=>{
				window.location.reload();
			},4000);
		}
	}
	else {
		alert("Select the bugs to be sent");
	}
}
let getrequests = async () => {
	let a = ["software", "timestamp", "features"]
	let requests = await contract.methods.adminrequests().call();
	console.log(requests);
	let body = document.getElementById("requests");
	requests = requests.filter((val) => {
		return val["status"] == "unresolved";
	});
	for (let request of requests) {
		let card = document.createElement("div");
		card.classList.add("card", "my-3");
		let cardbody = document.createElement("div");
		cardbody.classList.add("card-body");
		let rn = document.createElement("h4");
		rn.classList.add("card-title");
		rn.innerHTML = `Request_No : ${request["no"]}`;
		let rtdt = document.createElement("div");
		rtdt.classList.add("col-12");
		let rtable = document.createElement("table");
		rtable.classList.add("table", "table-borderless");
		let rtbody = document.createElement("tbody");
		for (let i of a) {
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			td1.innerHTML = `${i} :`;
			let td2 = document.createElement("td");
			if (i == "timestamp") {
				td1.innerHTML = "Requested On :"
				td2.innerHTML = `${new Date(request[i] * 1000).toLocaleString()}`;
			}
			else if (i == "features") {
				td2.innerHTML = `Bug Fixes  - ${request["bugs"]} </br> Additional Features  - ${request["features"]}`;
			}
			else {
				td2.innerHTML = `${request[i]}`;
			}
			tr.append(td1, td2);
			rtbody.appendChild(tr);
		}
		rtable.appendChild(rtbody);
		rtdt.appendChild(rtable);
		cardbody.append(rn, rtdt);
		let btndiv = document.createElement("div");
		btndiv.classList.add("d-flex", "justify-content-sm-end", "justify-content-center");
		let create = document.createElement("button");
		create.classList.add("btn", "btn-primary");
		create.innerHTML = `Upload   
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
		<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
		<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
	  	</svg>`;
		create.onclick = async () => {
			let obj = {};
			obj["Software"] = request["software"];
			obj["Features"] = `Bug Fixes  - ${request["bugs"]} </br> Additional Features  - ${request["features"]}`;
			obj["patchno"] = await contract.methods.ptchcount(request["software"]).call();
			obj["reqno"] = request["no"];
			localStorage.setItem("object", JSON.stringify(obj));
			window.open("devreg.html", "_self");
		}
		btndiv.appendChild(create);
		cardbody.appendChild(btndiv);
		card.append(cardbody);
		body.appendChild(card);
	}
}
let dwndhstry = async () => {
	let arr = await contract.methods.returndwndpatches().call();
	let cards = document.getElementById("cards");
	console.log(arr);
	for (let i of arr) {
		let pnm = document.createElement("div");
		pnm.classList.add("card", "my-3");
		let cdhdr = document.createElement("div");
		cdhdr.classList.add("card-header");
		cdhdr.innerHTML = i;
		let userslist = document.createElement("ol");
		userslist.classList.add("list-group", "list-group-flush", "list-group-numbered");
		let users = await contract.methods.patchhistory(i).call();
		for (let j of users) {
			let li = document.createElement("li");
			li.classList.add("list-group-item");
			li.innerHTML = `User: <strong>${j["usname"]}</strong> has downloaded this patch on <strong>${new Date(j["timestamp"] * 1000).toLocaleString()}</strong>`;
			userslist.append(li);
		}
		pnm.append(cdhdr, userslist);
		cards.prepend(pnm);
	}
}