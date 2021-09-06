import React from 'react';
import { Button } from 'antd';

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementByAmountThunk,
  selectCount,
} from '../../store/counterSlice';

import { useAppDispatch, useAppSelector } from '../../hooks';

const Counter: React.FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <h1> Counter: {count} </h1>

        <Button
          type="primary"
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmountThunk(5))}
        >
          Increment ASYNC 5
        </Button>

        <Button
          type="primary"
          aria-label="Increment value"
          onClick={() => dispatch(incrementAsync(4))}
        >
          Increment ASYNC 4
        </Button>

        <Button
          type="primary"
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(3))}
        >
          Increment by 3
        </Button>

        <Button
          type="primary"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button
          type="primary"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
};

export default Counter;
