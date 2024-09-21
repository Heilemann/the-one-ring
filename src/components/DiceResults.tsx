import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import eye from '../assets/eye.png'
import gandalf from '../assets/gandalf.png'
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
					{renderDieOrModifier(die, idx)}
				</React.Fragment>
			))
		} else if (diceResult.type === 'die' || diceResult.type === 'number') {
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
		roll: { die?: number; value: number },
		idx: number,
		i: number,
	) => {
		const dieType = roll.die ? `d${roll.die}` : ''
		const isSixOnD6 = roll.die === 6 && roll.value === 6
		const isElevenOnD12 = roll.die === 12 && roll.value === 11
		const isTwelveOnD12 = roll.die === 12 && roll.value === 12
		const isLowOnD6 = roll.die === 6 && [1, 2, 3].includes(roll.value)

		return (
			<div
				key={`${idx}-${i}`}
				className={twMerge(
					'flex text-xl flex-col items-center justify-center bg-white/10',
					dieType === 'd6' ? 'rounded-md h-6 w-6' : 'rounded-full h-7 w-7',
					isSixOnD6 && 'bg-white text-black', // Highlight if d6 rolled a 6
				)}
			>
				{isElevenOnD12 ? (
					<img src={eye} alt='Eye' className='w-6 object-contain' />
				) : isTwelveOnD12 ? (
					<img src={gandalf} alt='Gandalf' className='h-4 w-4 object-contain' />
				) : (
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
				)}
			</div>
		)
	}

	// Function to adjust the total value if d12 rolls an 11
	const adjustedTotal = useMemo(() => {
		let total = diceResult.value

		const adjustForEyeOfSauron = (item: RollResultArray | Modifier) => {
			if (item.type === 'die') {
				item.rolls?.forEach(roll => {
					if (roll.die === 12 && roll.value === 11) {
						total -= 11
					}
				})
			}
		}

		if (diceResult.type === 'expressionroll') {
			diceResult.dice.forEach(adjustForEyeOfSauron)
		} else {
			adjustForEyeOfSauron(diceResult as RollResultArray)
		}

		return total
	}, [diceResult])

	const successLevel = useMemo(() => {
		let numberOfSixes = 0
		let rolledD12 = false
		let rolledD12_12 = false

		const processRolls = (item: RollResultArray | Modifier) => {
			if (item.type === 'die') {
				item.rolls?.forEach(roll => {
					if (roll.die === 12) {
						rolledD12 = true
						if (roll.value === 12) {
							rolledD12_12 = true
						}
					}
					if (roll.die === 6 && roll.value === 6) {
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

		if (rolledD12_12) {
			if (numberOfSixes >= 2) return 'Automatic Extraordinary Success'
			if (numberOfSixes >= 1) return 'Automatic Great Success'
			return 'Automatic Success'
		}
		if (rolledD12) {
			if (numberOfSixes >= 2) return 'Extraordinary Success'
			if (numberOfSixes >= 1) return 'Great Success'
			return 'Success'
		}
		return null
	}, [diceResult])

	// Extract label and target number if present
	const getLabelInfo = () => {
		if ('label' in diceResult && diceResult.label) {
			const label = diceResult.label.trim()
			if (label.startsWith('>')) {
				const [targetString, ...labelParts] = label.slice(1).trim().split(' ')
				const target = parseInt(targetString)
				if (!isNaN(target)) {
					const labelText = labelParts.join(' ').trim()
					return { target, label: labelText || null }
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
				{label && <div className='text-lg font-bold'>{label}</div>}

				{/* Display adjusted total result */}
				<div className='text-lg font-bold'>
					{adjustedTotal} {target !== null && `vs tn ${target}`}
				</div>

				{/* Display success level if applicable */}
				<div
					className={twMerge(
						'text-lg font-bold text-center',
						target !== null && isTargetSuccess
							? 'text-green-600'
							: 'text-red-500',
					)}
				>
					{target === null && successLevel}
					{target !== null && isTargetSuccess && successLevel}
				</div>
			</div>
		</div>
	)
}

export default DiceResults
