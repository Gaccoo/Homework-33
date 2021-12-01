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
  doneHandler: (id: number) => void
  deleteHandler: (id: number) => void
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}
const Item = ({
  name, id, priority, done, doneHandler, deleteHandler, todos, setTodos,
}: ListProps) => {
  const [edit, setEdit] = useState(false);
  const picture = todos.find((item) => item.id === id);
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
        <div className="todo-info" onClick={() => doneHandler(id)}>

          <input className="checkbox" type="checkbox" checked={done} onChange={() => doneHandler(id)} />
          {
  // @ts-ignore
            picture?.file ? <img className="todo-img" alt="not found" style={{ width: '20px', height: '20px', borderRadius: '50%' }} src={picture.file.image} />
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
          <span onClick={() => deleteHandler(id)} className="icon"><AiOutlineDelete /></span>
        </div>
      </div>
    );
};

export default Item;
