import React, { useState, useContext } from "react";

import { useInput } from "../../util/customHooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { AuthContext } from "../../providers/AuthProvider";
import { useDispatch } from "react-redux";
import { createJob } from "./jobsSlice";

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

export default ({ handleClose }) => {
  const company = useInput("");
  const jobTitle = useInput("");
  const postUrl = useInput("");
  const location = useInput("");
  const salary = useInput("");
  const dueDate = useInput("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("applied");
  const { currentUser, token } = useContext(AuthContext);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createJob({
        company: company.value,
        job_title: jobTitle.value,
        post_url: postUrl.value,
        location: location.value,
        salary: salary.value,
        due_date: dueDate.value,
        description,
        status,
        user_id: currentUser.uid,
      }, token)
    );
    handleClose()
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

      <button>ADD JOB</button>
    </form>
  );
};
