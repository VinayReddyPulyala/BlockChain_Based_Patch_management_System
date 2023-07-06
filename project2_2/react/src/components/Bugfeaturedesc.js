import React, { useContext, useEffect, useState } from 'react'
import context from '../context';

const Bugfeaturedesc = ({ bugs, features, software }) => {
    let [bugdesc, setbugdesc] = useState([]);
    let [featuredesc, setFeaturedesc] = useState([]);
    let { contract } = useContext(context);
    useEffect(() => {
        async function func() {
            let res = await contract.methods.patchdetails(software, bugs, features).call();
            setbugdesc(res[0]);
            setFeaturedesc(res[1]);
        }
        func();
    }, [bugs, features, software]);
    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Bug and feature Description</h1>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className='fw-bold mb-3'>
                                BugFixes :
                            </div>
                            <ol>
                                {
                                    bugdesc.map((val,ind) => {
                                        return (
                                            <li className='mb-2'>
                                                <div>
                                                    <span className='fw-semibold'>
                                                        {bugs[ind]}
                                                    </span>
                                                </div>
                                                <div>
                                                    {val}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                        <div>
                            <div className='fw-bold mb-3'>
                                Additional Features :
                            </div>
                            <ol>
                                {
                                    featuredesc.map((val,ind) => {
                                        return (
                                            <li className='mb-2'>
                                                <div>
                                                    <span className='fw-semibold'>
                                                        {features[ind]}
                                                    </span>
                                                </div>
                                                <div>
                                                    {val}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bugfeaturedesc
