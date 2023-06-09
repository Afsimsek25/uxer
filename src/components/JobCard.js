import React, { useState,useEffect} from "react";
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
import { Popover, Menu, message } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  CopyOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import { deleteJob, duplicateJob } from "../redux/actions/jobActions";
import { useDispatch,useSelector } from "react-redux";
import {
  fetchJobs,
} from "../redux/actions/jobActions";

const JobCard = ({onEditJob }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [visiblePopoverId, setVisiblePopoverId] = useState(null);
  const dispatch = useDispatch();
  const [expandedStates, setExpandedStates] = useState([]);
  const publicProjectId = useSelector((state) => state.project.publicProjectId);
  const jobs = useSelector((state) => state.job.jobs);

  useEffect(() => {
    dispatch(fetchJobs(publicProjectId));
  }, [publicProjectId]);

  const handleToggle = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob({jobId,publicProjectId}));
  };
  const handleDuplicateJob = async (jobId) => {
    dispatch(duplicateJob({jobId,publicProjectId}));
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {

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
          handleDuplicateJob(job.id);
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
        Copy ID
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
                  <span>{job.tests && job.tests.length} Tests</span>
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
                    onClick={() => handleDeleteJob(job.id)}
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
