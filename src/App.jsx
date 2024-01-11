import './App.css'
import Home from './Pages/Home'
import Store from './Pages/Store'
import About from './Pages/About'
import {Navbar} from './components/Navbar'
import {Routes,Route } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Container } from 'react-bootstrap'

function App() {
 return(
  <ShoppingCartProvider>
    <Navbar/>
    <Container className='mb-4'>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Store'element={<Store />}/>
          <Route path='/About'element={<About />}/>
      </Routes>
    </Container>
  </ShoppingCartProvider>
    
  
 )
  
}

export default App
