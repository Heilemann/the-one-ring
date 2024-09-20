import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import Input from '../Input'

const CombatProficiencies: React.FC = () => {
	const { register } = useFormContext<ICharacter>()

	return (
		<div className='mt-4'>
			<StyledLabel>Combat Proficiencies</StyledLabel>
			<div className='space-y-2'>
				{[0, 1, 2, 3].map(index => (
					<div key={index} className='flex items-center space-x-2'>
						<Input
							placeholder='Name'
							{...register(`combatProficiencies.${index}.name`)}
						/>
						<Input
							placeholder='Rating'
							type='number'
							{...register(`combatProficiencies.${index}.rating`, {
								valueAsNumber: true,
							})}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default CombatProficiencies
