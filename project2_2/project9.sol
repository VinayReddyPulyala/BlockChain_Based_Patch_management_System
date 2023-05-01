//  SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
struct userdwnd{
    string usname;
    uint timestamp;
}
struct patch{
    uint patchno;
    bytes patchfile;
    string filename;
    string patchname;
    string software;
    string patchfeatures;
    uint timestamp;
    string verifystatus;
    string deploystatus;
    uint deploytime;
}
struct bug {
    string bugdesc;
    string status;
    string priority;
}
struct feature {
    string featurename;
    string status;
    string priority;
}
struct reportschema {
    bug[] bugs;
    feature[] features;
}
struct request{
    uint timestamp;
    uint no;
    string software;
    string bugs;
    string features;
    string status;
}
contract register{

    patch[] public patches;
    mapping(string => uint) sftpat;
    mapping(string => userdwnd[]) downloadhistory;
    string[] dwndpatches;
    mapping(string => reportschema) report;
    request[] requests;
    address admin = 0x17Ff953CF5bb9a2c4DFd5ee38FDCd15C18047c3f ;
    address verifier = 0x928b4383D3956c46cfB02079a721E1E0C80d864C ;
    address labllr = 0x769ed844ff74996A2710D4453c1742A0a2F534F8 ;
    address developer = 0x84D8C9898D227a53A89F7c821c51d53773B197fD ;
    modifier onlydeveloper{
        require(msg.sender == developer,"Only Developer can Upload the patches");
        _;
    }
    modifier onlyadmin{
        require(msg.sender == admin,"Only Admin can Perform this Action");
        _;
    }
    modifier onlyverifier{
        require(msg.sender == verifier,"Only Verifier can Perform this Action");
        _;
    }
    modifier onlylabeller{
        require(msg.sender == labllr,"Only Labeller can Perform this Action");
        _;
    }
    function addpatch(uint no,bytes memory metadata,string memory filename,string memory name,string memory sft,string memory features) public onlydeveloper{
        patches.push(patch(no,metadata,filename,name,sft,features,block.timestamp,"in Progress","Not Deployed",0));
        sftpat[sft]++;
    } 
    function getdetails() public view returns(patch[] memory){
        return patches;
    }
    function getpatch(string memory name) public view returns (uint){
        for(uint i=0;i<patches.length;i++){
            if(keccak256(bytes(patches[i].patchname)) == keccak256(bytes(name))){
                return i;
            }
        }
        return 0;
    }
    function ptchcount(string memory sft) public view returns(uint){
        return sftpat[sft];
    }
    function Accept(string memory name) public onlyverifier{
        patches[getpatch(name)].verifystatus="Success";
    }
    function Reject(string memory name) public onlyverifier{
        patches[getpatch(name)].verifystatus="Fail";
    }
    function deploy(string memory name) public onlyadmin{
        patches[getpatch(name)].deploystatus="Deployed";
        patches[getpatch(name)].deploytime=block.timestamp;
    }
    function download(string memory name) public view returns(bytes memory){
        return patches[getpatch(name)].patchfile;
    }
    function userdownload(string memory pchname,string memory usname) public{
        if(downloadhistory[pchname].length == 0){
            dwndpatches.push(pchname);
        }
        downloadhistory[pchname].push(userdwnd(usname,block.timestamp));
    }
    function returndwndpatches() public view returns (string[] memory) {
        return dwndpatches;
    }
    function patchhistory(string memory pchname) public view returns(userdwnd[] memory){
        return downloadhistory[pchname];
    }
    function userreport(string memory software,string[] memory rptdbugs,string[] memory rptdfeatures) public {
        for (uint256 i = 0; i < rptdbugs.length; i++) {
            (report[software].bugs).push(bug(rptdbugs[i], "unresolved", "undefined"));
        }
        for (uint256 i = 0; i < rptdfeatures.length; i++) {
            report[software].features.push(feature(rptdfeatures[i], "unadded","undefined"));
        }
    }

    function labeller(string memory software) public view returns (bug[] memory, feature[] memory){
        return (report[software].bugs, report[software].features);
    }

    function prioritychange(string memory software,uint[] memory bugindex,string[] memory imp,uint[] memory featureindex,string[] memory fimp) public onlylabeller{
        for (uint256 i = 0; i < bugindex.length; i++) {
            report[software].bugs[bugindex[i]].priority = imp[i];
        }
        for (uint256 i = 0; i < featureindex.length; i++) {
            report[software].features[featureindex[i]].priority = fimp[i];
        }
    }
    function requestpatch(string memory software,uint[] memory bugsind,uint[] memory featuresind)public onlyadmin{
        string memory bgs="";
        string memory ftrs="";
        for(uint i=0;i<bugsind.length;i++){
            if(i==(bugsind.length-1)){
                bgs=string(abi.encodePacked(bgs,report[software].bugs[bugsind[i]].bugdesc));
            }
            else{
                bgs=string(abi.encodePacked(bgs,report[software].bugs[bugsind[i]].bugdesc,", "));
            }
            report[software].bugs[bugsind[i]].status="sent";
        }
        for(uint i=0;i<featuresind.length;i++){
            if(i==(featuresind.length-1)){
                ftrs=string(abi.encodePacked(ftrs,report[software].features[featuresind[i]].featurename));
            }
            else{
                ftrs=string(abi.encodePacked(ftrs,report[software].features[featuresind[i]].featurename,", "));
            }
            report[software].features[featuresind[i]].status="read";
        }
        requests.push(request(block.timestamp,requests.length+1,software,bgs,ftrs,"unresolved"));
    }
    function adminrequests() public view returns(request[] memory){
        return requests;
    }
    function reqsta(uint no) public onlydeveloper{
        requests[no].status="resolved";
    }
}