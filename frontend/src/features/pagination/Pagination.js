import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNumberOfRows, nextPage } from "./paginationSlice";
import { selectFilteredJobs } from "../jobs/jobsSlice";

export default () => {
  const [rows, setRows] = useState(15);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const filteredJobsCount = useSelector(selectFilteredJobs).length;

  const handleChange = (e) => {
    dispatch(updateNumberOfRows(e.target.value));
    setRows(e.target.value);
  };

  const numberOfPages = Math.ceil(filteredJobsCount / rows);

  const displayPageLinks = () => {
    let links = new Array(numberOfPages).fill(null);
    return links.map((_, i) => {
      return (
        <label>
          <input value={i} type="radio" name="pages" checked={page === i} />
          {i + 1}
        </label>
      );
    });
  };

  const handlePage = (e) => {
    setPage(Number(e.target.value));
    dispatch(nextPage(Number(e.target.value) * rows));
  };

  return (
    <section>
      <div className="rowCount">
        Show
        <select value={rows} onChange={handleChange}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        Rows
      </div>
      <form className="pages" onChange={handlePage}>
        {displayPageLinks()}
      </form>
    </section>
  );
};