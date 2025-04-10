<template>
  <Loading />
  <UApp>
    <div class="fixed inset-0 object-cover ">
      <Backgroud />
    </div>

    <div class="inset-0 absolute py-10">
      <UContainer>
        <Navbar />
        <div class="flex flex-col gap-10 w-full h-full py-10">
          <NuxtPage />
        </div>
      </UContainer>
    </div>
  </UApp>
</template>
