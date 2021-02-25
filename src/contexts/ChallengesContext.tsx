import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json';

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface ChallengesContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	activeChallenge: Challenge;
	resetChallenge: () => void;
	experienceToNexLevel: number;
	completeChallenge: () => void;
}

interface ChallengesProviderProps {
	children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1)
	const [currentExperience, setCurrentExperience] = useState(0)
	const [challengesCompleted, setChallengesCompleted] = useState(0)
	const [activeChallenge, setActiveChallenge] = useState(null)

	const experienceToNexLevel = Math.pow((level + 1) * 4, 2)

	useEffect(() => {
		Notification.requestPermission();
	}, [])
	
	function levelUp() {
		setLevel(level + 1);
	}

	function startNewChallenge() {
		const randomChallengeIntex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIntex];

		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();

		if (Notification.permission === 'granted') {
			new Notification('Novo desafio 🏆', {
				body: `Valendo ${challenge.amount}xp`
			})
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function completeChallenge() {
		if (!activeChallenge) {
			return;
		}

		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNexLevel) {
			levelUp();
			finalExperience = finalExperience - experienceToNexLevel;
		}

		setCurrentExperience(finalExperience)
		setActiveChallenge(null)
		setChallengesCompleted(challengesCompleted + 1)
	}

	return (
		<ChallengeContext.Provider 
			value={{
				level,
				levelUp,
				currentExperience,
				challengesCompleted,
				startNewChallenge,
				activeChallenge,
				resetChallenge,
				experienceToNexLevel,
				completeChallenge
			}}>
		  { children }
	  </ChallengeContext.Provider>
	)
}