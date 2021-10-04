import React, { ChangeEvent, FC, memo, useContext, useState } from 'react';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import AutosizeInput from 'react-input-autosize';
import styles from './TitleSpring.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  selectTitle,
  editTitleSpring,
  selectUser,
} from '../../../../store/usersSlice';
import SocketContext from '../../../../shared/SocketContext';

interface TitleSpringInterface {
  isSettingsPage?: boolean;
}

const TitleSpring: FC<TitleSpringInterface> = ({
  isSettingsPage = false,
}: TitleSpringInterface) => {
  const title = useAppSelector(selectTitle);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [contentEditable, setContentEditable] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const socket = useContext(SocketContext);
  const color = contentEditable ? 'darkblue' : '#000';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const setNewTitleValue = () => {
    socket?.emit('send title', inputValue, user?.room, (titleData: string) => {
      dispatch(editTitleSpring(titleData));
      setContentEditable(false);
    });
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
      )}
      {user?.isMaster && isSettingsPage && !contentEditable && (
        <EditOutlined
          style={{ marginLeft: '15px' }}
          key="edit"
          onClick={() => {
            setContentEditable(true);
          }}
        />
      )}
      {user?.isMaster && isSettingsPage && contentEditable && (
        <CheckOutlined
          style={{ marginLeft: '15px' }}
          key="check"
          onClick={setNewTitleValue}
        />
      )}
    </div>
  );
};

export default memo(TitleSpring);
