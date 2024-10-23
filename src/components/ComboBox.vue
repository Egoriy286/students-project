<template>
    <select 
      @change="handleItemClick($event)" 
      class="select select-bordered w-full max-w-xs"
    >
      <option 
        v-for="(item, index) in items" 
        :key="index" 
        :value="item.id" 
        class="text-base"
        :selected="item.id === selectedId"
      >
        {{ item.name || item }}
      </option>
    </select>
  </template>
  
  <script lang="ts">
  export interface Lecture {
    id: number;
    name: string;
  }
  
  export default {
    name: "ComboBox",
    props: {
      /**
       * List of lectures to populate the select box.
       */
      items: {
        type: Array as () => Lecture[],
        required: true
      },
      /**
       * The currently selected lecture's ID.
       */
      selectedId: {
        type: Number,
        required: false
      }
    },
    emits: {
      /**
       * Emitted when a lecture is selected, passing the selected lecture object.
       */
      "item-clicked": (item: Lecture) => true,
      /**
       * Emitted when a lecture is selected, passing the selected lecture's ID.
       */
      "selected-item-id": (itemId: number) => true
    },
    methods: {
      handleItemClick(event: Event): void {
        const selectedItemId = Number((event.target as HTMLSelectElement).value);
        const selectedItem = this.items.find(item => item.id === selectedItemId);
  
        if (selectedItem) {
          this.$emit("item-clicked", selectedItem);
          this.$emit("selected-item-id", selectedItem.id);
        } else {
          console.warn("Selected item is missing an 'id' property.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add CSS styles here if needed */
  </style>
  