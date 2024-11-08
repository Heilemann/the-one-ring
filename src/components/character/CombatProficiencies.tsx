import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import useRollModal from '../../hooks/useRollModal'
import { ICharacter } from '../../interfaces/character'
import MediumHeader from '../BaseComponents/MediumHeader'
import CheckboxRating from '../CheckboxRating'
import CombatStanceSelector from './CombatStanceSelector'
import RollModal from './RollModal'

const weaponList = ['axes', 'bows', 'spears', 'swords'] as const
type WeaponType = (typeof weaponList)[number]

type CombatProficiencyName = `combatProficiencies.${WeaponType}.${
	| 'rating'
	| 'favoured'}`

const CombatProficiencies: React.FC = () => {
	const { control } = useFormContext<ICharacter>()

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
		modifier,
		setModifier,
		targetNumber,
		setTargetNumber,
	} = useRollModal()

	const currentStance = useWatch({
		control,
		name: 'combatStance',
		defaultValue: 'open',
	})

	const handleOpenRollModal = (weapon: WeaponType, rating: number) => {
		const isFavoured = control._getWatch(
			`combatProficiencies.${weapon}.favoured` as CombatProficiencyName,
		)

		let successDiceModifier = 0
		switch (currentStance) {
			case 'forward':
				successDiceModifier = 1 // Add 1 success die (d6)
				break
			case 'defensive':
				// For defensive stance, we'll subtract 1 success die per engaging opponent
				// Note: This should be handled dynamically based on number of engaging opponents
				successDiceModifier = -1 // Remove 1 success die (d6)
				break
			default:
				successDiceModifier = 0
				break
		}

		// Adjust the rating directly to modify number of d6s
		const adjustedRating = Math.max(0, rating + successDiceModifier)

		openRollModal(
			weapon.charAt(0).toUpperCase() + weapon.slice(1),
			adjustedRating,
			isFavoured,
			modifier, // Keep any other modifiers separate from stance effects
			null,
		)
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
					return (
						<div key={weapon} className='flex items-center space-x-2 space-y-3'>
							<Controller
								name={`combatProficiencies.${weapon}.favoured`}
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
				modifier={modifier}
				setModifier={setModifier}
				targetNumber={targetNumber}
				setTargetNumber={setTargetNumber}
			/>
		</div>
	)
}

export default CombatProficiencies
