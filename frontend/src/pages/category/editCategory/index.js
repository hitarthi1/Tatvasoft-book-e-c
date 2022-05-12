import React, { useEffect, useState } from "react";
import { editStyle } from "./style";
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
import categoryService from "../../../service/category/category.service";
//import { StatusCode } from "../../../constant/constant";
import { Formik } from "formik";
//import { IAddOrEditCategory } from "../../../service/category/category.model";
import ValidationErrorMessage from "../../../components/ValidationErrorMessage/ValidationErrorMessage";
import { toast } from "react-toastify";
const EditCategory = () => {
  const [roles, setRoles] = useState([]);
  const classes = editStyle();
 const materialClasses = materialCommonStyles();
  const history = useHistory();
  const initialValues = {
    id: 0,
    name: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    // categoryService.getById(Number(id)).then((res) => {
    //   if (res && res.code === StatusCode.Success) {
    //     setInitialValueState({
    //       id: res.data.id,
    //       name: res.data.name,
    //     });
    //   }
    // });
  };

  const onSubmit = (values) => {
    // categoryService.save(values).then((res) => {
    //   if (res && res.code === StatusCode.Success) {
    //     toast.success(res.message);
    //     history.push("/category");
    //   }
    // });
  };
  return (
    <div className={classes.editWrapper}>
      <div className="container">
        <Typography variant="h1">{id ? "Edit" : "Add"} Category</Typography>
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
                    name="name"
                    label="Category Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                  />
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
                    history.push("/category");
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

export default EditCategory;