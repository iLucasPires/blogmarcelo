<template>
  <Loading />
  <UApp>
    <div class="fixed inset-0 flex">
      <ClientOnly>
        <NuxtImg src="/images/background.png" class="w-full h-full" />
      </ClientOnly>
    </div>

    <div class="inset-0 absolute py-10 flex flex-col h-full">
      <UContainer class="flex-1 flex flex-col">
        <Navbar />
        <div class="flex-1 flex flex-col gap-10 py-10">
          <NuxtPage />
        </div>
      </UContainer>
    </div>
  </UApp>
</template>
