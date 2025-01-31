<template>
	<div class="flex h-screen bg-gray-100">
		<!-- sidebar -->
		<div class="hidden md:flex flex-col w-64 bg-gray-800 ">
			<div class="flex items-center justify-center h-16 bg-gray-900 cursor-pointer">
				<Icon name="svg-spinners:bouncing-ball" class="text-white"/>
				<NuxtLink to="/" class="text-white font-bold uppercase">Robot</NuxtLink>
				<Icon name="svg-spinners:bouncing-ball" class="text-white"/>
			</div>
			<div class="flex flex-col flex-1 overflow-y-auto">
				<nav class="flex-1 px-2 py-4 bg-gray-800 ">
					<NuxtLink :to="m.link" v-for="m in menues"
						active-class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
						<a class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 cursor-pointer">
							<Icon :name="m.icon" />
							<span class="pl-2">{{ m.title }}</span>
						</a>
					</NuxtLink>
				</nav>
			</div>
		</div>

		<!-- Main content -->
		<div class="flex flex-col flex-1 overflow-y-auto">
			<div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
				<div class="flex items-center px-4">
					<button class="text-2xl">
						<Icon name="heroicons-outline:bars-3" />
					</button>
					<input class="mx-4 w-full border rounded-md px-4 py-2 m-2" type="text" placeholder="Search">
				</div>
				<div class="flex items-center pr-4">
					<TopProfile />
				</div>
			</div>
			<div class="p-4">
				<slot />
			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>

const menues = [
	{
		title: 'Home',
		icon: 'dashicons:admin-home',
		link: '/'
	}, {
		title: 'Orders',
		icon: 'icon-park-solid:buy',
		link: '/orders'
	}, {
		title: 'Category',
		icon: 'dashicons:cart',
		link: '/category'
	}, {
		title: 'Users',
		icon: 'heroicons:user-circle-solid',
		link: '/users'
	}, {
		title: 'comments',
		icon: 'lsicon:comments-filled',
		link: '/test'
	}, {
		title: 'Setting',
		icon: 'tabler:settings-filled',
		link: '/setting'
	},
];

</script>

<style></style>