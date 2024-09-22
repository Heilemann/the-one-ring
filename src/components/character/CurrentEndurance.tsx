import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import LargeHeader from '../BaseComponents/LargeHeader'
import DiamondInput from '../DiamondInput'

const CurrentEndurance: React.FC = () => {
	const { register } = useFormContext<ICharacter>()
	return (
		<div className='space-y-2'>
			<LargeHeader centered>Endurance</LargeHeader>
			<div className='m-auto w-36'>
				<div className='relative inline-block'>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label='Endurance'
						placeholder='—'
						type='number'
						diamondType='flourish'
						{...register('currentEndurance.endurance', { valueAsNumber: true })}
					/>
					<DiamondInput
						centered={true}
						label='Load'
						placeholder='—'
						type='number'
						className='absolute top-4 -right-10'
						{...register('currentEndurance.load', { valueAsNumber: true })}
					/>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label='Fatigue'
						placeholder='—'
						type='number'
						className='absolute bottom-3 -right-10'
						{...register('currentEndurance.fatigue', { valueAsNumber: true })}
					/>
				</div>
			</div>
		</div>
	)
}

export default CurrentEndurance
