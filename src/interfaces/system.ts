import { TDocumentType } from './document'

export type TGrid = {
	type: 'hex' | 'square'
	size: number
	unitSize: number
	unit: string
}

export type stringBoolean = 'true' | 'false'
export type windowSize = 'small' | 'medium' | 'large'

export type TCollection = {
	type: TDocumentType
	singularName: string
	pluralName: string
	description: string
	hasEditMode: stringBoolean
	windowSize: windowSize
	thumbnailField: string[]
	allowCreate: stringBoolean
	canAssumeAsCharacter: stringBoolean
}

export type TSystemConfig = {
	name: string
	version: string
	author: string
	description: string
	code: string
	grid: TGrid
	assetsPath: string
	collections: TCollection[]
}
