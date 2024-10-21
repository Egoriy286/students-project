<template>
    <div>
        <ComboBox :items="lectures" :selectedId="selectedLectureId" @selected-item-id="toggleSelectedLecture" class="select select-sm select-bordered"></ComboBox>
        <button class="btn btn-sm m-2" @click="modalAddLecture = true" >+</button>
        <button class="btn btn-sm m-2" @click="modalLectures = true">Лекции</button>
        <button class="btn btn-sm m-2" @click="addAttendance">Сохранить пару</button>
        <label>
            Дата:
            <input v-model="date" type="date" required />
            <span>{{ dayOfWeek(date) }}</span> <!-- Вывод дня недели -->
        </label>
        <button @click="copyStudentsData(students.filter(student => student.present))" class="btn">Копировать студентов</button>
        <TableStudents :students="students" 
            @removeStudent="removeStudent"
            @fetchStudents="fetchStudents"
            @updateStudent="updateStudent"/>
    </div>
   
    <ItemsModal :show="modalLectures"
        @addItem="addLecture"
        :items="lectures"
        @close="modalLectures = false"
        @removeItem="removeLecture"
        :title="'Лекции'">
    </ItemsModal>

   <Modal :show="modalAddLecture"
        :addForm="true"
        @close="modalAddLecture = false"
        @confirm="addLecture"
        :title="'Добавление пары'"
        :content="'Пожалуйста введите название пары'">
    </Modal>
    <Modal :show="modalAddStudent"
        :addForm="true"
        @close="modalAddStudent = false"
        @confirm="addStudent"
        :title="'Добавление студента'"
        :content="'Пожалуйста введите фамилию и имя студента'"
        :placeholder="'Введите ФИ'">
    </Modal>
    <button class="btn" @click="modalAddStudent= true">+</button>
    
</template>

<script lang="ts">
import { fetchStudents, addStudent, removeStudent } from '../services/studentService';
import { fetchLectures, addLecture, removeLecture } from '../services/lectureService';
import { addAttendance, getCurrentDate } from '../services/attendanceService';
import { copyStudentsData , dayOfWeek} from '../services/utils';
import TableStudents from '../components/TableStudents.vue';
//  @ts-ignore
import Modal from '../components/Modal.vue';
//  @ts-ignore
import ComboBox from '../components/ComboBox.vue';

import type { Student, Lecture, Attendance } from '../services/shemas';
// @ts-ignore
import ItemsModal from '@/components/ItemsModal.vue';
export default {
    data(){
        return{
            modalLectures: false,
            modalAddLecture: false,
            modalAddStudent: false,
            date: this.getCurrentDate(),
            attendance : {} as Attendance,
            selectedLectureId: 1 as Number,
            students: [] as Array<Student>,
            lectures: [] as Array<Lecture>
        }
    },
    name: "TestView",
    components: {Modal, TableStudents, ComboBox, ItemsModal},
    methods: {
        removeStudent(studentId: number) {
            removeStudent(studentId).then(() => this.fetchStudents().then((data) => (this.students = data)))
        },
        addLecture(name : string){
            if(name !== "")
                addLecture(name).then(() => this.fetchLectures().then((data) => (this.lectures = data)))
            else
               alert("Введите название пары")
        },
        removeLecture(lecture_id: number){
            removeLecture(lecture_id).then(() => this.fetchLectures().then((data) => (this.lectures = data)))
        },
        addStudent(name: string){
            if(name !== "")
                addStudent(name).then(() => this.fetchStudents().then((data) => (this.students = data)))
            else
                alert("Введите имя студента")
        },
        getCurrentDate,
        copyStudentsData,
        addAttendance(){
            this.attendance = {
                date: getCurrentDate(), // assuming getCurrentDate() returns the current date
                // @ts-ignore
                lecture_id: this.selectedLectureId,
                students: this.students.map((student) => ({
                  id: student.id,
                  name: student.name,
                  present: student.present,
                })),
            };
            if(this.attendance) {
                try{
                    addAttendance(this.attendance).then(() => this.fetchStudents().then((data) => (this.students = data)))
                    alert("успешно сохранено");
                }
                catch (error) {
                    console.error('Ошибка при сохранении:', error);
                    throw error;
                }
                
            }
        },
        dayOfWeek,
        fetchLectures,
        fetchStudents,
        updateStudent(studentId: number){
            this.students = this.students.map((student) => student.id === studentId ? { ...student, present: !student.present } : student);
        },
        toggleSelectedLecture(lectureId : number){
            this.selectedLectureId = lectureId;
        },
        handleConfirm(confirmedValue : string){
            console.info("Confirmed value:", confirmedValue);
        },
    },
    mounted() {
        fetchStudents().then((data) => (this.students = data));
        fetchLectures().then((data) => (this.lectures = data));
    }
}
</script>

<style>

</style>