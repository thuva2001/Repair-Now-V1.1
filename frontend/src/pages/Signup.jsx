import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
  });

  const { email, password, name } = inputValue;

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

    // Validate username
    if (!name.trim()) {
      newErrors.name = "Username is required";
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If validation fails, don't submit the form
      return;
    }

    try {
      console.log(inputValue, "data");
      const { data } = await axios.post(
        
        `${process.env.REACT_APP_SERVER_URL}/api/users/signup`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    // Reset form fields after submission
    setInputValue({
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="form_container">
      <h2><b>Signup Account</b></h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="name">
            <i className="bi bi-person-circle"></i> Username
          </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleOnChange}
          />
          <span className="error">{errors.name}</span>
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
          Already have an account?{" "}
          <Link to={"/login"}>
            <a href="/login">Login</a>
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
