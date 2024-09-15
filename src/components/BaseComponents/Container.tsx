// The Container component is the parent of all the other components. It is responsible for
// rendering the correct component based on the document type. It also handles outbound
// communication to the platform.
import { useContext, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TDocumentType } from '../../interfaces/document'
import { TValues } from '../../interfaces/interfaces'
import TypeSwitcher from '../TypeSwitcher'
import context from './context'
import useMessageToApp from './hooks/UseMessageToApp'
import usePostMessageListener from './hooks/usePostMessageListener'
import useFocusHandler from './useFocusHandler'

export default function Container() {
	const { state, dispatch } = useContext(context)
	const [type, setType] = useState<TDocumentType | null>(state.document?.type)
	const { watch } = useFormContext<TValues>()
	const resetInProgress = useRef(false)
	const messageToApp = useMessageToApp()
	usePostMessageListener({ resetInProgress })
	useFocusHandler()

	const handleDocumentChanges = () => {
		// the document type controls which sheet to show,
		// if the document is updated we update the type as well
		setType(state.document?.type || null)

		const subscription = watch(values => {
			if (!values || !state.document) return
			if (resetInProgress.current) {
				resetInProgress.current = false
				return
			}

			const payload = {
				...state.document,
				values: {
					...state.document.values,
					...values,
				},
			}

			dispatch({
				type: 'UPDATE_DOCUMENT_VALUES',
				payload: {
					documentId: state.document._id,
					values: values,
				},
			})

			messageToApp({ message: 'save', data: { payload } })
		})

		return () => {
			subscription.unsubscribe()
		}
	}
	useEffect(handleDocumentChanges, [state.document]) // eslint-disable-line react-hooks/exhaustive-deps

	// tell the platform we're ready to receive messages,
	// the first of which will be 'load' containing our data
	useEffect(() => {
		messageToApp({ message: 'system is ready', data: null })
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	if (!type) return null
	if (!state.document) return null

	return <TypeSwitcher type={type} />
}
