import React, { FC, useState } from 'react';
import { Card, Avatar, Badge, Modal } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import styles from './PlayerCard.module.scss';

const { Meta } = Card;

export interface PlayerCardProps {
  avatarSrc?: string;
  FirstName: string;
  LastName?: string;
  position?: string;
  ItIsYou?: boolean;
  isMaster?: boolean;
  size?: 'max' | 'mini';
}
// todo поменять цвет исключения игрока томато

const PlayerCard: FC<PlayerCardProps> = ({
                                           avatarSrc,
                                           FirstName,
                                           LastName,
                                           position,
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
                  src={avatarSrc}
                >
                  {FirstName[0] +
                  (LastName
                    ? LastName[0]
                    : FirstName[FirstName.length - 1].toUpperCase())}
                </Avatar>
              </Badge>
            }
            title={position}
            description={`${FirstName}  ${LastName || ''}`}
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
                  src={avatarSrc}
                >
                  {FirstName[0] +
                  (LastName
                    ? LastName[0]
                    : FirstName[FirstName.length - 1].toUpperCase())}
                </Avatar>
              </Badge>
            }
            title={position}
            description={`${FirstName}  ${LastName || ''}`}
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
          {`${FirstName} ${LastName || ''}`} from game session?
        </div>
      </Modal>
    </>
  );
};

export default PlayerCard;
