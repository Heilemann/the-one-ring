import { XMarkIcon } from '@heroicons/react/24/solid'
import { isEqual, omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import MediumHeader from '../BaseComponents/MediumHeader'
import Input from '../Input'

const WarGear: React.FC = () => {
	const { control, register } = useFormContext<ICharacter>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'warGear.weapons',
	})
	const emptyWeapon = { name: '', damage: 0, injury: 0, load: 0, notes: '' }
	const [dragIsOver, setDragIsOver] = useState(false)

	const weapons = useWatch({
		control,
		name: 'warGear.weapons',
		defaultValue: [],
	})

	// Automatically add a new row when the last row is filled
	useEffect(() => {
		if (weapons.length === 0) {
			append(emptyWeapon, { shouldFocus: false })
			return
		}

		const lastItem = weapons[weapons.length - 1]
		const lastRowIsDirty = !isEqual(omit(lastItem, 'id'), emptyWeapon)

		if (lastRowIsDirty) {
			append(emptyWeapon, { shouldFocus: false })
		}
	}, [weapons, append])

	const handleDrop = (e: React.DragEvent) => {
		const droppedWeaponData = e.dataTransfer.getData('weaponData')
		const droppedWeapon = JSON.parse(droppedWeaponData)
		if (!droppedWeapon)
			throw new Error('Could not retrieve dropped weapon data')

		append(droppedWeapon, { shouldFocus: false })
		setDragIsOver(false)
	}

	const handleDragEnter = (e: React.DragEvent) => {
		setDragIsOver(true)
		e.preventDefault()
	}

	const handleDragLeave = (e: React.DragEvent) => {
		setDragIsOver(false)
		e.preventDefault()
	}

	const columnClasses = 'grid grid-cols-12 gap-2'

	return (
		<div
			onDrop={handleDrop}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			className={twMerge('col-span-2', dragIsOver ? 'bg-white/10' : '')}
		>
			<MediumHeader>War Gear</MediumHeader>

			{/* Add labels for the columns */}
			<div className={twMerge('mt-4 mb-0 font-bold', columnClasses)}>
				<StyledLabel className='col-span-4'>Name</StyledLabel>
				<StyledLabel centered>Damage</StyledLabel>
				<StyledLabel centered>Injury</StyledLabel>
				<StyledLabel centered>Load</StyledLabel>
				<StyledLabel className='col-span-4'>Notes</StyledLabel>
			</div>

			{fields.map((field, index) => (
				<div key={field.id} className={columnClasses}>
					<Input
						placeholder='Name'
						className='col-span-4'
						{...register(`warGear.weapons.${index}.name`)}
					/>
					<Input
						type='number'
						centered
						placeholder='Damage'
						{...register(`warGear.weapons.${index}.damage`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						type='number'
						centered
						placeholder='Injury'
						{...register(`warGear.weapons.${index}.injury`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						type='number'
						centered
						placeholder='Load'
						{...register(`warGear.weapons.${index}.load`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						placeholder='Notes'
						className='col-span-4'
						{...register(`warGear.weapons.${index}.notes`)}
					/>
					{index !== weapons.length - 1 && (
						<button
							type='button'
							onClick={() => remove(index)}
							className='text-red-700'
						>
							<XMarkIcon className='w-4 h-4' />
						</button>
					)}
				</div>
			))}
		</div>
	)
}

export default WarGear
