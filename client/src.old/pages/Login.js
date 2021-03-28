//import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  onInputChange = (event) => {
    var name = event.target.name
    var value = event.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    console.log(this.state);
    let body={
        username: this.state.username,
        password: this.state.password,
    }
    Axios.post(
      "/api/login",
       body
    ).then((response)=>{
        console.log("Login",response)
        // redirect to login page
      })
    }
  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <input onChange={this.onInputChange} type="text" class="form-control" name={"username"} placeholder="Username" />
        <input onChange={this.onInputChange} type="text" class="form-control" name={"password"} placeholder="Password" />
        <button class="btn btn-lg btn-primary btn-block" id="submit" type="submit">Submit</button>
      </form>
    </div>
    )
  }
}

export default Login;
