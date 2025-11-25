import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./UserAuth.css";
import { useLogin } from "../hooks/useLogin";
import { useAuthContest } from "../hooks/useAuthContext";

const Login = () => {
  const { login, error, isLoading } = useLogin();

  //default values
  const formvals = {
    email: "",
    urn: 0,
    password: "",
  };

  //for validation
  const [emailV, setEmailV] = useState(false);
  const [urnV, setUrnV] = useState(false);
  const [passwordV, setPasswordV] = useState(false);

  const [fetchErr, setFetchErr] = useState(null);
  const [form, setForm] = useState(formvals);
  const [errors, setErrors] = useState(formvals);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      //console.log(form);

      await login(form.email, form.urn, form.password).then((res) => {
        //console.log(res);
        if (res == null) {
          setForm(formvals);
          setErrors(formvals);
          alert("You are logged in");
        }
      });
    }
  };

  const findFormErrors = () => {
    const { name, email, phone, urn, password } = form;

    const newErrors = {};
    // name errors

    if (!email || email === "") {
      newErrors.email = "This is a required field";
      setEmailV(true);
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid Email";
      setEmailV(true);
    } else {
      delete newErrors.email;
      setEmailV(false);
    }
    console.log("Check error 1 ", urn);

    if (urn == 0 || urn.toString().length != 7) {
      console.log("Check error ", urn);
      newErrors.urn = "Not a valid University Roll Number!";
      setUrnV(true);
    } else if (!urn) {
      newErrors.urn = "Not a valid University Roll Number!";
    } else {
      delete newErrors.urn;
      setUrnV(false);
    }

    if (!password || password === "") {
      newErrors.password = "This is a required field!";
      setPasswordV(true);
    } else {
      delete newErrors.password;
      setPasswordV(false);
    }

    return newErrors;
  };

  return (
    <>
      <Container
        fluid
        className="signup_form_cont d-flex flex-column justify-content-center align-items-center"
      >
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="signup_form loginform"
        
        >
          <h3>Sign In</h3>
          <br></br>

          <Form.Group className="form_group">
            <Form.Label>
              Email <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              style={{ width: "100%" }}
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
              University Roll Number <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              style={{ width: "100%" }}
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

          <Form.Group className="form_group">
            <Form.Label>
              Password <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="password"
              required
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={!!passwordV}
              value={form.password}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <br></br>
          <center>
            <Button className="submitBtn" type="submit" disabled={isLoading}>
              SIGN IN
            </Button>
            {error && (
              <div
                className="errorr"
                style={{
                  marginTop: "12px",
                  padding: "8px",
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

export default Login;
