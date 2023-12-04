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
    location: "Other",
    role: "rider",
  };
  const [nameV, setNameV] = useState(false);
  const [emailV, setEmailV] = useState(false);
  const [phoneV, setPhoneV] = useState(false);
  const [urnV, setUrnV] = useState(false);
  const [passwordV, setPasswordV] = useState(false);
  const [locationV, setLocationV] = useState(false);

  const [fetchErr, setFetchErr] = useState(null);
  const [form, setForm] = useState({ formvals });
  const [errors, setErrors] = useState({ formvals });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      console.log(form);
      await signup(
        form.name,
        form.email,
        form.phone,
        form.urn,
        form.location,
        form.password,
        "rider"
      );

      if (error == null) {
        alert("Thanks for signing up");
        setForm(formvals);
        setErrors(formvals);
      }
      /*const response = await fetch("/user/signup", {
        method: "POST",
        url: "/user/signup",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name + "",
          email: form.email + "",
          phone: form.phone.toString(),
          urn: form.urn.toString(),
          password: form.password + "",
          location: form.location + "",
          role: "rider",
        }),
      })
        .then((value) => {
          console.log(value.json());
          alert("Thanks for signing up");
          setForm(formvals);
          setErrors(formvals);
        })
        .catch((err) => {
          const { error } = err;
          console.log("ERROR");
          console.log(error);
        });
      */
    }
  };

  const findFormErrors = () => {
    const { name, email, phone, urn, password } = form;

    const newErrors = {};
    // name errors
    console.log(name);
    if (!name || name === "" || name.length > 40) {
      newErrors.name = "Invalid Name";
      setNameV(true);
    } else {
      delete newErrors.name;
      setNameV(false);
    }

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

    if (urn.toString().length != 7) {
      newErrors.urn = "Not a valid University Roll Number!";
      setUrnV(true);
    } else {
      delete newErrors.urn;
      setUrnV(false);
    }

    if (!phone || phone.length === 0) {
      newErrors.phone = "This is a required field";
      setPhoneV(true);
    } else if (phone.toString().length != 10) {
      newErrors.phone = "Invalid Phone number";
      setPhoneV(true);
    } else {
      delete newErrors.phone;
      setPhoneV(false);
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
        <Form noValidate onSubmit={handleSubmit} className="signup_form">
          <h2>Signup - Rider</h2>
          <br></br>
          <Form.Group className="form_group">
            <Form.Label>Name</Form.Label>
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
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Phone Number</Form.Label>
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
            <Form.Label>University Roll Number</Form.Label>
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

          <Form.Group className="form_group">
            <Form.Label>Location</Form.Label>
            <Form.Select
              type="text"
              required
              onChange={(e) => setField("location", e.target.value)}
              isInvalid={!!locationV}
              value={form.location}
            >
              {locations.map((loc) => {
                return (
                  <option value={loc.area}>
                    {loc.area}, {loc.pincode}, {loc.city}
                  </option>
                );
              })}
              <option selected="selected" value="Other">
                Other
              </option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.urn}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form_group">
            <Form.Label>Password</Form.Label>
            <Form.Control
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
            <Button type="submit" disabled={isLoading}>
              Submit form
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
