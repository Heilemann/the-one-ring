import React, { useCallback } from 'react'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { useWeaponArray } from '../../hooks/useWeaponArray'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import WeaponRow from './WeaponRow'

const WarGear: React.FC = () => {
	const { control, register } = useFormContext<ICharacter>()
	const { fields, appendEmptyWeapon, remove, weapons } = useWeaponArray(control)

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			const droppedWeaponData = e.dataTransfer.getData('weaponData')
			const droppedWeapon = JSON.parse(droppedWeaponData)
			if (!droppedWeapon)
				throw new Error('Could not retrieve dropped weapon data')

			appendEmptyWeapon(droppedWeapon)
		},
		[appendEmptyWeapon],
	)

	const columnClasses = 'grid grid-cols-6 gap-x-2'

	return (
		<div onDrop={handleDrop} className='col-span-2'>
			<div className={twMerge('mb-0 mr-10 font-bold', columnClasses)}>
				<StyledLabel className='col-span-3'>War Gear</StyledLabel>
				<StyledLabel centered>Damage</StyledLabel>
				<StyledLabel centered>Injury</StyledLabel>
				<StyledLabel centered>Load</StyledLabel>
			</div>

			{fields.map(
				(
					field: FieldArrayWithId<ICharacter, 'warGear.weapons', 'id'>,
					index: number,
				) => (
					<WeaponRow
						key={field.id}
						index={index}
						register={register}
						remove={remove}
						isLast={index === weapons.length - 1}
					/>
				),
			)}
		</div>
	)
}

export default WarGear
