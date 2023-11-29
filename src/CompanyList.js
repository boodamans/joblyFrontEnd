import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "./CompanyList.css";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from "reactstrap";
import JoblyApi from "./api/api.js";
import SearchBar from "./SearchBar";

function CompanyList() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await JoblyApi.getCompanies();
        setCompanies(companiesData);
        setFilteredCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Handle error or set appropriate state to indicate an error
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  return (
    <section className="col-md-4">
      <SearchBar onSearch={handleSearch} />
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Companies
          </CardTitle>
          <ListGroup>
            {filteredCompanies.map((company) => (
              <ListGroupItem key={company.handle}>
                <Link to={`/companies/${company.handle}`}>
                  <p>{company.name}</p>
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyList;
