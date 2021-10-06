import React, { FC, memo, useContext, useMemo } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { v4 } from 'uuid';
import Issue from 'src/interfaces/issue';
import { Button } from 'antd';
import styles from './Card-collection.module.scss';
import Card from './Card';
import ICard from '../../../../interfaces/card';
import stylesPage from '../Settings.module.scss';
import {
  addCard,
  selectOptions,
  selectUser,
} from '../../../../store/usersSlice';
import SocketContext from '../../../../shared/SocketContext';
import Vote from '../../../../interfaces/vote';

export type Props = {
  isSettingsPage?: boolean;
  isVotes?: boolean;
  isGameStarted?: boolean;
  cardWidth?: string;
  items: Vote[] | ICard[];
  currentIssue?: Issue;
  setIsUpdate?: (item: any) => void;
  isUpdate?: boolean;
};

const CardCollection: FC<Props> = ({
  isSettingsPage = true,
  cardWidth,
  isVotes = false,
  currentIssue,
  isGameStarted,
  items,
  setIsUpdate,
  isUpdate,
}: Props) => {
  const options = useAppSelector(selectOptions);
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const user = useAppSelector(selectUser);

  const addNewCard = () => {
    const CardData = {
      cardValue: 0,
      cardTitle: options.scoreTypeShort,
      id: v4(),
    };
    socket?.emit('send card', CardData, user?.room, (card: ICard) => {
      dispatch(addCard(card));
    });
  };

  let title = '';

  if (isSettingsPage) {
    title = 'Add card values:';
  } else if (isVotes && !isGameStarted) {
    title = 'Statistics:';
  } else {
    title = 'Game';
  }

  const stats = useMemo(() => {
    if (isVotes && !isGameStarted && currentIssue) {
      const result: any[] = [];
      const tempItems = [...currentIssue?.votes];
      for (let i = 0; i < currentIssue?.votes.length; i += 1) {
        let counter = 1;
        const firstVote = tempItems.shift();
        tempItems.forEach((vote) => {
          if (firstVote?.id === vote.id) {
            counter += 1;
          }
        });
        tempItems.filter((item) => firstVote?.id !== item.id);
        const cardStatisticValue = `${
          (counter / currentIssue.votes.length) * 100
        }%`;
        result.push({
          ...firstVote,
          cardStatisticValue,
        });
      }

      return result;
    }
    return undefined;
  }, [currentIssue, isGameStarted, isVotes]);

  function convertToCSV(objArray: any) {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i += 1) {
      let line = '';
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const index in array[i]) {
        if (line !== '') line += ',';

        line += array[i][index];
      }

      str += `${line}\r\n`;
    }

    return str;
  }

  function exportCSVFile(cards: any[] | undefined, fileTitle: string) {
    cards?.unshift({
      id: 'id'.replace(/,/g, ''), // remove commas to avoid errors
      cardValue: 'cardValue',
      cardTitle: 'cardTitle',
      cardStatisticValue: 'cardStatisticValue',
    });

    const jsonObject = JSON.stringify(cards);

    const csv = convertToCSV(jsonObject);

    const exportedFilenmae = `${fileTitle}.csv` || 'export.csv';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const download = () => {
    exportCSVFile(stats, 'statistic');
  };

  const toRender = stats || items;

  return (
    <>
      <h4 className={stylesPage.title}>{title}</h4>

      <div id="cardsContainer" className={styles.cards__container}>
        {toRender.map((card) => (
          <React.Fragment key={card.id}>
            <Card
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              isSettingsPage={isSettingsPage}
              card={card}
              isGameStarted={isGameStarted}
              currentIssue={currentIssue}
              width={cardWidth}
            />
            {!isSettingsPage && isVotes && (
              <div className={styles.cardStatisticValue}>
                {card.cardStatisticValue}
              </div>
            )}
          </React.Fragment>
        ))}
        {isSettingsPage && (
          <div
            onClick={addNewCard}
            style={{ cursor: 'pointer', width: '98px' }}
            className={styles.card__wrapper}
          >
            <div style={{ margin: 'auto' }} className={styles.card__title}>
              <PlusCircleOutlined style={{ transform: 'scale(2)' }} />
            </div>
          </div>
        )}
        {stats && (
          <Button type="default" className="button" onClick={download}>
            Download
          </Button>
        )}
      </div>
    </>
  );
};

export default memo(CardCollection);
