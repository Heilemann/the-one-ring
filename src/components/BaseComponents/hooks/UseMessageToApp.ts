// this is a hook that returns a function that sends a message to the parent window
import { TAppReceivableMessages, TPostMessage } from '../../../interfaces'

export default function useMessageToApp() {
	// let searchParams = new URLSearchParams(window.parent.location.search)
	// let documentId = searchParams.get('id') || 'character'

	// if (documentId === null) {
	// 	console.warn('Document ID not found in AUX URL.')
	// }
	// const { origin } = useOrigin()

	let targetOrigin = window.parent.origin || document.referrer

	if (!targetOrigin.includes('localhost')) {
		targetOrigin = 'https://newrealms-aux.herokuapp.com'
	}

	// TODO: Add staging origin, if I can figure out how to get that working
	// } else if (process.env.NODE_ENV === 'staging') {
	// 	targetOrigin = 'https://newrealms-aux-staging.heroku.com'
	// } else {
	// 	targetOrigin = 'https://newrealms-aux.herokuapp.com'
	// }

	const messageToApp = ({ message, data }: TPostMessage) => {
		console.log('System sending message to app:', { message, data })

		window.parent.postMessage(
			{
				source: 'System',
				message,
				data,
			} as TAppReceivableMessages,
			targetOrigin,
		)
	}

	return messageToApp
}
