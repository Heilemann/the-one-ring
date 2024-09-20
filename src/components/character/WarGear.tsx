import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import Input from '../Input'

const WarGear: React.FC = () => {
	const { control, register } = useFormContext<ICharacter>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'warGear.weapons',
	})

	return (
		<div className='mt-4'>
			<StyledLabel>War Gear</StyledLabel>
			{fields.map((field, index) => (
				<div key={field.id} className='grid grid-cols-5 gap-2 mb-2'>
					<Input
						placeholder='Name'
						{...register(`warGear.weapons.${index}.name`)}
					/>
					<Input
						type='number'
						placeholder='Damage'
						{...register(`warGear.weapons.${index}.damage`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						type='number'
						placeholder='Injury'
						{...register(`warGear.weapons.${index}.injury`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						type='number'
						placeholder='Load'
						{...register(`warGear.weapons.${index}.load`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						placeholder='Notes'
						{...register(`warGear.weapons.${index}.notes`)}
					/>
					<button
						type='button'
						onClick={() => remove(index)}
						className='text-red-500'
					>
						Remove
					</button>
				</div>
			))}
			<button
				type='button'
				onClick={() =>
					append({ name: '', damage: 0, injury: 0, load: 0, notes: '' })
				}
				className='text-blue-500'
			>
				Add Weapon
			</button>
		</div>
	)
}

export default WarGear
