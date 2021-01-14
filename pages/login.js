import React from "react";
import { withContext } from "../components/Context/AppProvider";
import { API_URL } from "../utils/urls";

import Router from "next/router";
import axios from "axios";

class LogIn extends React.Component {
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
    console.log(this.props);
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

  onSubmit = async (event) => {
    event.preventDefault();
    const {
      data: { email, username, password },
    } = this.state;
    const {
      context: { onRegisterUser },
    } = this.props;

    const data = {
      // identier: email,  => for logging in
      email,
      password,
      username: email,
    };

    const userCreationRes = await axios({
      method: "POST",
      url: `${API_URL}/auth/local/register`,
      data,
    });
    this.setState({ loading: true });
    console.log("data", data);
    console.log("onRegisterUser", onRegisterUser);
    console.log("userCreationRes", userCreationRes);

    if (onRegisterUser) {
      onRegisterUser(userCreationRes.data);
    }
  };
  render() {
    const {
      data: { email, username, password },
      error,
    } = this.state;
    const {
      context: { user },
    } = this.props;
    // console.log(user)

    return (
      <div>
        <div className="notification">{error}</div>
        <h1>Register or Log in</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={this.onChange}
              value={email}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={this.onChange}
              value={password}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
export default withContext(LogIn);
