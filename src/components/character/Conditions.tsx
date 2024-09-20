import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import Input from '../Input'

const Conditions: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<StyledLabel>Conditions</StyledLabel>
			<div className='space-y-2'>
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
				<div>
					<label htmlFor='injury' className='block mb-1'>
						Injury
					</label>
					<Input
						id='injury'
						placeholder='Describe injury...'
						{...register('conditions.injury')}
					/>
				</div>
			</div>
		</div>
	)
}

export default Conditions
