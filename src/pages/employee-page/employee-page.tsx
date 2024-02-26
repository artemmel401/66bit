import './employee-page.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../base-url'
import { useEffect, useState } from 'react'
import { Employee } from '../../types/employee'
import { convertDate } from '../../utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { baseLinkWay } from '../../consts/links-way'
import { changeLinksWay } from '../../store/app-process/app-actions'
import { getThemeAction } from '../../store/app-process/app-selectors'

export default function EmployeePage() {

  const dispatch = useAppDispatch()
  const theme = useAppSelector(getThemeAction)
  const id = useParams()
  const [employee, setEmployee] = useState<Employee | null>(null)

  const handleGetEmployee = async () => {
    if (id) {
      try {
        const { data } = await axios.get<Employee>(BASE_URL + 'Employee' + `/${id.id}`)
        setEmployee(data)
        const newBaseLink = baseLinkWay.slice()
        newBaseLink[2] ? newBaseLink[2] = {name: data.name, link: `/${data.id}`} : newBaseLink.push({name: data.name, link: `/${data.id}`})
        dispatch(changeLinksWay(newBaseLink))
      } catch (error) {
        console.error('Error while fetching employee data:', error);
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGetEmployee() }, [])
  return (
    employee &&
    <>
      <div className={`employee__content ${theme==='dark' ? 'employee__contentDark' : 'employee__contentWhite'}`}> 
        <div className="employee__infoBlock centerFlex">
          <img className="employee__photo" alt={employee.name} src={employee.photo}/>
          <div className='employee__text'>
            <h1 className={`employee__name ${theme==='dark' ? 'whiteText' : ''}`}>{employee.name}</h1>
            <p className={`employee__position ${theme==='dark' ? 'whiteText' : ''}`}>{employee.position}</p>
            <div className='employee__stackBlock flex'>
              {employee.stack.map((el)=>(
                <p key={el} className={`employee__stack ${theme==='dark' ? 'whiteText employee__darkBackground' : ''}`}>{el}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='employee__generalInfo'>
          <h2 className={`employee__generalInfoTitle ${theme==='dark' ? 'whiteText' : ''}`}>Основная информация</h2>
          <div className='emploee__generalInfoContent centerFlex'>
            <p className={`emploee__generalInfoText  ${theme==='dark' ? 'whiteText' : ''}`}>Контактный телефон</p>
            <p className={`emploee__generalInfoValue  ${theme==='dark' ? 'whiteText' : ''}`}>{employee.phone}</p>
          </div>
          <div className='emploee__generalInfoContent centerFlex'>
            <p className={`emploee__generalInfoText  ${theme==='dark' ? 'whiteText' : ''}`}>Дата рождения:</p>
            <p className={`emploee__generalInfoValue  ${theme==='dark' ? 'whiteText' : ''}`}>{convertDate(employee.birthdate)}</p>
          </div>
          <div className='emploee__generalInfoContent centerFlex'>
            <p className={`emploee__generalInfoText  ${theme==='dark' ? 'whiteText' : ''}`}>Дата устройства:</p>
            <p className={`emploee__generalInfoValue  ${theme==='dark' ? 'whiteText' : ''}`}>{convertDate(employee.dateOfEmployment)}</p>
          </div>
        </div>
    </>
  )
}