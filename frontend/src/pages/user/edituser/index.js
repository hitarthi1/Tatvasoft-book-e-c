import React, { useEffect, useState } from "react";
import { editUserStyle } from "./style";

import * as Yup from "yup";

import { materialCommonStyles } from "../../../utils/materialCommonStyles";
import {
  Link,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import userService from "../../../service/user/user.service";
import { StatusCode } from "../../../constant/constant";
import { Formik } from "formik";
//import { IAddOrEditUser } from "../../../service/user/user.model";
import ValidationErrorMessage from "../../../components/ValidationErrorMessage/ValidationErrorMessage";
import { toast } from "react-toastify";
const EditUser = () => {
  const [roles, setRoles] = useState([]);
  const classes = editUserStyle();
  const materialClasses = materialCommonStyles();
  const history = useHistory();
  const initialValues= {
    id: 0,
    email: "@gmail.com",
    lastName: "",
    firstName: "",
    roleId: 3,
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getUserById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    roleId: Yup.number().required("Role is required"),
  });

  const getRoles = () => {
    userService.getAllUserRoles().then((res) => {
      if (res ) {
        console.log({res});
        setRoles(res);
      }
    });
  };

  const getUserById = () => {
    userService.getById(Number(id)).then((res) => {
      if (res ) {
        setInitialValueState({
          id: res[0].id,
          email: res[0].email,
          lastName: res[0].lastname,
          firstName: res[0].firstname,
          roleId: res[0].roleId,
        });



        console.log(res[0].email);
      }
    });
  };

  const onSubmit = (values) => {
    userService.update(values).then((res) => {
      console.log(values);
      if (res ) {
        toast.success(res.message);
        history.push("/user");
      }
    });
  };
  return (
    <div className={classes.editUserWrapper}>
      <div className="container">
        <Typography variant="h1">Edit User</Typography>
        <Formik
      
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.firstName}
                    touched={touched.firstName}
                  />
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="last-name"
                    name="lastName"
                    label="Last Name *"
                    value={values.lastName}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.lastName}
                    touched={touched.lastName}
                  />
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    label="Email *"
                    value={values.email}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                </div>
                <div className="form-col">
                  <FormControl className="dropdown-wrapper" variant="outlined">
                    <InputLabel htmlFor="select">Roles</InputLabel>
                    <Select
                      name={"roleId"}
                      id={"roleId"}
                      onChange={handleChange}
                      className={materialClasses.customSelect}
                      MenuProps={{
                        classes: { paper: materialClasses.customSelect },
                      }}
                      value={values.roleId}
                    >
                      {roles?.map((rl) => (
                        <MenuItem value={rl.id} key={"role" + rl.id}>
                          {rl.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                
                >
                  Save
                </Button>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    history.push("/user");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUser;
