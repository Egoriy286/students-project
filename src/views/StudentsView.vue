<template>
    <!-- Your template code here -->
     <div>
        <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Present</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="(item, index) in studentData" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.present }}</td>
          <td>
            <button class="btn btn-sm btn-error " @click="removeItemConfirmation(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
     </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import {defineComponent, type PropType} from 'vue';
import type { Student } from '../services/shemas';
import { removeAttendance } from '../services/attendanceService';
export default defineComponent({
    name: "students",
    data(){
        return {
            openDialog: false,
            selectedItemId: 0,
        }
    },
    props:{
        studentData:{
            type: Array as PropType<Student[]>,
            required: false,
        } 
    },
    setup(props) {
    const route = useRoute()
     //Если проп studentData не передан, берем данные из query
    const studentData = props.studentData || (route.query.studentData ? JSON.parse(route.query.studentData as string) : null)
    return {
      studentData,
    };
    
  },
  methods:{
    removeItems() {
      this.$emit("removeItem", this.selectedItemId)
    },
    removeItemConfirmation(studentId : number) {
      alert("Вы точно хотите удалить")
        if(this.studentData){
          removeAttendance(studentId)
          
        }else{
          this.openDialog = true;
        }
        this.selectedItemId = studentId;
        
    },
  }
});
</script>

<style>

</style>