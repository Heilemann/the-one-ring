import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import TextArea from '../BaseComponents/Form/Textarea'
import MediumHeader from '../BaseComponents/MediumHeader'
import DiamondInput from '../DiamondInput'

const Virtues: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<MediumHeader>Virtues</MediumHeader>
			<div className='space-y-2'>
				<TextArea
					placeholder='List virtues...'
					{...register('virtues.virtues')}
				/>
				<DiamondInput
					label='Wisdom'
					placeholder='—'
					type='number'
					{...register('virtues.wisdom', { valueAsNumber: true })}
				/>
			</div>
		</div>
	)
}

export default Virtues
