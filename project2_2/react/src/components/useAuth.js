import React, { useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useAuth = (val) => {

    let navigate = useNavigate();
    let generateerror = (err) => {
        toast.error(err, {
            position: "bottom-right",
            autoClose: 2000,
            closeOnClick: true,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    
    useEffect(() => {
        async function func() {
            try {
                let { data } = await axios.post("http://localhost:8800", { role: val }, {
                    withCredentials: true
                });
                if (data.role_error) {
                    navigate("/");
                    generateerror("Unauthorised Access");
                }
                else if (data.error) {
                    navigate("/");
                    generateerror("Login Required!!");
                }
            } catch (err) {
                console.log(err);
            }
        }
        func();
    }, [])
    return (
        <>
            <ToastContainer />
        </>
    )
}

export default useAuth;
