export function convertDate(date: string): string {
  const parts = date.split(' ');
  
  const months: { [key: string]: string } = {
    'января': '01',
    'февраля': '02',
    'марта': '03',
    'апреля': '04',
    'мая': '05',
    'июня': '06',
    'июля': '07',
    'августа': '08',
    'сентября': '09',
    'октября': '10',
    'ноября': '11',
    'декабря': '12',
  };
  
  const month = months[parts[1]];
  
  return `${parts[0]}.${month}.${parts[2]}`
}

export const getWidthTableField = (index: number) => {
  switch (index) {
    case 0: return 'name'
    case 1: return 'position'
    case 2: return 'phone'
    case 3: return 'birthdate'
  }
}
