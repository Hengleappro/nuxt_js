<template>
  <div v-if="showAlert" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
    <p class="text-lg font-semibold">Order Status: Confirmed</p>
    <p>Your order has been added successfully and is now being processed.</p>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  isSuccess: {
    type: Boolean,
    required: true,
  },
});

const showAlert = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

// Watch for changes in `isSuccess` prop
watch(
  () => props.isSuccess,
  (newValue) => {
    if (newValue) {
      showAlert.value = true;
      // Hide the alert after 4 seconds
      timeoutId = setTimeout(() => {
        showAlert.value = false;
      }, 4000);
    }
  },
  { immediate: true }
);

// Cleanup the timeout when the component is unmounted
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>