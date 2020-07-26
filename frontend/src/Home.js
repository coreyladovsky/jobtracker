import React from "react";
import NavBar from "./NavBar";
import JobPage from "./features/jobs/JobPage";
import ErrorBoundaries from "./features/ErrorBoundaries/ErrorBoundaries";

export default () => {
  return (
    <div>
      <NavBar />
      <ErrorBoundaries>
        <JobPage />
      </ErrorBoundaries>
    </div>
  );
};
