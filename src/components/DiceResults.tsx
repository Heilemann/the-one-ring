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
					{idx > 0 && diceResult.ops && diceResult.ops[idx - 1] && (
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

	// Updated typeDie function
	const typeDie = (die: RollResultArray | Modifier, idx: number) => {
		if (die.type === 'die') {
			return (
				<div className='flex gap-1'>
					{die.rolls?.map((roll, i) => {
						// Ensure roll.die is valid
						const dieType = roll.die ? `d${roll.die}` : ''

						// Check conditions for styling
						const isSixOnD6 = roll.die === 6 && roll.value === 6
						const isElevenOnD12 = roll.die === 12 && roll.value === 11
						const isTwelveOnD12 = roll.die === 12 && roll.value === 12
						const isLowOnD6 = roll.die === 6 && [1, 2, 3].includes(roll.value)

						return (
							<div
								key={`${idx}-${i}`}
								className={twMerge(
									'flex h-6 w-6 text-xl flex-col items-center justify-center rounded-md bg-white/10',
									dieType, // Add die type as a className
									isSixOnD6 && 'bg-white text-black', // Highlight if d6 rolled a 6
									isElevenOnD12 && 'bg-red-500 text-white', // Highlight if d12 rolled an 11
									isTwelveOnD12 && 'bg-white text-black', // Highlight if d12 rolled a 12
								)}
							>
								<div
									className='-mt-0.5 -mr-0.5 stroke'
									style={
										isLowOnD6
											? {
													color: 'transparent',
													WebkitTextStroke: '1px #ccc',
												}
											: undefined
									}
								>
									{roll.value}
								</div>
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
					className='flex text-sm h-6 w-6 items-center justify-center rounded-md border-2 border-white/10 p-1'
				>
					<div className='-mt-0.5 -mr-0.5'>{die.value}</div>
				</div>
			)
		}
		return null
	}

	// Function to adjust the total value if d12 rolls an 11
	const adjustedTotal = useMemo(() => {
		let adjustedTotal = diceResult.value

		const processDie = (die: RollResultArray | Modifier) => {
			if (die.type === 'die') {
				die.rolls?.forEach(roll => {
					// Adjust for 11 on a d12 (Eye of Sauron)
					if (roll.die === 12 && roll.value === 11) {
						adjustedTotal -= 11
					}
				})
			}
		}

		if (diceResult.type === 'expressionroll') {
			diceResult.dice.forEach(processDie)
		} else if (diceResult.type === 'die') {
			processDie(diceResult as RollResultArray)
		}

		return adjustedTotal
	}, [diceResult])

	const successLevel = useMemo(() => {
		let numberOfSixes = 0
		let rolledD12 = false
		let rolledD12_12 = false

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
					// Check if a d12 rolled a 12
					if (roll.die === 12) {
						rolledD12 = true
						if (roll.value === 12) {
							rolledD12_12 = true
						}
					}
				})
			}
		}

		if (diceResult.type === 'expressionroll') {
			diceResult.dice.forEach(processDie)
		} else if (diceResult.type === 'die') {
			processDie(diceResult as RollResultArray)
		}

		// Updated success level conditions
		if (rolledD12_12 && numberOfSixes >= 2) {
			return 'Automatic Extraordinary Success'
		} else if (rolledD12_12 && numberOfSixes >= 1) {
			return 'Automatic Great Success'
		} else if (rolledD12_12) {
			return 'Automatic Success'
		} else if (rolledD12 && numberOfSixes >= 2) {
			return 'Extraordinary Success'
		} else if (rolledD12 && numberOfSixes >= 1) {
			return 'Great Success'
		}
		// Add this condition to handle when only a d12 is rolled without any sixes on d6
		else if (rolledD12) {
			return 'Success'
		}
		return null
	}, [diceResult])

	// Extract label and target number if present
	const getLabelInfo = () => {
		if ('label' in diceResult && diceResult.label) {
			const label = diceResult.label.trim()
			if (label.startsWith('>')) {
				const target = parseInt(label.slice(1).trim())
				if (!isNaN(target)) {
					return { target, label: null }
				}
			}
			return { label, target: null }
		}
		return { label: null, target: null }
	}

	const { label, target } = getLabelInfo()

	// Check if roll meets target
	const isTargetSuccess = target !== null ? adjustedTotal >= target : null

	return (
		<div
			className='text-white'
			style={{
				fontFamily: 'Aniron',
			}}
		>
			<div className='flex flex-col items-center gap-1'>
				{/* Display individual dice and operators */}
				<div className='mb-0 flex flex-wrap items-center gap-1'>
					{renderDice()}
				</div>
				{/* Display label if present */}
				{label && <div className='text-lg font-bold mb-2'>{label}</div>}

				{/* Display adjusted total result */}
				{/* <div className='text-2xl font-bold'>{adjustedTotal}</div> */}

				{/* Display target success if applicable */}
				{isTargetSuccess !== null && (
					<div className='text-xl font-bold'>
						{adjustedTotal} vs tn {target}
					</div>
				)}

				{/* Display success level if applicable */}
				<div
					className={twMerge(
						'text-base font-bold',
						isTargetSuccess ? 'text-green-500' : 'text-red-500',
					)}
				>
					{isTargetSuccess ? successLevel : 'Failure'}
				</div>
			</div>
		</div>
	)
}

export default DiceResults
