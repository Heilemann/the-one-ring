import { FieldValues } from 'react-hook-form'
import { Assets, Documents, TDocument } from './document'

export type TEditMode = 'view' | 'edit'

export type TState = {
	documentId: string
	editMode: TEditMode
	document: TDocument
	documents: Documents
	assets: Assets
}

export type TReducerAction =
	| {
			type: 'LOAD'
			payload: Partial<TState>
	  }
	| {
			type: 'UPDATE_DOCUMENT_VALUES'
			payload: {
				documentId: string
				values: FieldValues
			}
	  }
