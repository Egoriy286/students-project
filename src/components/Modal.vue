
<template>
 
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content modal-box" :class="{'modal-yesno': yesnoForm}" @click.stop>
        <h1 class="text-lg font-bold">{{ title }}</h1>
        <p class="py-4 pb-0">{{ content }}</p>
        <div v-if="yesnoForm" >
            <button @click="confirmModal" class="btn btn-sm btn-outline mt-2 ml-2">Да</button>
            <button @click="closeModal" class="btn btn-sm btn-outline mt-2 ml-2">Нет</button>
        </div>
        <div v-if="addForm">
            <input v-model="modalValue" :placeholder="placeholder"  class="input input-bordered input-info input-sm w-full max-w-xs"/>
            <button @click="confirmModal" class="btn btn-sm btn-outline mt-2 ml-2">Добавить</button>
        </div >
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return {
            modalValue: ""
        }
    },
    name: "ModalComponent",
    emits: ["close", "confirm"],
    props: {
        show: {
            type: Boolean,
            default: false
        },
        placeholder:{
            type: String,
            required: false,
            default: "Введите название"
        },
        title:{
            type: String,
            default: "Modal Title"
        },
        content:{
            type: String,
            default: "Modal Content"
        },
        yesnoForm:{
            type: Boolean,
            requred: false
        },
        addForm:{
            type: Boolean,
            requred: false
        }
    },
    
    methods: {
        closeModal() {
            this.$emit("close");
        },
        confirmModal() {
            // Emit the 'confirm' event with the current value
            this.$emit("confirm", this.modalValue);
            this.closeModal();
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
  width: 100%;
  position: fixed;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.modal-yesno{
    width: auto;
}
</style>