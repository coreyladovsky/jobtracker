import React, { useState } from "react";
import { useInput } from "./util/customHooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

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

export default () => {
  const company = useInput("");
  const jobTitle = useInput("");
  const postUrl = useInput("");
  const location = useInput("");
  const salary = useInput("");
  const [description, setDescription] = useState("");

  return (
    <form>
      <input placeholder="Company" {...company} />
      <input placeholder="Job Title" {...jobTitle} />
      <input placeholder="Post URL" {...postUrl} />
      <input placeholder="Location" {...location} />
      <input placeholder="Salary" {...salary} />
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
    </form>
  );
};
