import { useRef, useState } from 'react'
import './filter-block.css'
import useOutsideClick from '../../hooks/useOutsideClick'
import { useAppSelector } from '../../hooks'
import { getThemeAction } from '../../store/app-process/app-selectors'

type FilterBlockProps = {
  name: string,
  isLast: boolean,
  options: { name: string, backName: string, isActive: boolean }[]
  onChange: (prevActive: boolean, backName: string) => void
}

export default function FilterBlock({ name, options, onChange, isLast }: FilterBlockProps) {

  const theme = useAppSelector(getThemeAction)

  const [isActive, setIsActive] = useState(false)

  const blockRef = useRef<HTMLDivElement>(null)

  useOutsideClick(blockRef, ()=>{setIsActive(false)})

  return (
    <div ref={blockRef} className='filterBlock__container flex pointer'>
      <div onClick={()=>{setIsActive(!isActive)}} className='flex pointer'>
        <p className={`filterBlock__name ${isActive ? 'activeName' : ''}  ${theme === 'dark' ? 'whiteText' : ''}`}>{name}</p>
        <img className={`filterBlock__arrow ${isActive ? 'transform180' : ''}`} alt='' src='filter-arrow.svg' />
        <img className={`filterBlock__arrowMobile ${isActive ? 'transform180' : ''}`} alt='' src='filter-arrow-mobile.svg' />
      </div>
      {isActive && 
      <div className={`filterBlock__options ${isLast ? 'filterBlock__lastOptions': ''} ${theme === 'dark' ? 'whiteText app__dark' : ''}`}>
        {options.map((option) => (
          <div onClick={()=>{onChange(option.isActive, option.backName)}} key={option.backName} className='filterBlock__option flex'>
            <span>{option.name}</span>
            <img alt='' src={`checkbox/${option.isActive ? 'active' : 'disable'}-checkbox.svg`}/>
          </div>
        ))}
      </div>}
    </div>
  )
}