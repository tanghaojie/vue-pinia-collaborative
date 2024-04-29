import { customAlphabet } from 'nanoid'

export function generateId() {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', 10)()
}

export function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16)
}
