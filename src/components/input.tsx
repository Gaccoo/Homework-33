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

const inputColor = [
  'green',
  'goldenrod',
  'red',
];

const Input = ({
  todos, setTodos, edit, setEdit, name, id, priority,
}: AppProps) => {
  const [input, setInput] = useState({ name: '', priority: 1 });
  const todoInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    todoInput.current?.focus();
  });
  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!edit) {
      setTodos([...todos, {
        id: Math.round(Math.random() * 1000), name: input.name, priority: input.priority, done: false,
      }]);
      setInput({ ...input, name: '' });
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
      setInput({ ...input, name: value });
    }
  };

  const selectChangeHandler = (value: number, itemId: number | undefined) => {
    if (edit) {
      const newState = todos.map((item) => {
        if (item.id === itemId) {
          return { ...item, priority: value };
        }
        return item;
      });
      setTodos(newState);
    } else {
      setInput({ ...input, priority: value });
    }
  };

  return (
    <form className="input-wrapper" onSubmit={submitHandler}>
      <input
        ref={todoInput}
        className="input"
        type="text"
        // @ts-ignore
        style={{ border: `2px solid ${edit ? inputColor[priority] : inputColor[input.priority]}` }}
        placeholder="Add new TODO..."
        value={edit ? name : input.name}
        onChange={(e) => changeHandler(e.target.value, id)}
      />

      <select
        className="select-input"
        name="priority"
        // @ts-ignore
        style={{ border: `2px solid ${edit ? inputColor[priority] : inputColor[input.priority]}` }}
        value={edit ? priority : input.priority}
        onChange={(event) => selectChangeHandler(+event.target.value, id)}
      >
        <option value="0">Low</option>
        <option value="1">Normal</option>
        <option value="2">High</option>
      </select>
      <input
        className="button"
        type="submit"
        // @ts-ignore
        style={edit ? { border: `2px solid ${inputColor[priority]}`, backgroundColor: inputColor[priority] }
          : { border: `2px solid ${inputColor[input.priority]}`, backgroundColor: inputColor[input.priority] }}
      />
    </form>
  );
};

export default Input;
