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
		primary: CombatProficiency
		secondary: CombatProficiency
	}
	fellAbilities: FellAbility[]
	traits: string
}

interface CombatProficiency {
	name: string
	rating: number
	damage: number
	injury: number
	specialDamage: SpecialDamageOption[]
	effect: string
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
