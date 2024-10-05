import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'

interface RollModalProps {
	isOpen: boolean
	onClose: () => void
	initialFormula: string
	label: string
	updateFormula: (newFormula: string) => void
}

const RollModal: React.FC<RollModalProps> = ({
	isOpen,
	onClose,
	initialFormula,
	label,
	updateFormula,
}) => {
	const [formula, setFormula] = useState(initialFormula)
	const messageToApp = useMessageToApp()

	useEffect(() => {
		if (isOpen) {
			setFormula(initialFormula)
		}
	}, [isOpen, initialFormula])

	const handleRoll = () => {
		messageToApp({
			message: 'send message',
			data: {
				payload: `/roll ${formula} ${label}`,
			},
		})
		onClose()
	}

	const addDice = () => {
		const parts = formula.split('+')
		const d6Parts = parts.filter(part => part.includes('d6'))
		if (d6Parts.length > 0) {
			const lastD6Part = d6Parts[d6Parts.length - 1]
			const [count] = lastD6Part.split('d')
			const newCount = parseInt(count) + 1
			parts[parts.indexOf(lastD6Part)] = `${newCount}d6`
		} else {
			parts.push('1d6')
		}
		const newFormula = parts.join('+')
		setFormula(newFormula)
		updateFormula(newFormula)
	}

	const removeDice = () => {
		const parts = formula.split('+')
		const d6Parts = parts.filter(part => part.includes('d6'))
		if (d6Parts.length > 0) {
			const lastD6Part = d6Parts[d6Parts.length - 1]
			const [count] = lastD6Part.split('d')
			const newCount = parseInt(count) - 1
			if (newCount > 0) {
				parts[parts.indexOf(lastD6Part)] = `${newCount}d6`
			} else {
				parts.splice(parts.indexOf(lastD6Part), 1)
			}
			const newFormula = parts.join('+')
			setFormula(newFormula)
			updateFormula(newFormula)
		}
	}

	// Extract conditions and main label text
	const conditions = label.match(/--(\w+)/g)?.map(c => c.slice(2)) || []
	const mainLabel = label.replace(/--\w+/g, '').trim()

	if (!isOpen) return null

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
					value={formula}
					onChange={e => {
						setFormula(e.target.value)
						updateFormula(e.target.value)
					}}
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
