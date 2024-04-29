<script setup lang="ts">
import { useCollaborateStore, type StoreInstance } from '@/stores/collaborateStore'
import PageView from './PageView.vue'
import { provide, ref, shallowReactive, watch, type WatchStopHandle } from 'vue'

const connected = ref(false)
const collaborateStore = shallowReactive<{
  store: StoreInstance | undefined
}>({
  store: undefined,
})

provide('collaborateStores', collaborateStore)

useCollaborateStore()
  .then(function (store) {
    // console.log(store)
    monitorConnectionStatus(store)
    collaborateStore.store = store
    connected.value = true
  })
  .catch(function (err: any) {
    console.error(err)
    // alert(`Connect Error. ${JSON.stringify(err)}`)
  })

let unwatchStoreConn: WatchStopHandle | undefined
function monitorConnectionStatus(s: StoreInstance) {
  unwatchStoreConn && unwatchStoreConn()

  unwatchStoreConn = watch(
    function () {
      // @ts-ignore
      return s.$yState?.connectStatus
    },
    function (val) {
      console.log(`Connect status change: ${val}`)

      if (val === 'connected') {
        connected.value = true
      } else {
        connected.value = false
      }
    }
  )
}
</script>

<template>
  <div class="app">
    <PageView v-if="connected"></PageView>
    <div v-else>Loading</div>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
