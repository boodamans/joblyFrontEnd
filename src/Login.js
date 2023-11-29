import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api/api";
import { Card, CardBody, CardTitle } from "reactstrap";
import UserContext from "./UserContext";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await JoblyApi.login(formData);
      loginUser(formData.username, formData.password);
      console.log(JoblyApi.token)
      onLoginSuccess(token);
      navigate("/")
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <CardBody>
      <Card>
        <div>
          <CardTitle className="font-weight-bold text-center">
            <h2>Login</h2>
          </CardTitle>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </Card>
    </CardBody>
  );
}

export default Login;
