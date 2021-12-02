import React, { useState } from 'react';
import { MdOutlineReplyAll } from 'react-icons/md';
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/all';
import Item, { TODO } from './item';

type AppProps = {
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}

type Filter = {
  state: string | undefined
  priority: number | undefined
}

const priorityList = [
  'Low',
  'Normal',
  'High',
];

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
        case 'Finished':
          setFilter({ ...filter, state: 'Unfinished' });
          break;
        case 'Unfinished':
          setFilter({ ...filter, state: undefined });
          break;
        case undefined:
          setFilter({ ...filter, state: 'Finished' });
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
        <span
          className="icon"
          onClick={() => setFilter({ state: undefined, priority: undefined })}
        >
          <MdOutlineReplyAll />
        </span>
        {/* eslint-disable-next-line no-nested-ternary */}
        <span className="icon" onClick={() => filterHandler('F')}>{filter.state ? `Completeness: ${filter.state}` : 'Completeness: All'}</span>
        <span
          className="icon"
          onClick={() => filterHandler('P')}
        >
          {typeof filter.priority === 'number' ? `Priority: ${priorityList[filter.priority]}` : 'Priority: All'}
        </span>

      </div>
      <div className="todo-list">
        {
          // eslint-disable-next-line eqeqeq
        todos.filter((item) => {
          if (filter.state === undefined) {
            return item;
          }
          if (filter.state === 'Finished') {
            return item.done;
          }
          return !item.done;
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
