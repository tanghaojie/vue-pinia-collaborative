<script lang="ts">
import { defineComponent } from 'vue'
import type { StoreInstance } from './stores/collaborateStore'
export default defineComponent({
  name: 'PageView',
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, inject, onUnmounted } from 'vue'
//@ts-ignore
import vueDraggableResizableTs from 'vue-draggable-resizable-ts'
import 'vue-draggable-resizable-ts/dist/VueDraggableResizableTs.css'
//@ts-ignore
import { useYjsStoreUnionUndoManager } from '@/libs/collaborative.js'

const collaborateStore = inject<{
  store: StoreInstance | undefined
}>('collaborateStores')?.store!

const components = computed(() => collaborateStore.components)
const comIds = computed(() => Reflect.ownKeys(components.value) as string[])

function dragging(id: string, x: number, y: number) {
  collaborateStore.setComponent(id, x, y)
}

function resizing(id: string, x: number, y: number, w: number, h: number) {
  collaborateStore.setComponent(id, x, y, w, h)
}

function del(id: string) {
  collaborateStore.delComponent(id)
}

function add() {
  collaborateStore.addComponent()
}

const { enable, updateStore, undoEnable, redoEnable, undo, redo } = useYjsStoreUnionUndoManager({
  uniqueStoreKey: collaborateStore,
})

const unwatchStore = watch(
  function () {
    return collaborateStore
  },
  function () {
    updateStore('uniqueStoreKey', collaborateStore)
  }
)

onMounted(function () {
  if (window.self !== window.top) {
    const app = document.getElementById('app')
    app && (app.style.height = '100%')
  }
})

onUnmounted(function () {
  unwatchStore && unwatchStore()
})
</script>

<template>
  <div class="pageview">
    <vue-draggable-resizable-ts
      v-for="id in comIds"
      :key="id"
      :style="{
        backgroundColor: components[id].bg,
      }"
      resizable
      :x="components[id].x"
      :y="components[id].y"
      :w="components[id].w"
      :h="components[id].h"
      :minWidth="50"
      :minHeight="50"
      :maxWidth="200"
      :maxHeight="200"
      @dragging="(x: number, y: number) => dragging(id, x, y)"
      @resizing="(x: number, y: number, w: number, h: number) => resizing(id, x, y, w, h)"
      class="com showResizeArea"
    >
      {{ `Component id: ${id}` }}

      <div @click="del(id)" class="del">del</div>
    </vue-draggable-resizable-ts>
    <div @click="add()" class="add">+</div>
    <div @click="undo()" class="undo" :class="{ canUndo: undoEnable }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"
        />
      </svg>
    </div>
    <div @click="redo()" class="redo" :class="{ canRedo: redoEnable }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M10.573 3.021h7.427v-3.021l6 5.39-6 5.61v-3h-7.427c-3.071 0-5.561 2.356-5.561 5.427 0 3.071 2.489 5.573 5.561 5.573h7.427v5h-7.427c-5.84 0-10.573-4.734-10.573-10.573s4.733-10.406 10.573-10.406z"
        />
      </svg>
    </div>
  </div>
</template>

<style>
.pageview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.com {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.com:hover .del {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 8px;
  right: 8px;
  background-color: #929898;
  border: solid gray 1px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: white;
  border-radius: 16px;
}

.add {
  position: fixed;
  top: 32px;
  left: 32px;
  width: 48px;
  height: 48px;
  font-size: 32px;
  color: white;
  background: rgb(39, 103, 186);
  cursor: pointer;
  text-align: center;
  border-radius: 12px;
}

.undo {
  position: fixed;
  top: 120px;
  left: 32px;
  width: 48px;
  height: 48px;
  font-size: 32px;
  color: white;
  background: rgb(129, 129, 129);
  cursor: pointer;
  text-align: center;
  border-radius: 12px;
}

.undo.canUndo {
  background: rgb(23, 104, 20);
}

.redo {
  position: fixed;
  top: 170px;
  left: 32px;
  width: 48px;
  height: 48px;
  font-size: 32px;
  color: white;
  background: rgb(129, 129, 129);
  cursor: pointer;
  text-align: center;
  border-radius: 12px;
}

.redo.canRedo {
  background: rgb(23, 104, 20);
}

.add:hover {
  background: rgb(20, 66, 127);
}

.del {
  display: none;
}

.showResizeArea > div {
  opacity: 1 !important;
}

.showResizeArea > .handle {
  background: white !important;
}
</style>
