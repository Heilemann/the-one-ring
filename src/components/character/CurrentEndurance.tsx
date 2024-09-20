import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import DiamondInput from '../DiamondInput'

const CurrentEndurance: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div className='grid grid-cols-3 gap-2 mt-4'>
			<DiamondInput
				label='Endurance'
				className='col-span-2 row-span-2 left-6 top-5 relative'
				inputClassName='w-24 h-24'
				placeholder='—'
				type='number'
				labelSize='medium'
				{...register('currentEndurance.endurance', { valueAsNumber: true })}
			/>
			<DiamondInput
				label='Load'
				className='-left-6 relative'
				placeholder='—'
				type='number'
				{...register('currentEndurance.load', { valueAsNumber: true })}
			/>
			<DiamondInput
				label='Fatigue'
				className='-left-6 relative'
				labelBelow={true}
				placeholder='—'
				type='number'
				{...register('currentEndurance.fatigue', { valueAsNumber: true })}
			/>
		</div>
	)
}

export default CurrentEndurance