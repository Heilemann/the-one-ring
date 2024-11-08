export interface ICharacter {
	name: string
	basicInfo: {
		heroicCulture: string
		age: string
		standardOfLiving: string
		distinctiveFeatures: string
		culturalBlessing: string
		patron: string
		calling: string
		shadowPath: string
		flaws: string
		treasure: string
	}
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
	strength: Strength
	heart: Heart
	wits: Wits
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
	travellingGear: TravellingGearItem[]
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
	combatStance: 'forward' | 'open' | 'defensive' | 'rearward'
}

interface CombatProficiency {
	rating: number
	favoured: boolean
}

export interface Skill {
	rating: number
	favorite: boolean
}

interface Attribute {
	targetNumber: number
	rating: number
}

interface Strength extends Attribute {
	endurance: number
}

interface Heart extends Attribute {
	hope: number
}

interface Wits extends Attribute {
	parry: number
}

// Define and export TravellingGearItem type
export interface TravellingGearItem {
	item: string
	load: number
}
