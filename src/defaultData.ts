import { TDocument } from './interfaces/document'
import { TState } from './interfaces/state'

const hero: TDocument = {
	_id: 'hero1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'character',
	values: {
		name: 'Aragorn',
		portrait: '',
		token: '',
		// Add other hero-specific fields here
	},
}

const note: TDocument = {
	_id: 'note1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'note',
	values: {
		name: 'Adventure Notes',
		text: 'The fellowship begins their journey...',
	},
}

const weapon: TDocument = {
	_id: 'weapon1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'weapon',
	values: {
		name: 'Andúril',
		// Add weapon-specific fields here
	},
}

const item: TDocument = {
	_id: 'item1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'item',
	values: {
		name: 'Elven Cloak',
		image: '',
		// Add item-specific fields here
	},
}

const handout: TDocument = {
	_id: 'handout1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'handout',
	values: {
		name: 'Map of Middle-earth',
		image: '',
		// Add handout-specific fields here
	},
}

const effect: TDocument = {
	_id: 'effect1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'effect',
	values: {
		name: 'Exhaustion',
		// Add effect-specific fields here
	},
}

const equipment: TDocument = {
	_id: 'equipment1',
	creator: 'system',
	access: 'public',
	accessList: [],
	type: 'equipment',
	values: {
		name: 'Backpack',
		// Add equipment-specific fields here
	},
}

const defaultDocuments: TState['documents'] = {
	byId: {
		hero1: hero,
		note1: note,
		weapon1: weapon,
		item1: item,
		handout1: handout,
		effect1: effect,
		equipment1: equipment,
	},
	allIds: [
		'hero1',
		'note1',
		'weapon1',
		'item1',
		'handout1',
		'effect1',
		'equipment1',
	],
}

const defaultState: TState = {
	editMode: 'edit',
	documentId: 'hero1',
	document: hero,
	documents: defaultDocuments,
	assets: {
		byId: {},
		allIds: [],
	},
}

export default defaultState
