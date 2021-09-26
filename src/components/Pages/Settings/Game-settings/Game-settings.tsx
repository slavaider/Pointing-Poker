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
        <label className={styles.setting}>
          <span>Scram master as player: </span>
          <Switch defaultChecked />
        </label>

        <label className={styles.setting}>
          <span>Changing card in round end: </span>
          <Switch />
        </label>

        <label className={styles.setting}>
          <span>Is timer needed: </span>
          <Switch defaultChecked />
        </label>

        <label className={styles.setting}>
          <span>Score type: </span>
          <Input className={styles.input} placeholder="story point" />
        </label>

        <label className={styles.setting}>
          <span>Score type (Short): </span>
          <Input className={styles.input} placeholder="SP" />
        </label>

        <label className={styles.setting}>
          <span>Round time: </span>
          <TimePicker
            defaultValue={moment('02:20', 'mm:ss')}
            format={'mm:ss'}
            size="large"
            style={{ width: '120px' }}
          />
        </label>
      </form>
    </div>
  );
};

export default GameSettings;
