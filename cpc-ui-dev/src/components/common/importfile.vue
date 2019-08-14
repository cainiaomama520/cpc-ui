<template>
    <el-upload
        ref="upload"
        action="/wm/upload/"
        :show-file-list="false"
        :on-change="readExcel"
        :auto-upload="false">
      <el-button
          slot="trigger"
          size="small"
          :loading="loading"
          type="primary">
        上传文件
      </el-button>
    </el-upload>
</template>

<script>
export default {
    props: {
        value: Array,
    },
    data() {
        return {
            loading: false,
            currentValue: this.value
        };
    },
    computed: {},
    methods: {
        readExcel(file) {
            this.loading = true;
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
              try {
                const data = ev.target.result;
                const XLSX = require('xlsx');
                const workbook = XLSX.read(data, {
                  type: 'binary'
                });

                for (let sheet in workbook.Sheets) {
                    let sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                    console.log('ddd', sheetArray);
                    if(Array.isArray(sheetArray)&& sheetArray.length > 0){
                        for (let [i, info] of sheetArray.entries()) {
                            if(!info.Tag) throw 'type error';
                            if(!info.Sync) throw 'type error';
                            // if(!info.ImpLink) throw 'type error';
                            if(!info.ClkLink) throw 'type error';
                        }
                    }else{
                        throw 'type error'
                    }
                    this.loading = false;
                    this.currentValue = sheetArray;
                    this.$message.info('模板格式校验通过');
                    this.$emit('input', this.currentValue);
                }
              } catch (e) {
                console.log('eee', e);
                this.loading = false;
                this.$message.warning('模板格式校验错误！');
                return false;
              }
            };

            fileReader.readAsBinaryString(file.raw);
        }
    }
};
</script>