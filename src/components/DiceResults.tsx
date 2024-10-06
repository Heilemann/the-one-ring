import React, { useEffect, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import eye from '../assets/eye.png'
import gandalf from '../assets/gandalf.png'
import tengwar from '../assets/tengwar.png'
import { DiceResult, Modifier, RollResultArray } from '../interfaces/dicebox'

interface DiceResultsProps {
	diceData: string
}

const DiceResults: React.FC<DiceResultsProps> = ({ diceData }) => {
	const diceResult: DiceResult | false = useMemo(() => {
		try {
			return JSON.parse(diceData) as DiceResult
		} catch (error) {
			console.error('Failed to parse dice data:', error)
			return false
		}
	}, [diceData])

	useEffect(() => {
		if (diceResult) {
			console.log('New roll data:', {
				label: 'label' in diceResult ? diceResult.label : null,
				diceResult,
			})
		}
	}, [diceResult])

	if (!diceResult) {
		return <div>No valid dice data available.</div>
	}

	// Function to render individual dice or modifiers
	const renderDice = () => {
		if (diceResult && diceResult.type === 'expressionroll') {
			return diceResult.dice.map((die, idx) => (
				<React.Fragment key={idx}>
					{/* Render operator before each die except the first */}
					{idx > 0 && diceResult.ops && diceResult.ops[idx - 1] && (
						<div className='flex items-center justify-center text-xl font-bold p-2'>
							{diceResult.ops[idx - 1]}
						</div>
					)}
					{renderDieOrModifier(die, idx)}
				</React.Fragment>
			))
		} else if (
			diceResult &&
			(diceResult.type === 'die' || diceResult.type === 'number')
		) {
			return renderDieOrModifier(diceResult as RollResultArray | Modifier, 0)
		}
		return null
	}

	// Function to render dice or modifiers
	const renderDieOrModifier = (
		item: RollResultArray | Modifier,
		idx: number,
	) => {
		if (item.type === 'die') {
			return (
				<div className='flex gap-1'>
					{item.rolls?.map((roll, i) => renderRoll(roll, idx, i))}
				</div>
			)
		} else if (item.type === 'number') {
			// Render modifiers
			return (
				<div
					key={idx}
					className='flex text-sm h-6 w-6 items-center justify-center rounded-md border-2 border-white/10 p-1'
				>
					<div className='-mt-0.5 -mr-0.5'>{item.value}</div>
				</div>
			)
		}
		return null
	}

	// Function to render individual rolls
	const renderRoll = (
		roll: { die?: number; value: number; drop?: boolean },
		idx: number,
		i: number,
	) => {
		const dieType = roll.die ? `d${roll.die}` : ''
		const isSixOnD6 = roll.die === 6 && roll.value === 6
		const isElevenOnD12 = roll.die === 12 && roll.value === 11
		const isTwelveOnD12 = roll.die === 12 && roll.value === 12

		// Determine if the roll is low on d6 and should be colored when weary
		const isLowOnD6Weary =
			isWeary && roll.die === 6 && [1, 2, 3].includes(roll.value)

		// Build class names for the die
		const dieClass = twMerge(
			'flex text-xl flex-col items-center justify-center',
			dieType === 'd6' ? 'rounded-md h-6 w-6' : 'rounded-full h-7 w-7',
			isLowOnD6Weary || roll.drop ? 'bg-red-800/50' : 'bg-white/10',
			isSixOnD6 && 'bg-white text-black',
		)

		return (
			<div key={`${idx}-${i}`} className={dieClass}>
				{isElevenOnD12 ? (
					<img src={eye} alt='Eye' className='w-6 object-contain' />
				) : isTwelveOnD12 ? (
					<img src={gandalf} alt='Gandalf' className='h-4 w-4 object-contain' />
				) : isSixOnD6 ? (
					// Display tengwar symbol when a d6 rolls a 6
					<img src={tengwar} alt='Tengwar' className='w-4 h-4 object-contain' />
				) : (
					<div
						className='-mt-0.5 -mr-0.5'
						style={
							isLowOnD6Weary || roll.drop
								? {
										color: 'transparent',
										WebkitTextStroke: '1px #ccc',
									}
								: undefined
						}
					>
						{roll.value}
					</div>
				)}
			</div>
		)
	}

	// Extract label, target number, and conditions if present
	const getLabelInfo = () => {
		if ('label' in diceResult && diceResult.label) {
			let label = diceResult.label.trim()
			let target: number | null = null
			let isWeary = false
			let isMiserable = false

			// Extract target number if present
			if (label.startsWith('>')) {
				const [_, targetString, ...rest] = label.split(' ')
				target = parseInt(targetString)
				label = rest.join(' ').trim()
			}

			// Check for condition markers
			const conditionMarkers = label.match(/--\w+/g) || []
			conditionMarkers.forEach(marker => {
				if (marker === '--weary') isWeary = true
				if (marker === '--miserable') isMiserable = true
			})
			// Remove condition markers from label
			label = label.replace(/--\w+/g, '').trim()

			return { target, label, isWeary, isMiserable }
		}
		return { label: null, target: null, isWeary: false, isMiserable: false }
	}

	const { label, target, isWeary, isMiserable } = getLabelInfo()

	// Adjust the total value considering the weary condition
	const adjustedTotal = useMemo(() => {
		let total = 0

		const adjustRolls = (item: RollResultArray | Modifier) => {
			if (item.type === 'die') {
				const keptRolls = item.rolls?.filter(roll => !roll.drop) || []
				keptRolls.forEach(roll => {
					let value = roll.value

					// If weary and die is d6 with value 1-3, set value to 0
					if (isWeary && roll.die === 6 && [1, 2, 3].includes(roll.value)) {
						value = 0
					}

					// Subtract 11 if Eye of Sauron (11 on d12)
					if (roll.die === 12 && roll.value === 11) {
						value -= 11
					}

					total += value
				})
			} else if (item.type === 'number') {
				total += item.value
			}
		}

		if (diceResult.type === 'expressionroll') {
			diceResult.dice.forEach(adjustRolls)
		} else {
			adjustRolls(diceResult as RollResultArray)
		}

		return total
	}, [diceResult, isWeary])

	// Check if roll meets target
	const isTargetSuccess = target !== null ? adjustedTotal >= target : null

	// Determine success level and result message considering conditions
	const { successLevel, resultMessage } = useMemo(() => {
		let numberOfSixes = 0
		let rolledD12 = false
		let rolledD12_12 = false
		let rolledD12_11 = false // Rolled Eye of Sauron

		const processRolls = (item: RollResultArray | Modifier) => {
			if (item.type === 'die') {
				item.rolls?.forEach(roll => {
					// Adjust roll value for weary condition
					let value = roll.value
					if (isWeary && roll.die === 6 && [1, 2, 3].includes(roll.value)) {
						value = 0
					}

					if (roll.die === 12) {
						rolledD12 = true
						if (roll.value === 12) {
							rolledD12_12 = true
						}
						if (roll.value === 11) {
							rolledD12_11 = true
						}
					}
					if (roll.die === 6 && value === 6) {
						numberOfSixes += 1
					}
				})
			}
		}

		if (diceResult.type === 'expressionroll') {
			diceResult.dice.forEach(processRolls)
		} else {
			processRolls(diceResult as RollResultArray)
		}

		let successLevel = ''
		let resultMessage = ''

		// **Check for automatic failure due to misery and Eye of Sauron**
		if (isMiserable && rolledD12_11) {
			successLevel = ''
			resultMessage = 'Automatic Failure'
		} else {
			if (rolledD12_12) {
				if (numberOfSixes >= 2) successLevel = 'Automatic Extraordinary Success'
				else if (numberOfSixes >= 1) successLevel = 'Automatic Great Success'
				else successLevel = 'Automatic Success'
			} else if (rolledD12) {
				if (numberOfSixes >= 2) successLevel = 'Extraordinary Success'
				else if (numberOfSixes >= 1) successLevel = 'Great Success'
				else successLevel = 'Success'
			} else {
				successLevel = ''
			}

			// Determine result message
			if (target !== null) {
				if (isTargetSuccess) {
					resultMessage = successLevel || 'Success'
				} else {
					resultMessage = 'Failure'
				}
			} else {
				resultMessage = successLevel
			}
		}

		return { successLevel, resultMessage }
	}, [diceResult, adjustedTotal, isTargetSuccess, target, isWeary, isMiserable])

	return (
		<div className='text-white'>
			<div className='flex flex-col items-center gap-1'>
				{/* Display individual dice and operators */}
				<div
					className='mb-0 flex flex-wrap items-center gap-1'
					style={{
						fontFamily: 'Aniron',
					}}
				>
					{renderDice()}
				</div>

				{/* Display label, appending conditions */}
				{label && (
					<div className='text-sm font-bold'>
						{label}
						{isWeary && <span> (Weary)</span>}
						{isMiserable && <span> (Miserable)</span>}
					</div>
				)}

				{/* Display adjusted total result */}
				<div className='text-sm opacity-70'>
					{adjustedTotal} {target !== null && `vs TN ${target}`}
				</div>

				{/* Display result message */}
				<div
					className={twMerge(
						'text-lg font-bold text-center',
						resultMessage === 'Success' ||
							resultMessage === 'Great Success' ||
							resultMessage === 'Extraordinary Success' ||
							resultMessage === 'Automatic Success' ||
							resultMessage === 'Automatic Great Success' ||
							resultMessage === 'Automatic Extraordinary Success'
							? 'text-green-600'
							: resultMessage === 'Automatic Failure' ||
								  resultMessage === 'Failure'
								? 'text-red-500'
								: '',
					)}
					style={{
						fontFamily: 'Aniron',
					}}
				>
					{resultMessage}
				</div>
			</div>
		</div>
	)
}

export default DiceResults
