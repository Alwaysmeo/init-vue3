<template>
    <div>
        <a-modal v-model:visible="state.modelVisible" width="650px">
            <template #title>图片裁剪</template>
            <div class="upload-box">
                <vue-picture-cropper v-if="state.img" class="picture-cropper" :options="state.options" :img="state.img" />
                <div class="upload-btn" v-else @click="() => selectImageRef.click()">
                    <div>
                        <icon-upload class="icon" />
                        <div>点击此处选择图片</div>
                    </div>
                    <input type="file" accept=".jpg, .jpeg, .png" ref="selectImageRef" style="display: none" @change="changeInput" />
                </div>
            </div>
            <template #footer>
                <a-button @click="btnRemove" style="float: left">
                    <template #icon><icon-delete /></template>
                    移除
                </a-button>
                <a-button @click="btnClose">
                    <template #icon><icon-redo /></template>
                    关闭
                </a-button>
                <a-button type="primary" @click="btnConfirm" :loading="state.btnLoading">
                    <template #icon><icon-upload /></template>
                    确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import axios from '@utils/request'

const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
        default: '',
    },
    aspectRatio: {
        type: Number,
        default: 1 / 1,
    },
})

const emits = defineEmits(['onSuccess', 'onFail'])

const state = reactive({
    img: props.img,
    options: {
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: props.aspectRatio,
    },
    btnLoading: false,
    modelVisible: props.modelVisible,
})

const selectImageRef = ref()

const btnRemove = () => {
    if (state.img.length < 1) return
    state.img = ''
    cropper.clear()
}
const btnClose = () => {
    state.modelVisible = false
}
const btnConfirm = async () => {
    if (state.img.length < 1) return Message.error('请先选择图片')
    cropper.getFile().then((file) => {
        let formdata = new FormData()
        formdata.append('file', file)
        axios({
            url: '/common/upload/image',
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'POST',
            data: formdata,
        })
            .then((res) => {
                emits('onSuccess', res.data)
                cropper.clear()
                state.modelVisible = false
                state.img = ''
            })
            .catch((err) => {
                Message.error(err.msg)
                emits('onFail', err)
            })
    })
}

const changeInput = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        state.img = reader.result
    }
}
</script>

<style scoped lang="scss">
.upload-box {
    .upload-btn {
        background-color: #f7f8fa;
        width: 100%;
        height: 380px;
        border-radius: 4px;
        border: 1px dashed #d9d9d9;
        cursor: pointer;
        > div {
            margin-top: 130px;
            color: #a9a9a9;
            text-align: center;
            .icon {
                font-size: 40px;
            }
        }
    }

    .picture-cropper {
        width: 100%;
        height: 380px;
    }
}
</style>
