import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import DiamondInput from '../DiamondInput'

const Points: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div className='space-y-2'>
			{/* <LargeHeader centered>Points</LargeHeader> */}
			<div className='m-auto w-36'>
				<div className='relative inline-block left-1/2 -translate-x-1/2'>
					<DiamondInput
						label='Adventure Points'
						placeholder='0'
						type='number'
						className='mt-6'
						inputClassName='w-16 h-16'
						{...register('adventurePoints', { valueAsNumber: true })}
					/>
					<DiamondInput
						label='Skill Points'
						labelBelow
						placeholder='0'
						type='number'
						className='absolute -bottom-9 -left-9'
						inputClassName='w-16 h-16'
						{...register('skillPoints', { valueAsNumber: true })}
					/>
					<DiamondInput
						label='Fellowship Score'
						labelBelow
						placeholder='0'
						type='number'
						className='absolute -bottom-9 -right-9'
						inputClassName='w-16 h-16'
						{...register('fellowshipScore', { valueAsNumber: true })}
					/>
				</div>
			</div>
		</div>
	)
}

export default Points
