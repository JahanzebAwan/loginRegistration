import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { loginAction } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "./Login.css";
import classNames from "classnames";
import * as Yup from "yup";

const Login = () => {
  const [loading, setloading] = useState(false);
  const [loadingIcon, setloadingIcon] = useState("");

  const dispatch = useDispatch();

  // let history = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required."),
    password: Yup.string().required("This field is required."),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};
      return errors;
    },
    onSubmit: async (data) => {
      setloading(true);
      setloadingIcon("pi pi-spin pi-spinner");
      const res = await dispatch(loginAction(data));
      setloading(false);
      setloadingIcon("");
      console.log(res?.data);
      if (res?.data.login) {
        // history.push("/dashboard");
      }
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="login_body">
      <div align="center" style={{ marginTop: "4%", marginBottom: "1%" }}>
        <h2>Welcome to Centralin</h2>
      </div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form
            action="#"
            className="login_form"
            onSubmit={formik.handleSubmit}
          >
            <div className="p-mb-4">
              <h1 className="login_h1">Login</h1>
            </div>
            <div className="mt-4">
              <input
                id="email"
                className={classNames(
                  { "p-invalid": isFormFieldValid("email") },
                  "login_input"
                )}
                name="email"
                value={formik.values.email}
                placeholder="Enter email"
                onChange={formik.handleChange}
                type="text"
              />
              {getFormErrorMessage("email")}
              <input
                className={classNames(
                  { "p-invalid": isFormFieldValid("password") },
                  "login_input"
                )}
                name="password"
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
              />
              {getFormErrorMessage("password")}
              <div className="p-mt-2">
                <Button
                  className="login_button"
                  label="Login"
                  icon={loadingIcon || ""}
                  iconPos="right"
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <p>
                <a href="/register" className="login_p">
                  Don't have an account?
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="login_h1">Welcome!</h1>
              <p className="login_p">Please login to access Centralin</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p className="login_p">
          {" "}
          Copyright © 2022 Jahanzeb. All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Login;
