<template>
	<div class="text-xl p-3 font-bold">

		<h1>{{ user?.email }}</h1>
	</div>
	<div
		class="flex items-center justify-center bg-gray-600 rounded-full text-lg px-3 h-9 text-white font-semibold hover:bg-gray-900">
		<div>
			<button @click="handleButtonClick">
				<Icon name="dashicons:exit" title="Logout" /> {{ buttonchange }}
			</button>
			<UtilsConfirm ref="confirmRef" @close="onConfirm" />
		</div>
	</div>
</template>

<script lang="ts" setup>
const confirmRef = ref();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const email = ref();
const password = ref();
const buttonchange = ref('Login');

function openConfirm() {
	console.log('Opening confirm modal');
	if (confirmRef.value && typeof confirmRef.value.openModal === 'function') {
		confirmRef.value.openModal();
	} else {
		console.error('openModal method not found');
	}
}
function onConfirm(value: 'yes' | 'no') {
	console.log('Confirm value:', value);
	if (value == 'yes') {
		signOut();
		clearData();
		console.log('yes');
		window.location.href = '/login';
	} else if (value == 'no') {
		console.log('no');
	}
}

function clearData() {
	useCookie('email').value = null;
	useCookie('password').value = null;
	email.value = '';
	password.value = '';
}

const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) console.log(error);
	clearData();
	buttonchange.value = 'Login';
};

function getData() {
	email.value = useCookie('email').value;
	password.value = useCookie('password').value;
	if (email.value && password.value) {
		buttonchange.value = 'Logout';
	} else {
		buttonchange.value = 'Login';
	}
}
function handleButtonClick() {
	if (buttonchange.value === 'Login') {
		navigateTo({ name: 'login' });
	} else {
		openConfirm();
	}
}
onMounted(() => {
	getData();
})
</script>

<style></style>