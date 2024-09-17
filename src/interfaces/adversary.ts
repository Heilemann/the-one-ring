export interface IAdversary {
	name: string
	description: string
	attributeLevel: number
	endurance: number
	might: number
	hateOrResolve: {
		type: 'Hate' | 'Resolve'
		value: number
	}
	parry: number
	armour: number
	combatProficiencies: {
		primary: CombatProficiency
		secondary: CombatProficiency
	}
	specialDamageOptions: string[] // Adjusted to a string array
	fellAbilities: FellAbility[]
}

interface CombatProficiency {
	name: string
	rating: number
	damage: number
	injury: number
	specialDamage: SpecialDamageOption[]
}

export type SpecialDamageOption =
	| 'Heavy Blow'
	| 'Break Shield'
	| 'Pierce'
	| 'Seize'

interface FellAbility {
	name: string
	description: string
	cost: number
}

// Example usage:
export const exampleAdversary: Adversary = {
	name: 'Orc Warrior',
	description: 'A fierce servant of the Dark Lord',
	attributeLevel: 5,
	endurance: 20,
	might: 2,
	hateOrResolve: {
		type: 'Hate',
		value: 3,
	},
	parry: 3,
	armour: 4,
	combatProficiencies: {
		primary: {
			name: 'Scimitar',
			rating: 2,
			damage: 5,
			injury: 12,
			specialDamage: ['Pierce', 'Heavy Blow'],
		},
		secondary: {
			name: 'Bow',
			rating: 1,
			damage: 4,
			injury: 10,
			specialDamage: ['Pierce'],
		},
	},
	specialDamageOptions: ['Heavy Blow', 'Pierce'],
	fellAbilities: [
		{
			name: 'Hideous Strength',
			description: 'The Orc can perform feats of incredible strength',
			cost: 1,
		},
	],
}
