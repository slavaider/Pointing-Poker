import React, { FC, useContext, useEffect, useState } from 'react';
import { Avatar, Badge, Card, Modal } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styles from './PlayerCard.module.scss';
import User from '../../interfaces/user';
import SocketContext from '../../shared/SocketContext';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { kickPlayerById, selectUser } from '../../store/usersSlice';

const { Meta } = Card;

export interface PlayerCardProps extends User {
  isItYou: boolean;
  isMaster: boolean;
  size: 'max' | 'mini' | 'score';
}

const PlayerCard: FC<PlayerCardProps> = ({
  image,
  firstName,
  lastName,
  job,
  isItYou,
  userId,
  isMaster = false,
  size = 'max',
}: PlayerCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const [kickOtherPerson, setKickOtherPerson] = useState<boolean>(false);
  const [otherUser, setOtherUser] = useState<User | undefined>(undefined);

  const [userIdKick, setUserIdKick] = useState<null | string>(null);

  const userToKick = useAppSelector((state) => {
    return state.users.users.find((item) => item.userId === userIdKick);
  });

  useEffect(() => {
    if (!isMaster && user) {
      socket?.on('kick player server', (userIdData: string, userData: User) => {
        if (user?.userId !== userIdData) {
          setKickOtherPerson(true);
          setIsModalVisible(true);
          setUserIdKick(userIdData);
          setOtherUser(userData);
        }
      });
    }
  }, [isMaster, socket, user]);

  const kickPlayer = () => {
    socket?.emit(
      'kick player',
      userIdKick || userId,
      user,
      !kickOtherPerson,
      (userIdData: string) => {
        dispatch(kickPlayerById(userIdKick || userIdData));
        if (kickOtherPerson) {
          setKickOtherPerson(false);
          setUserIdKick(null);
        }
        setIsModalVisible(false);
      },
    );
  };

  const cancelKick = () => {
    setIsModalVisible(false);
    setKickOtherPerson(false);
  };

  const handleShow = () => setIsModalVisible(true);

  return (
    <>
      {size === 'max' && (
        <div
          style={isItYou ? { backgroundColor: '#9af7f7' } : undefined}
          className={styles.wrapper}
        >
          <Meta
            avatar={
              <Badge dot={isItYou}>
                <Avatar
                  style={{
                    width: '55px',
                    height: '55px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'fff',
                    backgroundColor: '#60DABF',
                    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  src={image}
                >
                  {firstName[0].toUpperCase() +
                    (lastName
                      ? firstName[0]
                      : firstName[firstName.length - 1].toUpperCase())}
                </Avatar>
              </Badge>
            }
            title={job}
            description={`${firstName}  ${lastName || ''}`}
          />
          {!isMaster && !isItYou && (
            <button
              onClick={handleShow}
              type={'button'}
              className={styles.button}
            >
              <StopOutlined />
            </button>
          )}
        </div>
      )}

      {size === 'mini' && (
        <div
          style={isItYou ? { backgroundColor: '#9af7f7' } : undefined}
          className={`${styles.wrapper} ${styles.min}`}
        >
          <Meta
            avatar={
              <Badge dot={isItYou}>
                <Avatar
                  style={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'fff',
                    backgroundColor: '#60DABF',
                    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  src={image}
                >
                  {firstName[0].toUpperCase() +
                    (lastName
                      ? lastName[0]
                      : firstName[firstName.length - 1].toUpperCase())}
                </Avatar>
              </Badge>
            }
            title={job}
            description={`${firstName}  ${lastName || ''}`}
          />
        </div>
      )}

      {size === 'score' && (
        <div
          style={isItYou ? { backgroundColor: '#9af7f7' } : undefined}
          className={`${styles.wrapper} ${styles.min}`}
        >
          <Meta
            avatar={
              <Badge dot={isItYou}>
                <Avatar
                  style={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'fff',
                    backgroundColor: '#60DABF',
                    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  src={image}
                >
                  {firstName[0].toUpperCase() +
                    (lastName
                      ? lastName[0]
                      : firstName[firstName.length - 1].toUpperCase())}
                </Avatar>
              </Badge>
            }
            title={job}
            description={`${firstName}  ${lastName || ''}`}
          />

          {!isMaster && !isItYou && (
            <button
              onClick={handleShow}
              type={'button'}
              className={styles.button_min}
            >
              <StopOutlined />
            </button>
          )}
        </div>
      )}

      <Modal visible={isModalVisible} onOk={kickPlayer} onCancel={cancelKick}>
        <p>Kick player?</p>
        <div>
          {kickOtherPerson ? (
            <span>
              {`${otherUser?.firstName} ${otherUser?.lastName || ''}`} want to
              kick member{' '}
              {`${userToKick?.firstName} ${userToKick?.lastName || ''}`}. Do you
              agree with it?
            </span>
          ) : (
            <span>
              Are you really want to remove player{' '}
              {`${firstName} ${lastName || ''}`} from game session?
            </span>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PlayerCard;
