<template>
  <Loading />
  <UApp>
    <div class="h-screen flex flex-col pb-2 px-2 bg-neutral-950">
      <Navbar />
      <div
        class="flex-1 flex flex-col gap-10 p-0 md:p-10 rounded-lg overflow-y-auto"
        style="
          background: url('/images/background.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-position: center;
        "
      >

        <Dock />
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template>
