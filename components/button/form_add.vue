<template>
  <div id="modelConfirm" v-if="isOpen"
    class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {{ isEditMode ? 'Edit Order' : 'Insert to Supabase' }}
            </p>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Name
                <input required v-model="formData.name" placeholder="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="name" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Address
                <input required v-model="formData.address" placeholder="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="address" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Price
                <input required v-model="formData.price" placeholder="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="price" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                City
                <input required v-model="formData.city" placeholder="city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="city" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Zip Code
                <input required v-model="formData.zip_code" placeholder="zip_code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="zip_code" type="text">
              </label>
            </div>
            <button
              class="w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-green-800 text-white"
              type="submit">
              {{ isEditMode ? 'Save Changes' : 'Save' }}
            </button>
            <button
              class="w-full bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-red-800 text-white"
              type="button" @click="closeModal('no')">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <Alert v-if="showAlert">
    <AlertTitle>{{ alertMessage }}</AlertTitle>
    <AlertDescription>
      {{ alertDescription }}
    </AlertDescription>
  </Alert>

  <UtilsLoading v-if="loading" />
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const emit = defineEmits(['close']);
const props = defineProps(['selected']);
const loading = ref(false);
const supabase = useSupabaseClient();
const isOpen = ref(false);
const isEditMode = ref(false);
const showAlert = ref(false);
const alertMessage = ref('');
const alertDescription = ref('');

const formData = reactive({
  id: null,
  name: '',
  address: '',
  price: '',
  city: '',
  zip_code: ''
});

function clearData() {
  formData.id = null;
  formData.name = '';
  formData.address = '';
  formData.price = '';
  formData.city = '';
  formData.zip_code = '';
}

function openModal() {
  if (props.selected) {
    isEditMode.value = true;
    formData.id = props.selected.id;
    formData.name = props.selected.name;
    formData.address = props.selected.address;
    formData.price = props.selected.price;
    formData.city = props.selected.city;
    formData.zip_code = props.selected.zip_code;
  } else {
    isEditMode.value = false;
    clearData();
  }
  isOpen.value = true;
}

function closeModal(value: 'yes' | 'no') {
  isOpen.value = false;
  emit('close', value);
}

defineExpose({
  openModal
});

const handleSubmit = async () => {
  try {
    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue)) {
      alert('Price must be a number.');
      return;
    }

    let error;
    if (isEditMode.value && formData.id) {
      ({ error } = await supabase
        .from('orders')
        .update({
          name: formData.name ,
          address: formData.address,
          price: priceValue,
          city: formData.city,
          zip_code: formData.zip_code,
        })
        .eq('id', formData.id));
    } else {
      ({ error } = await supabase
        .from('orders')
        .insert([{
          name: formData.name,
          address: formData.address,
          price: priceValue,
          city: formData.city,
          zip_code: formData.zip_code,
        }]));  
    }

    if (error) {
      console.error('Supabase error:', error);
      alert(`Failed to process the order: ${error.message}`);
      return;
    }

    alertMessage.value = isEditMode.value ? 'Order successfully updated!' : 'Order successfully inserted!';
    alertDescription.value = 'The order has been processed successfully.';
    showAlert.value = true;

    setTimeout(() => {
      showAlert.value = false;
    }, 5000); // Hide alert after 5 seconds
    closeModal('yes');
    clearData();
  } catch (error) {
    console.error('Unexpected error:', error);
    alert('Failed to process the order. Please try again.');
  }
};
</script>
