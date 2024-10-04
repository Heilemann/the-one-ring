import { useState } from 'react'
import { ICharacter } from '../../../interfaces/character'
import { getEffectiveTargetNumber } from '../../../utils/getEffectiveTargetNumber'

interface RollModalState {
	isOpen: boolean
	formula: string
	label: string
}

type StrengthOrTargetNumber = ICharacter['strength'] | number

const useRollModal = (
	strengthOrTargetNumber: StrengthOrTargetNumber,
	isWeary: boolean,
	isMiserable: boolean,
	isWounded: boolean,
) => {
	const [modalState, setModalState] = useState<RollModalState>({
		isOpen: false,
		formula: '',
		label: '',
	})

	const openRollModal = (name: string, rating: number) => {
		const ratingNumber = rating ? Number(rating) : 0
		const diceExpression = ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'
		const effectiveTargetNumber =
			typeof strengthOrTargetNumber === 'number'
				? strengthOrTargetNumber
				: getEffectiveTargetNumber(strengthOrTargetNumber)

		const formula = `${diceExpression} > ${effectiveTargetNumber}`

		let label = `${name}`
		if (isWeary) label += ' --weary'
		if (isMiserable) label += ' --miserable'
		if (isWounded) label += ' --wounded'

		setModalState({
			isOpen: true,
			formula,
			label,
		})
	}

	const closeRollModal = () => {
		setModalState(prev => ({ ...prev, isOpen: false }))
	}

	return {
		...modalState,
		openRollModal,
		closeRollModal,
	}
}

export default useRollModal
