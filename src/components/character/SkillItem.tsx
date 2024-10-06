import React from 'react'
import { Path, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import CheckboxRating from '../CheckboxRating'
import RollModal from './RollModal'
import useRollModal from './hooks/useRollModal'

export interface SkillItemProps {
	name: string
	path: Path<ICharacter>
	attributeTargetNumber: number
}

const SkillItem: React.FC<SkillItemProps> = ({
	name,
	path,
	attributeTargetNumber,
}) => {
	const { register, control, setValue } = useFormContext<ICharacter>()

	const rating = useWatch({
		control,
		name: `${path}.rating` as Path<ICharacter>,
		defaultValue: 0,
	})

	const isFavorite = useWatch({
		control,
		name: `${path}.favorite` as Path<ICharacter>,
		defaultValue: false,
	})

	const {
		isOpen,
		formula,
		label,
		openRollModal,
		closeRollModal,
		updateFormula,
		isFavoured,
		isIllFavoured,
		toggleFavoured,
		toggleIllFavoured,
	} = useRollModal()

	const handleOpenRollModal = () => {
		openRollModal(name, Number(rating), isFavorite)
	}

	return (
		<div className='flex items-center gap-2'>
			<input
				type='checkbox'
				{...register(`${path}.favorite` as Path<ICharacter>)}
			/>
			<label
				className='text-black grow w-full cursor-pointer hover:underline'
				onClick={handleOpenRollModal}
			>
				{name}
			</label>
			<CheckboxRating
				value={Number(rating)}
				onChange={newValue => {
					setValue(`${path}.rating` as Path<ICharacter>, newValue)
				}}
			/>
			<RollModal
				isOpen={isOpen}
				onClose={closeRollModal}
				initialFormula={formula}
				label={label}
				updateFormula={updateFormula}
				isFavoured={isFavoured}
				isIllFavoured={isIllFavoured}
				toggleFavoured={toggleFavoured}
				toggleIllFavoured={toggleIllFavoured}
			/>
		</div>
	)
}

export default SkillItem
