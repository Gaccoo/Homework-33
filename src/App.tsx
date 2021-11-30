import React, { useState } from 'react';
import './App.scss';
import Input from './components/input';
import List from './components/list';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([{
    id: 1, name: 'Wash dishes', priority: 1, done: false,
  }, {
    id: 2, name: 'Take out the trash.', priority: 0, done: false,
  },
  {
    id: 3, name: 'Take out the dog.', priority: 2, done: false,
  }]);
  return (
    <div className="App">
      <div className="App-main">
        <header className="header">
          <h1>Things on your bucket list...</h1>
        </header>
        <div className="app-container">
          <Input todos={todos} setTodos={setTodos} />
          <List todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default App;
