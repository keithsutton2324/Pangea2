import React from "react";
import Axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Logout extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    preferredlang: "",
    country: ""
  }

  onInputChange = (event) => {
    var name = event.target.name
    var value = event.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    let body = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      preferredlang: this.state.preferredlang,
      country: this.state.country
    }
    Axios.post(
        "/api/Logout",
      body
    ).then(
      // redirect to logout page
    )
  }
  render() {
    window.$loggedIn="";
    return (<div>
      <form>
        <h2>Logout</h2>
      </form>
    </div>
    )
  }
}

export default Logout;
