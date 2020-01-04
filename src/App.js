
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css"
import {Jumbotron, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");





useEffect(() => {
  axios
    .get("https://randomuser.me/api/?results=200&nat=us").then(response => setUsers(response.data.results));
}, []);

const sortAscending = () => {
  const sortedUsers = [...users].sort((a, b) => a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1);
  setUsers(sortedUsers)
};
const sortDescending = () => {
  const sortedUsers = [...users].sort((a, b) => a.name.last.toLowerCase() < b.name.last.toLowerCase() ? 1 : -1);
  setUsers(sortedUsers);
};
return (
  <>

<Jumbotron className="text-center" style={{color: "blue"}}>
        <h1>User Directory</h1>
    <input type="text" value={inputValue} onChange={event => setInputValue(event.target.value)} />
    <button onClick={sortAscending}>
      <i className="fa fa-chevron-up"></i>
      </button>
    <button onClick={sortDescending}><i className="fa fa-chevron-down"></i></button>
      </Jumbotron >
    {users
      .filter(user =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(inputValue.toLowerCase()))
      .map(user => (
        <div key={user.id.value}>

<Table striped bordered hover className="text-center"  size="sm">
{/* 
        <Table class="table bordered" variant="dark"> */}
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name.first + (' ') + user.name.last}</td>
              <td>{user.login.username}</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </Table>
        </div>
    ))}
  </>
)
}

export default App
