import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
    const applications = useLoaderData();
    const handleStatus = (e, id) => {
        // console.log(e.target.value, id);
        const data = {
            status: e.target.value
        }
        fetch(`https://job-portal-server-again.vercel.app/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                }
            })
    }
    // console.log(jobs)
    return (
        <div>
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
                            applications.map((application, indx) => <tr key={indx}>
                                <th>{indx + 1}</th>
                                <td>{application.applicant_email}</td>
                                <td></td>
                                <td><select onChange={(e) => handleStatus(e, application._id)} defaultValue={application.status || 'Change Status'} className="select select-xs">
                                    <option disabled={true}>Change Status</option>
                                    <option>Under Review</option>
                                    <option>Set interview</option>
                                    <option>Hired</option>
                                    <option>Rejected</option>
                                </select></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;