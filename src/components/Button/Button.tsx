import React, { FC, HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

const Button: FC<ButtonProps> = ({
  color = '#fff',
  backgroundColor = '#2B3A67',
  height = '47px',
  width = '190px',
  children,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        style={{ color, backgroundColor, height, width }}
        type={'button'}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
