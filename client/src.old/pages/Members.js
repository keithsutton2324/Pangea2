import React from "react";
import Axios from "axios";

class Members extends React.Component {
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
      "/api/Members",
       body
    ).then(
        // redirect to members page
    )
  }
  render() {
    return (<div>
      <form>
        <h2>Members</h2>
      </form>
    </div>
    )
  }
}

export default Members;
