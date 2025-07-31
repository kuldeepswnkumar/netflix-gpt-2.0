
import './App.css'
import Body from './Components/Body'
import { Provider } from 'react-redux'
import userStore from './redux/store'

function App() {

  return (
    <div>
      <Provider store={userStore}>
        <Body />
      </Provider>
    </div>

  )
}

export default App
