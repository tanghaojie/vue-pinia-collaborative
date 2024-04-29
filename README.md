# vue-pinia-collaborative

## A vue3 pinia plugin for high performance real-time collaboration, huge data rendering on time. base on [yjs](https://github.com/yjs/yjs).

## 一个超高性能的实时在线协同 vue pinia 插件，支持超大数据量实时渲染。不影响业务层代码。

![gif](https://github.com/tanghaojie/vue-pinia-collaborative/blob/master/screen_small.gif)

feats:

- real-time collaboration

- multi pinia store support

- undo/redo combine multi store

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
