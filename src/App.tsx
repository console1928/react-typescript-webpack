import React from 'react'
import HistoricalBlock from './components/historicalBlock/HistoricalBlock'
import historicalDataItems from './data'
import '../public/index.css'

function App() {
  return <HistoricalBlock historicalDataItems={historicalDataItems} />
}

export default App
