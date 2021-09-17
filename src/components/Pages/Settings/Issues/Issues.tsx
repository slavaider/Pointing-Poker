import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Select, Form, Input } from 'antd';
import SettingsIssuesCard from './SettingsIssuesCard';
import styles from './Issues.module.scss';
import stylesPage from '../Settings.module.scss';
import { useAppSelector } from '../../../../hooks';

const { Option } = Select;

const Issues: FC = () => {
  const issues = useAppSelector((state) => state.settings.issues);

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <h4 className={stylesPage.title}>Issues:</h4>
      <div className={styles.container}>
        <SettingsIssuesCard
          cardTitle={'Issue 25'}
          priority={'Low'}
          linkToIssue={'#'}
        />
        <SettingsIssuesCard
          cardTitle={'Issue 25'}
          priority={'Low'}
          linkToIssue={'#'}
        />
        <SettingsIssuesCard
          cardTitle={'Issue 25'}
          priority={'Low'}
          linkToIssue={'#'}
        />
        <SettingsIssuesCard
          cardTitle={'Issue 25'}
          priority={'Low'}
          linkToIssue={'#'}
        />

        <button
          className={styles.cardWrapper}
          style={{ color: '#479685' }}
          onClick={() => setIsModalVisible(true)}
        >
          Crete new Issue
          <PlusOutlined />
        </button>
      </div>

      <Modal
        className={styles.modal}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Create Issue</p>
        <Form>
          <Form.Item className={styles.input} label={'Title: '}>
            <Input />
          </Form.Item>
          <Form.Item className={styles.input} label={'Link: '}>
            <Input />
          </Form.Item>
          <Form.Item className={styles.select} label={'Priority: '}>
            <Select
              defaultValue={'Low'}
              showSearch
              placeholder="Select a priority"
            >
              <Option className={styles.option} value={'Low'}>
                Low
              </Option>
              <Option className={styles.option} value={'Middle'}>
                Middle
              </Option>
              <Option className={styles.option} value={'High'}>
                High
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Issues;
