import { API_BASE_URL } from '../config';

export async function fetchLectures() {
  try {
    const response = await fetch(`${API_BASE_URL}/lectures`);
    if (!response.ok) throw new Error('Ошибка при загрузке лекций');
    const data = await response.json();
    return data.lectures;
  } catch (error) {
    console.error('Ошибка при загрузке лекций:', error);
    throw error;
  }
}

export async function addLecture(newLecture: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/lectures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newLecture }),
    });

    if (!response.ok) throw new Error('Ошибка при добавлении пары');
    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении пары:', error);
    throw error;
  }
}

export async function removeLecture(lectureId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Ошибка при удалении пары');
  } catch (error) {
    console.error('Ошибка при удалении пары:', error);
    throw error;
  }
}
