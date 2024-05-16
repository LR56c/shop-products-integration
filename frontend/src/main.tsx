import {
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import {
	createRouter,
	RouterProvider
} from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'

const router = createRouter( { routeTree } )

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const queryClient = new QueryClient()
ReactDOM.createRoot( document.getElementById( 'app' )! )
        .render(
	        <React.StrictMode>
		        <QueryClientProvider client={ queryClient }>
			        <RouterProvider router={ router }/>
		        </QueryClientProvider>
	        </React.StrictMode>
        )
