import React, { useCallback, useEffect, useState } from 'react'
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
}) => {
	const [formula, setFormula] = useState(initialFormula)
	const messageToApp = useMessageToApp()

	const formatFormula = (formula: string): string => {
		return formula.replace(/\s*\+\s*/g, ' + ').trim()
	}

	useEffect(() => {
		if (isOpen) {
			setFormula(initialFormula)
		}
	}, [isOpen, initialFormula])

	useEffect(() => {
		let newFormula = formula.replace(/[12]d12(kh1?|kl1?)?/, '1d12')
		if (isFavoured) {
			newFormula = newFormula.replace('1d12', '2d12kh1')
		} else if (isIllFavoured) {
			newFormula = newFormula.replace('1d12', '2d12kl1')
		}
		newFormula = formatFormula(newFormula)
		setFormula(newFormula)
		updateFormula(newFormula)
	}, [isFavoured, isIllFavoured, formula])

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
		const parts = formula.split('+').map(part => part.trim())
		const d6Parts = parts.filter(part => part.includes('d6'))
		if (d6Parts.length > 0) {
			const lastD6Part = d6Parts[d6Parts.length - 1]
			const [count] = lastD6Part.split('d')
			const newCount = parseInt(count) + 1
			parts[parts.indexOf(lastD6Part)] = `${newCount}d6`
		} else {
			parts.push('1d6')
		}
		const newFormula = formatFormula(parts.join(' + '))
		setFormula(newFormula)
		updateFormula(newFormula)
	}

	const removeDice = () => {
		const parts = formula.split('+').map(part => part.trim())
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
			const newFormula = formatFormula(parts.join(' + '))
			setFormula(newFormula)
			updateFormula(newFormula)
		}
	}

	// Extract conditions and main label text
	const conditions = label.match(/--(\w+)/g)?.map(c => c.slice(2)) || []
	const mainLabel = label.replace(/--\w+/g, '').trim()

	// Handle Escape key press
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		},
		[onClose],
	)

	// Add and remove event listeners for Escape key
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, handleKeyDown])

	// Handle click outside modal
	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={handleOutsideClick}
		>
			<div
				className='bg-white p-6 rounded-lg'
				onClick={e => e.stopPropagation()}
			>
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
