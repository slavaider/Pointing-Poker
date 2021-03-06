import React, { Dispatch, FC, SetStateAction } from 'react';
import { Modal, Select, Form, Input, Button } from 'antd';
import { useAppDispatch } from 'src/hooks';
import { addIssue, editIssue } from 'src/store/counterSlice';
import styles from './Issues.module.scss';

const { Option } = Select;

interface ModalIssuesProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  props: {
    cardTitle: string;
    linkToIssue: string;
    priority: string;
    id: number;
  };
  issueMode: string;
  modalTitle: string;
}

const ModalIssues: FC<ModalIssuesProps> = ({
  isModalVisible,
  setIsModalVisible,
  props,
  issueMode,
  modalTitle,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const initialValuesForm = {
    cardTitle: props.cardTitle,
    linkToIssue: props.linkToIssue,
    priority: props.priority,
  };
  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (value: {
    cardTitle: string;
    linkToIssue: string;
    priority: string;
    id: number;
  }) => {
    setIsModalVisible(false);
    if (issueMode === 'create') {
      dispatch(addIssue(value));
    } else {
      dispatch(editIssue(value));
    }
  };

  const onClick = () => {
    form
      .validateFields()
      .then((value) => {
        value.id = props.id;
        onSubmit(value);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div>
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
        <Form form={form} name="issue" initialValues={initialValuesForm}>
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
    </div>
  );
};

export default ModalIssues;
