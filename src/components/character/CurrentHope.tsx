import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import MediumHeader from '../BaseComponents/MediumHeader'
import DiamondInput from '../DiamondInput'

const CurrentHope: React.FC = () => {
	const { register, getValues } = useFormContext<ICharacter>()
	const hopePlaceholder = getValues('heart.hope') || '—'

	return (
		<div className='space-y-2'>
			<MediumHeader centered>Hope</MediumHeader>
			<div className='m-auto w-36'>
				<div className='relative inline-block'>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label='Current'
						placeholder={hopePlaceholder.toString()}
						type='number'
						diamondType='flourish'
						{...register('currentHope.hope', { valueAsNumber: true })}
					/>
					<DiamondInput
						centered={true}
						label='Shadow'
						placeholder='—'
						type='number'
						className='absolute top-4 -right-10'
						{...register('currentHope.shadow', { valueAsNumber: true })}
					/>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label='Shadow Scars'
						placeholder='—'
						type='number'
						className='absolute bottom-3 -right-10'
						{...register('currentHope.shadowScars', { valueAsNumber: true })}
					/>
				</div>
			</div>
		</div>
	)
}

export default CurrentHope
