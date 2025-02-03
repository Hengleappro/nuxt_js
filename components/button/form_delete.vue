<template>
  <div id="modelConfirm" v-if="isOpen"
    class="fixed z-50 inset-0 bg-gray-500 bg-opacity-10 overflow-y-auto h-full w-full px-4">
    <div class="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
      <div class="flex justify-end p-2" @click="closeModal('no')">
        <button onclick="closeModal('modelConfirm')" type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="p-6 pt-0 text-center ">
        <Icon name="gridicons:trash" class="w-20 h-20  mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
        <h3 class="text-xl font-normal text-gray-600 mt-5 mb-6">Are you sure you want to Delete?</h3>
        <a href="#" @click="closeModal('yes')"
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
          Delete
        </a>
        <a href="#" @click="closeModal('no')"
          class="text-gray-900 bg-white hover:bg-gray-300 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
          data-modal-toggle="delete-user-modal">
          No, cancel
        </a>
      </div>
    </div>
  </div>
  <UtilsLoading v-if="loading" />
</template>

<script setup lang="ts">
const loading = ref(false);
const emit = defineEmits(['confirm']);
const props = defineProps(['isOpen']);

function closeModal(value: 'yes' | 'no') {
  emit('confirm', value);
}

</script>