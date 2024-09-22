import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import TextArea from '../BaseComponents/Form/Textarea'
import MediumHeader from '../BaseComponents/MediumHeader'
import DiamondInput from '../DiamondInput'

const Rewards: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='relative'>
			<MediumHeader className='mt-2'>Rewards</MediumHeader>
			<DiamondInput
				label='Valour'
				placeholder='—'
				type='number'
				className='absolute -top-4 right-0'
				labelBelow
				{...register('rewards.valour', { valueAsNumber: true })}
			/>
			<TextArea
				className='mt-6'
				placeholder='List rewards...'
				{...register('rewards.rewards')}
			/>
		</div>
	)
}

export default Rewards
