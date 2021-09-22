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
      <style jsx>{`
        button {
          border: 1px solid #496a81;
          box-sizing: border-box;
          border-radius: 3px;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

          font-weight: bold;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default Button;
