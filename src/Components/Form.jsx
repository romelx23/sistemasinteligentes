import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";

const Form = () => {
  const [values, handleInputChange, handleSubmit] = useForm({
    email: "example@gmail.com",
    password: "",
  });
  return (
    <form className="col-4 pt-4 m-auto" onSubmit={handleSubmit}>
      <h1>LogIn</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleInputChange}
          name="email"
          value={values.email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handleInputChange}
          name="password"
          value={values.password}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
