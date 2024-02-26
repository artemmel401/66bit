import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Staff from './pages/staff-page/staff'
import EmployeePage from './pages/employee-page/employee-page'
import ActiveLinks from './components/active-links/active-links'
import { useAppDispatch, useAppSelector } from './hooks'
import { getThemeAction } from './store/app-process/app-selectors'
import { changeTheme } from './store/app-process/app-actions'


function App() {

  const theme = useAppSelector(getThemeAction)

  const dispatch = useAppDispatch()

  function OuletWrapper(){
    return (
      <div className={`app__container ${theme === 'dark' ? 'app__dark' : ''}`}>
      <header className={`app__header`}>
        <div className={`app__headerFirstLine flex disablePadding ${theme === 'dark' ? 'app__headerDark' : ''}`}>
          <a href='https://66bit.ru'><img className='app__logo' alt='66 Бит' src='logo.svg' /></a>
          <div className='app__headerRight flex'>
            <a className={`app__headerLink ${theme === 'dark' ? 'whiteText' : ''}`} href="tel:+73432908476"><span className='app__headerTel'>+7 343 290 84 76</span></a>
            <a className={`app__headerLink ${theme === 'dark' ? 'whiteText' : ''}`} href='mailto:info@66bit.ru'><span className='app__headerMail'>info@66bit.ru</span></a>
            <div onClick={() => { dispatch(changeTheme(theme === "light" ? "dark" : "light")) }} className={`app__themeSlider themeSlider flex pointer ${theme === 'light' ? 'sliderLight' : 'sliderDark'}`}>
              <div className='themeSlider__point flex'><img alt='' src={`slider/${theme === 'light' ? 'light' : 'dark'}-theme.svg`} /></div>
            </div>
          </div>
        </div>
        <ActiveLinks/>
      </header>
      <Outlet />
    </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<OuletWrapper />}>
        <Route path='/' element={<Staff/>}/>
        <Route path='/:id' element={<EmployeePage/>}/>
      </Route>
    </Routes>
  )
}

export default App
