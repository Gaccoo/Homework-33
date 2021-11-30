import React, { useState } from 'react';
import Item, { TODO } from './item';

type AppProps = {
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}

const List = ({
  todos, setTodos,
}: AppProps) => {
  const [filter, setFilter] = useState(false);
  const deleteHandler = (id: number) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };
  const doneHandler = (id: number) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodos(newTodos);
  };
  return (
    <div className="todo-window">
      <div className="todo-list__filter">
        <span className="f-button">ALL</span>
        <span className="f-button">FINISHED</span>
        <span className="f-button">UNFINISHED</span>
        <span className="f-button">LOW</span>
        <span className="f-button">NORMAL</span>
        <span className="f-button">HIGH</span>
      </div>
      <div className="todo-list">
        {
        todos.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            id={item.id}
            done={item.done}
            priority={item.priority}
            doneHandler={doneHandler}
            deleteHandler={deleteHandler}
            todos={todos}
            setTodos={setTodos}
          />
        ))
      }
      </div>
    </div>
  );
};

export default List;
