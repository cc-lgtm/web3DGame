<script setup lang="ts">
  import { Engine } from 'babylonjs'
  import { onMounted } from 'vue'
  import { createScene } from './createScene'

  onMounted(async () => {
    const canvas = document.querySelector('.gameCanvas') as HTMLCanvasElement
    const engine = new Engine(canvas)
    const scene = await createScene(engine, canvas)
    engine.runRenderLoop(() => {
      scene.render()
    })
  })
</script>

<template>
  <canvas class="gameCanvas"></canvas>
</template>

<style>
html,
body,
.gameCanvas,
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
