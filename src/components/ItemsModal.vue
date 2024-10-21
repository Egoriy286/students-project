<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
  <div class="modal-content modal-box" @click.stop>
    
    <h1 class="text-lg font-bold">{{ title }}</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <button class="btn btn-sm btn-error " @click="removeItemConfirmation(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
      
    </table>
    
  </div>
  </div>
  <Modal class="modalInfo" 
    :content="'Вы уверены, что хотите удалить?'" 
    :title="'Подтверждение'"
    :show="openDialog"
    :yesnoForm="true"
    @close="openDialog = false" 
    @confirm="removeItems"></Modal>
</template>

<script lang="ts">

import { defineComponent, type PropType} from 'vue'
// @ts-ignore
import Modal from './Modal.vue';
import type { Lecture , Student} from '../services/shemas';
import { API_BASE_URL } from '../config';
export default defineComponent({
  data(){
      return{
          selectedItemId: null as number | null,
          openDialog: false,
          
      }
  },
  components: {Modal},
  props: {
    items: {
      type: Array as PropType<Lecture[]>,
      required: false
    },
    studentItems: {
      type: Array as PropType<Student[]>,
      required: false
    },
    show: {
        type: Boolean,
        default: false
    },
    title:{
        type: String,
        default: "Modal Table"
    },
    student:{
      type: Boolean,
      required: false,
      default: false
    },
  },
  emits: ['close','removeItem'],
  methods: {
    closeModal() {
        this.$emit("close");
    },
    removeItems() {
      this.$emit("removeItem", this.selectedItemId)
    },
    removeItemConfirmation(studentId : number) {
        if(this.student){
          this.removeAttendance(studentId)
          
        }else{
          this.openDialog = true;
        }
        this.selectedItemId = studentId;
        
    },
    async removeAttendance(attendanceId: number) {
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
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: fixed;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>

