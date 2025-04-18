import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const AddJob = () => {
    const navigate = useNavigate()
    const {user}= useAuth();
    const handleAdd = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData);
        const { min, max, currency, ...newJob } = initialData;
        // console.log(newJob);
        newJob.salaryRange = { min, max, currency };
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n')
        // console.log(newJob)

        fetch('https://job-portal-server-again.vercel.app/jobs', {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Job Added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myPostedJobs')
                }
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleAdd}>
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Job Title</label>
                            <input type="text" name='title' className="input" placeholder="Job Title" />

                            <label className="fieldset-label">Job Location</label>
                            <input type="text" name='location' className="input" placeholder="Job Location" />
                            <label className="fieldset-label">Application Deadline</label>
                            <input type="date" name='applicationDeadline' className="input" placeholder="Application Deadline" />
                            <label className="fieldset-label">Job Type</label>
                            <select name='jobType' defaultValue="Pick a Job type" className="select select-ghost w-full">
                                <option disabled={true}>Pick a Job type</option>
                                <option>Full-time</option>
                                <option>Intern</option>
                                <option>Part-time</option>
                            </select>

                            <label className="fieldset-label">Job Field</label>
                            <select name='category' defaultValue="Pick a Job Field" className="select select-ghost w-full">
                                <option disabled={true}>Pick a Job Field</option>
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>Teaching</option>
                                <option>Finance</option>
                            </select>

                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
                                <div>
                                    <label className="fieldset-label">Salary Range</label>
                                    <input type="number" name='min' className="input" placeholder="Minimum salary" />
                                </div>
                                <div>
                                    {/* <label className="fieldset-label">Max</label> */}
                                    <input type="number" name='max' className="input" placeholder="Maximum salary" />
                                </div>
                                <div>
                                    {/* <label className="fieldset-label">Currency</label> */}
                                    <select name='currency' defaultValue="Pick a Currency" className="select select-ghost w-full">
                                        <option disabled={true}>Pick a Currency</option>
                                        <option>BDT</option>
                                        <option>USD</option>

                                    </select>
                                </div>

                            </div>
                            <label className="fieldset-label">Job Description</label>
                            <textarea name='description' className="textarea" placeholder="Job Description"></textarea>

                            <label className="fieldset-label">Company Name</label>
                            <input type="text" name='company' className="input" placeholder="Company Name" />

                            <label className="fieldset-label">Job Requirements</label>
                            <textarea name='requirements' className="textarea" placeholder="Put Each requirement in a new line"></textarea>
                            <label className="fieldset-label">Job Responsibilities</label>
                            <textarea name='responsibilities' className="textarea" placeholder="Put Each responsibility in a new line"></textarea>
                            <label className="fieldset-label">HR Name</label>
                            <input type="text" name='hr_name' className="input" placeholder="HR Name" />
                            <label className="fieldset-label">HR Mail</label>
                            <input defaultValue={user?.email} type="email" name='hr_email' className="input" placeholder="HR Mail" />

                            <label className="fieldset-label">Company Logo URL</label>
                            <input type="url" name='company_logo' className="input" placeholder="Company Logo URL" /><button className="btn btn-neutral mt-4">Add Job</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddJob;