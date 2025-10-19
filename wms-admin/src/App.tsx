import { FrappeProvider } from 'frappe-react-sdk'
import { Outlet } from 'react-router-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '../overmind'

function App() {
	const getSiteName = () => {
		// @ts-ignore
		if (window.frappe?.boot?.versions?. frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
		// @ts-ignore
		return window. frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
		}
		return import.meta.env.VITE_SITE_NAME
	}

	const overmind = createOvermind(config, {
		devtools: true
	})

  return (
	<div className="App">
	  <FrappeProvider
			socketPort={import.meta.env.VITE_SOCKET_PORT}
			siteName={getSiteName()}
		>
			<Provider value={overmind}>
				<Outlet />
			</Provider>
		</FrappeProvider>
	</div>
  )
}

export default App
