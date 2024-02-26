import './staff.css'
import { useCallback, useEffect, useState } from 'react'
import FilterBlock from '../../components/fliter-block/filter-block'
import { TableFields } from '../../consts/table-fields'
import axios from 'axios'
import { Employee } from '../../types/employee'
import { BASE_URL } from '../../base-url'
import { FiltersList } from '../../consts/filters-list'
import StaffTablePoint from '../../components/staff-table-point/staff-table-point'
import { useAppSelector } from '../../hooks'
import { getThemeAction } from '../../store/app-process/app-selectors'
import { getWidthTableField } from '../../utils'


export default function Staff() {

  const theme = useAppSelector(getThemeAction)

  const [activePage, setActivePage] = useState(1)

  const [employee, setEmployee] = useState<Employee[]>([])

  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const [isblockPage, setIsBlockPage] = useState(false)

  const [searchValue, setSearchValue] = useState(FiltersList.Name)

  const [filters, setFilter] = useState(FiltersList.filter.map(filter => {
    const updatedOptions = filter.options.map(option => ({
      ...option,
      isActive: false
    }));

    return {
      ...filter,
      options: updatedOptions
    };
  }))

  const changeFilter = (filterName: string, prevActive: boolean, backName: string) => {
    const newFilters = filters.map(filter => ({
      ...filter,
      options: filter.options.map(option => ({ ...option }))
    }));
    for (const filter in newFilters) {
      if (newFilters[filter].backName == filterName) {
        const activeFilter = newFilters[filter]
        for (const option in activeFilter.options) {
          if (activeFilter.options[option].backName === backName) {
            activeFilter.options[option].isActive = !prevActive
          }
        }
      }
    }
    let resultString = ''
    for (const i in newFilters) {
      let activeOptions = ''
      for (const option in newFilters[i].options) {
        if (newFilters[i].options[option].isActive) {
          activeOptions = activeOptions + `${newFilters[i].backName}=${newFilters[i].options[option].backName}&`
        }
      }
      resultString = resultString + activeOptions
    }
    resultString = resultString.slice(0, -1)
    setActiveFilter(resultString)
    setFilter(newFilters)
  }

  const searchEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0 && e.target.value !== null) {
      setSearchValue(e.target.value)
      activeFilter ? submitFilters() : handleSearchStaff(undefined, true)
    } else {
      setSearchValue(null)
      submitFilters()
    }
  }

  const getActiveFilters = () => {
    const result: { name: string, backName: string, filterName: string }[] = []
    for (const filter in filters) {
      const activeFilter = filters[filter]
      for (const option in activeFilter.options) {
        if (activeFilter.options[option].isActive) {
          result.push({ name: activeFilter.options[option].name, backName: activeFilter.options[option].backName, filterName: activeFilter.backName })
        }
      }
    }
    return result
  }

  const submitFilters = () => {
    if (activeFilter) {
      setActivePage(0)
      handleSearchStaff(activeFilter, true)
    }
  }

  const handleSearchStaff = useCallback(async (queryString = `Page=1`, isFirst?: boolean) => {
    try {
      const { data } = await axios.get<Employee[]>(BASE_URL + 'Employee?' + `${queryString}${isFirst ? '&Page=1' : ''}` + `${searchValue ? '&Name=' + searchValue : ''}`)
      isFirst ? setEmployee(data) :
        setEmployee(employee.concat(data).filter((item, index, self) => {
          return index === self.findIndex((t) => (
            t.id === item.id
          ));
        }))
      if (isFirst) {
        setActivePage(1)
        setIsBlockPage(false)
      } else {
        setActivePage(activePage + 1);
      }
      if (data.length === 0) {
        setIsBlockPage(true)
      }
    } catch (error) {
      console.error('Error while fetching employee data:', error);
    }
  }, [activePage, employee, searchValue]);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      if (scrollPosition + windowHeight >= documentHeight - 40 && !isblockPage) {
        activeFilter ? handleSearchStaff(activeFilter + `&Page=${activePage}`) : handleSearchStaff(`Page=${activePage}`)
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeFilter, activePage, handleSearchStaff, isblockPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleSearchStaff() }, [])
  return (
    <>
      <main className='app__staffList staffList'>
        <div className='staffList__filterBlock flex'>
          <h1 className={`staffList__title ${theme === 'dark' ? 'whiteText' : ''}`}>Список сотрудников</h1>
          <input onChange={searchEmployee} className={`staffList__search mobileSearch ${theme === 'dark' ? 'app__dark' : ''}`} placeholder='Поиск' type='search' />
          <div className='staffList__filters flex'>
            {filters.map((filter, index) => (
              <FilterBlock isLast={index + 1 === filters.length} key={`${filter.backName}--filter`} name={filter.name} options={filter.options} onChange={(prevActive: boolean, backName: string) => { changeFilter(filter.backName, prevActive, backName) }} />
            ))}
          </div>
        </div>
        <input onChange={searchEmployee} className={`staffList__search desktopSearch ${theme === 'dark' ? 'app__dark' : ''}`} placeholder='Поиск' type='search' />
        {getActiveFilters().length !== 0 && <div className={`staffList__selectedFilters selectedFilters disablePadding centerFlex ${theme === 'dark' ? 'greyBackground' : ''}`}>
          <div className='centerFlex selectedFilters__content'>
            <h2 className={`selectedFilters__title ${theme === 'dark' ? 'whiteText' : ''}`}>Выбранные фильтры:</h2>
            <div className='selectedFilters__filters flex'>
              {getActiveFilters().map((filter) => (
                <div key={`${filter.backName}--activeFilter`} onClick={() => { changeFilter(filter.filterName, true, filter.backName) }} className={`selectedFilters__filter pointer ${theme === 'dark' ? 'app__dark whiteText' : ''}`}>
                  <svg width="10" height="10" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.67824 5.49992L9.85953 1.3187C10.0468 1.1314 10.0468 0.827767 9.85953 0.640471C9.67223 0.453176 9.36859 0.453176 9.18129 0.640471L5 4.82169L0.818711 0.641111C0.631412 0.453815 0.327772 0.453815 0.140474 0.641111C-0.0468245 0.828406 -0.0468245 1.13204 0.140474 1.31934L4.32176 5.50056L0.141113 9.68114C-0.0461853 9.86844 -0.0461853 10.1721 0.141113 10.3594C0.235082 10.4527 0.357177 10.5 0.479912 10.5C0.602646 10.5 0.725381 10.4533 0.818711 10.3594L5 6.17815L9.18129 10.3594C9.27526 10.4527 9.39735 10.5 9.52009 10.5C9.64282 10.5 9.76556 10.4533 9.85889 10.3594C10.0462 10.1721 10.0462 9.86844 9.85889 9.68114L5.67824 5.49992Z" fill={`${theme === 'dark' ? '#F5F5F5' : '#292929'}`} />
                  </svg>
                  <span className='selectedFilters__filterText'>{filter.name}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={submitFilters} className='selectedFilters__search centerFlex pointer' type='button'>Найти</button>
        </div>}
        <div className={`staffList__staffTable staffTable ${window.innerWidth < 877 ? 'disablePadding' : ''}`}>
          <div className='staffTable__head flex'>
            {TableFields.map((field, index) => (<p key={`${field.backName}--tableFields`} className={`staffTable__headName table__${getWidthTableField(index)}`}>{field.name}</p>))}
          </div>
          <div className={`staffTable__content`}>
            {employee.map((el, index) => (
              <StaffTablePoint key={`${el}--$${index}`} employee={el} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}