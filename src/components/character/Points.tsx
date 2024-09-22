import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import DiamondInput from '../DiamondInput'

const Points: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div className='grid grid-rows-3 gap-6'>
			<DiamondInput
				label='Adventure'
				labelSize='small'
				placeholder='—'
				type='number'
				{...register('adventurePoints', { valueAsNumber: true })}
			/>
			<DiamondInput
				label='Skill'
				labelSize='small'
				placeholder='—'
				type='number'
				{...register('skillPoints', { valueAsNumber: true })}
			/>
			<DiamondInput
				label='Fellowship'
				labelSize='small'
				placeholder='—'
				type='number'
				{...register('fellowshipScore', { valueAsNumber: true })}
			/>
		</div>
	)
}

export default Points
