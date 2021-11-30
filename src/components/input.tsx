import React, { useEffect, useRef, useState } from 'react';
import { TODO } from './item';

type AppProps = {
  todos: TODO[]
  setTodos: (value: TODO[]) => void
  edit?: boolean
  setEdit?: (value: boolean) => void
  name?: string
  id?: number
  priority?: number
}

const Input = ({
  todos, setTodos, edit, setEdit, name, id, priority,
}: AppProps) => {
  const [input, setInput] = useState('');
  const todoInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    todoInput.current?.focus();
  });
  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!edit) {
      setTodos([...todos, {
        id: Math.round(Math.random() * 1000), name: input, priority: 0, done: false,
      }]);
      setInput('');
    }
    if (setEdit) {
      setEdit(false);
    }
  };
  const changeHandler = (value: string, itemId: number | undefined) => {
    if (edit) {
      const newState = todos.map((item) => {
        if (item.id === itemId) {
          return { ...item, name: value };
        }
        return item;
      });
      setTodos(newState);
    } else {
      setInput(value);
    }
  };
  return (
    <form className="input-wrapper" onSubmit={submitHandler}>
      <input
        ref={todoInput}
        className="input"
        type="text"
        placeholder="Add new TODO..."
        value={edit ? name : input}
        onChange={(e) => changeHandler(e.target.value, id)}
      />

      <select className="select-input" name="priority" onChange={() => setInput}>
        <option value="normal">Normal</option>
        <option value="low">Low</option>
        <option value="High">High</option>
      </select>
      <input className="button" type="submit" />
    </form>
  );
};

export default Input;
