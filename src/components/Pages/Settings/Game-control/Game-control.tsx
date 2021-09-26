import React, { FC } from 'react'
import { Button } from 'antd'
import styles from './Game-control.module.scss'

const GameControl: FC = () => {
	return (
		<div className={styles.game__control_container}>
			<Button
				type='primary'
				htmlType='submit'
				className='button'
			>
				Start Game
			</Button>
			<Button
				type='default'
				htmlType='submit'
				className='button'
			>
				Cancel Game
			</Button>
		</div>
	)
}

export default GameControl
