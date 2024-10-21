import { API_BASE_URL } from '../config';
import type { GroupedAttendance, Attendance  } from './shemas';
export async function addAttendance(attendance: Attendance ) {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendance),
    });

    if (!response.ok) {
      throw new Error('Ошибка при сохранении посещаемости');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при сохранении посещаемости:', error);
    throw error;
  }
}
export async function fetchAttendance() {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance`);
    if (!response.ok) throw new Error('Ошибка при загрузке посещений');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке лекций:', error);
    throw error;
  }
}


export async function groupedData(attendanceData: { id: number, lecture: { name: string; }; date: string; student: any; present: number}[]) {

    const result: { [key: string]: GroupedAttendance } = {};
    
    attendanceData.forEach((record) => {
    
    const key = `${record.lecture.name}_${record.date}`;
    
    if (!result[key]) {
        result[key] = {
        lecture: record.lecture,
        date: record.date,
        presents: 0,
        students: [],
    };
    } 
    result[key].students.push({
        id: record.id,
        name: record.student.name, 
        present: !!record.present
    });
    if (record.present) {
      result[key].presents += 1; // Increment presents count
    }
    });
    
  return Object.values(result) as GroupedAttendance[] ;
}
export async function removeAttendance(attendanceId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/${attendanceId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Ошибка при удалении студента');
  } catch (error) {
    console.error('Ошибка при удалении студента:', error);
    throw error;
  }
}

export function getCurrentDate(): string {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Yakutsk", year: "numeric", month: "2-digit", day: "2-digit" });
  return formatter.format(today);
}
