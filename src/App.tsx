import React from 'react';
import './App.scss';
import Input from './components/input';
import List from './components/list';
import Progress from './components/progress';
import useLocalStorage from './hooks/localStorage';
import { TODO } from './components/item';
import initialData from './data/initialData';

const App = () => {
  const [todos, setTodos] = useLocalStorage('todos', initialData);
  const progress = ((todos.filter((item: TODO) => item.done).length / todos.length) * 100).toFixed(0);

  return (
    <div className="App">
      <div className="App-main">
        <header className="header">
          <h1>Things on your bucket list</h1>
        </header>
        <div className="app-container">
          {
            todos.length ? <Progress progress={progress} /> : null
          }

          <Input
            onSubmit={(input) => {
              const newObj = [...todos, {
                id: Math.round(Math.random() * 1000),
                name: input.name,
                priority: input.priority,
                done: false,
                file: null,
              }];
              setTodos(newObj);
            }}
          />
          <List todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default App;
