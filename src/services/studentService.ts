import { API_BASE_URL } from '../config';
import type { Student } from './shemas';

export async function fetchStudents() {
  try {
    const response = await fetch(`${API_BASE_URL}/students?sort_by=name&order=asc`);
    if (!response.ok) throw new Error('Ошибка загрузки студентов');
    const data = await response.json();
    return data.map((student: Array<Student>) => ({ ...student, present: false }));
  } catch (error) {
    console.error('Ошибка при загрузке студентов:', error);
    throw error;
  }
}

export async function addStudent(newStudent: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newStudent }),
    });

    if (!response.ok) throw new Error('Ошибка при добавлении студента');
    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении студента:', error);
    throw error;
  }
}

export async function removeStudent(studentId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Ошибка при удалении студента');
  } catch (error) {
    console.error('Ошибка при удалении студента:', error);
    throw error;
  }
}
