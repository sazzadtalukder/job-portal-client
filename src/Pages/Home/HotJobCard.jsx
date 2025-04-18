import { p } from 'motion/react-client';
import React from 'react';
import { Link } from 'react-router-dom';

const HotJobCard = ({ job }) => {
    const {_id, company_logo,company,location,title,description,requirements,salaryRange} = job;
    return (
        <div>
            <div className="card bg-base-100  shadow-sm">
                <div className='flex gap-2'>
                <figure>
                    <img className='w-16'
                        src={company_logo}
                        alt="Shoes" />
                </figure>
                <div>
                    <h4 className='text-2xl'>{company}</h4>
                    <p>{location}</p>
                </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    <div className='flex gap-2 flex-wrap'>
                        {
                            requirements.map((skill,ind)=><p key={ind} className='border rounded-md text-center px-2'>{skill}</p>)
                        }
                    </div>
                    <div className="card-actions justify-end">
                        <p>Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                        <Link to={`/jobs/${_id}`} className='btn btn-primary'>Apply</Link> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;