import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./UserAuth.css";
import places from "./SearchData";
import { useSignup } from "../hooks/useSignup";

const Signup_rider = () => {
  const locations = places;
  //for resetting
  const formvals = {
    name: "",
    email: "",
    phone: 0,
    urn: 0,
    password: "",
    ridetype: "none",
    branch: "",
    year: "",
    location: "",
    role: "rider",
  };
  const [nameV, setNameV] = useState(false);
  const [emailV, setEmailV] = useState(false);
  const [phoneV, setPhoneV] = useState(false);
  const [urnV, setUrnV] = useState(false);
  const [passwordV, setPasswordV] = useState(false);
  const [branchV, setBranchV] = useState(false);
  const [yearV, setYearV] = useState(false);
  const [locationV, setLocationV] = useState(false);

  const [fetchErr, setFetchErr] = useState(null);
  const [form, setForm] = useState(formvals);
  const [errors, setErrors] = useState(formvals);

  const { signup, error, isLoading } = useSignup();

  /*
The form object will hold a key-value pair for each of our form fields, and the errors object will hold a key-value pair for each error that we come across on form submission.
To update the state of form, we can write a simple function:    
    */
  //updates the matching the name with the latest value
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  console.log("Form ", form);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      console.log("Errors ", newErrors);
      setErrors(newErrors);
    } else {
      await signup(
        form.name,
        form.email,
        form.phone,
        form.urn,
        form.location,
        form.password,
        form.branch,
        form.year,
        form.ridetype,
        "rider"
      )
        .then((response) => {
          console.log("Signup response: ", response);
          alert("Thanks for signing up");
        })
        .catch((err) => {
          alert(err.message);
          console.log(err);
        });
    }
  };

  const findFormErrors = () => {
    const { name, email, phone, urn, password, branch, year, location } = form;
    console.log("Year on form submit", year === "");
    const newErrors = {};
    console.log("Branch val when not set", branch);
    // name errors

    if (!name || name === "" || name.length > 40) {
      newErrors.name = "Invalid Name";
      setNameV(true);
    } else {
      delete newErrors.name;
      setNameV(false);
    }

    if (!location || location === "") {
      newErrors.location = "This is a required field!";
      setLocationV(true);
    } else {
      delete newErrors.location;
      setLocationV(false);
    }

    if (year === "" || !year) {
      newErrors.year = "This is a required field!";
      setYearV(true);
      console.log("In year check", newErrors);
    } else if (
      (branch.includes("MBA") && (year === "3rd" || year === "4th")) ||
      ((branch.includes("MCA") || branch.includes("BCA")) && year === "4th") ||
      ((branch.includes("M.Tech") || branch.includes("BCA")) && year === "4th")
    ) {
      newErrors.year = "Invalid year";
      setYearV(true);
    } else {
      delete newErrors.year;
      setYearV(false);
    }

    if (!email || email === "") {
      newErrors.email = "This is a required field";
      console.log("In email check", newErrors);
      setEmailV(true);
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid Email";
      setEmailV(true);
    } else {
      delete newErrors.email;
      setEmailV(false);
    }

    if (urn.toString().length != 7) {
      newErrors.urn = "Not a valid University Roll Number!";
      setUrnV(true);
      console.log("In urn check", newErrors);
    } else {
      delete newErrors.urn;
      setUrnV(false);
    }

    if (!phone || phone.length === 0) {
      newErrors.phone = "This is a phone field";
      console.log("In phone check", newErrors);
      setPhoneV(true);
    } else if (phone.toString().length != 10) {
      newErrors.phone = "Invalid Phone number";
      setPhoneV(true);
    } else {
      delete newErrors.phone;
      setPhoneV(false);
    }
    if (!branch || branch === "") {
      newErrors.branch = "This is a required field!";
      console.log("In branch check", newErrors);
      setBranchV(true);
    } else {
      delete newErrors.branch;
      setBranchV(false);
    }

    if (!password || password === "") {
      newErrors.password = "This is a required field!";
      setPasswordV(true);
    } else {
      delete newErrors.password;
      setPasswordV(false);
    }
    console.log("Setyear val before returning", newErrors);
    return newErrors;
  };

  return (
    <>
      <Container
        fluid
        className="signup_form_cont d-flex flex-column justify-content-center align-items-center"
      >
        <Form noValidate onSubmit={handleSubmit} className="signup_form">
          <h3>Signup - Rider</h3>
          <br></br>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="form_group">
                <Form.Label>
                  Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setField("name", e.target.value)}
                  isInvalid={!!nameV}
                  value={form.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form_group">
                <Form.Label>
                  Email <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setField("email", e.target.value)}
                  isInvalid={!!emailV}
                  value={form.email}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form_group">
                <Form.Label>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => setField("phone", e.target.value)}
                  isInvalid={!!phoneV}
                  value={form.phone}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form_group">
                <Form.Label>
                  University Roll Number (7 digits) <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => setField("urn", e.target.value)}
                  isInvalid={!!urnV}
                  value={form.urn}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.urn}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="form_group">
                <Form.Label>
                  Branch <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  type="text"
                  required
                  onChange={(e) => setField("branch", e.target.value)}
                  isInvalid={!!branchV}
                  value={form.branch}
                  defaultValue=""
                >
                  <option value="" disabled defaultChecked>
                    Select your branch
                  </option>
                  <option value="B.Tech - IT">B.Tech - IT</option>
                  <option value="B.Tech - CSE">B.Tech - CSE</option>
                  <option value="B.Tech - ECE">B.Tech - ECE</option>
                  <option value="B.Tech - EE">B.Tech - EE</option>
                  <option value="B.Tech - CE">B.Tech - CE</option>
                  <option value="B.Tech - ME">B.Tech - ME</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="M.Tech - IT">M.Tech - IT</option>
                  <option value="M.Tech - CSE">M.Tech - CSE</option>
                  <option value="M.Tech - ECE">M.Tech - ECE</option>
                  <option value="M.Tech - EE">M.Tech - EE</option>
                  <option value="M.Tech - CE">M.Tech - CE</option>
                  <option value="M.Tech - ME">M.Tech - ME</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.branch}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form_group">
                <Form.Label>
                  Year <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  type="text"
                  onChange={(e) => setField("year", e.target.value)}
                  required
                  isInvalid={!!yearV}
                  value={form.year}
                >
                  <option value="" disabled defaultChecked>
                    Choose your year
                  </option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.year}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form_group">
                <Form.Label>
                  Location <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  type="text"
                  required
                  onChange={(e) => setField("location", e.target.value)}
                  isInvalid={!!locationV}
                  value={form.location}
                  defaultValue=""
                >
                  {locations.map((loc) => {
                    return (
                      <option value={loc.area}>
                        {loc.area}, {loc.pincode}, {loc.city}
                      </option>
                    );
                  })}
                  <option selected="selected" value="" disabled defaultChecked>
                    Select your location
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.location}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form_group">
                <Form.Label>
                  Password <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setField("password", e.target.value)}
                  isInvalid={!!passwordV}
                  value={form.password}
                ></Form.Control>
                <p style={{ fontSize: "12px", color: "grey" }}>
                  Password must contain small and capital letters, digits and
                  special characters with min length 8
                </p>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <br></br>
          <center>
            <Button className="submitBtn" type="submit" disabled={isLoading}>
              SIGN UP
            </Button>
            {error && (
              <div
                className="errorr"
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  color: "crimson",
                }}
              >
                {error}
              </div>
            )}
          </center>
        </Form>
      </Container>
    </>
  );
};

export default Signup_rider;

