import crypto from '@utils/crypto'

export default {
    get(key) {
        let storage = localStorage.getItem(crypto.encrypto(key.toString()))
        if (storage) {
            storage = JSON.parse(crypto.decrypto(storage))
            if (Date.now() - storage.time > storage.expires) {
                localStorage.removeItem(crypto.encrypto(key.toString()))
                return null
            }
            return storage ? storage.data : null
        }
        return null
    },
    set(key, value, expires = 7) {
        if (!value) value = null
        const storage = {
            data: value, //存储值
            time: Date.now(), //存值时间戳
            expires: expires * 86_400_000, //过期时间
        }
        localStorage.setItem(crypto.encrypto(key.toString()), crypto.encrypto(JSON.stringify(storage)))
    },
    remove(key) {
        localStorage.removeItem(crypto.encrypto(key.toString()))
    },
    clear() {
        localStorage.clear()
    },
}
