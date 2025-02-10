<template>
	<div class="flex h-screen bg-gray-100">
		<!-- sidebar -->

		<!-- Robot -->
		<div class="hidden md:flex flex-col w-64 bg-gray-800">
			<div
				class="py-4 text-2xl uppercase text-center tracking-widest bg-gray-900 border-b-2 border-b-gray-500">
				<Icon name="svg-spinners:bouncing-ball" class="text-white" />
				<NuxtLink to="/" class="text-white font-bold uppercase">Robot</NuxtLink>
				<Icon name="svg-spinners:bouncing-ball" class="text-white" />
			</div>

			<nav class="text-sm text-gray-300">
				<ul class="flex flex-col">
					<li class="px-4 cursor-pointer hover:bg-gray-700  hover:text-white">
						<a class="py-3 flex items-center" href="/">
							<Icon name="guidance:computer-room" class="mr-3" />
							<NuxtLink to="/">Dashboard</NuxtLink>
						</a>
					</li>

					<!-- USER MANAGEMENT Section -->
					<li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">USER MANAGEMENT</li>
					<li v-for="(menuItem, index) in userManagementMenu" :key="index"
						class="px-4 cursor-pointer hover:bg-gray-700">
						<a class="py-3 flex items-center" :href="menuItem.link">
							<Icon :name="menuItem.icon" class="mr-3" />
							<NuxtLink :to="menuItem.link">{{ menuItem.title }}</NuxtLink>
						</a>
					</li>

					<!-- PRODUCT MANAGEMENT Section -->
					<li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">PRODUCT MANAGEMENT
					</li>
					<li v-for="(menuItem, index) in productManagementMenu" :key="index"
						class="px-4 cursor-pointer hover:bg-gray-700">
						<a class="py-3 flex items-center" :href="menuItem.link">
							<Icon :name="menuItem.icon" class="mr-3" />
							<NuxtLink :to="menuItem.link">{{ menuItem.title }}</NuxtLink>
						</a>
					</li>

					<!-- eCommerce Section -->
					<li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">ecommerce</li>
					<li v-for="(menuItem, index) in ecommerceMenu" :key="index"
						class="px-4 cursor-pointer hover:bg-gray-700">
						<a class="py-3 flex items-center" :href="menuItem.link">
							<Icon :name="menuItem.icon" class="mr-3" />
							<NuxtLink :to="menuItem.link">{{ menuItem.title }}</NuxtLink>
						</a>
					</li>

					<!-- INFORMATION MANAGEMENT Section -->
					<li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">INFORMATION
						MANAGEMENT</li>
					<li v-for="(menuItem, index) in informationManagementMenu" :key="index"
						class="px-4 cursor-pointer hover:bg-gray-700">
						<a class="py-3 flex items-center" :href="menuItem.link">
							<Icon :name="menuItem.icon" class="mr-3" />
							<NuxtLink :to="menuItem.link">{{ menuItem.title }}</NuxtLink>
						</a>
					</li>

					<!-- Apps Section -->
					<li class="px-4 py-2 mt-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Apps</li>
					<li v-for="(menuItem, index) in appsMenu" :key="index"
						class="px-4 cursor-pointer hover:bg-gray-700">
						<a href="#" class="py-2 flex items-center">
							<Icon :name="menuItem.icon" class="mr-3" />
							<NuxtLink :to="menuItem.link">{{ menuItem.title }}</NuxtLink>
							<span v-if="menuItem.notifications"
								class="ml-auto text-xs bg-gray-500 px-2 py-1 rounded-sm">{{ menuItem.notifications
								}}</span>
						</a>
					</li>
				</ul>
			</nav>
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

<script>
export default {
  data() {
    return {
      userManagementMenu: [
        { title: 'Users', link: '/', icon: 'heroicons:users' },
        { title: 'Roles', link: '/', icon: 'oui:app-users-roles' },
        { title: 'Permissions', link: '/', icon: 'icon-park-outline:permissions' }
      ],
      productManagementMenu: [
        { title: 'Categories', link: '/', icon: 'fluent-emoji-high-contrast:open-file-folder' },
        { title: 'Products', link: '/', icon: 'fluent:shopping-bag-tag-32-regular' }
      ],
      ecommerceMenu: [
        { title: 'Orders', link: '/orders', icon: 'carbon:shopping-cart' },
        { title: 'Payments', link: '/', icon: 'material-symbols-light:payments-outline' }
      ],
      informationManagementMenu: [
        { title: 'Reports', link: '/', icon: 'material-symbols-light:energy-program-time-used-outline-sharp' }
      ],
      appsMenu: [
        { title: 'Messages', link: '/', icon: 'arcticons:messages-2', notifications: 16 },
        { title: 'Settings', link: '/', icon: 'hugeicons:setting-07' }
      ]
    };
  }
};
</script>