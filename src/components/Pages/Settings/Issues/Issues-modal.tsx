import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import { Modal, Select, Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { addIssue, editIssue, selectUser } from 'src/store/usersSlice';
import styles from './Issues.module.scss';
import Issue from '../../../../interfaces/issue';
import SocketContext from '../../../../shared/SocketContext';

const { Option } = Select;

interface ModalIssuesProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  issue: Issue;
  issueMode: string;
  modalTitle: string;
}

const ModalIssues: FC<ModalIssuesProps> = ({
  isModalVisible,
  setIsModalVisible,
  issue,
  issueMode,
  modalTitle,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const socket = useContext(SocketContext);
  const user = useAppSelector(selectUser);

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (value: Issue) => {
    setIsModalVisible(false);
    if (issueMode === 'create') {
      socket?.emit('send issue', value, user?.room, (issueData: Issue) => {
        dispatch(addIssue(issueData));
      });
    } else {
      socket?.emit('issue update', value, user?.room, (issueData: Issue) => {
        dispatch(editIssue(issueData));
      });
    }
  };

  const onClick = () => {
    form
      .validateFields()
      .then((value) => {
        value.id = issue.id;
        onSubmit(value);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <Modal
        className={styles.modal}
        visible={isModalVisible}
        okText="Ok"
        cancelText="Cancel"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onClick}>
            Submit
          </Button>,
        ]}
      >
        <p>{modalTitle}</p>
        <Form form={form} name="issue" initialValues={issue}>
          <Form.Item
            name="cardTitle"
            className={styles.input}
            label={'Title: '}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkToIssue"
            className={styles.input}
            label={'Link: '}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="priority"
            className={styles.select}
            label={'Priority: '}
          >
            <Select showSearch placeholder="Select a priority">
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
    </>
  );
};

export default ModalIssues;
