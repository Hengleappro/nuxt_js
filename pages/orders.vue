<template>
  <div>
    <button @click="openOrderFormModal"
      class="ml-2 px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-red active:bg-green-600 transition duration-150 ease-in-out">Add
      <Icon name="gridicons:plus" class="text-lg" />
    </button>
    <ButtonFormAdd :selected="selectedOrder" ref="orderFormModal" @close="handleModalClose" />
    <div class="flex flex-col mt-4">
      <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-white border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Address</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">City</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Zip_Code</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="order.id" class="bg-gray-100 border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ (currentPage - 1) * limit + index + 1 }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ order.name }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ order.address }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ order.price }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ order.city }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ order.zip_code }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button @click="onEdit(order)"
                      class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit
                      <Icon name="ion:create-outline" class="text-lg" />
                    </button>
                    <button @click="onDelete(order)"
                      class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                      Delete
                      <Icon name="gridicons:trash" class="text-lg" />
                    </button>
                    <ButtonFormDelete :is-open="isConfirmOpen" @confirm="handleConfirm" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Pass currentPage, totalPages, and handle next/prev events -->
  <UtilsPagination :currentPage="currentPage" :totalCount="totalCount" :limit="limit"
    @pageChange="handlePageChange" />
</template>

<script lang="ts" setup>

const orders = ref([]);
const supabase = useSupabaseClient();
const orderFormModal = ref(null);
const selectedOrder = ref(null);
const isConfirmOpen = ref(false);
let orderToDelete: { id: number; } | null = null;
const currentPage = ref(1);
const limit = ref(5);
const totalCount = ref(0);


// ========================================= Fetch orders from Supabase with pagination =========================================

// Fetch orders based on the current page
const fetchOrders = async () => {
  const { data, error, count } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .range((currentPage.value - 1) * limit.value, currentPage.value * limit.value - 1);

  if (error) {
    console.error('Error fetching orders:', error.message);
  } else {
    orders.value = data;
    totalCount.value = count || 0;
  }
};

// Handle page change
function handlePageChange(page: number) {
  currentPage.value = page;
  fetchOrders();
}

// ========================================= Open the order form modal =========================================

function openOrderFormModal() {
  if (orderFormModal.value) {
    orderFormModal.value.openModal();
  }
}

// function edit
async function onEdit(order: null) {
  selectedOrder.value = order;
  await nextTick(); // Wait for the DOM to update
  openOrderFormModal();
}


// ========================================= Delete an order by ID =========================================

async function deleteOrder(orderId: number) {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId); // Delete the order with matching id
    if (error) {
      console.log('Error deleting order:', error.message);
    } else {
      // Remove the deleted order from the local data
      orders.value = orders.value.filter(order => order.id !== orderId);
    }
  } catch (error) {
    console.log('Caught Error:', error);
  }
}

function onDelete(order: { id: number; } | null) {
  orderToDelete = order;
  isConfirmOpen.value = true;
}

// =========================================  Handle =========================================
// Handle modal close
function handleModalClose(value: 'yes' | 'no') {
  if (value === 'yes') {
    fetchOrders();
  }
}

//  Handle confirmation dialog result
function handleConfirm(value: 'yes' | 'no') {
  isConfirmOpen.value = false;
  if (value === 'yes' && orderToDelete) {
    deleteOrder(orderToDelete.id);
  }
  orderToDelete = null;
}

// Fetch orders when the component is mounted
onMounted(() => {
  fetchOrders();
});
</script>