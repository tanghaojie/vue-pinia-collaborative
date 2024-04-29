import { ref, computed, reactive, readonly, type DeepReadonly } from 'vue'
import {
  defineStore,
  type Store,
  type _ExtractActionsFromSetupStore,
  type _ExtractGettersFromSetupStore,
  type _ExtractStateFromSetupStore,
} from 'pinia'
//@ts-ignore
import {
  defineAsyncYjsUniqueCollaborativeStore,
  useCollaborativeStoreActions,
  //@ts-ignore
} from '@/libs/collaborative/dist/collaborative'
import { generateId, randomColor } from '@/libs/collaborative/dist/utils'

const STORE_ID = 'CollaborateStore'
const ROOMNAME = 'yjs-unique-roomname'
const ROOTNAME = 'components'

type ComponentConfig = { x: number; y: number; w: number; h: number; bg: string }

type CollaborateStoreData = Record<string, ComponentConfig>

export interface IStoreState {
  [ROOTNAME]: DeepReadonly<CollaborateStoreData>
  setComponent: (id: string, x: number, y: number, w?: number, h?: number) => void
  addComponent: () => void
  delComponent: (id: string) => void
}

type YjsStoreInstance<StoreId extends string, SS> = Store<
  StoreId,
  _ExtractStateFromSetupStore<SS>,
  _ExtractGettersFromSetupStore<SS>,
  _ExtractActionsFromSetupStore<SS>
>

export type StoreInstance = YjsStoreInstance<typeof STORE_ID, IStoreState>

export async function useCollaborateStore() {
  const awareness: Record<string, string> = {
    username: Date.now().toString(),
  }
  const params: Record<string, string> = {
    auth: '',
  }

  const store: StoreInstance = await defineAsyncYjsUniqueCollaborativeStore(
    STORE_ID,
    ROOMNAME,
    function (): IStoreState {
      const internalData = reactive<CollaborateStoreData>({})

      const readonlyData = readonly(internalData)

      const storeRef = computed(() => store)
      function setComponent(id: string, x: number, y: number, w?: number, h?: number) {
        const s = storeRef.value
        // @ts-ignore
        s.yTransact(function () {
          // @ts-ignore
          s.yAddorUpdateByKeyPath([id, 'x'], x)
          // @ts-ignore
          s.yAddorUpdateByKeyPath([id, 'y'], y)
          // @ts-ignore
          w && s.yAddorUpdateByKeyPath([id, 'w'], w)
          // @ts-ignore
          h && s.yAddorUpdateByKeyPath([id, 'h'], h)
        })
      }

      function addComponent() {
        const s = storeRef.value
        const uid = generateId()
        const com: ComponentConfig = {
          x: Math.floor(Math.random() * 500),
          y: Math.floor(Math.random() * 300),
          w: Math.floor(Math.random() * 150 + 50), // 50 -200
          h: Math.floor(Math.random() * 150 + 50), // 50 -200
          bg: `#${randomColor()}`,
        }

        // @ts-ignore
        s.yTransact(function () {
          // @ts-ignore
          s.yAddorUpdateByKeyPath([uid], com)
        })
      }

      function delComponent(id: string) {
        const s = storeRef.value
        // @ts-ignore
        s.yTransact(function () {
          // @ts-ignore
          s.yDeleteByKeyPath([id])
        })
      }

      return {
        [ROOTNAME]: readonlyData,

        ...useCollaborativeStoreActions<string, any>(internalData),
        setComponent,
        addComponent,
        delComponent,
      }
    },
    {
      websocketConfig: {
        serverUrl: 'wss://demos.yjs.dev/ws',
        // serverUrl: 'ws://localhost:1234',
        roomname: ROOMNAME,
        option: {
          params,
        },
      },
      option: {
        rootName: ROOTNAME,
        awareness,
        useUndoManager: true,
      },
      timeout: 10000,
    }
  )

  async function initializeStore(s: StoreInstance) {
    if (Reflect.ownKeys(s.components).length <= 0) {
      const uid = generateId()
      const com: ComponentConfig = {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 300),
        w: Math.floor(Math.random() * 150 + 50), // 50 -200
        h: Math.floor(Math.random() * 150 + 50), // 50 -200
        bg: `#${randomColor()}`,
      }
      // @ts-ignore
      s.yAddorUpdateByKeyPath([uid], com)
    }
  }

  await initializeStore(store)

  return store
}
