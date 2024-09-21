import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import LabelInput from '../BaseComponents/LabelInput'

const Armour: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-row'>
				<LabelInput
					label='Armour'
					placeholder='—'
					{...register('armour.armour.name')}
				/>
				<LabelInput
					label='Protection'
					type='number'
					placeholder='—'
					{...register('armour.armour.protection', { valueAsNumber: true })}
				/>
				<LabelInput
					label='Load'
					type='number'
					placeholder='—'
					{...register('armour.armour.load', { valueAsNumber: true })}
				/>
			</div>
			<div className='flex flex-row'>
				<LabelInput
					label='Helm'
					placeholder='—'
					{...register('armour.helm.name')}
				/>
				<LabelInput
					label='&nbsp;'
					type='number'
					placeholder='—'
					{...register('armour.helm.protection', { valueAsNumber: true })}
				/>
				<LabelInput
					label='&nbsp;'
					type='number'
					placeholder='—'
					{...register('armour.helm.load', { valueAsNumber: true })}
				/>
			</div>
			<div className='flex flex-row'>
				<LabelInput
					label='Shield'
					placeholder='—'
					{...register('armour.shield.name')}
				/>
				<LabelInput
					label='Parry'
					type='number'
					placeholder='—'
					{...register('armour.shield.parry', { valueAsNumber: true })}
				/>
				<LabelInput
					label='Load'
					type='number'
					placeholder='—'
					{...register('armour.shield.load', { valueAsNumber: true })}
				/>
			</div>
		</div>
	)
}

export default Armour
