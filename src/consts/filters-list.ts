import { SearchFilter } from "../types/filter";

export const FiltersList:SearchFilter = {
  Name: null,
  filter: [
    {
      name: 'Должность',
      backName: 'Position',
      options: [
        {
          name: 'Frontend-разработчик',
          backName: 'Frontend'
        },
        {
          name: 'Backend-разработчик',
          backName: 'Backend'
        },
        {
          name: 'Аналитик',
          backName: 'Analyst'
        },
        {
          name: 'Менеджер',
          backName: 'Manager'
        },
        {
          name: 'Дизайнер',
          backName: 'Designer'
        },
      ]
    },
    {
      name: 'Пол',
      backName: 'Gender',
      options: [
        {
          name: 'Мужчина',
          backName: 'Male'
        },
        {
          name: 'Женщина',
          backName: 'Female'
        },
      ]
    },
    {
      name: 'Стэк технологий',
      backName: 'Stack',
      options: [
        {
          name: 'C#',
          backName: 'CSharp'
        },
        {
          name: 'React',
          backName: 'React'
        },
        {
          name: 'Java',
          backName: 'Java'
        },
        {
          name: 'PHP',
          backName: 'PHP'
        },
        {
          name: 'Figma',
          backName: 'Figma'
        },
        {
          name: 'Word',
          backName: 'Word'
        },
      ]
    }
  ]
}