import React, { FC, useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './SettingsIssuesCard.module.scss'
import ModalIssues from './Issues-modal'

interface SettingsIssuesCardProps {
	cardTitle: string
	priority: string
	linkToIssue: string
}


const SettingsIssuesCard: FC<SettingsIssuesCardProps> = ({
	cardTitle,
	priority,
	linkToIssue,
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const isModalSet = () => { setIsModalVisible(false) }
	return (
		<div>
			< div className={styles.card__wrapper} >
				<div className={styles.card__text_wrapper}>
					<a href={linkToIssue} className={styles.card__title}>
						{cardTitle}
					</a>
					<span className={styles.card__text_priority}>{priority} priority</span>
				</div>
				<div>
					<span className={styles.button__edit}>
						<EditOutlined onClick={() => setIsModalVisible(true)}
						/>
					</span>
					<span className={styles.button__delete}>
						<DeleteOutlined style={{ color: 'red' }} />
					</span>
				</div>
			</div >
			{
				isModalVisible
					? <
						ModalIssues
						isModal={isModalVisible}
						isModalSet={isModalSet}
						props={{ cardTitle: cardTitle, priority: priority, linkToIssue: linkToIssue }}
					/>
					: ''
			}
		</div>
	)
}

export default SettingsIssuesCard
