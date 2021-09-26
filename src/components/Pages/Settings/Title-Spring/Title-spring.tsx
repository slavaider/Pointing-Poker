import React, { ChangeEvent, FC, useState } from 'react';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import AutosizeInput from 'react-input-autosize';
import { editTitleSpring } from 'src/store/counterSlice';
import styles from './TitleSpring.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

interface TitleSpringInterface {
  isSettingsPage?: boolean;
}

const TitleSpring: FC<TitleSpringInterface> = ({
  isSettingsPage = false,
}: TitleSpringInterface) => {
  const title = useAppSelector((state) => state.settings.titleSpring);
  const dispatch = useAppDispatch();
  const [contentEditable, setContentEditable] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const color = contentEditable ? 'darkblue' : '#000';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const setNewTitleValue = () => {
    dispatch(editTitleSpring(inputValue));
    setContentEditable(false);
  };

  return (
    <div className={styles.titleSpring}>
      {contentEditable ? (
        <AutosizeInput
          style={{ boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)', color }}
          className={styles.autoSizeInput}
          autoFocus
          value={inputValue}
          onChange={onChange}
        />
      ) : (
        <div style={{ color }}>{title}</div>
      )}{' '}
      {isSettingsPage && !contentEditable && (
        <EditOutlined
          style={{ marginLeft: '15px' }}
          key="edit"
          onClick={() => {
            setContentEditable(true);
          }}
        />
      )}
      {isSettingsPage && contentEditable && (
        <CheckOutlined
          style={{ marginLeft: '15px' }}
          key="check"
          onClick={setNewTitleValue}
        />
      )}
    </div>
  );
};

export default TitleSpring;
