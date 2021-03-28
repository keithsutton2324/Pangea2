import React from "react";
import Axios from "axios";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

var loggedIn = "loggedOut";

class Chats extends React.Component {
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
            "/api/Chats",
            body
        ).then(
            // redirect to Chats page
        )
            .catch(error => {
            })
        //window.location.href = 'http://google.com';
    }
    render() {
        return (
            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossOrigin="anonymous" />
                <link rel="stylesheet" href="./css/style.css" />
                <title>Pangea</title>
                <div className="chat-container">
                    <header className="chat-header">
                        <h1><i className="fas fa-smile" /> Pangea</h1>
                        <a id="leave-btn" className="btn">Leave Room</a>
                    </header>
                    <main className="chat-main">
                        <div className="chat-sidebar">
                            <h3><i className="fas fa-comments" /> Room Name:</h3>
                            <h2 id="room-name" />
                            <h3><i className="fas fa-users" /> Users</h3>
                            <ul id="users" />
                        </div>
                        <div className="chat-messages" />
                    </main>
                    <div className="chat-form-container">
                        <form id="chat-form">
                            <input id="msg" type="text" placeholder="Enter Message" required autoComplete="off" />
                            <button className="btn"><i className="fas fa-paper-plane" /> Send</button>
                        </form>
                    </div>
                </div>

                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.2/qs.min.js"
                    integrity="sha256-TDxXjkAUay70ae/QJBEpGKkpVslXaHHayklIVglFRT4="
                    crossorigin="anonymous"
                ></script>
                <script src="/socket.io/socket.io.js"></script>
                <script src="js/main.js"></script>
            </div>
        );
    }
}

export default Chats;

/*
        <Route exact path="/normal_redirect" render={() => {window.location.href="indexTmp.html"}}></Route>
        <p><Link to="../../../Public/index.html" class="clickme">Enter Pangea Chat Room</Link></p>

        {window.$loggedIn ? (
          <p><Link to="/" class="clickme">Enter Pangea Chat Room</Link></p>
          ) : (
            <p></p>
            )}

<button onclick="myFunction()">Enter Pangea Chat Room</button>
*/
