import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import CustomerList from './views/customerList.jsx';
import AddCustomer from './views/addCustomer.jsx';
import EditCustomer from './views/editCustomer.jsx';

class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Switch>
          <Route exact path="/" component={CustomerList}></Route>
          <Route exact path="/add-customer" component={AddCustomer}></Route>
          <Route exact path="/edit-customer" component={EditCustomer}></Route>
          <Route exact path="/edit-customer/:id" component={EditCustomer}/>
        </Switch>
      </div>

    );
  }
}

export default App;
