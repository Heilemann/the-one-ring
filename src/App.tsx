import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import './assets/cover.jpg'
import './assets/logo.png'
import Container from './components/BaseComponents/Container'
import DragAndDrop from './components/BaseComponents/DragAndDrop'
import Context from './components/BaseComponents/context'
import DevToolbar from './components/BaseComponents/dev/DevMode'
import Reducer from './components/BaseComponents/reducer'
import { TValues } from './interfaces/interfaces'
import { TState } from './interfaces/state'

function App() {
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	// const isDevelopment = process.env.NODE_ENV === 'development'
	const isDevelopment = false
	const form = useForm<TValues>({
		shouldUnregister: true,
	})

	return (
		<Context.Provider value={{ state, dispatch }}>
			<FormProvider {...form}>
				<DragAndDrop>
					{isDevelopment && <DevToolbar />}
					<Container />
				</DragAndDrop>
			</FormProvider>
		</Context.Provider>
	)
}

export default App
