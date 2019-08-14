<template lang="html">
	<div class="creatBILItivity">
		<el-row>
			<el-col :span='20'>
				<el-form :model="form" :rules='rulesForm' ref='form' label-width="120px" class="demo-ruleForm">
					<el-form-item label="广告形式:">
						<el-radio-group v-model="form.type" @change='resectForm'>
							<el-radio label='1'>推荐页</el-radio>
							<el-radio label='2'>播放页</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if='form.type == 1' key='type'>
						<el-form-item label="标题:" prop='name' class='currentWidth' :rules="[
								{ required: true, message: '请输入标题', trigger: 'blur' },
								{ min: 5, max: 32, message: '标题应在 5 ~ 32 字', trigger: 'blur' }
							]">
							<el-input v-model="form.name" placeholder='请输入标题'></el-input>
							<div class="sub-msg">（ 注：标题应在 5 ~ 32 字 ）</div>
						</el-form-item>
						<el-form-item label="描述" prop="desc" class='currentWidth' :rules="[
								{ required: true, message: '请输入描述', trigger: 'blur' },
								{ min: 2, max: 10, message: '描述应在 2 ~ 10 字', trigger: 'blur' }
							]">
							<el-input type="textarea" v-model="form.desc" placeholder='请输入描述'></el-input>
							<div class="sub-msg">（ 注：描述应在 2 ~ 10 字 ）</div>
						</el-form-item>
						<el-form-item label="素材">
							<el-upload class="upload-demo" :before-upload="bwBeforeAvatarUpload" :headers="myHeaders" :action='this.loadImgs' :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='3'>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">图片大小：400*300 三张（单位px）； 单张图片容量：150kb内；
								</div>
							</el-upload>
						</el-form-item>
					</div>
					<div v-if='form.type == 2' key='type1'>
						<el-form-item label="标题:" prop='name' class='currentWidth' :rules="[
								{ required: true, message: '请输入标题', trigger: 'blur' },
								{ min: 5, max: 18, message: '标题应在 5 ~ 18 字', trigger: 'blur' }
							]">
							<el-input v-model="form.name" placeholder='请输入标题'></el-input>
							<div class="sub-msg">（ 注：标题应在 5 ~ 18 字 ）</div>
						</el-form-item>
						<el-form-item label="描述" prop="desc" class='currentWidth' :rules="[
								{ required: true, message: '请输入描述', trigger: 'blur' },
								{ min: 2, max: 10, message: '描述应在 2 ~ 10 字', trigger: 'blur' }
							]">
							<el-input type="textarea" v-model="form.desc" placeholder='请输入描述'></el-input>
							<div class="sub-msg">（ 注：描述应在 2 ~ 10 字 ）</div>
						</el-form-item>
						<el-form-item label="素材">
							<el-upload class="upload-demo" :before-upload="bwBeforeAvatarUpload" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='1'>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">图片大小：640*400 一张（单位px）； 图片容量：150kb内；
								</div>
							</el-upload>
						</el-form-item>
					</div>
					<el-form-item label="广告主监测链接" prop='trackLinkId'>
						<el-select v-model="form.trackLinkId" filterable placeholder="请选择监测链接" style="width:235px">
							<el-option v-for="item in trackLinkArr" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="cancleAction()">取&emsp;消</el-button>
						<el-button type="primary" @click="submitForm('form')">提&emsp;交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<div class="currentBILI">
			<div>
				<div class="bigCardImgDiv">
					<div class="contentDiv">
						<!--<div class="contentHeader">
						</div>-->
						<div v-if="form.type == 1" class="midden">
							{{form.name}}
						</div>
						<div v-if="form.type == 1 && form.picObjUrls.length > 0" class="muchImg">
							<img class="threeImg" v-for='(imgItem,index) in form.picObjUrls' :src="imgItem.url" alt="">
						</div>
						<div v-if="form.type == 1" class="leftBottom">
							{{form.desc}}
						</div>
						<div v-if="form.type == 2 && form.picObjUrls.length > 0" class="onlyImg">
							<img class="oneImg" :src="form.picObjUrls[0].url" alt="">
						</div>
						<div v-if="form.type == 2" class="midden2">
							{{form.name}}
						</div>
						<div v-if="form.type == 2" class="leftBottom2">
							{{form.desc}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookie from '../../../util/cookies';
	export default {
		data() {
				var validateAmount = (rule, value, callback) => {
					if(value.indexOf("https://itunes.apple.com") == -1) {
						callback(new Error('输入appstore下载地址'));
					} else {
						callback();
					}
				};
				return {
					myHeaders: {
						Authorization: 'Bearer ' + Cookie.getCookie('token')
					},
					loadImgs: this.rootUrl + '/api/common/upload',
					isEditBool: false,
					editObj: {},
					advertiserId: localStorage.getItem("GTadvertiserId"),
					productId: localStorage.getItem("GTproductId"),
					trackLinkArr: [],
					form: {
						type: '1',
						name: '', //标题
						desc: '', // 描述
						picObjUrls: [], //图片name&url
						trackLinkId: '',
					},
					rulesForm: {
						trackLinkId: [{
							required: true,
							message: '请选择监测链接',
							trigger: 'blur'
						}],
					}
				};
			},
			watch: {

			},
			mounted() {
				this.$store.commit('changeTitleName', '创建广告创意');
				if(this.$route.query.value == 'new') {
					this.$store.commit('changeTitleName', '新建广告创意');
				} else if(this.$route.query.value == 'edit') {
					this.$store.commit('changeTitleName', '编辑广告创意');
				} else if(this.$route.query.value == 'copy') {
					this.$store.commit('changeTitleName', '复制广告创意');
				}
				this.editObj.mediaType = localStorage.getItem("GTmediaType");
				var v = this;
				if(v.$route.query.id != undefined) {
					v.$store.commit('clearState');
					console.log(v.$route.query.id);
					v.isEditBool = true;
					new Promise(function(resolve, reject) {
						if(v.$route.query.value == 'new') {
							//获取广告组信息
							v.$api.get(v.allurlsList.creatADGroupUrl + '/' + v.$route.query.id, '', function(r) {
								v.editObj.advertiserId = r.advertiser.id;
								v.editObj.adGroupId = r.id;
								v.editObj.productId = r.product.id;
								v.editObj.campaignId = r.campaign.id;
								v.editObj.media = r.media;
								v.editObj.mediaType = r.mediaType;
								v.advertiserId = r.advertiser.id;
								v.productId = r.product.id;
								v.getTrackingList();
//								if(r.media == 'WAX') {
//									v.getAdvertisersUidList(r.advertiser.id);
//								}
								resolve(r);
							})
						} else {
							//获取广告创意
							v.$api.get(v.allurlsList.creatadver + '/' + v.$route.query.id, '', function(r) {
								console.log(r);
								// if (v.$route.query.value != 'new') {
								let cnt = JSON.parse(r.content);
								v.form = {
									type: r.rtbResourceId == 10 ? '1':'2',
									name: cnt.title, //标题
									desc: cnt.desc, // 描述
									picObjUrls: cnt.images.map((item)=>{return {url: item.url}}), //图片name&url
									trackLinkId: r.trackLinkId,
								};
								v.editObj = r;
								// }
								v.advertiserId = r.advertiserId;
								v.productId = r.productId;
//								if(v.editObj.media == 'WAX') {
//									v.getAdvertisersUidList(r.advertiserId);
//								}
								v.getTrackingList();
								resolve(r);
							})
						}

					})
				} else {
					v.getTrackingList();
//					if(localStorage.getItem("GTmedia") != undefined && localStorage.getItem("GTmedia") == 'WAX') {
//						v.getAdvertisersUidList(localStorage.getItem("GTadvertiserId"))
//					}
				}
			},
			methods: {
				//切换广告形式时，reset表单
				resectForm(val) {
					this.form.picObjUrls = [];
					this.form.name = '';
					this.form.desc = '';
				},
				// 图片限制
				bwBeforeAvatarUpload(file) {
					const isJPG = (file.type === 'image/png')||(file.type === 'image/jpeg')||(file.type === 'image/gif');
					const isLt2M = file.size / 1024 / 1024 < 0.15;
					var v = this;
					return new Promise(function(resolve, reject) {
						var reader = new FileReader();
						reader.onload = function(e) {
							var data = e.target.result;
							//加载图片获取图片真实宽度和高度
							var image = new Image();
							image.onload = function() {
								var width = image.width;
								var height = image.height;
								var result;
								if(v.form.type == 1) {
									result = (width == 400 && height == 300);
								} else {
									result = (width == 640 && height == 400);
								}

								if(isJPG&&isLt2M && result) {
									resolve(isLt2M && result);
								} else {
									if(!result) {
										if(v.form.type == 1) {
											v.$message.error('上传图片尺寸仅支持 400X300！');
										} else {
											v.$message.error('上传图片尺寸仅支持 640X400！');
										}

									}
									if(!isJPG) {
										v.$message.error('上传图片只能是 JPG/PNG 格式!');
									}
									if(!isLt2M) {
										v.$message.error('上传图片大小不能超过 150K!');
									}
									reject('图片尺寸不对')
								}
							};
							image.src = data;
						};
						reader.readAsDataURL(file);
					})
				},
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
					this.form.picObjUrls.push(obj);
				},
				handleRemove(file, fileList) {
					this.form.picObjUrls = fileList
					console.log(file, fileList);
				},
				handlePreview(file) {
					console.log(file);
				},
				//获取监测链接
				getTrackingList() {
					var params = '?advertiserId=' + this.advertiserId + '&productId=' + this.productId;
					var v = this;
					this.$api.get(this.allurlsList.trackLinksDropdown + params, '', function(r) {
						v.trackLinkArr = r;
					})
				},
				cancleAction() {
					this.$router.go(-1);
				},
				submitForm(formName) {
					console.log('submitForm', this.form, formName);
					let v = this;
					this.$refs[formName].validate((valid) => {
						if(valid) {
							//var rtbResourceId = '';
							if(v.form.type == '1') {
								if(v.form.picObjUrls.length < 3) {
									v.$message.warning('图片必须为3张!');
									return;
								}
							} else if(v.form.type == '2') {
								if(v.form.picObjUrls.length == 0) {
									v.$message.warning('图片不能为空!');
									return;
								}
							}

							if(v.isEditBool) {
								v.editObj.content = v.form;
								v.editObj.rtbResourceId = v.form.type == '1'?10:11;//rtbResourceId;
								v.editObj.trackLinkId = v.form.trackLinkId;
								v.editObj.name = v.form.name;
								v.editObj.desc = v.form.desc;

								let content = {
									images: v.form.picObjUrls.map((item)=>{
										return {
											type: 'MAIN',
											url: item.url,
											w: v.form.type == '1' ? 400 : 640,
											h: v.form.type == '1' ? 300 : 400
										}
									}),
									desc: v.form.desc,
									shortDesc: v.form.shortDesc || '',
									title: v.form.name,
									interactionType: 1
								}
								v.editObj.content = JSON.stringify(content);

								if(v.$route.query.value == 'edit') {
									v.editObj.id = v.$route.query.id;
									//更新创意接口
									v.$api.put(v.allurlsList.creatadver, v.editObj, function(r) {
										v.$router.go(-1);
									})
								} else if(v.$route.query.value == 'copy' || v.$route.query.value == 'new') {
									v.editObj.id = '';
									v.$api.post(v.allurlsList.creatadver, v.editObj, function(r) {
										v.$router.go(-1);
									})
								}
								return;
							}
							let obj = {
									advertiserId: localStorage.getItem("GTadvertiserId"),
									adGroupId: localStorage.getItem("GTadGroupId"),
									productId: localStorage.getItem("GTproductId"),
									campaignId: localStorage.getItem("GTcampaignId"),
									media: localStorage.getItem("GTmedia"),
									mediaType: localStorage.getItem("GTmediaType"),
									name: v.form.name,
									trackLinkId: v.form.trackLinkId,
									rtbResourceId:  v.form.type == '1'?10:11,//rtbResourceId,
									content: v.form
								}

								let content = {
									images: v.form.picObjUrls.map((item)=>{
										return {
											type: 'MAIN',
											url: item.url,
											w: v.form.type == 1 ? 400 : 640,
											h: v.form.type == 1 ? 300 : 400
										}
									}),
									desc: v.form.desc,
									shortDesc: v.form.shortDesc || '',
									title: v.form.name,
									interactionType: 1
								}

								obj.content = JSON.stringify(content);

								console.log('v.form.', v.form);
								//创建创意
							v.$api.post(v.allurlsList.creatadver, obj, function(r) {
								localStorage.setItem("GTcreativId", r.id);
								debugger
								v.$router.push({
									name: 'adCampaignOp'
								});
							})
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				}
			}
	}
</script>

<style lang="scss" scoped>
	.creatBILItivity {
		width: 100%;
		margin-top: 30px;
		margin-left: 40px;
		.currentWidth {
			width: 400px;
		}
		.upload-demo {
			width: 50%;
		}
		.el-upload__tip {
			font-size: 12px;
			color: gray;
			line-height: 15px;
		}
		.sub-msg{
			font-size: 12px;
			color: gray;
			line-height: 15px;
			margin-top: 7px;
		}
		.currentBILI {
			position: fixed;
			top: 24%;
			right: 13%;
			width: 246px;
			height: 436px;
			background-color: #eaeaea;
			.bigCardImgDiv {
				position: relative;
				width: 100%;
				height: 436px;
				// 框架
				background-image: url('/static/img/bili2.png');
				background-size: cover;
				.contentDiv {
					position: absolute;
					width: 100%;
					top: 25%;
					/*overflow: auto;*/
					.contentHeader {
						position: relative;
						margin-left: 3%;
						width: 94%;
						height: 8.2%;
						// 微博头
						/*background-image: url();*/
						background-size: cover;
					}
					.midden {
						position: relative;
						text-align: left;
						margin-left: 6%;
						margin-top: 10px;
						margin-bottom: 5px;
						width: 88%;
						font-size: 12px;
						line-height: 14px;
						overflow: hidden;
						word-break: break-all;
						word-wrap: break-word;
					}
					.midden2{
						font-size: 12px;
						line-height: 14px;
						overflow: hidden;
						word-break: break-all;
						word-wrap: break-word;
						position: absolute;
					    top: 0px;
					    left: 42%;
					}
					.muchImg {
						width: 96%;
						margin-left: 2%;
						margin-right: 2%;
						.threeImg {
							width: 30%;
							padding: 3px 1.6%;
							height: 50px;
						}
					}
					.onlyImg {
						width:40%;
						margin-left: 2%;
						margin-right: 2%;
						.oneImg{
							width: 90%;
							padding: 3px 1.6%;
							height: 50px;
						}
					}

					.leftBottom {
						margin-left: 6%;
						margin-top: 5px;
						width: 88%;
						font-size: 12px;
						text-align: left;
						color: #9aa2aa;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.leftBottom2{
						font-size: 12px;
						text-align: left;
						color: #9aa2aa;
						overflow: hidden;
						word-break: break-all;
						word-wrap: break-word;
						position: absolute;
					    top: 38px;
					    left: 42%;
					}
				}
			}
		}
	}
</style>