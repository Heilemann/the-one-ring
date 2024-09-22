import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import MediumHeader from '../BaseComponents/MediumHeader'
import Input from '../Input'

const TravellingGear: React.FC = () => {
	const { control, register } = useFormContext<ICharacter>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'travellingGear.items',
	})

	return (
		<div className='col-span-1'>
			<MediumHeader>Travelling Gear</MediumHeader>
			{fields.map((field, index) => (
				<div key={field.id} className='mb-4'>
					<div className='grid grid-cols-6 gap-2'>
						<Input
							className='col-span-5'
							placeholder='Item'
							{...register(`travellingGear.items.${index}.item`)}
						/>
						<Input
							type='number'
							placeholder='Load'
							{...register(`travellingGear.items.${index}.load`, {
								valueAsNumber: true,
							})}
						/>
					</div>
					<button
						type='button'
						onClick={() => remove(index)}
						className='text-red-500 mt-2'
					>
						Remove
					</button>
				</div>
			))}
			<button
				type='button'
				onClick={() => append({ item: '', load: 0 })}
				className='text-blue-500'
			>
				Add Item
			</button>
		</div>
	)
}

export default TravellingGear
