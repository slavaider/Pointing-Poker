import React, { FC, useState } from 'react';
import { Card, Avatar, Badge, Modal } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styles from './PlayerCard.module.scss';
import User from '../../interfaces/user';

const { Meta } = Card;

export interface PlayerCardProps extends User {
  ItIsYou: boolean;
  isMaster: boolean;
  size: 'max' | 'mini';
}

const PlayerCard: FC<PlayerCardProps> = ({
  image,
  firstName,
  lastName,
  job,
  ItIsYou,
  isMaster = false,
  size = 'max',
}: PlayerCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {size === 'max' && (
        <div
          style={ItIsYou ? { backgroundColor: '#9af7f7' } : undefined}
          className={styles.wrapper}
        >
          <Meta
            avatar={
              <Badge dot={ItIsYou}>
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
                  {firstName[0] +
                    (lastName
                      ? firstName[0]
                      : firstName[firstName.length - 1].toUpperCase())}
                </Avatar>
              </Badge>
            }
            title={job}
            description={`${firstName}  ${lastName || ''}`}
          />
          {!isMaster && !ItIsYou && (
            <button
              onClick={() => setIsModalVisible(true)}
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
          style={ItIsYou ? { backgroundColor: '#9af7f7' } : undefined}
          className={`${styles.wrapper} ${styles.min}`}
        >
          <Meta
            avatar={
              <Badge dot={ItIsYou}>
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
                  {firstName[0] +
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

      <Modal
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Kick player?</p>
        <div>
          Are you really want to remove player{' '}
          {`${firstName} ${lastName || ''}`} from game session?
        </div>
      </Modal>
    </>
  );
};

export default PlayerCard;
