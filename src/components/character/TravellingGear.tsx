import { isEqual, omit } from 'lodash'
import React, { useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter, TravellingGearItem } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import RemoveRowButton from '../BaseComponents/RemoveRowButton'
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
			<div className='grid grid-cols-6 gap-2 mr-10'>
				<StyledLabel className='col-span-5'>Travelling Gear</StyledLabel>
				<StyledLabel>Load</StyledLabel>
			</div>
			{fields.map((field, index) => (
				<div key={field.id} className='relative'>
					<div className='grid grid-cols-6 gap-2 pr-10'>
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
					<RemoveRowButton
						onClick={() => remove(index)}
						isVisible={index !== fields.length - 1}
					/>
				</div>
			))}
		</div>
	)
}

export default TravellingGear
