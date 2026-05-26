/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import type { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/ErrorType';
import * as clientMethods from '../../api/todos';

type Props = {
  onAdd : (value : Todo) => void;
  onError : (message : ErrorType) => void;
  isLoading : boolean;
}

export const NewTodoForm: React.FC<Props> = ({onAdd, onError, isLoading}) => {
  const [title, setTitle] = useState('');
  const inputFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputFocusRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    // 1. Validate
    if (!title.trim()) {
      onError(ErrorType.EmptyTitle);
      return;
    }
    // 2. Clear previous error
    onError(ErrorType.None);
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        disabled={isLoading}
        ref={inputFocusRef}
      />
    </form>
  );
}
