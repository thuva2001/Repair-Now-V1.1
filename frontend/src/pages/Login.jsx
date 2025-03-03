import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    // Clear the specific error when the user starts typing again
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If validation fails, don't submit the form
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, role } = data;
      localStorage.setItem('userInfo',JSON.stringify(data));
if (success) {
        handleSuccess(message);
        setTimeout(() => {
          if (role === "admin") {
            // Redirect to the admin panel
            navigate("/admin");
          } else {
            // Redirect to the normal user landing page
            navigate("/");
          }
        }, 1000);
      } else {
        handleError(message); // Display error message if login fails
      }
    } catch (error) {
      handleError("Invalid email or password."); // Display error message if there's an exception
    }

    // Reset form fields after submission
    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>
        <b>Login Account</b>
      </h2>
      <form onSubmit={handleSubmit} style={{marginTop: '7vh'}}>
        <div>
          <label htmlFor="email">
            <i className="bi bi-envelope"></i> Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <div>
          <label htmlFor="password">
            <i className="bi bi-key"></i> Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
          <span className="error">{errors.password}</span>
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <a href="/signup">SignUp</a>
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
