import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidUpdate() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this.props.history.push({
        pathname: "/home",
        state: {
          isLoggedIn: isLoggedIn,
        },
      });
    }
  }

  hanldeLogin = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: true,
    });
  };

  render() {
    return (
      <div>
        <center>
          <h1>Login Form </h1>
        </center>
        <div className="container">
          <form>
            <div className="container">
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <button onClick={this.hanldeLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
