<template>
<div class="uploadsingle">
    <el-button type="primary" :loading="loading" @click.native="clickUpload">{{labelName}}</el-button>
    <input type="file" class="file" ref="file" @change="changeFile">
    <div class="tip">
        <slot name="tip"></slot>
    </div>
    <span class="clearfix"></span>
</div>
</template>
<script>
export default {
    props: {
        value: Object,
        label: String,
        type: String
    },
    data() {
        return {
            currentValue: this.value,
            imageMaxSize: 5120000,
            videoMaxSize: 1048576,
            loading: false
        };
    },
    computed: {
        accept() {
            if (this.type === 'video') {
                return 'video/*';
            } else {
                return 'image/gif,image/jpeg,image/jpg,image/png';
            }
        },
        labelName() {
            if (this.value && this.value.length > 0) {
                return '重新上传';
            } else {
                return this.label;
            }
        }
    },
    methods: {
        clickUpload() {
            this.$refs.file.click();
        },
        changeFile(event) {
            let files = event.target.files[0]
            if (files) {
                this.uploadFile(files);
            }
        },
        uploadFile(file) {
            this.loading = true;
            let formData = new FormData();
            formData.append('file', file);
            this.$http.post('/upload', formData).then(({
                data
            }) => {
                this.loading = false;
                this.currentValue = {name: data.name||'',url:data.url||''};
                this.$emit('input', this.currentValue);
            }, () => {
                this.$emit('input', {name:'', url:''});
                this.loading = false;
            });
        }
    }
};
</script>
<style>
.file {
    display: none;
}

.tip {
    float: left;
    font-size: 0.8rem;
    margin-left: 10px;
}
</style>
