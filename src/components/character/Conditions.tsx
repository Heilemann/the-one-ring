import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import LabelInput from '../BaseComponents/LabelInput'
import MediumHeader from '../BaseComponents/MediumHeader'

const Conditions: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div>
			<MediumHeader centered>Conditions</MediumHeader>
			<div className='mt-4 space-y-2'>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='weary'
						className='mr-2'
						{...register('conditions.weary')}
					/>
					<label htmlFor='weary'>Weary</label>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='miserable'
						className='mr-2'
						{...register('conditions.miserable')}
					/>
					<label htmlFor='miserable'>Miserable</label>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='wounded'
						className='mr-2'
						{...register('conditions.wounded')}
					/>
					<label htmlFor='wounded'>Wounded</label>
				</div>
				<LabelInput
					label='Injury'
					placeholder='Describe injury...'
					{...register('conditions.injury')}
					className='block mb-1'
				/>
			</div>
		</div>
	)
}

export default Conditions
