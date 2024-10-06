import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import MediumHeader from '../BaseComponents/MediumHeader'
import CheckboxRating from '../CheckboxRating'
import CombatStanceSelector from './CombatStanceSelector'
import RollModal from './RollModal'
import useRollModal from './hooks/useRollModal'

const weaponList = ['axes', 'bows', 'spears', 'swords'] as const

const CombatProficiencies: React.FC = () => {
	const { control } = useFormContext<ICharacter>()

	const strengthAttribute = useWatch({
		control,
		name: 'strength',
	}) as ICharacter['strength']

	const isWeary = useWatch({
		control,
		name: 'conditions.weary',
		defaultValue: false,
	})

	const isMiserable = useWatch({
		control,
		name: 'conditions.miserable',
		defaultValue: false,
	})

	const isWounded = useWatch({
		control,
		name: 'conditions.wounded',
		defaultValue: false,
	})

	const combatStance = useWatch({
		control,
		name: 'combatStance',
		defaultValue: 'open',
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

	const handleOpenRollModal = (weapon: string, rating: number) => {
		const isFavorite = control._getWatch(
			`combatProficiencies.${weapon}.favorite`,
		)
		openRollModal(weapon, rating, isFavorite)
	}

	return (
		<div>
			<MediumHeader>Combat Proficiencies</MediumHeader>
			<CombatStanceSelector />
			<div>
				{weaponList.map(weapon => {
					const rating = useWatch({
						control,
						name: `combatProficiencies.${weapon}.rating`,
						defaultValue: 0,
					})
					const isFavorite = useWatch({
						control,
						name: `combatProficiencies.${weapon}.favorite`,
						defaultValue: false,
					})
					return (
						<div key={weapon} className='flex items-center space-x-2 space-y-3'>
							<Controller
								name={`combatProficiencies.${weapon}.favorite`}
								control={control}
								defaultValue={false}
								render={({ field }) => (
									<input
										type='checkbox'
										checked={field.value}
										onChange={e => field.onChange(e.target.checked)}
									/>
								)}
							/>
							<label
								className='text-black grow w-full cursor-pointer hover:underline'
								onClick={() => handleOpenRollModal(weapon, rating)}
								style={{ marginTop: '0px' }}
							>
								{weapon.charAt(0).toUpperCase() + weapon.slice(1)}
							</label>

							<Controller
								name={`combatProficiencies.${weapon}.rating`}
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<CheckboxRating
										value={Number(field.value)}
										onChange={newValue => field.onChange(newValue)}
									/>
								)}
							/>
						</div>
					)
				})}
			</div>
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

export default CombatProficiencies
