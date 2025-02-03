<template>
   <section class=" text-black lg:py-16">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
         <div class="max-w-xl mx-auto text-center xl:max-w-2xl">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl xl:text-5xl mb-6">We are just
               getting started!</h2>
            <p class="mb-4">We are creating a tool that helps you be more productive and efficient when building
               websites and webapps</p>

         </div>
         <div 
            class="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
            
            <div class="relative" v-for="c in tables">
               <div class="absolute -inset-1">
                  <div
                     class="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
                  </div>
               </div>
               <div class="relative overflow-hidden bg-white shadow-md rounded-xl h-full hover:bg-slate-200" >
                  <div class="p-9">
                     <div class="">

                        <Icon :name="c.icon" size="30px"/>
                     </div>
                     <h3 class="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">{{c.title}}</h3>
                     <p class="mt-6 text-base text-gray-600">{{ c.descriptions }}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <UtilsLoading v-if="loading" />
</template>


<script setup>
   const loading = ref(false);

const tables = [
   {
      title: 'Realtime Collaboration',
      icon: 'svg-spinners:clock',
      descriptions: 'Collaborate in realtime with other editors in a project. See what othe editors are doing and edit even a simple text together'
   }, {
      title: 'History of Edits',
      icon: 'svg-spinners:blocks-shuffle-3',
      descriptions: 'Go back and forth your history of changes and restore your designs to any point in time'
   }, {
      title: 'Integrations',
      icon: 'game-icons:harry-potter-skull',
      descriptions: 'Step up your designs and workflow with integrations with your favourite tools such as mailchimp, slack, jira etc'
   }, {
      title: 'Publish webpage online',
      icon: 'game-icons:radioactive',
      descriptions: 'Effortlessly publish your webpages online and make it available to the world with a click of a button'
   }, {
      title: 'Forms and Data Collection',
      icon: 'game-icons:soccer-ball',
      descriptions: 'Collect data and information from users with forms built on windframe and sort through them in a nice interface'
   }, {
      title: 'Custom Domains',
      icon: 'unjs:automd',
      descriptions: 'Attach your own custom domain to your published projects or website on windframe'
   },

];
</script>