export function copyStudentsData(students: { name: string }[]) {
    const studentsText = students.map(student => student.name).join('\n');
    navigator.clipboard.writeText(studentsText)
      .then(() => {
        alert('Данные студентов скопированы в буфер обмена!');
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err);
      });
  }
export function dayOfWeek(date : string) {
  if (date) {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const selectedDate = new Date(date);
    return daysOfWeek[selectedDate.getDay()];
  }
  return '';
}