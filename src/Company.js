import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from "reactstrap";
import JoblyApi from "./api/api.js";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext"; // Import UserContext

function Company() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const { currentUser } = useContext(UserContext); // Access currentUser from context
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleApply = async (jobId) => {
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setAppliedJobs((prevAppliedJobs) => new Set([...prevAppliedJobs, jobId]));
    } catch (error) {
      alert("Error applying to job; either the job is no longer available, or you've already applied!")
      console.error("Error applying to job:", error);
    }
  };

  return (
    <section className="col-md-8">
      {company && (
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bold text-center">{company.name}</CardTitle>
            <CardText>{company.description}</CardText>
            <ListGroup>
              <h5 className="font-weight-bold">Jobs:</h5>
              {company.jobs.map((job) => (
                <ListGroupItem key={job.id}>
                  <p>{job.title}</p>
                  <Button
                    color="primary"
                    onClick={() => handleApply(job.id)}
                    disabled={appliedJobs.has(job.id)}
                  >
                    {appliedJobs.has(job.id) ? "Applied" : "Apply"}
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      )}
    </section>
  );
}

export default Company;
