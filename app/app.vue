<template>
  <UApp>
    <Loading />
    <div class="h-screen flex flex-col bg-neutral-950">
      <GnomeMenu />
      <Background>
        <GnomeDock />
        <NuxtPage />
      </Background>
    </div>
  </UApp>
</template>
