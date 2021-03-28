//import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
var loggedIn = false;

class Members extends React.Component {
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
  handleSubmit = (event) => {
    event.preventDefault();
    let body = {
      username: this.state.username,
      password: this.state.password,
    }
    Axios.post(
      "/api/Members",
      body
    ).then((response) => {
      // detect successful Members
      if (response.data.username) {
        loggedIn = true;
        window.$loggedIn = "loggedIn"
        console.log("Members Login Successful");
        console.log("Members response: ", response)
      }
    })
      .catch(error => {
        loggedIn = false;
        window.$loggedIn = "loggedOut"
        console.log("unsuccessful Members error:", error);
      })
    // this hides "Enter Pandea Chat Room" so just show it all the time
    //window.location.href = '/Members'
    //window.location.href = 'http://google.com';
    window.location.href = '/Chat'
  }
  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossOrigin="anonymous" />
        <link rel="stylesheet" href="./css/style.css" />
        <form onSubmit={this.handleSubmit}>
          <title>Pangea</title>
          <div className="join-container">
            <header className="join-header">
              <h1><i className="fas fa-smile" /> Pangea</h1>
            </header>
            <main className="join-main">
              <form action="chat.html">
                <div className="form-control">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" placeholder="Enter username..." required />
                </div>
                <div className="form-control">
                  <label htmlFor="room">Room</label>
                  <select name="room" id="room">
                    <option value="English">English</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <button type="submit" className="btn">Join Chat</button>
              </form>
            </main>
          </div>
          </form>
      </div>
    );
  }
}

export default Members;
