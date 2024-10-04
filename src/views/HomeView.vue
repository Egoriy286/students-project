<template>
  
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <h3 class="text-lg font-bold">Добавление пары</h3>
        <p class="py-4">Пожалуйста введите название пары</p>
        <input v-model="newLecture" placeholder="Введите название"  class="input input-bordered input-info input-sm w-full max-w-xs"/>
        <button @click="addLecture" class="btn btn-sm btn-outline mt-2 ml-2">Добавить</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>


  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <h3 class="text-lg font-bold">Таблица пар</h3>
        <table class="table">
    <!-- head -->
     
          <thead>
            <tr>
              <th>id</th>
              <th>Название пары</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody v-for="(lecture, index) in lectures" :key="index">
            <tr>
              <th>{{ lecture.id }}</th>
              <td><strong>{{ lecture.name }}</strong></td>
              <td><button @click="removeLecture(lecture.id)" class="btn btn-sm btn-error mt-2 ml-2">X</button> <!-- Кнопка удаления --></td>
            </tr>
            <!-- Список студентов -->
          </tbody>
        
        </table>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

  <div class="flex justify-center items-center min-h-screen">
  <ul class="menu bg-base-100 rounded-box shadow-lg p-4 flex flex-col md:flex-row md:space-x-4">
    <div class="pb-2">
    <label>
      Дата:
      <input v-model="date" type="date" required />
      <span>{{ dayOfWeek }}</span> <!-- Вывод дня недели -->
    </label>

    <label class="label">
          <span class="label-text">Лекция:</span>
    </label>
    <select v-model="lecture_id" class="select select-sm select-bordered" required>
      <option v-for="lecture in lectures" :key="lecture.id" :value="lecture.id">
        {{ lecture.name }}
      </option>
    </select>
    <button class="btn btn-sm btn-outline mt-2 ml-2" onclick="my_modal_2.showModal()" >+</button>
    <button class="btn btn-sm btn-outline mt-2 ml-2" onclick="my_modal_3.showModal()" >Подробнее</button>

  </div>

  <!-- Форма для добавления студента -->
  <div>
    <h3>Форма для добавления студента:</h3>
    <input v-model="newStudent" placeholder="Введите имя студента"  class="input input-bordered input-info input-sm w-full max-w-xs"/>
    <button @click="addStudent" class="btn btn-sm btn-outline mt-2 ml-2">Добавить</button>
  </div>
  
  <div class="badge badge-outline font-bold text-gray-600 transition-colors duration-500 ease-in-out cursor-pointer animate-pulse-label">Чтобы отметить, что студент присутствовал, нажмите на имя студента</div>
  <table class="table">
    <!-- head -->
     
    <thead>
      <tr>
        <th>Номер</th>
        <th>Имя студента</th>
        <th>Удалить</th>
      </tr>
    </thead>
    <tbody v-for="(student, index) in students" :key="index">
      <tr @click="toggleAttendanceTrue(index)" @dblclick="toggleAttendanceFalse(index)">
        <th>{{ index+1 }}</th>
        <td><strong  :style="{ color: student.present ? 'green' : 'red' }">{{ student.name }}</strong></td>
        <td><button @click="removeStudent(student.id)" class="btn btn-sm btn-error mt-2 ml-2">X</button> <!-- Кнопка удаления --></td>
      </tr>
      <!-- Список студентов -->
    </tbody>

  </table>

  
  <!-- Кнопки для сохранения и экспорта данных -->
  <div>
    <button @click="saveData" class="btn btn-sm btn-outline mt-2 ml-2">Сохранить данные</button>
    <button @click="exportData" class="btn btn-sm btn-outline mt-2 ml-2">Экспортировать данные в JSON</button>
  </div>
  </ul>
</div>
</template>

<script lang="js">

