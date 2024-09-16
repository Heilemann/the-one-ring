import { Assets, Documents, TDocument } from './document'
import { TEditMode } from './state'

export type TPostMessage =
	| {
			message: 'load'
			data: {}
	  }
	| {
			message: 'save'
			data: {
				payload: TDocument
			}
	  }
	| {
			message: 'send message'
			data: { payload: string }
	  }
	| {
			message: 'upload asset'
			data: { name: string; documentId: string }
	  }
	| {
			message: 'remove asset'
			data: { assetId: string }
	  }
	| {
			message: 'system is ready'
			data: null
	  }
	| {
			message: 'focus'
			data: undefined
	  }
	| {
			message: 'open document'
			data: { documentId: string }
	  }
	| {
			message: 'set scene'
			data: { sceneId: string }
	  }

// message that can be received by the system
export type TSystemReceivableMessage =
	| 'load'
	| 'update data'
	| 'update document mode'
	| 'upload asset success'

export type TAppReceivableMessages =
	| {
			message: 'system is ready'
			data: null
	  }
	| {
			message: 'save'
			data: { payload: TDocument }
	  }
	| {
			message: 'focus'
			data: undefined
	  }
	| {
			message: 'send message'
			data: { payload: string }
	  }
	| {
			message: 'upload asset'
			data: {
				name: string
				documentId: string
			}
	  }
	| {
			message: 'remove asset'
			data: { assetId: string }
	  }
	| {
			message: 'set scene'
			data: { sceneId: string }
	  }
	| {
			message: 'open document'
			data: { documentId: string }
	  }
	| {
			message: 'generate'
			data: {
				name: string
				prompt: string
			}
	  }

export type TSystemReceivableMessageData = {
	documentId: string
	documents: Documents
	assets: Assets
	editMode: TEditMode
}

export type TSystemReceivableMessages =
	| {
			message: 'load'
			source: 'Aux'
			data: TSystemReceivableMessageData
	  }
	| {
			message: 'update data'
			source: 'App'
			data: TSystemReceivableMessageData
	  }
	| {
			message: 'update document mode'
			source: 'App'
			data: {
				editMode: TEditMode
			}
	  }
	| {
			message: 'upload asset success'
			source: 'App'
			data: {
				name: string
			}
	  }
