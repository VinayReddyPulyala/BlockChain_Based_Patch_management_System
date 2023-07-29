//  SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/utils/Strings.sol";

struct patch{
    uint patchno;
    string cid;  // to fetch file for download from web3.storage
    string filename; // name of the downloaded patch file 
    string patchname;
    string software;
    string patchfeatures;
    string bugfixes;
    uint timestamp; // time at which the patch has been uploaded
    string verifystatus;
    string deploystatus;
    uint deploytime; // time at which the patch has been deployed or made available for the End_User
    uint version;  // increments for a reuploaded patch
    uint reuploaded;  // variable to check whether it is reuploaded for a rejected patch
    string rejectmessage; // a message to show to the developer if the patch is rejected
    uint reqno;  // patch placed for a request of request no: reqno
}

struct bug {
    string bugname;
    string status;
    string priority;
    string bugdesc;
}

struct feature {
    string featurename;
    string status;
    string priority;
    string featuredesc;
}

struct reportschema {
    // bugs and features in a software
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

struct displaybug{
    uint index;
    string bugdesc;
}

struct displayfeature{
    uint index;
    string featuredesc;
}


contract register{
    using Strings for uint256;

    mapping(string => patch) patches; // patches
    string[] patchhash;  // hash to retrieve the corresponding patch
    mapping(string => uint) sftpat; // patch count for a specific software
    mapping(string => reportschema) report; // reports(bugs,features) corresponding to a software
    request[] requests; // requests placed by admin

    // to uniquely identify bug and feature 
    mapping(string => displaybug) bughash; 
    mapping(string => displayfeature) featurehash; 

    // initializing role specific account addresses
    address admin = 0x17Ff953CF5bb9a2c4DFd5ee38FDCd15C18047c3f ;
    address verifier = 0x928b4383D3956c46cfB02079a721E1E0C80d864C ;
    address labllr = 0x769ed844ff74996A2710D4453c1742A0a2F534F8 ;
    address developer = 0x84D8C9898D227a53A89F7c821c51d53773B197fD ;

    // modifiers to maintain role specific function calls
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

    // Upload report(bugs,features) by labeller,retrieve the uploaded bugs,features
    function labellerreport(string memory software, bug[] memory rptdbugs, feature[] memory rptdfeatures) public onlylabeller{
        for (uint256 i = 0; i < rptdbugs.length; i++) {
            (report[software].bugs).push(rptdbugs[i]); 
            bughash[string(abi.encodePacked(software,rptdbugs[i].bugname))] = displaybug(report[software].bugs.length-1,rptdbugs[i].bugdesc);
        }
        
        for (uint256 i = 0; i < rptdfeatures.length; i++) {
            report[software].features.push(rptdfeatures[i]);  
            featurehash[string(abi.encodePacked(software,rptdfeatures[i].featurename))] = displayfeature(report[software].features.length-1,rptdfeatures[i].featuredesc);
        }

    }
    function labeller(string memory software) public view returns (bug[] memory, feature[] memory){
        return (report[software].bugs, report[software].features);
    }

    // Request for a patch by admin
    function requestpatch(string memory software,string memory bughashes,string memory featurehashes,string[] memory bugnames,string[] memory featurenames)public onlyadmin{
        requests.push(request(block.timestamp,requests.length+1,software,bughashes,featurehashes,"Sent to Development"));
        for(uint i=0;i<bugnames.length;i++){
            report[software].bugs[bughash[string(abi.encodePacked(software,bugnames[i]))].index].status = "Requested";
        }
        for(uint i=0;i<featurenames.length;i++){
            report[software].features[featurehash[string(abi.encodePacked(software,featurenames[i]))].index].status = "Requested";
        }
    }

    // returns all the requests for the developer
    function adminrequests() public view returns(request[] memory){
        return requests;
    }

    // function call to get patch_count in a software to set the patch number of newly uploaded patch
    function ptchcount(string memory sft) public view returns(uint){
        return sftpat[sft];
    }

    // Upload a patch for a request
    function addPatchandUpdateRequest(uint no,string memory cid,string memory filename,string memory name,string memory sft,string memory bugfixes,string memory features,uint version,uint rno) public onlydeveloper{
        patches[string(abi.encodePacked(name,version.toString()))]=patch(no,cid,filename,name,sft,features,bugfixes,block.timestamp,"in Progress","Not Deployed",0,0,0,"",rno);
        patchhash.push(string(abi.encodePacked(name,version.toString())));
        sftpat[sft]++;
        requests[rno].status="Patch Uploaded - is Under Verification";
    } 

    // returns array of patch hashes to get the patches
    function getpatchhash() public view returns(string[] memory){
        return patchhash;
    }
    function getpatch(string memory hash) public view returns(patch memory){
        return patches[hash];
    }

    // function calls by the verifier to change the verification status of a patch
    function Accept(string memory name,uint version,uint reqno,string memory software,string[] memory bugnames,string[] memory featurenames) public onlyverifier{
        for(uint i=0;i<bugnames.length;i++){
            report[software].bugs[bughash[string(abi.encodePacked(software,bugnames[i]))].index].status = "Resolved";
        }
        for(uint i=0;i<featurenames.length;i++){
            report[software].features[featurehash[string(abi.encodePacked(software,featurenames[i]))].index].status = "Resolved";
        }
        patches[string(abi.encodePacked(name,version.toString()))].verifystatus = "Success";
        requests[reqno].status = "Verifications Successfull - Patch is Under Deployment";
    }
    function Reject(string memory name,uint version,string memory message,uint reqno) public onlyverifier{
        patches[string(abi.encodePacked(name,version.toString()))].verifystatus = "Fail";
        patches[string(abi.encodePacked(name,version.toString()))].rejectmessage = message;
        requests[reqno].status = "Verification Failed - Patch is Under Re-Development";
    }

    // Upload a Patch for corresponding rejected patch
    function addPatchandUpdateReuploadStatus(uint no,string memory cid,string memory filename,string memory name,string memory sft,string memory bugfixes,string memory features,uint version,uint prev_version,uint reqno) public onlydeveloper{
        patches[string(abi.encodePacked(name,version.toString()))]=patch(no,cid,filename,name,sft,features,bugfixes,block.timestamp,"in Progress","Not Deployed",0,version,0,"",reqno);
        patchhash.push(string(abi.encodePacked(name,version.toString())));
        patches[string(abi.encodePacked(name,prev_version.toString()))].reuploaded = 1;
        requests[reqno].status="Patch Re-Uploaded - is Under Verification";
    } 

    // patch deployment to make the patch available to the End_user
    function deploy(string memory name,uint version,uint reqno) public onlyadmin{
        patches[string(abi.encodePacked(name,version.toString()))].deploystatus="Deployed";
        patches[string(abi.encodePacked(name,version.toString()))].deploytime=block.timestamp;
        requests[reqno].status = "Patch Deployed";
    }

    // Content Identifier to get the patch file from web3.storage
    function patchcid(string memory name,uint version) public view returns(string memory){
        return patches[string(abi.encodePacked(name,version.toString()))].cid;
    }
  
    // description of the bugfixes and additional features associated with a patch 
    function patchdetails(string memory software,string[] memory bugnames, string[] memory featurenames)public view returns (string[] memory,string[] memory){
        string[] memory bugdescs = new string[](bugnames.length);
        string[] memory featuredescs = new string[](featurenames.length);
        for(uint i =0;i<bugnames.length;i++){
            bugdescs[i] = bughash[string(abi.encodePacked(software,bugnames[i]))].bugdesc;
        }
        for(uint i =0;i<featurenames.length;i++){
            featuredescs[i] = featurehash[string(abi.encodePacked(software,featurenames[i]))].featuredesc;
        }
        return (bugdescs,featuredescs);
    }

}