import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Adminhome from './components/Admin/Admin';
import Adminpatches from './components/Admin/AdminPatches';
import Admindeploy from './components//Admin/Admindeploy';
import Developer from './components/Developer/Developer';
import Verifier from './components/Verifier/Verifier';
import Verifierchecked from './components/Verifier/Verifierchecked';
import Verifierunchecked from './components/Verifier/Verifierunchecked';
import DevReg from './components/Developer/DevReg';
import DeveloperRequests from './components/Developer/DeveloperRequests';
import Adminreq from './components/Admin/Adminreq';
import End_User from './components/End_User/End_User';
import Report from './components/End_User/Report';
import AdminDwndhstry from './components/Admin/AdminDwndhstry';
import Labeller from './components/Labeller/Labeller';
import Rejects from './components/Developer/Rejects';
import End_Userpatches from './components/End_User/End_Userpatches';
import Home from './components/Home';
import About_Us from './components/About_Us';
import Contact_Us from './components/Contact_Us';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About_Us" element={<About_Us />} />
        <Route path="/Contact_Us" element={<Contact_Us />} />

        <Route path="/End_User" element={<End_User />}>
          <Route index element={<End_Userpatches />} />
          <Route path="Patches" element={<End_Userpatches />} />
          <Route path="Report" element={<Report />} />
        </Route>

        <Route path="/admin" element={<Adminhome />}>
          <Route index element={<Adminpatches />} />
          <Route path="deploy" element={<Admindeploy />} />
          <Route path="About_us" element={<About_Us />} />
          <Route path="req" element={<Adminreq />} />
          <Route path="DownloadHistory" element={<AdminDwndhstry />} />
        </Route>

        <Route path="/verifier" element={<Verifier />}>
          <Route index element={<Verifierunchecked />} />
          <Route path="checked" element={<Verifierchecked />} />
          <Route path="unchecked" element={<Verifierunchecked />} />
        </Route>

        <Route path="/Developer" element={<Developer />}>
          <Route index element={<DeveloperRequests />} />
          <Route path="Requests" element={<DeveloperRequests />} />
          <Route  path="patchregistration" element={<DevReg />} />
          <Route path="Rejects" element={<Rejects />} />
        </Route>

        <Route path="/Labeller" element={<Labeller />} />
        
      </Routes>
    </Router>
  );
}

export default App;
