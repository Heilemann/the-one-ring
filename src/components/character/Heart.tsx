import React from 'react'
import AttributeSection from './AttributeSection'
import { SkillListItem } from './SkillsSection'

const Heart: React.FC = () => {
	const heartSkills: SkillListItem[] = [
		{ name: 'Enhearten', path: 'heart.skills.enhearten' },
		{ name: 'Travel', path: 'heart.skills.travel' },
		{ name: 'Insight', path: 'heart.skills.insight' },
		{ name: 'Healing', path: 'heart.skills.healing' },
		{ name: 'Courtesy', path: 'heart.skills.courtesy' },
		{ name: 'Battle', path: 'heart.skills.battle' },
	]

	return (
		<AttributeSection
			title='Heart'
			skills={heartSkills}
			thirdInputLabel='Hope'
		/>
	)
}

export default Heart
