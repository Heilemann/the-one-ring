import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import RemoveRowButton from '../BaseComponents/RemoveRowButton'
import Input from '../Input'

interface WeaponRowProps {
	index: number
	register: UseFormRegister<ICharacter>
	remove: (index: number) => void
	isLast: boolean
}

const WeaponRow: React.FC<WeaponRowProps> = React.memo(
	({ index, register, remove, isLast }) => {
		return (
			<div className='relative'>
				<div className='grid grid-cols-9 gap-2 pr-10'>
					<Input
						placeholder='Name...'
						className='col-span-2'
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
						className='col-span-4'
						{...register(`warGear.weapons.${index}.notes`)}
					/>
				</div>
				<RemoveRowButton onClick={() => remove(index)} isVisible={!isLast} />
			</div>
		)
	},
)

WeaponRow.displayName = 'WeaponRow'

export default WeaponRow
