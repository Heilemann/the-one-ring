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
	strength: Attribute
	heart: Attribute
	wits: Attribute
	combatProficiencies: {
		axes: CombatProficiency
		bows: CombatProficiency
		spears: CombatProficiency
		swords: CombatProficiency
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

interface CombatProficiency {
	rating: number
}

export interface Skill {
	rating: number
	favorite: boolean
}

interface Attribute {
	targetNumber: number
	rating: number
	// Add any other relevant fields
}
