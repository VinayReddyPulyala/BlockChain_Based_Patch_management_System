import React, { useRef } from 'react'

function Report() {
    let bugref = useRef(null);
    let featureref = useRef(null);
    function addbug() {
        let bug = React.createElement("div", { className: "mb-2" }, React.createElement("textarea", { className: "form-control bugdesc", cols: "30", rows: "2" }));
        bugref.current.appendChild(bug);
    }
    function addfeature() {
        let feature = (<div className="mb-2">
            <textarea className="form-control featuredesc" cols="30" rows="2"></textarea>
        </div>)
        featureref.current.appendChild(feature);
    }
    return (
        <div className="col-8 mx-auto my-5">
            <form>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label" htmlFor="Software">Software</label>
                    <div className="col-sm col-sm-6">
                        <select id="Software" className="form-select" defaultValue="Software" aria-label="Default select example">
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
                <button type="button" className="btn btn-primary" >
                    Report
                </button>
            </form>
        </div>
    )
}

export default Report
