import { createContext, useState, ReactNode } from 'react'
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
}

interface ChallengesProviderProps {
	children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);

	const experienceToNexLevel = Math.pow((level + 1) * 4, 2)
	
	function levelUp() {
		setLevel(level + 1);
	}

	function startNewChallenge() {
		const randomChallengeIntex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIntex];

		setActiveChallenge(challenge);
	}

	function resetChallenge() {
		setActiveChallenge(null);
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
				experienceToNexLevel
			}}>
		  { children }
	  </ChallengeContext.Provider>
	)
}