import { useState } from 'react'

interface RollModalState {
	isOpen: boolean
	formula: string
	label: string
	isFavoured: boolean
	isIllFavoured: boolean
	targetNumber: number | null
}

const useRollModal = () => {
	const [modalState, setModalState] = useState<RollModalState>({
		isOpen: false,
		formula: '',
		label: '',
		isFavoured: false,
		isIllFavoured: false,
		targetNumber: null,
	})

	const [modifier, setModifier] = useState(0)

	const openRollModal = (
		name: string,
		rating: number,
		isFavorite: boolean = false,
		mod: number = 0,
		target: number | null = null,
	) => {
		const baseFormula = `1d12${rating > 0 ? ` + ${rating}d6` : ''}${mod !== 0 ? ` + ${mod}` : ''}`
		const formulaWithTarget =
			target !== null ? `${baseFormula} > ${target}` : baseFormula
		setModalState({
			isOpen: true,
			formula: formulaWithTarget,
			label: `${name}${rating > 0 ? ` (${rating})` : ''}`,
			isFavoured: isFavorite,
			isIllFavoured: false,
			targetNumber: target,
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
			isIllFavoured: false,
		}))
	}

	const toggleIllFavoured = () => {
		setModalState(prev => ({
			...prev,
			isIllFavoured: !prev.isIllFavoured,
			isFavoured: false,
		}))
	}

	const setTargetNumber = (target: number | null) => {
		setModalState(prev => ({ ...prev, targetNumber: target }))
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
		setTargetNumber,
	}
}

export default useRollModal
