
import styles from '../styles/components/Profile.module.css'
import { ThemeSwitch } from './ThemeSwitch'

export function Profile() {
	return (
		<div className={styles.profileContainer}>
			<img src="https://github.com/andersonmdn.png" alt="Anderson André"/>
			<div className={styles.profileInfo}>
				<strong>Anderson André</strong>
				<p>
					<img src="icons/level.svg" alt="Level"/>
					Level 1
				</p>
			</div>
			<ThemeSwitch />
		</div>
	)
}