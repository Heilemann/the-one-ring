import React from 'react'
import { Path, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import Divider from '../BaseComponents/Divider'
import MediumHeader from '../BaseComponents/MediumHeader'
import DiamondInput from '../DiamondInput'
import SkillsSection, { SkillListItem } from './SkillsSection'

interface AttributeSectionProps {
	title: 'Strength' | 'Heart' | 'Wits'
	skills: SkillListItem[]
	thirdInputLabel: string
}

const AttributeSection: React.FC<AttributeSectionProps> = ({
	title,
	skills,
	thirdInputLabel,
}) => {
	const { register, control } = useFormContext<ICharacter>()
	const lowerCaseTitle = title.toLowerCase() as 'strength' | 'heart' | 'wits'

	const targetNumber = useWatch({
		control,
		name: `${lowerCaseTitle}.targetNumber` as Path<ICharacter>,
		defaultValue: 0,
	})

	const ratingValue = useWatch({
		control,
		name: `${lowerCaseTitle}.rating` as Path<ICharacter>,
		defaultValue: 0,
	})

	const rating = Number(ratingValue) || 0

	const thirdInputValue = useWatch({
		control,
		name: `${lowerCaseTitle}.${thirdInputLabel.toLowerCase()}` as Path<ICharacter>,
		defaultValue: 0,
	})

	return (
		<div>
			<MediumHeader centered>{title}</MediumHeader>
			<div className='m-auto w-36'>
				<div className='relative inline-block'>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label='TN'
						placeholder={(20 - rating).toString()}
						type='number'
						diamondType='flourish'
						{...register(`${lowerCaseTitle}.targetNumber` as Path<ICharacter>, {
							valueAsNumber: true,
						})}
					/>
					<DiamondInput
						centered={true}
						label='Rating'
						placeholder='—'
						type='number'
						className='absolute top-3 -right-9'
						labelClass='translate-x-5 translate-y-0.5'
						{...register(`${lowerCaseTitle}.rating` as Path<ICharacter>, {
							valueAsNumber: true,
						})}
					/>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label={thirdInputLabel}
						placeholder='—'
						type='number'
						className='absolute bottom-3 -right-9'
						labelClass='translate-x-5 translate-y-0'
						{...register(
							`${lowerCaseTitle}.${thirdInputLabel.toLowerCase()}` as Path<ICharacter>,
							{
								valueAsNumber: true,
							},
						)}
					/>
				</div>
			</div>

			<Divider />

			<SkillsSection
				title={title}
				skills={skills}
				attributeTargetNumber={Number(targetNumber) || 0}
			/>
		</div>
	)
}

export default AttributeSection
