import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'

interface RollModalProps {
	isOpen: boolean
	onClose: () => void
	initialFormula: string
	label: string
	updateFormula: (newFormula: string) => void
	isFavoured: boolean
	isIllFavoured: boolean
	toggleFavoured: () => void
	toggleIllFavoured: () => void
	modifier: number
	setModifier: (value: number) => void
	targetNumber: number | null
	setTargetNumber: (value: number | null) => void
}

const RollModal: React.FC<RollModalProps> = ({
	isOpen,
	onClose,
	initialFormula,
	label,
	updateFormula,
	isFavoured,
	isIllFavoured,
	toggleFavoured,
	toggleIllFavoured,
	modifier,
	setModifier,
	targetNumber,
	setTargetNumber,
}) => {
	const messageToApp = useMessageToApp()

	const updateFormulaWithTargetNumber = (
		formula: string,
		targetNumber: number | null,
	) => {
		const baseParts = formula.split('>')[0].trim()
		const baseFormula = baseParts.replace(/[{}]/g, '').trim()
		return targetNumber ? `{${baseFormula}} > ${targetNumber}` : baseFormula
	}

	useEffect(() => {
		if (!initialFormula) return

		let newFormula = initialFormula
		const hasTarget = newFormula.includes('>')
		const baseFormula = hasTarget
			? newFormula.split('>')[0].trim().replace(/[{}]/g, '')
			: newFormula.replace(/[{}]/g, '')

		if (isFavoured || isIllFavoured) {
			const updatedBase = baseFormula.replace(
				/[12]d12(kh1?|kl1?)?/,
				isFavoured ? '2d12kh1' : '2d12kl1',
			)
			newFormula = hasTarget
				? `{${updatedBase}} > ${newFormula.split('>')[1].trim()}`
				: updatedBase
		}

		if (newFormula !== initialFormula) {
			updateFormula(newFormula)
		}
	}, [isFavoured, isIllFavoured, initialFormula])

	const handleRoll = () => {
		messageToApp({
			message: 'send message',
			data: {
				payload: `/roll ${initialFormula} ${label}`,
			},
		})
		onClose()
	}

	const extractD6Count = (formula: string): number => {
		const match = formula.replace(/[{}]/g, '').match(/(\d+)d6/)
		return match ? parseInt(match[1], 10) : 0
	}

	const addDice = () => {
		const [basePart, targetPart] = initialFormula.split('>')
		const baseFormula = basePart.replace(/[{}]/g, '').trim()
		const d6Count = extractD6Count(baseFormula)
		let newBasePart: string

		if (d6Count > 0) {
			const newD6Count = d6Count + 1
			newBasePart = baseFormula.replace(/(\d+)d6/, `${newD6Count}d6`)
		} else {
			newBasePart = `${baseFormula} + 1d6`
		}

		const newFormula = targetPart
			? `{${newBasePart.trim()}} > ${targetPart.trim()}`
			: newBasePart.trim()
		updateFormula(newFormula)
	}

	const removeDice = () => {
		const [basePart, targetPart] = initialFormula.split('>')
		const baseFormula = basePart.replace(/[{}]/g, '').trim()
		const d6Count = extractD6Count(baseFormula)
		let newBasePart: string

		if (d6Count > 1) {
			const newD6Count = d6Count - 1
			newBasePart = baseFormula.replace(/(\d+)d6/, `${newD6Count}d6`)
		} else if (d6Count === 1) {
			newBasePart = baseFormula.replace(/\+?\s*1d6/, '').trim()
		} else {
			newBasePart = baseFormula
		}

		const newFormula = targetPart
			? `{${newBasePart.trim()}} > ${targetPart.trim()}`
			: newBasePart.trim()
		updateFormula(newFormula)
	}

	const conditions = label.match(/--(\w+)/g)?.map(c => c.slice(2)) || []
	const mainLabel = label.replace(/--\w+/g, '').trim()

	if (!isOpen) return null

	const handleModifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newModifier = parseInt(e.target.value) || 0
		setModifier(newModifier)

		const [basePart, targetPart] = initialFormula.split('>')
		const baseFormula = basePart.replace(/[{}]/g, '').trim()
		const formulaParts = baseFormula.split('+').map(part => part.trim())
		const lastPart = formulaParts[formulaParts.length - 1]

		if (lastPart.match(/^-?\d+$/)) {
			formulaParts.pop()
		}

		if (newModifier !== 0) {
			formulaParts.push(newModifier.toString())
		}

		const newBasePart = formulaParts.join(' + ').trim()
		const newFormula = targetPart
			? `{${newBasePart}} > ${targetPart.trim()}`
			: newBasePart
		updateFormula(newFormula)
	}

	const handleTargetNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTarget = e.target.value === '' ? null : parseInt(e.target.value)
		setTargetNumber(newTarget)
		const updatedFormula = updateFormulaWithTargetNumber(
			initialFormula,
			newTarget,
		)
		updateFormula(updatedFormula)
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white p-6 rounded-lg'>
				<h2
					className={twMerge('text-base font-bold text-[#ba5450] mb-4')}
					style={{ fontFamily: 'Aniron' }}
				>
					Roll {mainLabel}
				</h2>
				<input
					type='text'
					value={initialFormula}
					onChange={e => updateFormula(e.target.value)}
					className='w-full p-2 border rounded mb-4'
				/>
				<div className='flex justify-between items-center mb-4'>
					<button
						onClick={removeDice}
						className='px-2 py-1 bg-gray-200 rounded text-[#ba5450]'
						style={{ fontFamily: 'Aniron' }}
					>
						- 1d6
					</button>
					<button
						onClick={addDice}
						className='px-2 py-1 bg-gray-200 rounded text-[#ba5450]'
						style={{ fontFamily: 'Aniron' }}
					>
						+ 1d6
					</button>
				</div>
				<div className='flex justify-between items-center mb-4'>
					<label className='flex items-center'>
						<input
							type='checkbox'
							checked={isFavoured}
							onChange={toggleFavoured}
							className='mr-2'
						/>
						Favoured
					</label>
					<label className='flex items-center'>
						<input
							type='checkbox'
							checked={isIllFavoured}
							onChange={toggleIllFavoured}
							className='mr-2'
						/>
						Ill-favoured
					</label>
				</div>
				<div className='flex justify-between items-center mb-4'>
					<label className='flex items-center'>
						Modifier:
						<input
							type='number'
							value={modifier}
							onChange={handleModifierChange}
							className='ml-2 w-16 p-1 border rounded'
						/>
					</label>
					<label className='flex items-center'>
						Target Number:
						<input
							type='number'
							value={targetNumber === null ? '' : targetNumber}
							onChange={handleTargetNumberChange}
							className='ml-2 w-16 p-1 border rounded'
							placeholder='Optional'
						/>
					</label>
				</div>
				{conditions.length > 0 && (
					<div className='mb-4'>
						<span className='font-bold'>Conditions: </span>
						{conditions.join(', ')}
					</div>
				)}
				<div className='flex justify-end space-x-2'>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-gray-200 rounded text-[#ba5450]'
						style={{ fontFamily: 'Aniron' }}
					>
						Cancel
					</button>
					<button
						onClick={handleRoll}
						className='px-4 py-2 bg-gray-200 rounded text-[#ba5450]'
						style={{ fontFamily: 'Aniron' }}
					>
						Roll
					</button>
				</div>
			</div>
		</div>
	)
}

export default RollModal
