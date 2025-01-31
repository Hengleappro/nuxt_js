<template>
  <div id="modelConfirm" v-if="isOpen"
    class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
    <form @submit.prevent="AddOrders">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Insert to supabase
            </p>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Name
                <input required v-model="name" placeholder="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="name" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Price
                <input required v-model="price" placeholder="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="price" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Address
                <input required v-model="address" placeholder="address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="address" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                City
                <input required v-model="city" placeholder="city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="city" type="text">
              </label>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Zip_code
                <input required v-model="zip_code" placeholder="zip_code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="zip_code" type="text">
              </label>
            </div>
            <button
              class="w-full bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-green-800 text-white"
              type="submit">
              Save
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
</template>

<script lang="ts" setup>
const emit = defineEmits(['close']);
const props = defineProps(['selected']);

const name = ref('');
const address = ref('');
const price = ref('');
const city = ref('');
const zip_code = ref('');
const supabase = useSupabaseClient();

const isOpen = ref(false);
function openModal() {
  console.log(props.selected)
  if (props.selected) {
    name.value = props.selected.name;
    address.value = props.selected.address;
    price.value = props.selected.price;
    city.value = props.selected.city;
    zip_code.value = props.selected.zip_code;
  }
  isOpen.value = true;
}
function closeModal(value: 'yes' | 'no') {
  isOpen.value = false;
  emit('close', value);
}
defineExpose({
  openModal
})

function clearData() {
  name.value = '';
  address.value = '';
  price.value = '';
  city.value = '';
  zip_code.value = '';
}

const AddOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        name: name.value,
        address: address.value,
        price: price.value,
        city: city.value,
        zip_code: zip_code.value,
      }])
      .select();
    if (error) throw error;
    alert('Order successfully inserted!');
    clearData();
    closeModal('yes'); // Close the modal after successful insertion
  } catch (error) {
    alert('Failed to insert the order. Please try again.');
  }
};
</script>
