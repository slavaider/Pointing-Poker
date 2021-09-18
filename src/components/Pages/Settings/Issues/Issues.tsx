import React, { FC, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import SettingsIssuesCard from './SettingsIssuesCard'
import ModalIssues from './Issues-modal'
import styles from './Issues.module.scss'
import stylesPage from '../Settings.module.scss'
import { useAppSelector } from '../../../../hooks'

interface cards {
	cardTitle: string
	priority: string
	linkToIssue: string
}

const Issues: FC = () => {
	const issues: Array<cards> = useAppSelector((state) => state.settings.issues)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const isModalSet = () => { setIsModalVisible(false) }
	const priorityValueDefault = 'Low'
	
	return (
		<div>
			<h4 className={stylesPage.title}>Issues:</h4>
			<div className={styles.container}>
				{issues.map((item, index) =>
					<SettingsIssuesCard
						cardTitle={item.cardTitle}
						priority={item.priority}
						linkToIssue={item.linkToIssue}
						key={`${item.cardTitle}+${index}`}
					/>
				)}
				<button
					className={styles.card__wrapper_new__issue}
					onClick={() => setIsModalVisible(true)}
				>
					Crete new Issue
          <PlusOutlined />
				</button>
			</div>
			{isModalVisible ? <ModalIssues isModal={isModalVisible} isModalSet={isModalSet} props={{ cardTitle: '', priority: priorityValueDefault, linkToIssue: '' }} /> : ''}
		</div >
	)
}

export default Issues
