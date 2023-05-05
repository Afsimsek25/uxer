import React, { useState } from 'react';
import './JobCard.css';
import { IoGitMergeOutline} from "react-icons/io5";
import { IoMdMail, IoIosMore } from 'react-icons/io';
import { MdLinearScale } from "react-icons/md";
import { BsGlobe } from 'react-icons/bs';
import { AiFillPlayCircle, AiFillCloseCircle, AiOutlineClockCircle } from 'react-icons/ai';

const JobCard = ({ jobs }) => {
  const [expandedStates, setExpandedStates] = useState(
    Array(jobs.length).fill(false)
  );

  const handleToggle = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  return (
    <div>
      {jobs.map((job, index) => {
        const isExpanded = expandedStates[index];

        return (
          <div className="job-card" key={index}>
            <div className="job-card-header" onClick={() => handleToggle(index)}>
              <h3 className="job-title">{job.name}</h3>
            </div>
            {!isExpanded && (
              <div className="job-details">
              <div className="job-details-left">
                <span>{job.tests.length} Tests</span>
                <span className="job-detail-icon" style={{marginLeft:"20px"}}>
                  <BsGlobe />
                </span>
              </div>
              <div className="job-details-middle">
              <div>No Agents</div>
              </div>
              <div className="job-details-right">
                <span className="job-detail-icon">
                <AiFillPlayCircle style={{ color: "#4285F4" }} />
                </span>
                <span className="job-detail-icon">
                <AiFillCloseCircle style={{ color: "#DB4437" }} />
                </span>
                <span className="job-detail-icon">
                  {job.runParallel ? (
                    <IoGitMergeOutline />
                  ) : (
                    <MdLinearScale />
                  )}
                </span>
                <span className="job-detail-icon">
                  <IoMdMail />
                </span>
                <span className="job-detail-icon">
                  <AiOutlineClockCircle />
                </span>
                <span className="job-detail-icon">
                  <IoIosMore />
                </span>
              </div>
            </div>
          )}
            {isExpanded && (
              <div className="job-card-content">
                {job.tests.map((test, testIndex) => (
                <p key={testIndex}>{test}</p>
              ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JobCard;
