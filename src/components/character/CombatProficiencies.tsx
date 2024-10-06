import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import MediumHeader from '../BaseComponents/MediumHeader'
import CheckboxRating from '../CheckboxRating'
import CombatStanceSelector from './CombatStanceSelector'
import RollModal from './RollModal'
import useRollModal from './hooks/useRollModal'

const weaponList = ['axes', 'bows', 'spears', 'swords'] as const
type WeaponType = (typeof weaponList)[number]

type CombatProficiencyName = `combatProficiencies.${WeaponType}.${
	| 'rating'
	| 'favorite'}`

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
	} = useRollModal()

	const handleOpenRollModal = (weapon: WeaponType, rating: number) => {
		const isFavorite = control._getWatch(
			`combatProficiencies.${weapon}.favorite` as CombatProficiencyName,
		)
		openRollModal(weapon, rating, isFavorite) // Remove the modifier argument
	}

	return (
		<div>
			<MediumHeader>Combat Proficiencies</MediumHeader>
			<CombatStanceSelector />
			<div className='mb-4'>
				<label htmlFor='modifier' className='mr-2'>
					Roll Modifier:
				</label>
				<input
					type='number'
					id='modifier'
					value={modifier}
					onChange={e => setModifier(parseInt(e.target.value) || 0)}
					className='w-16 px-2 py-1 border rounded'
				/>
			</div>
			<div>
				{weaponList.map(weapon => {
					const rating = useWatch({
						control,
						name: `combatProficiencies.${weapon}.rating` as CombatProficiencyName,
						defaultValue: 0,
					})
					const isFavorite = useWatch({
						control,
						name: `combatProficiencies.${weapon}.favorite` as CombatProficiencyName,
						defaultValue: false,
					})
					return (
						<div key={weapon} className='flex items-center space-x-2 space-y-3'>
							<Controller
								name={
									`combatProficiencies.${weapon}.favorite` as CombatProficiencyName
								}
								control={control}
								defaultValue={false}
								render={({ field }) => (
									<input
										type='checkbox'
										checked={field.value as boolean}
										onChange={e => field.onChange(e.target.checked)}
									/>
								)}
							/>
							<label
								className='text-black grow w-full cursor-pointer hover:underline'
								onClick={() => handleOpenRollModal(weapon, rating as number)}
								style={{ marginTop: '0px' }}
							>
								{weapon.charAt(0).toUpperCase() + weapon.slice(1)}
							</label>

							<Controller
								name={
									`combatProficiencies.${weapon}.rating` as CombatProficiencyName
								}
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
			/>
		</div>
	)
}

export default CombatProficiencies
