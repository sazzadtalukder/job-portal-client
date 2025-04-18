import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const JobApply = () => {
    const {id}  = useParams()
    const navigate = useNavigate();
    const {user} = useAuth();
    // console.log(id,user);
    const handleApply =e=>{
        e.preventDefault();
        const form = e.target;
        const linkedin = form.linkedin.value;
        // console.log(linkedin)

        const jobApplication =  {
            job_id : id,
            applicant_email : user.email,
            linkedin
        }
        fetch('https://job-portal-server-again.vercel.app/job-applications',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
        .then(res=> res.json())
        .then(data=> {
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/myApplications')
            }
        })
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleApply}>
                            <fieldset className="fieldset">
                                <label className="fieldset-label">LinkedIn URL</label>
                                <input type="url" name='linkedin' className="input" placeholder="LinkedIn URL" />
                                
                                <button className="btn btn-neutral mt-4">Apply</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;