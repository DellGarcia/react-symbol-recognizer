import { Canvas } from './components/Canvas';
import { Toaster } from 'react-hot-toast';
import FormData from 'form-data';

import './App.css'

function App() {
  return (
    <>
      <header>
        Symbol Recognizer
      </header>
      <Canvas />
      <Toaster
        toastOptions={{
          style: {
            background: '#553772',
            color: '#FFF',
            fontFamily: 'Poppins',
            marginBottom: '20px',
            padding: '10px',
            lineHeight: '30px'
          },
        }}
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
