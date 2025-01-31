<template>
  <div>
    username: {{ email }} <br>
    password: {{ password }}
  </div>
  <button @click="saveStorage" class="rounded bg-indigo-900 p-2 mx-5">save storage</button>
  <button @click="" class="rounded bg-indigo-400 ">get storage</button>
  <!-- getData -->
</template>

<script lang="ts" setup>
const email = ref();
const password = ref();

function saveStorage() {
  // localStorage.setItem('username', 'brotherly');
  // localStorage.setItem('password', 'password');
  useCookie('email').value = 'leap';
  useCookie('password').value = '1111';
}
// function getData() {
//   // email.value = localStorage.getItem('email');
//   // password.value = localStorage.getItem('password');
//   email.value = useCookie('email').value;
// 	password.value = useCookie('password').value;
// }
onMounted(() => {
  // getData();
})
</script>

<style>

</style>