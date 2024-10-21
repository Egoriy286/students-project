<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
  <div class="modal-content modal-box" @click.stop>
    <button @click="copyStudentsData(items.filter(student => student.present))" class="btn btn-sm btn-success mb-2">Копировать</button>
    <h1 class="text-lg font-bold">Пара: {{ title }} ({{date}})</h1>
    <table class="table">
      <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Presents</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.present }}</td>
          <td>
            <button class="btn btn-sm btn-error " @click="removeItemConfirmation(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
      
    </table>
  </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, type Prop, type PropType} from 'vue'
// @ts-ignore
import Modal from './Modal.vue';
import type { Student} from '../services/shemas';
import { API_BASE_URL } from '../config';
import { copyStudentsData } from '../services/utils';
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
      type: Array as PropType<Student[]>,
      required: false,
      default: [{id: 1, name: "Test", present: false}] as Student[]
    },
    show: {
        type: Boolean,
        default: false
    },
    title:{
        type: String,
        default: "Modal Table"
    },
    date:{
      type: String,
      default: "01.01.2023"
    }
  },
  emits: ['close','removeItem'],
  methods: {
    copyStudentsData,
    closeModal() {
        this.$emit("close");
    },
    removeItems() {
      this.$emit("removeItem", this.selectedItemId)
    },
    removeItemConfirmation(studentId : number) {
      this.selectedItemId = studentId;
      if(confirm("Вы точно хотите удалить?")) 
        this.removeItems()
        this.items?.splice(this.items.findIndex(item => item.id === this.selectedItemId), 1)
    },
    
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

