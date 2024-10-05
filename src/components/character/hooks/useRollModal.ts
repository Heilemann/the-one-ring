import { useState } from 'react'

interface RollModalState {
	isOpen: boolean
	formula: string
	label: string
}

const useRollModal = () => {
	const [modalState, setModalState] = useState<RollModalState>({
		isOpen: false,
		formula: '',
		label: '',
	})

	const openRollModal = (name: string, rating: number) => {
		const ratingNumber = Number(rating) || 0
		const diceExpression = ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'

		setModalState({
			isOpen: true,
			formula: diceExpression,
			label: `${name}`,
		})
	}

	const closeRollModal = () => {
		setModalState(prev => ({ ...prev, isOpen: false }))
	}

	const updateFormula = (newFormula: string) => {
		setModalState(prev => ({ ...prev, formula: newFormula }))
	}

	return {
		...modalState,
		openRollModal,
		closeRollModal,
		updateFormula,
	}
}

export default useRollModal
