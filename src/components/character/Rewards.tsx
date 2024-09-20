import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import TextArea from '../BaseComponents/Form/Textarea'
import DiamondInput from '../DiamondInput'

const Rewards: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<StyledLabel>Rewards</StyledLabel>
			<div className='space-y-2'>
				<TextArea
					placeholder='List rewards...'
					{...register('rewards.rewards')}
				/>
				<DiamondInput
					label='Valour'
					placeholder='—'
					type='number'
					{...register('rewards.valour', { valueAsNumber: true })}
				/>
			</div>
		</div>
	)
}

export default Rewards
