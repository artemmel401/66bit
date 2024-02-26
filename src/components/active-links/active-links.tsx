import './active-links.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getLinksWayAction } from '../../store/app-process/app-selectors'
import { baseLinkWay } from '../../consts/links-way'
import { changeLinksWay } from '../../store/app-process/app-actions'

export default function ActiveLinks() {

  const navigate = useNavigate()

  const activeLinks = useAppSelector(getLinksWayAction)

  const dispatch = useAppDispatch()

  const onClickLink = (index: number) => {
    if (index !== 2){
      navigate(activeLinks[index].link)
      dispatch(changeLinksWay(baseLinkWay))
    }
  }
  return (
    <div className='header__links flex links'>
      {activeLinks.map((link, index) => (
        (window.innerWidth > 426 || (activeLinks.length - index <= 2  && window.innerWidth < 426)) &&
        <div className='centerFlex' onClick={() => {onClickLink(index)}} key={link.name}>
          <p className='links__link pointer links__mobileLink'>{link.name}</p>
          {index + 1 !== activeLinks.length && <img className='links__arrow' alt='' src='link-arrow.svg' />}
        </div>
      ))}
    </div>
  )
}