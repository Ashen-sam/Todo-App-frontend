import { Toaster } from 'sonner'
import Home from './components/home'

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Home />
    </>
  )
}
