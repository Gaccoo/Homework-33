import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Input from './input';

export type TODO = {
  id: number
  name: string
  priority: number
  done: boolean
}

type ListProps = {
  name: string
  id: number
  priority: number
  done: boolean
  doneHandler: (id: number) => void
  deleteHandler: (id: number) => void
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}
const Item = ({
  name, id, priority, done, doneHandler, deleteHandler, todos, setTodos,
}: ListProps) => {
  const [edit, setEdit] = useState(false);
  const priorityClassSelector = () => {
    let classToReturn = '';
    if (!priority) {
      classToReturn = 'todo low';
    }
    if (priority === 1) {
      classToReturn = 'todo';
    }
    if (priority === 2) {
      classToReturn = 'todo high';
    }
    return classToReturn;
  };
  return edit ? (
    <Input
      todos={todos}
      setTodos={setTodos}
      edit={edit}
      setEdit={setEdit}
      name={name}
      id={id}
      priority={priority}
    />

  )
    : (
      <div
        style={done ? { opacity: 0.4, textDecoration: 'line-through' }
          : { opacity: 1, textDecoration: undefined }}
        className={priorityClassSelector()}
      >
        <div onClick={() => doneHandler(id)} className="todo-info">
          <input className="checkbox" type="checkbox" checked={done} onChange={() => doneHandler(id)} />
          <h3>{name}</h3>
        </div>
        <div className="todo-action">
          <span
            onClick={() => {
              setEdit(true);
            }}
            className="icon"
          >
            <AiOutlineEdit />
          </span>
          <span onClick={() => deleteHandler(id)} className="icon"><AiOutlineDelete /></span>
        </div>
      </div>
    );
};

export default Item;
