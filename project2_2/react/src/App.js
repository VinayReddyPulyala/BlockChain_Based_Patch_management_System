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
import Userreports from './components/Labeller/Userreports';
import Addreport from './components/Labeller/Addreport';
import Bgsfts from './components/Labeller/Bgsfts';
import Transactions from './components/Transactions';
import Requests from './components/Admin/Requests';
import "D:/project_2_2/projectblockchain/projectbpms/src/index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />

        <Route path="/End_User" element={<End_User />}>
          <Route index element={<End_Userpatches />} />
          <Route path="Report" element={<Report />} />
        </Route>

        <Route path="/admin" element={<Adminhome />}>
          <Route index element={<Adminpatches />} />
          <Route path="deploy" element={<Admindeploy />} />
          <Route path="req" element={<Requests />} />
          <Route path="DownloadHistory" element={<AdminDwndhstry />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        <Route path="/verifier" element={<Verifier />}>
          <Route index element={<Verifierunchecked />} />
          <Route path="checked" element={<Verifierchecked />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        <Route path="/Developer" element={<Developer />}>
          <Route index element={<DeveloperRequests />} />
          <Route path="patchregistration" element={<DevReg />} />
          <Route path="Rejects" element={<Rejects />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        <Route path="/Labeller" element={<Labeller />}>
          <Route index element={<Bgsfts />} />
          <Route path="addreport" element={<Addreport />} />
          <Route path="Userreports" element={<Userreports />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
