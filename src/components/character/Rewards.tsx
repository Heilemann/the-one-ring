import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import TextArea from '../BaseComponents/Form/Textarea'
import MediumHeader from '../BaseComponents/MediumHeader'
import DiamondInput from '../DiamondInput'

const Rewards: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<MediumHeader>Rewards</MediumHeader>
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
