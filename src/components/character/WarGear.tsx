import React, { useCallback } from 'react'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'
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

	return (
		<div onDrop={handleDrop}>
			<div className='grid grid-cols-9 gap-2 mr-10'>
				<StyledLabel className='col-span-2'>War Gear</StyledLabel>
				<StyledLabel centered>Damage</StyledLabel>
				<StyledLabel centered>Injury</StyledLabel>
				<StyledLabel centered>Load</StyledLabel>
				<StyledLabel className='col-span-4'>Notes</StyledLabel>
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
