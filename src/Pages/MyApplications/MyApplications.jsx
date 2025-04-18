import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { p } from 'motion/react-client';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [applications, setApplications] = useState([])
    useEffect(() => {
        // fetch(`https://job-portal-server-again.vercel.app/job-application?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setApplications(data);
        //     })   

         
        // axios.get(`https://job-portal-server-again.vercel.app/job-application?email=${user.email}`,{withCredentials: true})
        // .then(res=>setApplications(res.data))

        // -----axios instance diye custom hook babohar kore -----

        axiosSecure.get(`/job-application?email=${user.email}`)
        .then(res=>{
            setApplications(res.data)
        })
    }, [user.email])
    // console.log(applications)
    return (
        <div>
            <p>Total Applied job : {applications.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            applications.map(application =>
                                <tr key={application.job_id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={application.company_logo} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{application.title}</div>
                                                <div className="text-sm opacity-50">{application.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>


                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyApplications;