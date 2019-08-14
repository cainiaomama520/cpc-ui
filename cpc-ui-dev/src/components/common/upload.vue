<template>
<div class="upload">
    <el-button type="primary" :loading="loading" @click.native="clickUpload">{{labelName}}</el-button>
    <input type="file" class="file" multiple ref="file" :accept="accept" @change="changeFile">
    <div class="tip">
        <slot name="tip"></slot>
    </div>
    <span class="clearfix"></span>
</div>
</template>
<script>
export default {
    props: {
        value: Array,
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
            let files = event.target.files;
            if (files) {
                let fs = [];
                for (let [i, id] of Object.keys(files).entries()) {
                    fs.push(files[id]);
                }
                this.uploadFile(fs);
            }
        },
        uploadFile(file) {
            let _this = this;
            _this.loading = true;
            console.log('file', typeof file, Array.isArray(file), file);
            Promise.all(file.map((item, index)=>{
                return new Promise((resolve, reject) => {
                    let formData = new FormData();
                    formData.append('file', item);
                    this.$http.post('/upload', formData).then(({
                        data
                    }) => {
                        resolve({name: data.name||'',url:data.url||''})
                    }, () => {
                        _this.loading = false;
                        reject('文件上传失败');
                    });
                })
            })).then((upsres) => {
                _this.loading = false;
                console.log('upsres.', upsres);
                _this.currentValue = upsres;
                _this.$emit('input', this.currentValue);
            }).catch((err) => {
                _this.loading = false;
                _this.currentValue = [];
                _this.$emit('input', this.currentValue);
                console.log('upsres err.', err);
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
