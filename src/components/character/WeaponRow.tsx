import { XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ICharacter } from '../../interfaces/character'
import Input from '../Input'

interface WeaponRowProps {
	index: number
	register: UseFormRegister<ICharacter>
	remove: (index: number) => void
	isLast: boolean
}

const WeaponRow: React.FC<WeaponRowProps> = React.memo(
	({ index, register, remove, isLast }) => {
		const columnClasses = 'grid grid-cols-6 gap-x-2'

		return (
			<div className='flex items-start mb-4'>
				<div className={twMerge(columnClasses, 'flex-grow')}>
					<Input
						placeholder='Name...'
						className='col-span-3'
						{...register(`warGear.weapons.${index}.name`)}
					/>
					<Input
						type='number'
						centered
						placeholder='Damage...'
						{...register(`warGear.weapons.${index}.damage`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						type='number'
						centered
						placeholder='Injury...'
						{...register(`warGear.weapons.${index}.injury`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						type='number'
						centered
						placeholder='Load...'
						{...register(`warGear.weapons.${index}.load`, {
							valueAsNumber: true,
						})}
					/>
					<Input
						placeholder='Notes...'
						className='col-span-6'
						{...register(`warGear.weapons.${index}.notes`)}
					/>
				</div>
				{!isLast && (
					<button
						type='button'
						onClick={() => remove(index)}
						className='text-red-700 bg-red-500/10 h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full ml-2'
					>
						<XMarkIcon className='w-4 h-4' />
					</button>
				)}
				{isLast && <div className='h-8 w-8 flex-shrink-0 ml-2' />}
			</div>
		)
	},
)

WeaponRow.displayName = 'WeaponRow'

export default WeaponRow
