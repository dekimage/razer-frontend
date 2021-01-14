import React from "react";
import { strapiRegister } from "../lib/auth";
import Router from "next/router";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import "../styles/pages/signin.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        username: "",
        password: "",
      },
      loading: false,
      error: "",
    };
  }

  onChange(propertyName, event) {
    const { data } = this.state;
    data[propertyName] = event.target.value;
    this.setState({ data });
  }
  onSubmit() {
    const {
      data: { email, username, password },
    } = this.state;
    this.setState({ loading: true });

    strapiRegister(username, email, password)
      .then(() => this.setState({ loading: false }))
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    const { error } = this.state;
    return (
      <div className="section-signin">
        <div className="signin-box">
          <div className="notification">{error}</div>

          {/* <h4>Hello Friend!</h4>
          <h5>Enter your personal details and start your journey! </h5> */}

          <Form>
            <div className="email-box">
              <div className="text-header">Username:</div>
              <Input
                onChange={this.onChange.bind(this, "username")}
                type="text"
                name="username"
                style={{ height: 50, fontSize: "1.2em" }}
              />
            </div>
            <div className="email-box">
              <div className="text-header">Email:</div>
              {/* <Input
                onChange={this.onChange}
                value={email}
                type="email"
                name="email"
                id="email"
                style={{ height: 50, fontSize: "1.2em" }}
              /> */}
              <Input
                onChange={this.onChange.bind(this, "email")}
                type="email"
                name="email"
                style={{ height: 50, fontSize: "1.2em" }}
              />
            </div>
            <div className="password-box">
              <div className="text-header">Password:</div>
              {/* <Input
                onChange={this.onChange}
                value={password}
                type="password"
                name="password"
                id="password"
                style={{ height: 50, fontSize: "1.2em" }}
              /> */}
              <Input
                onChange={this.onChange.bind(this, "password")}
                type="password"
                name="password"
                style={{ height: 50, fontSize: "1.2em" }}
              />
            </div>

            <div
              className="button button-primary"
              onClick={this.onSubmit.bind(this)}
            >
              Create Account
            </div>
          </Form>

          <div className="label-or">Already have account?</div>
          <Link as="/signin" href="/signin">
            <div className="button button-secondary">Sign In</div>
          </Link>
        </div>
      </div>
    );
  }
}
export default SignUp;
