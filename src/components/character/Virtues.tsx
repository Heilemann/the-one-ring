import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import TextArea from '../BaseComponents/Form/Textarea'
import MediumHeader from '../BaseComponents/MediumHeader'
import DiamondInput from '../DiamondInput'

const Virtues: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='relative'>
			<MediumHeader className='mt-2'>Virtues</MediumHeader>
			<DiamondInput
				label='Wisdom'
				placeholder='—'
				type='number'
				className='absolute -top-4 right-0'
				labelBelow
				{...register('virtues.wisdom', { valueAsNumber: true })}
			/>
			<TextArea
				className='mt-6'
				placeholder='List virtues...'
				{...register('virtues.virtues')}
			/>
		</div>
	)
}

export default Virtues
