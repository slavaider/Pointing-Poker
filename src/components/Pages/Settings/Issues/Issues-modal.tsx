import React, { FC } from 'react'
import { Modal, Select, Form, Input, Button } from 'antd'
import styles from './Issues.module.scss'
import { useAppDispatch } from 'src/hooks'
import { addIssue, editIssue } from 'src/store/counterSlice'
const { Option } = Select

interface ModalIssuesProps {
  isModalVisible: boolean
  isModalSet: () => void
  props: {
    cardTitle: string
    linkToIssue: string
    priority: string
    id: number
  }
  issueMode: string
  modalTitle: string
}

const ModalIssues: FC<ModalIssuesProps> = ({
  isModalVisible,
  isModalSet,
  props,
  issueMode,
  modalTitle
}) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const onCancel = () => {
    isModalSet()
  }

  const onClick = () => {
    form
      .validateFields()
      .then((value) => {
        value.id = props.id
        onSubmit(value)
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
      })
  }

  const onSubmit = (value: {
    cardTitle: string,
    linkToIssue: string,
    priority: string,
    id: number
  }) => {
    isModalSet()
    issueMode === 'create'
      ? dispatch(addIssue(value))
      : dispatch(editIssue(value))
  }
  return (
    <div>
      <Modal
        className={styles.modal}
        visible={isModalVisible}
        okText='Ok'
        cancelText='Cancel'
        onCancel={onCancel}
        footer={[
          <Button
            key='cancel'
            onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={onClick}
          >
            Submit
          </Button>
        ]}

      >
        <p>{modalTitle}</p>
        <Form
          form={form}
          name='issue'
          initialValues={{
            ['cardTitle']: props.cardTitle,
            ['linkToIssue']: props.linkToIssue,
            ['priority']: props.priority
          }}
        >
          <Form.Item
            name='cardTitle'
            className={styles.input}
            label={'Title: '}>
            <Input
            />
          </Form.Item>
          <Form.Item
            name='linkToIssue'
            className={styles.input}
            label={'Link: '}>
            <Input
            />
          </Form.Item>
          <Form.Item
            name='priority'
            className={styles.select}
            label={'Priority: '}>
            <Select
              showSearch
              placeholder='Select a priority'
            >
              <Option
                className={styles.option}
                value={'Low'}>
                Low
              </Option>
              <Option
                className={styles.option}
                value={'Middle'}>
                Middle
              </Option>
              <Option
                className={styles.option}
                value={'High'}>
                High
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}

export default ModalIssues
