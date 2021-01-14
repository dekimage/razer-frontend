import React from "react";

import defaultPage from "../hocs/defaultPage";
import { strapiLogin } from "../lib/auth";
import Link from "next/link";

import "../styles/pages/signin.scss";

import Router from "next/router";
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
import Cookies from "js-cookie";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      loading: false,
      error: "",
    };
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      Router.push("/"); // redirect if you're already logged in
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { data } = this.state;
    data[name] = value;
    this.setState({ data });
  };

  onSubmit = () => {
    const {
      data: { email, username, password },
    } = this.state;

    this.setState({ loading: true });

    strapiLogin(email, password).then();
    //redirect Link maybe
  };
  render() {
    const {
      data: { email, username, password },
      error,
    } = this.state;
    console.log(error);

    return (
      <div className="section-signin">
        <div className="signin-box">
          <div className="notification">{error}</div>
          <Form>
            <div className="email-box">
              <div className="text-header">Email:</div>
              <Input
                onChange={this.onChange}
                value={email}
                type="email"
                name="email"
                id="email"
                style={{ height: 50, fontSize: "1.2em" }}
              />
            </div>
            <div className="password-box">
              <div className="text-header">Password:</div>
              <Input
                onChange={this.onChange}
                value={password}
                type="password"
                name="password"
                id="password"
                style={{ height: 50, fontSize: "1.2em" }}
              />
            </div>

            <div
              className="button button-primary"
              onClick={this.onSubmit.bind(this)}
            >
              Log In
            </div>
          </Form>

          <div className="forgot-password">
            <a href="">
              <small>Forgot Password?</small>
            </a>
          </div>

          <div className="label-or">Don't have account?</div>
          <Link as="/signup" href="/signup">
            <div className="button button-secondary">Join For Free</div>
          </Link>
        </div>
      </div>
    );
  }
}
export default SignIn;
