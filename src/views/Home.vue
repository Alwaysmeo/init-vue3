<template>
    <div>
        <PictureCropper :modelVisible="state.modelVisible" :aspectRatio="1 / 2" @onSuccess="PictureCropperSuccess"></PictureCropper>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { PictureCropper } from '@components'

const state = reactive({
    modelVisible: true,
})

const PictureCropperSuccess = (url) => {
    state.modelVisible = false
    console.log(url)
}
</script>

<style scoped></style>
