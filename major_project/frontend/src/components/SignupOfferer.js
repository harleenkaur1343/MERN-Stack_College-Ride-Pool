import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import './UserAuth.css'

const Signup_offerer = () => {

  const formvals = {
    name : "",
    email: "",
    phone: 0,
    urn: 0,
    password : "",
    role: "offerer",
  }
  const [nameV, setNameV] = useState(false);
    const [emailV, setEmailV] = useState(false);
    const [phoneV, setPhoneV] = useState(false);
    const [urnV, setUrnV] = useState(false);
    const [passwordV, setPasswordV] = useState(false);
    const [fetchErr, setFetchErr] = useState(null);
  const [form, setForm] = useState({formvals});
  const [errors, setErrors] = useState({formvals});

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
    if ( !!errors[field] ) setErrors({
        ...errors,
        [field]: null
    })
    
  };

  const handleSubmit = async(event) => {
    console.table(form.name)
    event.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    }
    else
    {
        console.log(form)
        const response = await fetch("/user/signup",{
          method: "POST",
          url : "/user/signup",
          headers: {"Content-Type": "application/json"},
          body : JSON.stringify({
            name : form.name+"",
            email : form.email+"",
            phone : form.phone.toString(),
            urn : form.urn.toString(),
            password : form.password+"",
            role : "offerer"
          })
        });

        const json = response.json();

        if(!response.ok)
        {
          setFetchErr(json.error);
          console.log("Error is " + json);
        }

        if(response.ok)
        {
          setForm(formvals);
          setErrors(formvals);
          alert("Thanks for signing up");
        }
    }
  }

  const findFormErrors = () => {
    const { name, email, phone, urn, password } = form;
    
    const newErrors = {};
    // name errors
    console.log(name)
    if (!name || name === "" || name.length>40) 
    {
        newErrors.name = "Invalid Name";
        setNameV(true);
    }
    else{
        delete newErrors.name;
        setNameV(false);
    }
    
    if (!email || email === "")
    {
        newErrors.email = "This is a required field";
        setEmailV(true);
    } 
    else if(!email.includes("@"))
    {
        newErrors.email = "Invalid Email";
        setEmailV(true);
    }
    else{
        delete newErrors.email;
        setEmailV(false);
    }
    
    if (urn.toString().length!=7)
    {
        newErrors.urn = "Not a valid University Roll Number!";
        setUrnV(true);
    }
    else{
        delete newErrors.urn
        setUrnV(false);
    }

    if (!phone || phone.length === 0)
    {
        newErrors.phone = "This is a required field";
        setPhoneV(true);
    } 
    else if(phone.toString().length != 10)
    {
        newErrors.phone = "Invalid Phone number";
        setPhoneV(true);
    } 
    else{
        delete newErrors.phone
        setPhoneV(false);
    }

    if (!password || password === "") 
    {
        newErrors.password = "This is a required field!";
        setPasswordV(true);
    }
    else{
        delete newErrors.password 
        setPasswordV(false);
    }

    return newErrors;
  };

  return (
    <>
      <Container fluid className="signup_form_cont d-flex flex-column justify-content-center align-items-center">
        <Form noValidate onSubmit={handleSubmit} className="signup_form">
            <h2>Signup - Offerer</h2>
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
              <Form.Control.Feedback type='invalid'>{ errors.name }</Form.Control.Feedback>
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
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form_group">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setField("phone", e.target.value)}
                isInvalid={ !!phoneV}
                value={form.phone}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form_group">
              <Form.Label>University Roll Number</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setField("urn", e.target.value)}
                isInvalid={ !!urnV}
                value={form.urn}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.urn}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form_group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setField("password", e.target.value)}
                isInvalid={ !!passwordV}
                value={form.password}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <br></br>
            <center><Button type="submit">Submit form</Button></center>
        </Form>
      </Container>
    </>
  );
};

export default Signup_offerer;
