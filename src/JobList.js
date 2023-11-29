import React, { useState, useEffect, useContext } from "react";
import "./CompanyList.css";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap";
import JoblyApi from "./api/api.js";
import UserContext from "./UserContext";
import SearchBar from "./SearchBar";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await JoblyApi.getJobs();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Handle error or set appropriate state to indicate an error
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      // Update jobs to mark the applied job as applied
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, applied: true } : job
        )
      );
      // Update filteredJobs to mark the applied job as applied
      setFilteredJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, applied: true } : job
        )
      );
    } catch (error) {
      alert("Error applying to job; either the job is no longer available, or you've already applied!");
      console.error("Error applying to job:", error);
      // Handle error or show an error message
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <section className="col-md-4">
      <SearchBar onSearch={handleSearch} />
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">Jobs</CardTitle>
          <ListGroup>
            {filteredJobs.map((job) => (
              <ListGroupItem key={job.id}>
                <p>{job.title}</p>
                <Button
                  color="primary"
                  onClick={() => handleApply(job.id)}
                  disabled={job.applied}
                >
                  {job.applied ? "Applied" : "Apply"}
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default JobList;
