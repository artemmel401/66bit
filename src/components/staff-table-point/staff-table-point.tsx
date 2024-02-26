import { useNavigate } from 'react-router-dom'
import { Employee } from '../../types/employee'
import './staff-table-point.css'
import { TableFields } from '../../consts/table-fields'
import { convertDate, getWidthTableField } from '../../utils'
import { useAppSelector } from '../../hooks'
import { getThemeAction } from '../../store/app-process/app-selectors'

type StaffTablePointProps = {
  employee: Employee
}

export default function StaffTablePoint({ employee }: StaffTablePointProps) {

  const navigate = useNavigate()

  const theme = useAppSelector(getThemeAction)

  return (
    <div onClick={() => { navigate(`/${employee.id}`) }} className={`staffTable__el flex pointer ${theme === 'dark' ? 'staffTable__darkEl' : 'staffTable__whiteEl'}`}>
      {TableFields.map((field, index) => (
        <p key={`${field.name}--${index}`} className={`staffTable__employee table__${getWidthTableField(index)} ${theme === 'dark' ? 'whiteText' : ''}`}>
          {field.backName !== 'birthdate' ? employee[field.backName] : convertDate(employee[field.backName])}
        </p>
      ))}
    </div>
  )
}