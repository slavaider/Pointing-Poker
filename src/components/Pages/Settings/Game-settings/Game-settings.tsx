import React, { FC, useContext, useState } from 'react';
import { Button, Form, Input, Switch, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import { addOptions, selectOptions, selectUser } from 'src/store/usersSlice';
import styles from './Game-settings.module.scss';
import stylesPage from '../Settings.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Options } from '../../../../interfaces/options';
import SocketContext from '../../../../shared/SocketContext';

const GameSettings: FC = () => {
  const [form] = Form.useForm();

  const options = useAppSelector(selectOptions);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

  const [value, setValue] = useState<Moment | null>(() =>
    moment(options.timerValue, 'mm:ss'),
  );
  const [timeString, setTimeString] = useState<string>(options.timerValue);

  const onChange = (timeData: Moment | null, timeStringData: string) => {
    setTimeString(timeStringData);
    setValue(timeData);
  };

  const submit = (values: Options) => {
    values.timerValue = timeString;
    socket?.emit('send option', values, user?.room, (response: Options) => {
      dispatch(addOptions(response));
    });
  };

  return (
    <div>
      <h4 className={stylesPage.title}>Game settings:</h4>
      <Form
        form={form}
        className={styles.form}
        name="optionsForm"
        layout="horizontal"
        initialValues={{ ...options, time: value }}
        onFinish={submit}
      >
        <Form.Item
          label="Scram master as player:"
          name="playable"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Changing card in round end:"
          name="swap"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Is timer needed:"
          name="timer"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label="Score type:" name="scoreType">
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item label="Score type (Short):" name="scoreTypeShort">
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item label="Round time:" name="time">
          <TimePicker
            className={styles.setting}
            size="large"
            onChange={onChange}
            value={value}
            format={'mm:ss'}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GameSettings;
