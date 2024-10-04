<!--
<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Таблица посещаемости</h1>

    <table class="table w-full">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Название предмета</th>
          <th>Количество студентов</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(attendance, index) in attendances" :key="index">
          <td>{{ attendance.date }}</td>
          <td>{{ attendance.lectureName }}</td>
          <td>{{ attendance.studentCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="js">
import { defineComponent} from 'vue';

export default defineComponent({
  name: "AttendanceTable",
  data() {
    return {
      attendances: [],  // Массив для хранения посещений
    };
  },
  mounted() {
    this.fetchAttendances();
  },
  methods: {
    async fetchAttendances() {
      const sortBy = 'id';
      const order = 'asc';
      try {
        const response = await fetch(`http://127.0.0.1:3000/attendance?sort_by=${sortBy}&order=${order}`);  // Ваш API эндпоинт
        if (!response.ok) throw new Error('Ошибка загрузки данных о таблице');
        const data = await response.json();
        console.log(data)
        this.attendances = data;
        // Обрабатываем данные для отображения в таблице
        //this.attendances = data.map(att => ({
        //  date: att.date,
        //  lectureName: att.lecture_name,
        //  studentCount: att.students.length,  // Предполагается, что это список студентов
        //}));
      } catch (error) {
        console.error('Ошибка при получении посещений:', error);
      }
    },
  },
});
</script>
-->

<template>
  <div>
    <h2>Список посещаемости</h2>

    <div>
      <label for="date">Дата:</label>
      <input type="date" v-model="filterDate" @change="filterData" />

      <label for="lecture">Лекция:</label>
      <select v-model="filterLecture" @change="filterData">
        <option value="">Все лекции</option>
        <option v-for="lecture in lectures" :key="lecture.id" :value="lecture.id">
          {{ lecture.name }}
        </option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Лекция</th>
          <th>Студент</th>
          <th>Присутствие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in filteredAttendance" :key="attendance.id">
          <td>{{ attendance.date }}</td>
          <td>{{ attendance.lecture.name }}</td>
          <td>{{ attendance.student.name }}</td>
          <td>{{ attendance.present ? 'Да' : 'Нет' }}
            <button @click="removeAttendance(attendance.id)" class="btn btn-sm btn-error mt-2 ml-2">X</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  data() {
    return {
      attendanceData: [],
      filteredAttendance: [],
      filterDate: '',
      filterLecture: '',
      lectures: [],
      error: null // Для хранения ошибок
    };
  },
  created() {
    this.loadData(); // Загружаем данные при создании компонента
  },
  methods: {
    async loadData() {
      try {
        await Promise.all([this.fetchAttendanceData(), this.fetchLectures()]);
        this.filteredAttendance = this.attendanceData; // Изначально отображаем все данные
      } catch (error) {
        this.error = 'Ошибка при загрузке данных'; // Устанавливаем сообщение об ошибке
        console.error(error);
      }
    },
    async fetchAttendanceData() {
      const response = await fetch('https://reg.proste20.ru/attendance?sort_by=${sortBy}&order=${order}'); // Замените на ваш API
      if (!response.ok) {
        throw new Error('Ошибка при загрузке посещаемости');
      }
      this.attendanceData = await response.json();
    },
    async fetchLectures() {
      const response = await fetch('https://reg.proste20.ru/lectures'); // Замените на ваш API для получения лекций
      if (!response.ok) {
        throw new Error('Ошибка при загрузке лекций');
      }
      const data = await response.json();
      this.lectures = data.lectures;
    },
    filterData() {
      this.filteredAttendance = this.attendanceData.filter(attendance => {
        const matchesDate = this.filterDate ? attendance.date === this.filterDate : true;
        const matchesLecture = this.filterLecture ? attendance.lecture.id === this.filterLecture : true;
        return matchesDate && matchesLecture;
      });
    },
    async removeAttendance(AttendanceId) {
      try {
        console.log('Удаление посещения с ID:', AttendanceId)
        const response = await fetch(`https://reg.proste20.ru/attendance/${AttendanceId}`, {
          method: 'DELETE',
          mode: 'cors',
        });
        if (!response.ok) throw new Error('Ошибка при удалении п');
        this.filteredAttendance = this.filteredAttendance.filter(Attendance => Attendance.id !== AttendanceId);
      } catch (error) {
        alert(error.message);
      }
    },
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
.error {
  color: red;
}
</style>
