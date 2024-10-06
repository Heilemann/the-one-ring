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

	const [modifier, setModifier] = useState(0)

	const openRollModal = (
		weapon: string,
		rating: number,
		isFavorite: boolean = false,
		mod: number = 0,
	) => {
		setModalState({
			isOpen: true,
			formula: `${isFavorite ? '2d12kh1' : '1d12'} + ${rating}${mod !== 0 ? ` + ${mod}` : ''}`,
			label: `${weapon.charAt(0).toUpperCase() + weapon.slice(1)} (${rating})`,
			isFavoured: isFavorite,
			isIllFavoured: false,
		})
		setModifier(mod)
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
		modifier,
		setModifier,
	}
}

export default useRollModal
