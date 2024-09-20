import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import TextArea from '../BaseComponents/Form/Textarea'
import DiamondInput from '../DiamondInput'

const Virtues: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<StyledLabel>Virtues</StyledLabel>
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
