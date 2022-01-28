import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// Importing components

import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import './App.css';

class App extends Component {
  state = {
    todos: [],
  };

  // COMPONENT MOUNT
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => this.setState({ todos: res.data }));
  }

  // TOGGLE TODO COMPLETE
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // DELETE TODO
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );

    // this.setState({
    //   todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    // });
  };

  // ADD TODO
  addTodo = (title) => {
    // DUMMY TODO CREATE
    // const newTodo = {
    //   id: this.uniqueId(),
    //   title,
    //   completed: false,
    // };

    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));

    // this.setState({ todos: [...this.state.todos, newTodo] });
  };

  // UNIQUE ID GENERATOR
  // uniqueId = () => {
  //   const d = new Date();
  //   let ms = d.valueOf();
  //   return ms;
  // };

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
            <Header />
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <AddTodo AddTodo={this.addTodo} />
                    <Todos
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                    />
                  </>
                }
              />

              <Route path='/about' element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