export default{
  data() {
    return {
      date: this.getCurrentDate(),  // Текущая дата по умолчанию
      newStudent: '',
      newLecture: '',
      lecture_id: '',
      attendance: {
        date: '',
        lecture_id: 0,
        students:[
          {id: 0,
          present: false,}
        ],
      },
      lectures: [],
      students: [{id: 0,
        present: false,}],
    };
  },
  computed: {
    dayOfWeek() {
      if (this.date) {
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const selectedDate = new Date(this.date);
        return daysOfWeek[selectedDate.getDay()];
      }
      return '';
    }
  },
  methods: {
    async fetchStudents() {
      const sortBy = 'name';
      const order = 'asc';
      try {
        const response = await fetch(`https://reg.proste20.ru/api/students?sort_by=${sortBy}&order=${order}`);
        if (!response.ok) throw new Error('Ошибка загрузки студентов');
        const data = await response.json();
        this.students = data;
        if(this.students !==null)
        for (let id in this.students) {
            this.students[id].present = false;
        }
      } catch (error) {
        alert(error.message);
      }
    },
    async fetchLectures() {
      try {
        const response = await fetch('https://reg.proste20.ru/api/lectures');
        const data = await response.json();
        this.lectures = data.lectures;  // Сохраняем лекции в состоянии компонента
        if (this.lectures.length > 0) {
          this.lecture_id = this.lectures[0].id; // Устанавливаем первую лекцию по умолчанию
        }
      } catch (error) {
        console.error('Ошибка при получении лекций:', error);
      }
    },
   
    async addStudent() {
      console.log('Добавление студента ' + this.newStudent)
      if (this.newStudent.trim()) {
        try {
          const response = await fetch('https://reg.proste20.ru/api/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.newStudent }),
          });
          if (!response.ok){
              console.log('Ошибка при добавлении студента')
              throw new Error('Ошибка при добавлении студента');
          }
          const newStudent = await response.json();
          this.students.push(newStudent);
          this.newStudent = '';
          console.log('Студент добавлен успешно')
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert('Введите имя студента!');
      }
    },
    async addLecture() {
      console.log('Добавление пары ' + this.newLecture)
      if (this.newLecture.trim()) {
      try {
          const response = await fetch('https://reg.proste20.ru/api/api//lectures', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.newLecture }),
          });
          if (!response.ok){
              console.log('Ошибка при добавлении пары')
              throw new Error('Ошибка при добавлении пары');
          }
          const newLecture = await response.json();
          this.lectures.push(newLecture);
          this.newLecture = '';
          console.log('Пара успешно добавлена ')
        } catch (error) {
          alert(error.message);
        }
      }
      else {
        alert('Введите название пары!');
      }
    },
    async removeLecture(lectureId) {
      try {
        const response = await fetch(`https://reg.proste20.ru/api/lectures/${lectureId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Ошибка при удалении пары');
        this.lectures = this.lectures.filter(lecture => lecture.id !== lectureId);
      } catch (error) {
        alert(error.message);
      }
    },
    async removeStudent(studentId) {
      try {
        const response = await fetch(`https://reg.proste20.ru/api/students/${studentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Ошибка при удалении студента');
        this.students = this.students.filter(student => student.id !== studentId);
      } catch (error) {
        alert(error.message);
      }
    },
    async addAttendance(){
    //  const attendanceData = {
    //    date: this.getCurrentDate(), // Текущая дата
    //    lecture_id: this.lecture_id, // ID выбранной лекции
    //    students: this.students.map(student => ({
    //        id: student.id, // ID студента
    //        present: student.present // Признак присутствия
    //    }))
    //};

    
      try {
        console.log(this.attendance)
          const response = await fetch('https://reg.proste20.ru/api/attendance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.attendance),
            mode: "cors",
          });
          if (!response.ok){
              console.log('Ошибка при сохранении API')
              throw new Error('Ошибка при сохранении API');
          }
          const newStudent = await response.json();
          this.students.push(newStudent);
          this.newStudent = '';
          console.log('Список добавлен успешно')
        } catch (error) {
          alert(error.message);
        }
    },
    copyStudentsData() {
      const studentsText = this.students.map(student => student.name).join('\n');
      navigator.clipboard.writeText(studentsText)
        .then(() => {
          alert('Данные студентов скопированы в буфер обмена!');
        })
        .catch(err => {
          console.error('Ошибка при копировании: ', err);
        });
    },
    

// Аналогичные методы для работы с посещаемостью

    getCurrentDate() {
      // Создаем новый объект Date, с указанием часового пояса
      const today = new Date();

      // Форматируем дату в формате YYYY-MM-DD с учётом часового пояса
    
      // Используем Intl.DateTimeFormat для форматирования
      const formatter = new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Yakutsk",year:"numeric",month:"2-digit",day:"2-digit"}); // en-CA для формата YYYY-MM-DD
      const formattedDate = formatter.format(today);
    
      return formattedDate; // Возвращаем дату в формате YYYY-MM-DD
    },

    toggleAttendanceTrue(index) {
      this.students[index].present = true;
    },
    toggleAttendanceFalse(index){
      this.students[index].present = false;
    },
    removeStudentTable(index) {
      this.students.splice(index, 1); // Удаляем студента по индексу
    },
    saveData(){
      this.attendance.students = this.students
      this.attendance.lecture_id= this.lecture_id
      this.attendance.date = this.date;
      this.addAttendance();
      console.log(this.attendance);
    },
    
    loadData() {
      const data = localStorage.getItem('attendanceData');
      return data ? JSON.parse(data).students : null;
    },
    exportData() {
      if (this.date || this.attendance.lecture) {
        const data = {}
        data.date = this.date;
        data.lecture = {id: this.lecture_id, name: this.lectures.find(lecture => lecture.id === this.lecture_id).name};
        data.students = this.students
        
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance_${this.date}_lecture${this.lecture}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Пожалуйста, укажите дату и номер пары!');
      }
    },
    async saveAttendance() {
      try {
        const response = await fetch('https://reg.proste20.ru/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.attendance),
        });
        
        if (!response.ok) {
          throw new Error('Ошибка при сохранении посещаемости');
        }

        const data = await response.json();

        
      } catch (error) {
       console.log(error.message);
      }
    },
    
  },
  mounted() {
      this.fetchStudents();
      this.fetchLectures();
    }
};
</script>