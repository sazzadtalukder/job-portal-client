import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const [jobs, setJobs] = useState([])
    const { user } = useAuth()
    useEffect(() => {
        fetch(`https://job-portal-server-again.vercel.app/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setJobs(data)
            })
    }, [user.email])
    return (
        <div>
            <p>My Posted Jobs {jobs.length}</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            jobs.map((job,indx)=><tr key={indx}>
                            <th>{indx+1}</th>
                            <td>{job.title}</td>
                            <td>{job.applicationDeadline}</td>
                            <td><Link to={`/viewApplications/${job._id}`}><button className='btn btn-primary'>View Applications</button></Link></td>
                        </tr>)
                        }
                       
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;