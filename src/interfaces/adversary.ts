export interface IAdversary {
	name: string
	description: string
	attributeLevel: number
	endurance: number
	might: number
	hateOrResolve: number
	parry: number
	armour: number
	combatProficiencies: {
		axes: CombatProficiency
		bows: CombatProficiency
		spears: CombatProficiency
		swords: CombatProficiency
	}
	specialDamageOptions: string[]
	fellAbilities: FellAbility[]
	traits: string
	strength: number
}

interface CombatProficiency {
	rating: number
}

export type SpecialDamageOption =
	| 'Heavy Blow'
	| 'Break Shield'
	| 'Pierce'
	| 'Seize'

interface FellAbility {
	name: string
	description: string
}

// Example usage:
export const exampleAdversary: IAdversary = {
	name: 'Orc Warrior',
	description: 'A fierce servant of the Dark Lord',
	attributeLevel: 5,
	endurance: 20,
	might: 2,
	hateOrResolve: 3,
	parry: 3,
	armour: 4,
	combatProficiencies: {
		primary: {
			name: 'Scimitar',
			rating: 2,
			damage: 5,
			injury: 12,
			specialDamage: ['Pierce', 'Heavy Blow'],
			effect: '',
		},
		secondary: {
			name: 'Bow',
			rating: 1,
			damage: 4,
			injury: 10,
			specialDamage: ['Pierce'],
			effect: '',
		},
	},
	specialDamageOptions: ['Heavy Blow', 'Pierce'],
	fellAbilities: [
		{
			name: 'Hideous Strength',
			description: 'The Orc can perform feats of incredible strength',
		},
	],
	traits: 'Cunning',
}
