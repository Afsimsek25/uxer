import React, { useState } from "react";
import "./JobCard.css";
import { IoGitMergeOutline } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import {
  AiFillPlayCircle,
  AiFillCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import axios from "axios";
import { Popover, Menu, message } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  CopyOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
const usr = JSON.parse(localStorage.getItem("token"));

const JobCard = ({ jobs, onJobDeleted, onEditJob }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [visiblePopoverId, setVisiblePopoverId] = useState(null);
  const [expandedStates, setExpandedStates] = useState(
    Array(jobs.length).fill(false)
  );
  const handleToggle = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`https://gateway-test.u-xer.com/api/Job/${jobId}`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${usr.token.accessToken}`,
        },
      });
      // Call the onJobDeleted callback after successfully deleting the job
      onJobDeleted();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  const duplicateJob = async (jobId) => {
    try {
      await axios.put(
        `https://gateway-test.u-xer.com/api/Job/duplicate/${jobId}`,
        {},
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${usr.token.accessToken}`,
          },
        }
      );
      // Job is successfully duplicated
      message.success("Job is successfully duplicated");
      // Fetch the jobs again to reflect the changes
      onJobDeleted(); // we are reusing this callback to fetch the jobs again
    } catch (error) {
      console.error("Error duplicating job:", error);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };
  const handleVisibleChange = (visible, jobId) => {
    if (visible) {
      setVisiblePopoverId(jobId);
    } else {
      setVisiblePopoverId(null);
    }
  };
  const moreJobOptions = (job) => (
    <Menu>
      <Menu.Item
        key="job_edit"
        icon={<EditOutlined />}
        onClick={() => {
          onEditJob(job);
          setPopoverVisible(false);
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="job_duplicate"
        icon={<CopyOutlined />}
        onClick={() => {
          duplicateJob(job.id);
          setPopoverVisible(false);
        }}
      >
        Duplicate
      </Menu.Item>
      <Menu.Item
        key="job_copyId"
        icon={<BarcodeOutlined />}
        onClick={() => {
          copyToClipboard(job.id);
          message.success("Job ID copied to clipboard");
          setPopoverVisible(false);
        }}
      >
        Coppy ID
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {jobs.map((job, index) => {
        const isExpanded = expandedStates[index];

        return (
          <div className="job-card" key={index}>
            <div
              className="job-card-header"
              onClick={() => handleToggle(index)}
            >
              <h3 className="job-title">{job.name}</h3>
            </div>
            {!isExpanded && (
              <div className="job-details">
                <div className="job-details-left">
                  <span>{job.tests.length} Tests</span>
                  <span
                    className="job-detail-icon"
                    style={{ marginLeft: "20px" }}
                  >
                    <BsGlobe />
                  </span>
                </div>
                <div className="job-details-right">
                  <span className="job-detail-icon">
                    <AiFillPlayCircle style={{ color: "#4285F4" }} />
                  </span>
                  <span
                    className="job-detail-icon"
                    onClick={() => deleteJob(job.id)}
                  >
                    <AiFillCloseCircle
                      className="delete-icon"
                      style={{ color: "#DB4437" }}
                    />
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
                    <Popover
                      content={moreJobOptions(job)}
                      trigger="click"
                      placement="bottom"
                      onClick={(e) => e.stopPropagation()}
                      visible={visiblePopoverId === job.id}
                      onVisibleChange={(visible) =>
                        handleVisibleChange(visible, job.id)
                      }
                    >
                      <MoreOutlined />
                    </Popover>
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
