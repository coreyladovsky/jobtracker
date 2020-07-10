import React, { useState, useContext } from "react";

import { useInput } from "../../util/customHooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { AuthContext } from "../../providers/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { createJob, updateJob } from "./jobsSlice";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
];

export default ({ handleClose, selectedJob }) => {
  const job = useSelector((state) => state.jobs[selectedJob]);
    const company = useInput(job && job.company || "");
    const jobTitle = useInput(job && job.job_title || "");
    const postUrl = useInput(job && job.post_url || "");
    const location = useInput(job && job.location || "");
    const salary = useInput(job && job.salary || "");
    const dueDate = useInput(job && job.dueDate || "");
    const [description, setDescription] = useState(job && job.description || "");
    const [status, setStatus] = useState(job && job.status || "applied");
  const { currentUser, token } = useContext(AuthContext);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (job) {
      dispatch(
        updateJob(
          {
            company: company.value,
            job_title: jobTitle.value,
            post_url: postUrl.value,
            location: location.value,
            salary: salary.value,
            due_date: dueDate.value,
            description,
            status,
            user_id: currentUser.uid,
            id: job.id,
          },
          token
        )
      );
    } else {
      dispatch(
        createJob(
          {
            company: company.value,
            job_title: jobTitle.value,
            post_url: postUrl.value,
            location: location.value,
            salary: salary.value,
            due_date: dueDate.value,
            description,
            status,
            user_id: currentUser.uid,
          },
          token
        )
      );
    }
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Company" {...company} required />
      <input placeholder="Job Title" {...jobTitle} />
      <input placeholder="Post URL" {...postUrl} />
      <input placeholder="Location" {...location} />
      <input placeholder="Salary" {...salary} />
      <input type="date" placeholder="due date" {...dueDate} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={"rejected"}>Rejected</option>
        <option value={"wishlist"}>WishList</option>
        <option value={"applied"}>Applied</option>
        <option value={"phoneScreen"}>Phone Screen</option>
        <option value={"codingChallenge"}>Coding Challenge</option>
        <option value={"techScreen"}>Tech Screen</option>
        <option value={"onsite"}>Onsite</option>
        <option value={"offer"}>Offer</option>
      </select>
      <label>
        Job Description
        <ReactQuill
          value={description}
          onChange={(e) => setDescription(e)}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </label>

      <button>{job ? "Update Job" : "ADD JOB"}</button>
    </form>
  );
};
