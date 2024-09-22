import { useReducer } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import './assets/cover.jpg'
import './assets/logo.png'
import Container from './components/BaseComponents/Container'
import DragAndDrop from './components/BaseComponents/DragAndDrop'
import Context from './components/BaseComponents/context'
import DevToolbar from './components/BaseComponents/dev/DevMode'
import { useDocumentParams } from './components/BaseComponents/hooks/useDocumentParams'
import Reducer from './components/BaseComponents/reducer'
import DiceResults from './components/DiceResults'
import { TValues } from './interfaces/interfaces'
import { TState } from './interfaces/state'

function App() {
	const [state, dispatch] = useReducer(Reducer, {} as TState)
	// const isDevelopment = process.env.NODE_ENV === 'development'
	const isDevelopment = false
	const form = useForm<TValues>()
	const { id, dice } = useDocumentParams()

	return (
		<Context.Provider value={{ state, dispatch }}>
			<FormProvider {...form}>
				<DragAndDrop>
					{isDevelopment && <DevToolbar />}
					{id && <Container />}
					{dice && <DiceResults diceData={dice} />}
					{!id && !dice && <div>No valid parameters provided</div>}
				</DragAndDrop>
			</FormProvider>
		</Context.Provider>
	)
}

export default App
