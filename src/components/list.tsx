import React, { useState } from 'react';
import { MdOutlineReplyAll } from 'react-icons/md';
import Item, { priorities, TODO } from './item';

type AppProps = {
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}

type Filter = {
  state: string | undefined
  priority: number | undefined
}

const filterHandler = (type: string, filterState: Filter) => {
  const newFilerState:Filter = { state: undefined, priority: undefined };
  if (type === 'F') {
    switch (filterState.state) {
      case 'Finished':
        newFilerState.state = 'Unfinished';
        break;
      case 'Unfinished':
        newFilerState.state = undefined;
        break;
      case undefined:
        newFilerState.state = 'Finished';
        break;
      default:
        return { ...filterState, state: undefined };
    }
  } else {
    switch (filterState.priority) {
      case undefined:
        newFilerState.priority = 0;
        break;
      case 0:
        newFilerState.priority = 1;
        break;
      case 1:
        newFilerState.priority = 2;
        break;
      case 2:
        newFilerState.priority = undefined;
        break;
      default:
        newFilerState.priority = undefined;
    }
  }
  return newFilerState;
};

const List = ({
  todos, setTodos,
}: AppProps) => {
  const [filter, setFilter] = useState<Filter>({ state: undefined, priority: undefined });

  const onDelete = (id: number) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };
  const onDone = (id: number) => {
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
      <div className="todo-list__controls">
        <span
          className="icon"
          onClick={() => setFilter({ state: undefined, priority: undefined })}
        >
          <MdOutlineReplyAll />
        </span>

        <span
          className="icon"
          onClick={() => setFilter(filterHandler('F', filter))}
        >
          {filter.state ? `Completeness: ${filter.state}` : 'Completeness: All'}
        </span>
        <span
          className="icon"
          onClick={() => setFilter(filterHandler('P', filter))}
        >
          {typeof filter.priority === 'number' ? `Priority: ${priorities[filter.priority].name}` : 'Priority: All'}
        </span>

      </div>
      <div className="todo-list">
        {
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
              onDone={onDone}
              onDelete={onDelete}
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
