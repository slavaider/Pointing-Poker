import React, { FC, useState } from 'react'
import { Modal, Select, Form, Input } from 'antd'
import styles from './Issues.module.scss'

const { Option } = Select

interface ModalIssuesProps {
	isModal: boolean,
	isModalSet: () => void,
	props: {
		cardTitle: string,
		linkToIssue: string,
		priority: string
	}
}

const ModalIssues: FC<ModalIssuesProps> = ({ isModal, isModalSet, props }) => {
	const [isModalVisible, setIsModalVisible] = useState(isModal)
	const handleSubmit = () => {
		console.log("Ok!!!")
	}
	return (
		<div>
			<Modal
				className={styles.modal}
				visible={isModalVisible}
				onOk={() => { setIsModalVisible(false); isModalSet(); handleSubmit() }}
				onCancel={() => { setIsModalVisible(false); isModalSet() }}
			>
				<p>Create Issue</p>
				<Form>
					<Form.Item className={styles.input} label={'Title: '}>
						<Input defaultValue={props.cardTitle} />
					</Form.Item>
					<Form.Item className={styles.input} label={'Link: '}>
						<Input defaultValue={props.linkToIssue} />
					</Form.Item>
					<Form.Item className={styles.select} label={'Priority: '}>
						<Select
							defaultValue={props.priority}
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
	)
}

export default ModalIssues