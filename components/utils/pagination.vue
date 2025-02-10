<template>

  
  <div class="flex items-center justify-between p-4 ">
    <button @click="prevPage" :disabled="currentPage === 1"
      class="px-3 py-1 bg-blue-200 rounded hover:bg-blue-500 cursor-pointer shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
      <icon name="mdi:arrow-left-bold" />
      Previous
    </button>
    <span class="text-sm text-gray-700 dark:text-gray-400 ">Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages"
      class="px-3 py-1 bg-blue-200 rounded shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:bg-blue-500 cursor-pointer ">
      Next
      <icon name="mdi:arrow-right-bold" />
    </button>

  </div>
</template>

<script lang="ts" setup>


const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['pageChange']);

// Calculate total pages
const totalPages = computed(() => Math.ceil(props.totalCount / props.limit));

// Handle next page
function nextPage() {
  if (props.currentPage < totalPages.value) {
    emit('pageChange', props.currentPage + 1);
  }
}

// Handle previous page
function prevPage() {
  if (props.currentPage > 1) {
    emit('pageChange', props.currentPage - 1);
  }
}
</script>