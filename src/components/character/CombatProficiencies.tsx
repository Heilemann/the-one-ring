import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'
import Input from '../Input'

const weaponList = ['Axes', 'Bows', 'Spears', 'Swords']

const CombatProficiencies: React.FC = () => {
	const { register, control } = useFormContext<ICharacter>()
	const messageToApp = useMessageToApp()

	// Watch the character's strength attribute target number
	const strengthTargetNumber = useWatch({
		control,
		name: 'strength.targetNumber',
		defaultValue: 0,
	})

	// Retrieve the weary condition
	const isWeary = useWatch({
		control,
		name: 'conditions.weary',
		defaultValue: false,
	})

	// **Retrieve the miserable condition**
	const isMiserable = useWatch({
		control,
		name: 'conditions.miserable',
		defaultValue: false,
	})

	return (
		<div className='mt-4'>
			<StyledLabel>Combat Proficiencies</StyledLabel>
			<div>
				{weaponList.map(weapon => {
					// Watch the rating for this weapon
					const rating = useWatch({
						control,
						name: `combatProficiencies.${weapon.toLowerCase()}.rating` as const,
						defaultValue: 0,
					})

					// Handle the roll when the weapon name is clicked
					const handleRoll = () => {
						const ratingNumber = rating ? Number(rating) : 0
						const diceExpression =
							ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'
						const targetNumber = strengthTargetNumber || 0

						// Include the weary and miserable status as markers in the label
						let label = `${weapon}`
						if (isWeary) label += ' --weary'
						if (isMiserable) label += ' --miserable'

						messageToApp({
							message: 'send message',
							data: {
								payload: `/roll ${diceExpression} > ${targetNumber} ${label}`,
							},
						})
					}

					return (
						<div key={weapon} className='flex items-center space-x-2'>
							{/* Weapon Name */}
							<label
								className={twMerge(
									'text-black grow w-full cursor-pointer underline',
									'hover:text-blue-500 transition-colors',
								)}
								onClick={handleRoll}
							>
								{weapon}
							</label>

							{/* Rating Input */}
							<Input
								placeholder='Rating'
								type='number'
								{...register(
									`combatProficiencies.${weapon.toLowerCase()}.rating`,
									{
										valueAsNumber: true,
									},
								)}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default CombatProficiencies
