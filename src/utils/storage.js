'use strict'

import crypto from '@utils/crypto'

const storageLocal = {
    getItem: (key) => {
        let storage = localStorage.getItem(crypto.Encrypt(key))
        if (storage) {
            storage = JSON.parse(crypto.Decrypt(storage))
            if (storage.expires === null) return storage.data
            if (Date.now() - storage.time > storage.expires) {
                localStorage.removeItem(key)
                return null
            }
            return storage.data
        }
        return null
    },
    setItem: (key, value, expires = null) => {
        const storage = {
            data: value, //存储值
            time: Date.now(), //存值时间戳
            expires: expires ? expires * 86_400_000 : null, //过期时间
        }
        localStorage.setItem(crypto.Encrypt(key), crypto.Encrypt(JSON.stringify(storage)))
    },
    removeItem: (key) => {
        localStorage.removeItem(crypto.Encrypt(key))
    },
    clear: () => {
        localStorage.clear()
    },
}

const storageSession = {
    getItem: (key) => {
        let storage = sessionStorage.getItem(crypto.Encrypt(key))
        if (storage) {
            storage = JSON.parse(crypto.Decrypt(storage))
            if (storage.expires === null) return storage.data
            if (Date.now() - storage.time > storage.expires) {
                sessionStorage.removeItem(key)
                return null
            }
            return storage.data
        }
        return null
    },
    setItem: (key, value, expires = null) => {
        const storage = {
            data: value, //存储值
            time: Date.now(), //存值时间戳
            expires: expires ? expires * 86_400_000 : null, //过期时间
        }
        sessionStorage.setItem(crypto.Encrypt(key), crypto.Encrypt(JSON.stringify(storage)))
    },
    removeItem: (key) => {
        sessionStorage.removeItem(crypto.Encrypt(key))
    },
    clear: () => {
        sessionStorage.clear()
    },
}

export { storageLocal, storageSession }
