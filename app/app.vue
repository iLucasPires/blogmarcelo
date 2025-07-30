<template>
  <UApp>
    <Loading />
    <div class="h-screen flex flex-col bg-black">
      <GnomeMenu />
      <Background>
        <GnomeDock />
        <NuxtPage />
      </Background>
    </div>
  </UApp>
</template>
