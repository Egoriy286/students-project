<template>
    <!-- Список студентов -->
    <table class="table">

        <thead>
            <tr>
              <th>Номер</th>
              <th>Имя студента</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody v-for="(student, index) in students" :key="index">
            <tr @click="toggleAttendanceTrue(index)">
              <th>{{ index+1 }}</th>
              <td><strong  :style="{ color: student.present ? 'green' : 'red' }">{{ student.name }}</strong></td>
              <td><button @click="removeStudentConfirmation(student.id)" @click.stop class="btn btn-sm btn-error ml-2">del</button> <!-- Кнопка удаления --></td>
            </tr>
          </tbody>
    </table>
    <Modal :content="'Вы уверены, что хотите удалить?'" 
            :title="'Подтверждение'"
            :show="openDialog"
            :yesnoForm="true"
            @close="openDialog = false" 
            @confirm="removeStudent(selectedStudentId)"></Modal>
    
</template>

<script lang="ts">  
import type { Student } from '../services/shemas';
import { defineComponent, defineProps } from 'vue';
// @ts-ignore
import Modal from './Modal.vue';

export default defineComponent({
    name: "TableStudents",
    data(){
        return {
            openDialog: false,
            selectedStudentId: 0,
        }
    },
    components: {Modal},
    props: {
        students: {
            type: Array<Student>,
            required: true
        },
    },
    emits: ["removeStudent","fetchStudents","updateStudent"],
    methods: {
        removeStudentConfirmation(studentId : number) {
            this.selectedStudentId = studentId;
            this.openDialog = true;
        },
        removeStudent(studentId : number){
            this.$emit("removeStudent", studentId) 
            this.$emit("fetchStudents", null) 
        },
        toggleAttendanceTrue(index: number) {
            this.students[index].present = !this.students[index].present;
            this.$emit("updateStudent", this.students[index])
        },
    }
}) 
</script>

<style>

</style>