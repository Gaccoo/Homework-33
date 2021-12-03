import React, { useEffect, useRef, useState } from 'react';
import { priorities } from './item';

type AppProps = {
  name?: string
  priority?: number
  onSubmit: (params: { name: string, priority: number }) => void
}

const Input = ({
  name, priority, onSubmit,
}: AppProps) => {
  const [input, setInput] = useState({ name: '', priority: 1 });
  const todoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoInput.current?.focus();
  });

  useEffect(() => {
    if (typeof name === 'string' && typeof priority === 'number') {
      setInput({ name, priority });
    }
  }, []);

  const submitNewHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onSubmit(input);
    setInput({
      ...input,
      name: '',
    });
  };

  return (
    <form className="input-wrapper" onSubmit={submitNewHandler}>
      <input
        ref={todoInput}
        className="input"
        type="text"
        style={{ border: `2px solid ${priorities[input.priority].color}` }}
        placeholder="Subject..."
        value={input.name}
        onChange={(e) => {
          const newInput = { ...input };
          newInput.name = e.target.value;
          setInput(newInput);
        }}
      />

      <select
        className="select-input"
        name="priority"
        style={{ border: `2px solid ${priorities[input.priority].color}` }}
        value={input.priority}
        onChange={(event) => {
          const newSelect = { ...input, priority: +event.target.value };
          setInput(newSelect);
        }}
      >
        {
          priorities.map((item) => (
            <option key={item.name} value={item.id}>{item.name}</option>
          ))
        }
      </select>
      <input
        className="button"
        type="submit"
        style={{
          border: `2px solid ${priorities[input.priority].color}`,
          backgroundColor: priorities[input.priority].color,
        }}
      />
    </form>
  );
};

export default Input;
