import CollectionPicker from './CollectionPicker'
import EditModeToggle from './EditModeToggle'
import ResetButton from './ResetButton'
import useSimulateParentFrame from './useSimulateParentFrame'

/*
	This is a development tool which is enabled by creating a .env file and putting the following string in it, and then starting the dev server (see readme for more info):

  `NODE_ENV = development`

	This enables the development toolbar which allows you to switch between edit and view mode, and also allows you to select document type to edit, as well as managing the data handling. This is a not a proper substitute for deploying to a real game for testing, but it is useful for development.

	It will do very simple message handling to the parent window, and will also listen for messages from the parent window (although none are currently sent; it exists for future improvements to dev mode), and it will store the documentId in localStorage so that it will persist between page refreshes.
*/

export default function DevMode() {
	useSimulateParentFrame()

	return (
		<div className='sticky top-0 z-40 flex bg-black px-4 py-4 text-sm text-white'>
			<CollectionPicker />

			<div className='flex flex-1 justify-end space-x-2'>
				<EditModeToggle />
				<ResetButton />
			</div>
		</div>
	)
}
