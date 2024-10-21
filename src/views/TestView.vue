<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Лекция</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lectureGroup, index) in filterAttendanceData" :key="index" > <!-- Добавляем обработчик события клика -->
            <td>{{ lectureGroup.lecture.name }}</td>
            <td>{{ lectureGroup.date }} </td> 
            <td><button @click="showModal=true; selectedLectureGroup=lectureGroup">Подробнее</button></td> <!-- Кнопка "Подробнее" -->
          </tr>
        </tbody>
      </table>
      <StudentsItemsModal :show="showModal" 
      @close="showModal = false" 
      :student="true" 
      :items="selectedLectureGroup.students" 
      @removeItem="removeAttendance" >
      </StudentsItemsModal>
    </div>
  </template>
  
  <script lang="ts">
  import type { GroupedAttendance } from "../services/shemas";
  import {  fetchAttendance, groupedData , removeAttendance as apiRemoveAttendance} from "../services/attendanceService";
import StudentsItemsModal from "../components/StudentsItemsModal.vue";
import { dayOfWeek } from "../services/utils";
  export default {
    name: "Table",
    data() {
      return {
        selectedLectureGroup: {} as GroupedAttendance,
        showModal: false,
        filterAttendanceData: [] as GroupedAttendance[], // Инициализация данных
      };
    },
    components: {StudentsItemsModal},
    methods: {
      async loadAttendanceData() {
        try {
          const data = await fetchAttendance(); // Получаем данные о посещаемости
          this.filterAttendanceData = await groupedData(data); // Группируем данные и сохраняем в состояние
          console.log("Группированные данные:", this.filterAttendanceData);
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      },
    },
    dayOfWeek,
    removeAttendance(attendanceId: number){
      try {
        console.log("Удаление посещаемости с ID:", attendanceId);
        this.loadAttendanceData(); // Перезагружаем данные после удаления
      } catch (error) {
        console.error("Ошибка при удалении посещаемости:", error);
      }
  },
  async mounted() {
    await this.loadAttendanceData(); // Загружаем данные при монтировании компонента
  },
};
  
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  