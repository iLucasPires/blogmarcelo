<template>
  <UApp>
    <DesktopLoading />
    <div class="h-screen flex flex-col bg-black">
      <DesktopMenu />
      <DesktopBackground>
        <DesktopDock />
        <NuxtPage />
      </DesktopBackground>
    </div>
  </UApp>
</template>
