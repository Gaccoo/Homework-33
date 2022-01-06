import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Input from './input';
import FileUploader from './fileUploader';

export type TODO = {
  id: number
  name: string
  priority: number
  done: boolean
  file: object | null
}

type ListProps = {
  name: string
  id: number
  priority: number
  done: boolean
  onDone: (id: number) => void
  onDelete: (id: number) => void
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}

export const priorities = [
  { name: 'Low', color: 'green', id: 0 },
  { name: 'Medium', color: 'goldenrod', id: 1 },
  { name: 'High', color: 'red', id: 2 },
];

const priorityClassSelector = (priorityValue: number) => {
  let classToReturn = '';
  if (!priorityValue) {
    classToReturn = 'todo low';
  }
  if (priorityValue === 1) {
    classToReturn = 'todo';
  }
  if (priorityValue === 2) {
    classToReturn = 'todo high';
  }
  return classToReturn;
};

const Item = ({
  name, id, priority, done, onDone, onDelete, todos, setTodos,
}: ListProps) => {
  const [edit, setEdit] = useState(false);
  const picture = todos.find((item) => item.id === id);

  return edit ? (
    <Input
      name={name}
      priority={priority}
      onSubmit={(input) => {
        const newState = todos.map((item) => {
          if (item.id === id) {
            return { ...item, name: input.name, priority: input.priority };
          }
          return item;
        });
        setTodos(newState);
        setEdit(false);
      }}
    />

  )
    : (
      <div
        style={done ? { opacity: 0.4, textDecoration: 'line-through' }
          : { opacity: 1, textDecoration: undefined }}
        className={priorityClassSelector(priority)}
      >
        <div className="todo-info" onClick={() => onDone(id)}>

          <input className="checkbox" type="checkbox" checked={done} onChange={() => onDone(id)} />
          {
            picture?.file ? (
              <img
                className="todo-img"
                alt="not found"
                style={{ width: '20px', height: '20px', borderRadius: '50%' }}
  // @ts-ignore
                src={picture.file.image}
              />
            )
              : null
          }
          <h3 className="todo-name">{name}</h3>
        </div>

        <div className="todo-action">
          <FileUploader todos={todos} setTodos={setTodos} id={id} />
          <span
            onClick={() => {
              setEdit(true);
            }}
            className="icon"
          >
            <AiOutlineEdit />
          </span>
          <span onClick={() => onDelete(id)} className="icon"><AiOutlineDelete /></span>
        </div>
      </div>
    );
};

export default Item;
