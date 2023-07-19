import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import Axios from "axios";
import useAuth from '../useAuth';
import { toast } from 'react-toastify';
function Report() {
    let bugref = useRef(null);
    let featureref = useRef(null);
    let [software, setSoftware] = useState("");

    function addbug() {
        const bugElement = (
            <div className="mb-2">
                <textarea className="form-control bugdesc" cols="30" rows="2" />
            </div>
        );
        const bugNode = ReactDOM.render(bugElement, document.createElement('div'));
        bugref.current.appendChild(bugNode);
    }

    function addfeature() {
        const featureElement = (
            <div className="mb-2">
                <textarea className="form-control featuredesc" cols="30" rows="2" />
            </div>
        );
        const featureNode = ReactDOM.render(featureElement, document.createElement('div'));
        featureref.current.appendChild(featureNode);
    }

    let generateerror = (err) => {
        toast.error(err, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    let generatesuccess = (mes) => {
        toast.success(mes, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    async function handlereport() {
        let bugs = (Array.from(document.querySelectorAll(".bugdesc"), (val) => val.value)).filter((val) => {
            let re = /[a-zA-Z0-9]/;
            return re.test(val);
        });
        let features = (Array.from(document.querySelectorAll(".featuredesc"), (val) => val.value)).filter((val) => {
            let re = /[a-zA-Z0-9]/;
            return re.test(val);
        });
        console.log(software, bugs, features);
        try {
            await Axios.post("http://localhost:8800/bugs", {
                "software": software,
                "bugs": bugs
            });
            await Axios.post("http://localhost:8800/features", {
                "software": software,
                "features": features
            });
            generatesuccess("Successfully uploaded ! Thank you for your report");
        } catch (err) {
            generateerror(`Error while submitting report `);
        }
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }

    return (
        <div className="col-8 mx-auto my-5">
            <form>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label" htmlFor="Software">Software</label>
                    <div className="col-sm col-sm-6">
                        <select id="Software" className="form-select" defaultValue="Software" aria-label="Default select example" onChange={(event) => {
                            setSoftware(event.target.value);
                        }}>
                            <option disabled>Software</option>
                            <option value="Software1">Software_1</option>
                            <option value="Software2">Software_2</option>
                            <option value="Software3">Software_3</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Bug Description</label>
                    <div className="col-sm col-sm-5 col-lg-4">
                        <div ref={bugref}>
                            <div className="mb-2">
                                <textarea className="form-control bugdesc" cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <button type="button" className="btn btn-outline-info btn-sm" onClick={addbug}>Add
                            bug</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Additional Features</label>
                    <div className="col-sm col-sm-5 col-lg-4">
                        <div ref={featureref}>
                            <div className="mb-2">
                                <textarea className="form-control featuredesc" cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <button type="button" className="btn btn-outline-info btn-sm" onClick={addfeature}>Add
                            Feature</button>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={handlereport}>
                    Report
                </button>
            </form>
        </div>
    )
}

export default Report
