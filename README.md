# vue-pinia-collaborative

A vue3 pinia plugin for real-time collaboration, base on [yjs](https://github.com/yjs/yjs).

一个实时在线协同的 pinia 插件

![](https://github.com/tanghaojie/vue-pinia-collaborative/blob/master/screen.gif)

feats: - real-time collaboration - multi pinia store support - undo/redo combine multi store

# Getting Started

Install and run:

```sh
pnpm install
pnpm dev
```

Use with custom websocket server:

1. Download [y-websocket](https://github.com/yjs/y-websocket) and start.

2. Change `collaborateStore.ts` connection config:

```js
{
    websocketConfig: {
        // serverUrl: 'wss://demos.yjs.dev/ws',
        serverUrl: 'ws://localhost:1234',
        // ...
    }
}
```
