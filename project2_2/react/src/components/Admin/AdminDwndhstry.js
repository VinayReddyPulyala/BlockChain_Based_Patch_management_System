import React, { useEffect, useState } from 'react'
import useAuth from '../useAuth'
import axios from 'axios';

function AdminDwndhstry() {
  
  let [data, setData] = useState({});
  useEffect(() => {
    async function func() {
      try {
        let { data } = await axios.get("http://localhost:8800/downloadhistory");
        setData(data);
        } catch (err) {
        console.log(err);
      }
    }
    func();
  }, []);
  if(Object.keys(data).length){
    console.log(data);
    return (
      <div className="border border-secondary">
        <div className="my-5 col-10 mx-auto" id="cards">
          {
            Object.keys(data).map((val, ind) => {
              return (
                <div key={ind} className="card my-3">
                  <div className="card-header">User : <strong>{val}</strong></div>
                  <ol className="list-group list-group-flush list-group-numbered">
                    {
                      (data[val]).map((value, ind) => {
                        return (
                          <li key={ind} className="list-group-item">Patch: <strong>{value.patchname}</strong> downloaded on <strong>{value.date}</strong>
                          </li>
                        )
                      })
                    }
                  </ol>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  else{
    return (
      <div>
        No Data Available...
      </div>
    )
  }
  
}

export default AdminDwndhstry
