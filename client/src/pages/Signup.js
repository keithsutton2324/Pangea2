import React from "react";
import Axios from "axios";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

class Signup extends React.Component {
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
  handleSubmit=(event)=> {
    event.preventDefault();
    console.log(this.state);
    let body={
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        preferredlang: this.state.preferredlang,
        country: this.state.country
    }
    Axios.post(
      "/api/signup",
       body
    ).then(
        // redirect to members page
        //console.log("redirect to members page")
        )
    window.location.href = '/'
  }
  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <h2>Create A User</h2>
        <ul>
        <li>  
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"username"} placeholder="Username" /></p>
        </li>
        <li>
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"password"} placeholder="Password" /></p>
        </li>
        <li>
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"email"} placeholder="Email" /></p>
        </li>
        <li>
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"preferredlang"} placeholder="Preferred Language" /></p>
        </li>
        <li>
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"country"} placeholder="Country" /></p>
        </li>
        <li>
        <button class="btn btn-lg btn-primary btn-block" id="submit" type="submit">Submit</button>
        </li>
        </ul>
      </form>
    </div>
    )
  }
}

export default Signup;

    