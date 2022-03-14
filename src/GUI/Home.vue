<script lang="ts" setup>
  import { startGame, continueGame, settingGame, aboutGame } from './../utils'
</script>

<template>
  <div class="home">
    <div class="menu">
      <div class="btn" @click="startGame">开始游戏</div>
      <div class="btn" @click="continueGame">继续游戏</div>
      <div class="btn" @click="settingGame">设置</div>
      <div class="btn" @click="aboutGame">关于</div>
    </div>
  </div>
</template>

<style>
.home {
  width: 100%;
  height: 100%;
  /* background-image: url('src/assets/images/mainBG.jpg');
  background-size: 100% 100%; */
  position: absolute;
  top: 0;
  left: 0;
}
.menu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.btn {
  width: 150px;
  height: 80px;
  background-image: url('src/assets/images/button.png');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 2px 5px #ccc;
  font-weight: 600;
  cursor: pointer;
}
.btn:active {
  color: #2c3e50;
}
</style>