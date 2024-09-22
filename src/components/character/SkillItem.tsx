import React from 'react'
import { Path, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ICharacter } from '../../interfaces/character'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'
import CheckboxRating from '../CheckboxRating'

export interface SkillItemProps {
	name: string
	path: Path<ICharacter>
	attributeTargetNumber: number
}

const SkillItem: React.FC<SkillItemProps> = ({
	name,
	path,
	attributeTargetNumber,
}) => {
	const { register, control, setValue } = useFormContext<ICharacter>()
	const messageToApp = useMessageToApp()

	const rating = useWatch({
		control,
		name: `${path}.rating` as Path<ICharacter>,
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

	const handleRoll = (e: React.MouseEvent<HTMLLabelElement>) => {
		e.preventDefault()
		const ratingNumber = rating ? Number(rating) : 0
		const diceExpression = ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'

		let label = `${name}`
		if (isWeary) label += ' --weary'
		if (isMiserable) label += ' --miserable'

		messageToApp({
			message: 'send message',
			data: {
				payload: `/roll ${diceExpression} > ${attributeTargetNumber} ${label}`,
			},
		})
	}

	return (
		<div className='flex items-center gap-2'>
			<input
				type='checkbox'
				{...register(`${path}.favorite` as Path<ICharacter>)}
			/>
			<label
				className={twMerge(
					'text-black grow w-full cursor-pointer underline',
					'hover:text-blue-500 transition-colors',
				)}
				onClick={handleRoll}
			>
				{name}
			</label>
			<CheckboxRating
				value={Number(rating)}
				onChange={newValue => {
					setValue(`${path}.rating` as Path<ICharacter>, newValue)
				}}
			/>
		</div>
	)
}

export default SkillItem
