<template lang="html">
	<div class="creatADtivity">
		<el-row>
			<el-col :span='20'>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="120px">
					<el-form-item label="广告位:">
						<el-radio-group v-model="ruleForm.adPlace">
							<el-radio label='0'>列表页Feed小图链接</el-radio>
							<el-radio label='1'>列表页Feed大图链接</el-radio>
							<el-radio label='2'>列表页Feed三图链接</el-radio>
							<el-radio label='3'>列表页Feed大图视频</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-row>
						<el-col :span='12'>
							<el-form-item label="广告标题" prop="name">
								<el-input v-model="ruleForm.name" placeholder='24个中午字符以内' style="width:300px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="品牌名" prop="name">
								<el-input v-model="ruleForm.name1" placeholder='6个中午字符以内' style="width:235px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="素材图片">
						<el-upload class="upload-demo" :action='this.loadImgs' :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="ruleForm.picObjUrls" list-type="picture" :limit='9'>
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
					<el-row>
						<el-col :span='12'>
							<el-form-item label="广告主曝光监测" prop="name">
								<el-input v-model="ruleForm.name" placeholder='请输入曝光监测链接' style="width:300px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="设置标识">
								<el-input v-model="ruleForm.name1" placeholder='如:紫龙曝光链接001' style="width:235px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='12'>
							<el-form-item label="广告主点击检测" prop="name">
								<el-input v-model="ruleForm.name2" placeholder='请输入点击监测链接' style="width:300px"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='12'>
							<el-form-item label="设置标识">
								<el-input v-model="ruleForm.name3" placeholder='如:紫龙曝光链接001' style="width:235px"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item style="padding-top:50px;padding-left:70%">
						<el-button type="primary" @click="submitForm('ruleForm')">提&emsp;交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loadImgs: '/a/api/file/upload',
				ruleForm: {
					adPlace: '0'
				},
				rules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, ],
					date: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, ],
				}
			};
		},
		mounted() {
			this.$store.commit('changeTitleName', '创建广告创意');
			if(this.$store.state.creatCp.currentStep == 4) {
				this.$router.push({
					name: 'creatCampaign'
				});
			}
		},
		methods: {
			filesAction(file, fileList) {
				console.log(fileList);
				if(file.status != "success") {
					return;
				}
				var currentObj = fileList[fileList.length - 1];
				var obj = {
					name: '',
					url: ''
				};
				obj.name = currentObj.response.name;
				obj.url = currentObj.response.url;
				this.ruleForm.picObjUrls.push(obj);
			},
			videoAction(file, fileList) {
				if(file.status != "success") {
					return;
				}
				var currentObj = fileList[fileList.length - 1];
				var obj = {
					name: '',
					url: ''
				};
				obj.name = currentObj.response.name;
				obj.url = currentObj.response.url;
				this.ruleForm.videoPath.push(obj);
			},
			handleRemove(file, fileList) {
				this.ruleForm.picObjUrls = fileList
				console.log(file, fileList);
			},
			handleVideoRemove(file, fileList) {
				this.ruleForm.videoPath = fileList
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			submitForm(formName) {
				// this.$refs[formName].validate((valid) => {
				//   if (valid) {
				//     alert('submit!');
				//   } else {
				//     console.log('error submit!!');
				//     return false;
				//   }
				// });
				this.$store.commit('changeCurrentStep', {
					name: '508',
					step: 4
				})
				this.$router.push({
					name: 'adCampaign'
				});
			}
		}
	}
</script>

<style lang="scss">
	.creatADtivity {
		width: 100%;
		margin-top: 30px;
		margin-left: 40px;
	}
</style>
