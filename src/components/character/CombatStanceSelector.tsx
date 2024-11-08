import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import StyledLabel from '../BaseComponents/Form/StyledLabel'

const stances = [
	{ value: 'forward', label: 'Forward Stance' },
	{ value: 'open', label: 'Open Stance' },
	{ value: 'defensive', label: 'Defensive Stance' },
	{ value: 'rearward', label: 'Rearward Stance' },
]

const CombatStanceSelector: React.FC = () => {
	const { register, watch } = useFormContext<ICharacter>()
	const currentStance = watch('combatStance')

	return (
		<div className='mb-4 pt-2'>
			<StyledLabel>Combat Stance</StyledLabel>
			<select
				{...register('combatStance')}
				className='w-full p-2 border rounded'
			>
				{stances.map(stance => (
					<option key={stance.value} value={stance.value}>
						{stance.label}
					</option>
				))}
			</select>
			{currentStance && (
				<p className='mt-2 text-xs'>{getStanceDescription(currentStance)}</p>
			)}
		</div>
	)
}

function getStanceDescription(stance: string): string {
	switch (stance) {
		case 'forward':
			return 'Add 1 success die (d6) to attack rolls. Enemies add 1 success die to close combat attacks against you.'
		case 'open':
			return 'No additional or fewer success dice.'
		case 'defensive':
			return 'Remove 1 success die (d6) from close combat attacks against you. Remove 1 success die from your attack rolls for each opponent engaging you.'
		case 'rearward':
			return 'You can attack adversaries using only ranged weapons, and only be targeted by attackers using similar weapons.'
		default:
			return ''
	}
}

export default CombatStanceSelector
