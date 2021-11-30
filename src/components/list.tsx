import React, { useState } from 'react';
import { MdOutlineReplyAll } from 'react-icons/md';
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/all';
import Item, { TODO } from './item';

type AppProps = {
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}

type Filter = {
  state: boolean | undefined
  priority: number | undefined
}

const List = ({
  todos, setTodos,
}: AppProps) => {
  const [filter, setFilter] = useState<Filter>({ state: undefined, priority: undefined });
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

  const filterHandler = (type: string) => {
    if (type === 'F') {
      switch (filter.state) {
        case true:
          setFilter({ ...filter, state: false });
          break;
        case false:
          setFilter({ ...filter, state: undefined });
          break;
        case undefined:
          setFilter({ ...filter, state: true });
          break;
        default:
          setFilter({ ...filter, state: undefined });
      }
    } else {
      switch (filter.priority) {
        case undefined:
          setFilter({ ...filter, priority: 0 });
          break;
        case 0:
          setFilter({ ...filter, priority: 1 });
          break;
        case 1:
          setFilter({ ...filter, priority: 2 });
          break;
        case 2:
          setFilter({ ...filter, priority: undefined });
          break;
        default:
          setFilter({ ...filter, priority: undefined });
      }
    }
  };
  return (
    <div className="todo-window">
      <div className="todo-list__controls">
        <span className="icon" onClick={() => setFilter({ state: undefined, priority: undefined })}><MdOutlineReplyAll /></span>
        <span className="icon" onClick={() => filterHandler('F')}>FINISHED/UNFINISHED</span>
        <span className="icon" onClick={() => filterHandler('P')}><FcHighPriority /></span>

      </div>
      <div className="todo-list">
        {
          // eslint-disable-next-line eqeqeq
        todos.filter((item) => {
          if (filter.state === undefined) {
            return item;
          }
          return item.done === filter.state;
        })
          .filter((item) => {
            if (filter.priority === undefined) {
              return item;
            }
            return item.priority === filter.priority;
          }).sort((a, b) => b.priority - a.priority)
          .map((item) => (
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
