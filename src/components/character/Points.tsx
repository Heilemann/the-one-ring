import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import DiamondInput from '../DiamondInput'

const Points: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div className='grid grid-cols-3 gap-2'>
			<DiamondInput
				label='Adventure'
				placeholder='—'
				type='number'
				labelSize='medium'
				{...register('adventurePoints', { valueAsNumber: true })}
			/>
			<DiamondInput
				label='Skill'
				placeholder='—'
				type='number'
				labelSize='medium'
				{...register('skillPoints', { valueAsNumber: true })}
			/>
			<DiamondInput
				label='Fellowship'
				placeholder='—'
				type='number'
				labelSize='medium'
				{...register('fellowshipScore', { valueAsNumber: true })}
			/>
		</div>
	)
}

export default Points
