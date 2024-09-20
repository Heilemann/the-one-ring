export interface ICharacter {
	name: string
	heroicCulture: string
	age: string
	standardOfLiving: string
	distinctiveFeatures: string
	culturalBlessing: string
	patron: string
	calling: string
	shadowPath: string
	flaws: string
	treasure: number // Added this line
	adventurePoints: number
	skillPoints: number
	fellowshipScore: number
	currentEndurance: {
		endurance: number
		load: number
		fatigue: number
	}
	currentHope: {
		hope: number
		shadow: number
		shadowScars: number
	}
	strength: {
		targetNumber: number
		rating: number
		endurance: number
		skills: {
			awe: Skill
			athletics: Skill
			awareness: Skill
			hunting: Skill
			song: Skill
			craft: Skill
		}
	}
	heart: {
		targetNumber: number
		rating: number
		hope: number
		skills: {
			enhearten: Skill
			travel: Skill
			insight: Skill
			healing: Skill
			courtesy: Skill
			battle: Skill
		}
	}
	wits: {
		targetNumber: number
		rating: number
		parry: number
		skills: {
			persuade: Skill
			stealth: Skill
			scan: Skill
			explore: Skill
			riddle: Skill
			lore: Skill
		}
	}
	combatProficiencies: {
		[key: string]: {
			name: string
			rating: string
		}
	}
	rewards: {
		rewards: string
		valour: string
	}
	virtues: {
		virtues: string
		wisdom: string
	}
	conditions: {
		weary: boolean
		miserable: boolean
		wounded: boolean
		injury: string
	}
	travellingGear: string
	warGear: {
		weapons: {
			name: string
			damage: number
			injury: number
			load: number
			notes: string
		}[]
	}
	armour: {
		armour: {
			name: string
			protection: number
			load: number
		}
		helm: {
			name: string
			protection: number
			load: number
		}
		shield: {
			name: string
			parry: number
			load: number
		}
	}
}

export interface Skill {
	rating: number
	favorite: boolean
}
