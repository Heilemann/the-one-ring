import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import LabelInput from '../BaseComponents/LabelInput'

const Armour: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='flex flex-col'>
			<div className='flex flex-row space-x-2'>
				<LabelInput
					label='Armour'
					labelClassName='mt-0'
					placeholder='—'
					className='flex-grow'
					{...register('armour.armour.name')}
				/>
				<LabelInput
					label='Protection'
					labelClassName='mt-0'
					type='number'
					placeholder='—'
					className='w-20'
					centered
					{...register('armour.armour.protection', { valueAsNumber: true })}
				/>
				<LabelInput
					label='Load'
					labelClassName='mt-0'
					type='number'
					placeholder='—'
					className='w-20'
					centered
					{...register('armour.armour.load', { valueAsNumber: true })}
				/>
			</div>
			<div className='flex flex-row space-x-2'>
				<LabelInput
					label='Helm'
					placeholder='—'
					className='flex-grow'
					{...register('armour.helm.name')}
				/>
				<LabelInput
					label='Protection'
					type='number'
					placeholder='—'
					className='w-20'
					centered
					{...register('armour.helm.protection', { valueAsNumber: true })}
				/>
				<LabelInput
					label='Load'
					type='number'
					placeholder='—'
					className='w-20'
					centered
					{...register('armour.helm.load', { valueAsNumber: true })}
				/>
			</div>
			<div className='flex flex-row space-x-2'>
				<LabelInput
					label='Shield'
					placeholder='—'
					className='flex-grow'
					{...register('armour.shield.name')}
				/>
				<LabelInput
					label='Parry'
					type='number'
					placeholder='—'
					className='w-20'
					centered
					{...register('armour.shield.parry', { valueAsNumber: true })}
				/>
				<LabelInput
					label='Load'
					type='number'
					placeholder='—'
					className='w-20'
					centered
					{...register('armour.shield.load', { valueAsNumber: true })}
				/>
			</div>
		</div>
	)
}

export default Armour
