import { isEqual, omit } from 'lodash'
import React, { useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter, TravellingGearItem } from '../../interfaces/character'
import MediumHeader from '../BaseComponents/MediumHeader'
import Input from '../Input'

const TravellingGear: React.FC = () => {
	const { control, register } = useFormContext<ICharacter>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'travellingGear',
	})

	// Define an empty item for initialization
	const emptyItem: TravellingGearItem = { item: '', load: 0 }

	// Watch the items array
	const items = useWatch({
		control,
		name: 'travellingGear',
		defaultValue: [],
	}) as TravellingGearItem[]

	// Automatically add a new row when the last row is filled
	useEffect(() => {
		if (items.length === 0) {
			append(emptyItem, { shouldFocus: false })
			return
		}

		const lastItem = items[items.length - 1]
		const lastRowIsDirty = !isEqual(omit(lastItem, 'id'), emptyItem)

		if (lastRowIsDirty) {
			append(emptyItem, { shouldFocus: false })
		}
	}, [items, append])

	return (
		<div className='col-span-1'>
			<MediumHeader>Travelling Gear</MediumHeader>
			{fields.map((field, index) => (
				<div key={field.id} className='mb-4'>
					<div className='grid grid-cols-6 gap-2'>
						<Input
							className='col-span-5'
							placeholder='Item'
							{...register(`travellingGear.${index}.item`)}
						/>
						<Input
							type='number'
							placeholder='Load'
							{...register(`travellingGear.${index}.load`, {
								valueAsNumber: true,
							})}
						/>
					</div>
					{/* Only show the 'Remove' button for filled items */}
					{index !== fields.length - 1 && (
						<button
							type='button'
							onClick={() => remove(index)}
							className='text-red-500 mt-2'
						>
							Remove
						</button>
					)}
				</div>
			))}
		</div>
	)
}

export default TravellingGear
