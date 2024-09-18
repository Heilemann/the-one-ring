import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { DiceResult, Modifier, RollResultArray } from '../interfaces/dicebox'

interface DiceResultsProps {
	diceData: string
}

const DiceResults: React.FC<DiceResultsProps> = ({ diceData }) => {
	const diceResult = useMemo(() => {
		try {
			return JSON.parse(diceData) as DiceResult
		} catch (error) {
			console.error('Failed to parse dice data:', error)
			return false
		}
	}, [diceData])

	if (!diceResult) {
		return <div>No valid dice data available.</div>
	}

	// Function to render individual dice or modifiers
	const renderDice = () => {
		if (diceResult.type === 'expressionroll') {
			return diceResult.dice.map((die, idx) => (
				<React.Fragment key={idx}>
					{/* Render operator before each die except the first */}
					{idx > 0 && (
						<div className='flex items-center justify-center text-xl font-bold p-2'>
							{diceResult.ops[idx - 1]}
						</div>
					)}
					{typeDie(die, idx)}
				</React.Fragment>
			))
		} else if (diceResult.type === 'die') {
			return typeDie(diceResult as RollResultArray, 0)
		}
		return null
	}

	// Function to render a single die or modifier
	const typeDie = (die: RollResultArray | Modifier, idx: number) => {
		if (die.type === 'die') {
			return (
				<div className='flex gap-1'>
					{die.rolls?.map((roll, i) => {
						const dieType = `d${roll.die}` // e.g., 'd6'

						// Check if the roll is a 6 on a d6
						const isSixOnD6 = roll.die === 6 && roll.value === 6

						// Check if the roll is 11 or 12 on a d12
						const isElevenOnD12 = roll.die === 12 && roll.value === 11
						const isTwelveOnD12 = roll.die === 12 && roll.value === 12

						return (
							<div
								key={`${idx}-${i}`}
								className={twMerge(
									'flex h-8 w-8 flex-col items-center justify-center rounded-md border-2 border-white/10 p-2',
									dieType, // Add die type as a className
									isSixOnD6 && 'bg-green-500 text-white', // Highlight in green if d6 rolled a 6
									isElevenOnD12 && 'bg-red-500 text-white', // Highlight in red if d12 rolled an 11
									isTwelveOnD12 && 'bg-green-500 text-white', // Highlight in green if d12 rolled a 12
								)}
							>
								<div>{roll.value}</div>
							</div>
						)
					})}
				</div>
			)
		} else if (die.type === 'number') {
			// Render modifiers
			return (
				<div
					key={idx}
					className='flex h-8 w-8 items-center justify-center rounded-md border-2 border-white/10 p-2'
				>
					{die.value}
				</div>
			)
		}
		return null
	}

	// New code to determine success levels
	const getSuccessLevel = () => {
		let numberOfSixes = 0
		let rolledD12 = false

		const processDie = (die: RollResultArray | Modifier) => {
			if (die.type === 'die') {
				// Check if a d12 was rolled
				if (die.die.value === 12) {
					rolledD12 = true
				}

				die.rolls?.forEach(roll => {
					// Count 6's on d6's
					if (roll.die === 6 && roll.value === 6) {
						numberOfSixes += 1
					}
					// Check if a d12 was rolled (in case it's in rolls)
					if (roll.die === 12) {
						rolledD12 = true
					}
				})
			}
		}

		if (diceResult.type === 'expressionroll') {
			diceResult.dice.forEach(processDie)
		} else if (diceResult.type === 'die') {
			processDie(diceResult as RollResultArray)
		}

		if (rolledD12 && numberOfSixes >= 2) {
			return 'Extraordinary Success'
		} else if (rolledD12 && numberOfSixes >= 1) {
			return 'Great Success'
		}
		return null
	}

	const successLevel = getSuccessLevel()

	return (
		<div
			className='text-2xl text-white'
			style={{
				fontFamily: 'Aniron',
			}}
		>
			<div className='flex flex-col items-center gap-1'>
				{/* Display total result */}
				<div
					className='text-4xl font-bold'
					style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
				>
					{diceResult.value}
				</div>

				{/* Display individual dice and operators */}
				<div
					className='mb-4 flex flex-wrap items-center gap-1'
					style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
				>
					{renderDice()}
				</div>

				{/* Display success level if applicable */}
				{successLevel && (
					<div className='text-base font-bold text-green-500'>
						{successLevel}
					</div>
				)}
			</div>
		</div>
	)
}

export default DiceResults
