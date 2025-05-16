import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      error: null
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      error: null
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log('Submitting user:', user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log('Response:', res.data);
        this.setState({
          username: '',
          error: null
        });
        alert('User created successfully!');
      })
      .catch(err => {
        console.error('Error creating user:', err);
        this.setState({
          error: 'Failed to create user. Ensure the backend is running and the endpoint is correct.'
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        {this.state.error && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}