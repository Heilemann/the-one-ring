import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import LargeHeader from '../BaseComponents/LargeHeader'
import DiamondInput from '../DiamondInput'

const Points: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div className='space-y-2'>
			<LargeHeader centered>Points</LargeHeader>
			<div className='m-auto w-36'>
				<div className='relative inline-block left-1/2 -translate-x-1/2'>
					<DiamondInput
						label='Adventure'
						placeholder='0'
						type='number'
						className='mt-6'
						{...register('adventurePoints', { valueAsNumber: true })}
					/>
					<DiamondInput
						label='Skill'
						labelBelow
						placeholder='0'
						type='number'
						className='absolute -bottom-8 -left-8'
						{...register('skillPoints', { valueAsNumber: true })}
					/>
					<DiamondInput
						labelBelow
						label='Fellowship'
						placeholder='0'
						type='number'
						className='absolute -bottom-8 -right-8'
						{...register('fellowshipScore', { valueAsNumber: true })}
					/>
				</div>
			</div>
		</div>
	)
}

export default Points
