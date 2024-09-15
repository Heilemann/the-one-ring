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
