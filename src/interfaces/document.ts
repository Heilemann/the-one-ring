export type TDocumentType =
	| 'character'
	| 'note'
	| 'weapon'
	| 'item'
	| 'handout'
	| 'effect'
	| 'equipment'

export type TAccess = 'private' | 'public'

export type TDocument = {
	_id: string // UID
	type: TDocumentType // e.g. 'chararacter' or 'spell'
	creator: string // UID of the creating user
	access: TAccess // 'private' or 'public'
	accessList: string[] // list of userIds
	values: {
		// folders use values as 'children'
		[key: string]: any
	}
}

export type Documents = {
	byId: { [id: string]: TDocument }
	allIds: string[]
}

export type TAsset = {
	_id: string
	name: string
	fileurl: string
	filesize: number
	filetype: string
	width: number
	height: number
	creator: string
}

export type Assets = {
	byId: { [id: string]: TAsset }
	allIds: string[]
}
