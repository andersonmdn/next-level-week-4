
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
	const { currentExperience, experienceToNexLevel } = useContext(ChallengeContext);
	
	const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNexLevel);

	return (
		<header className={styles.experienceBar}>
			<span>0 xp</span>
			<div>
				<div style={{width: `${percentToNextLevel}%`}} ></div>
				<span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}}>
					{ currentExperience }px
				</span>
			</div>
			<span>{ experienceToNexLevel } xp</span>
		</header>
	)
}