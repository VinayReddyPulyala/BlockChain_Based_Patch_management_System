import React from 'react'

function Contact_Us() {
  return (
    <div className="col-12 col-md-9 col-lg-4 mx-auto mt-5">
        <div className="fw-bolder fs-1">
            Contact Us
        </div>
        <hr/>
        <form className="d-flex flex-column">
            <div className="m-3">
                <label for="Name" className="form-label">Name</label>
                <input type="Name" className="form-control" id="Name" placeholder="Enter Name"/>
            </div>
            <div className="m-3">
                <label for="email" className="form-label">Email Adress</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email-Address"/>
            </div>
            <div className="m-3">
                <label for="Subject" className="form-label">Subject</label>
                <input type="Subject" className="form-control" id="Subject" placeholder="Enter Subject"/>
            </div>
            <div className="m-3">
                <label for="Message" className="form-label">Message</label>
                <textarea type="Message" className="form-control" id="Message" placeholder="Enter Message"
                    rows="5"></textarea>
            </div>
            <span>
                <button type="submit" className="btn btn-dark ms-3">Submit</button>
            </span>
        </form>
    </div>
  )
}

export default Contact_Us;
