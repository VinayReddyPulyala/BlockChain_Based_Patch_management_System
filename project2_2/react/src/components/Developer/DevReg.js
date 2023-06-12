import React, { useContext, useEffect } from 'react'
import DeveloperContext from './createcontext';
function DevReg() {
  let {Account , contract } = useContext(DeveloperContext);
  useEffect(()=>{
    console.log(contract);
    console.log(Account);
  },[]);
  return (
    <div className="col-8 mx-auto my-5">
      <form>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" for="patchFile">Patch_File.</label>
          <div className="col-sm col-sm-5 col-lg-4">
            <input type="file" className="form-control" id="patchFile" required />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" for="patchNo">Patch_No.</label>
          <div className="col-sm col-sm-3 col-lg-2">
            <input type="number" className="form-control" id="patchNo" readonly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" for="Software">Software</label>
          <div className="col-sm col-sm-4">
            <input type="text" className="form-control" id="Software" readonly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" for="patchname">Patch_Name</label>
          <div className="col-sm col-sm-5">
            <input type="text" className="form-control" id="patchname" readonly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" for="version">Version</label>
          <div className="col-sm col-sm-3 col-lg-2">
            <input type="text" className="form-control" id="Version" readonly />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 form-label" for="features">Features</label>
          <div className="col-sm col-sm-6">
            <textarea id="features" className="form-control" rows="7"></textarea>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" onclick="register(event)" value="Register" />
      </form>
    </div>
  )
}

export default DevReg;
