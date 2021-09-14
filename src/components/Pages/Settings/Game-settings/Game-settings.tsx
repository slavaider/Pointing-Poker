import React, { FC } from 'react';
import { Switch, Input, TimePicker } from 'antd';
import moment from 'moment';
import styles from './Game-settings.module.scss';
import stylesPage from '../Settings.module.scss';

const GameSettings: FC = () => {
  return (
    <div>
      <h4 className={stylesPage.title}>Game settings:</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="setting">
          <span>Scram master as player: </span>
          <Switch defaultChecked />
        </label>
        <label className="setting">
          <span>Changing card in round end: </span>
          <Switch />
        </label>
        <label className="setting">
          <span>Is timer needed: </span>
          <Switch defaultChecked />
        </label>
        <label className="setting">
          <span>Score type: </span>
          <Input className={styles.input} placeholder="story point" />
        </label>
        <label className="setting">
          <span>Score type (Short): </span>
          <Input className={styles.input} placeholder="SP" />
        </label>
        <label className="setting">
          <span>Round time: </span>
          <TimePicker
            defaultValue={moment('02:20', 'mm:ss')}
            format={'mm:ss'}
            size="large"
          />
        </label>
      </form>

      <style jsx>{`
        .setting {
          cursor: pointer;
          max-width: 550px;
          margin: 20px 5px 0 0;
          display: flex;

          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default GameSettings;
