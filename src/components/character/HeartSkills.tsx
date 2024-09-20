import React from 'react'
import SkillItem, { SkillItemProps } from './SkillItem'

const HeartSkills: React.FC = () => {
	const heartSkills: SkillItemProps[] = [
		{ name: 'Enhearten', path: 'heart.skills.enhearten' },
		{ name: 'Travel', path: 'heart.skills.travel' },
		{ name: 'Insight', path: 'heart.skills.insight' },
		{ name: 'Healing', path: 'heart.skills.healing' },
		{ name: 'Courtesy', path: 'heart.skills.courtesy' },
		{ name: 'Battle', path: 'heart.skills.battle' },
	]

	return (
		<>
			<h4>Heart Skills</h4>
			<div>
				{heartSkills.map(skill => (
					<SkillItem key={skill.name} name={skill.name} path={skill.path} />
				))}
			</div>
		</>
	)
}

export default HeartSkills
