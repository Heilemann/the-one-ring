import React from 'react'
import { Path, useFormContext, useWatch } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ICharacter } from '../../interfaces/character'
import useMessageToApp from '../BaseComponents/hooks/UseMessageToApp'
import Input from '../Input'

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
	const { register, control } = useFormContext<ICharacter>()
	const messageToApp = useMessageToApp()

	const rating = useWatch({
		control,
		name: `${path}.rating` as Path<ICharacter>,
		defaultValue: 0,
	})

	const handleRoll = (e: React.MouseEvent<HTMLLabelElement>) => {
		e.preventDefault()
		const ratingNumber = typeof rating === 'number' ? rating : 0
		const diceExpression = ratingNumber > 0 ? `1d12+${ratingNumber}d6` : '1d12'
		messageToApp({
			message: 'send message',
			data: {
				payload: `/roll ${diceExpression} > ${attributeTargetNumber}`,
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
			<Input
				className='w-10 text-center'
				placeholder='—'
				type='number'
				{...register(`${path}.rating` as Path<ICharacter>, {
					valueAsNumber: true,
				})}
			/>
		</div>
	)
}

export default SkillItem
