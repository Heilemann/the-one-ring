import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import { getEffectiveTargetNumber } from '../../utils/getEffectiveTargetNumber' // Import the utility function
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'
import MediumHeader from '../BaseComponents/MediumHeader'
import CheckboxRating from '../CheckboxRating'

const weaponList = ['axes', 'bows', 'spears', 'swords'] as const

const CombatProficiencies: React.FC = () => {
	const { control } = useFormContext<ICharacter>()
	const messageToApp = useMessageToApp()

	// Watch 'strength' attribute values
	const strengthAttribute = useWatch({
		control,
		name: 'strength',
		defaultValue: {},
	})

	const strengthTargetNumber = useWatch({
		control,
		name: 'strength.targetNumber',
		defaultValue: 0,
	})

	const isWeary = useWatch({
		control,
		name: 'conditions.weary',
		defaultValue: false,
	})

	const isMiserable = useWatch({
		control,
		name: 'conditions.miserable',
		defaultValue: false,
	})

	return (
		<div>
			<MediumHeader>Combat Proficiencies</MediumHeader>
			<div>
				{weaponList.map(weapon => {
					const rating = useWatch({
						control,
						name: `combatProficiencies.${weapon}.rating`,
						defaultValue: 0,
					})

					// Handle the roll when the weapon name is clicked
					const handleRoll = () => {
						const ratingNumber = rating ? Number(rating) : 0
						const diceExpression =
							ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'

						// Get the effective target number for 'strength'
						const effectiveTargetNumber =
							getEffectiveTargetNumber(strengthAttribute)

						// Include the weary and miserable status as markers in the label
						let label = `${weapon}`
						if (isWeary) label += ' --weary'
						if (isMiserable) label += ' --miserable'

						messageToApp({
							message: 'send message',
							data: {
								payload: `/roll ${diceExpression} > ${effectiveTargetNumber} ${label}`,
							},
						})
					}

					return (
						<div key={weapon} className='flex items-center space-x-2 space-y-3'>
							<label
								className='text-black grow w-full cursor-pointer hover:underline'
								onClick={handleRoll}
							>
								{weapon.charAt(0).toUpperCase() + weapon.slice(1)}
							</label>

							{/* Rating Input */}
							<Controller
								name={`combatProficiencies.${weapon}.rating`}
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<CheckboxRating
										value={Number(field.value)}
										onChange={newValue => field.onChange(newValue)}
									/>
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
