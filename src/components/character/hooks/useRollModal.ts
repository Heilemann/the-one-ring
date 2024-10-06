import { useState } from 'react'

interface RollModalState {
	isOpen: boolean
	formula: string
	label: string
	isFavoured: boolean
	isIllFavoured: boolean
}

const useRollModal = () => {
	const [modalState, setModalState] = useState<RollModalState>({
		isOpen: false,
		formula: '',
		label: '',
		isFavoured: false,
		isIllFavoured: false,
	})

	const openRollModal = (
		name: string,
		rating: number,
		isFavoured: boolean = false,
	) => {
		const ratingNumber = Number(rating) || 0
		const diceExpression = ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'

		setModalState({
			isOpen: true,
			formula: diceExpression,
			label: `${name}`,
			isFavoured: isFavoured,
			isIllFavoured: false,
		})
	}

	const closeRollModal = () => {
		setModalState(prev => ({ ...prev, isOpen: false }))
	}

	const updateFormula = (newFormula: string) => {
		setModalState(prev => ({ ...prev, formula: newFormula }))
	}

	const toggleFavoured = () => {
		setModalState(prev => ({
			...prev,
			isFavoured: !prev.isFavoured,
			isIllFavoured: false, // Ensure ill-favoured is turned off when favoured is toggled on
		}))
	}

	const toggleIllFavoured = () => {
		setModalState(prev => ({
			...prev,
			isIllFavoured: !prev.isIllFavoured,
			isFavoured: false, // Ensure favoured is turned off when ill-favoured is toggled on
		}))
	}

	return {
		...modalState,
		openRollModal,
		closeRollModal,
		updateFormula,
		toggleFavoured,
		toggleIllFavoured,
	}
}

export default useRollModal
