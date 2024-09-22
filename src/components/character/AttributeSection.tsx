import React from 'react'
import { Path, useFormContext, useWatch } from 'react-hook-form'
import { ICharacter } from '../../interfaces/character'
import Divider from '../BaseComponents/Divider'
import LargeHeader from '../BaseComponents/LargeHeader'
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

	return (
		<div className='space-y-2'>
			<LargeHeader centered>{title}</LargeHeader>
			<div className='m-auto w-36'>
				<div className='relative inline-block'>
					<DiamondInput
						labelBelow={true}
						centered={true}
						label='TN'
						placeholder='—'
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
						className='absolute top-4 -right-10'
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
						className='absolute bottom-3 -right-10'
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
				attributeTargetNumber={targetNumber}
			/>
		</div>
	)
}

export default AttributeSection
