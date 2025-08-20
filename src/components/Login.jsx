
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

const initialForm = {
    email: '',
    password: '',
    terms: false
}
const errorMessages = {
    email: 'Email is required',
    password: 'Password is required',
    terms: 'You must accept the terms and conditions'
}
export default function Login() {
    const [isValid, setIsValid] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState({
        email: false,
        password: false,
        terms: false
    });


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    function validatePassword(str) {
        let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return re.test(str);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });

        if (name === "email") {
            if (validateEmail(value)) {
                setError({ ...error, [name]: false });
            }
            else {
                setError({ ...error, [name]: true });

            }
        }

        if (name === "password") {
            if (validatePassword(value)) {
                setError({ ...error, [name]: false })
            }
            else {
                setError({ ...error, [name]: true })
            }
        }

        if (name === "terms") {
            if (checked) {
                setError({ ...error, [name]: false });
            } else {
                setError({ ...error, [name]: true });
            }
        }
    }
    useEffect(() => {
        if (form.email.trim() !== '' && form.password.trim() !== '' && form.terms && validateEmail(form.email) && validatePassword(form.password)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        setForm(initialForm);
    }



    return (<div className="login-container">
        <Card className="my-2 shadow"
            color="primary"
            outline
            style={{
                width: '22rem'
            }}>
            <CardBody>
                <CardTitle tag="h2">
                    Register
                </CardTitle>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        {" "}
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="example@example.com"
                            type="email"
                            onChange={handleChange}
                            value={form.email}
                            invalid={error.email && form.email !== ''}
                            valid={form.email.trim() !== '' && !error.email}

                        />
                        <FormFeedback>
                            {error.email && errorMessages.email}
                        </FormFeedback>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="examplePassword">
                            Password
                        </Label>
                        {' '}
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="password placeholder"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            invalid={error.password && form.password !== ''}
                            valid={form.password.trim() !== '' && !error.password}

                        />
                        <FormFeedback>
                            {error.password && errorMessages.password}
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup check>

                        <Input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            invalid={error.terms}
                            checked={form.terms}
                            onChange={handleChange}
                        />
                        {' '}
                        <Label htmlFor="terms">
                            Check me out
                        </Label>
                        {' '}
                        <FormFeedback>
                            {error.terms && errorMessages.terms}
                        </FormFeedback>
                    </FormGroup>
                    <Button disabled={!isValid} type="submit" color="primary" className="w-100">
                        Submit
                    </Button>
                </Form>
            </CardBody>
        </Card>
    </div>
    )
}