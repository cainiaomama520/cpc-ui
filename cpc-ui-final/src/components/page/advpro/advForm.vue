<template>
	<div class="formItem">
		<el-container>
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-col class="line" :span="24" style="margin-bottom: 10px;"><h3>客户基本信息</h3></el-col>
				<el-col class="borderLeft" :span="24"  style="margin-bottom: 20px;"></el-col>
				<el-form-item label="名称" prop="name">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input v-model="addForm.name" auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="联系人" prop="contacts">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input v-model="addForm.contacts" auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input v-model="addForm.phone" auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="行业分类:">
					<el-cascader
						:options="advCategory"
						change-on-select
						@change="categoryChange"
						:value="categorySelect"
					></el-cascader>
				</el-form-item>
				<el-form-item label="微博uid" prop="waxUid" v-for="waxuid in waxUids" :key="waxuid">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input v-model="waxuid.uid" auto-complete="off" @change="uidInputChange(waxuid.uid)"></el-input>
					</el-col>
					<a v-bind:href="waxuid.upfile.url" target="_blank">{{waxuid.upfile.name}}</a>
					<UploadSingle v-model="waxuid.upfile" label="资质上传" style="width: 100px; float: left; margin-left:20px;"></UploadSingle>
					<el-button type="primary" icon="el-icon-minus" v-if="0 != waxuid.uid.length" @click="uidInputSubtract(waxuid.uid)"></el-button>
				</el-form-item>
				<el-form-item label="公司网址" prop="website">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input placeholder="请输入内容" v-model="addForm.website"></el-input></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="公司地址">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input v-model="addForm.address"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="客户备注">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input type="textarea" v-model="addForm.remarks"></el-input>
					</el-col>
				</el-form-item>
				<el-col class="line" :span="24" style="margin-bottom: 10px;"><h3>提交资质</h3></el-col>
				<el-col class="borderLeft" :span="24" style="margin-bottom: 20px;"></el-col>
<!-- 				<el-form-item label="组织机构代码" prop="">
					<el-col :xs="24" :sm="16" :md="10" :lg="6">
						<el-input v-model="addForm.num" auto-complete="off"></el-input>
					</el-col>
				</el-form-item> -->
				<el-form-item label="资质文件">
					<el-col :span="11" v-for="lfile in categoryLicense" :key="lfile" style="margin-bottom: 20px;min-height: 82px;">
						<upload v-model="licenseFiles[lfile.id].urls" label="点我">
							<div slot="tip">{{lfile.name}}</div>
						</upload>
						<div v-for="info in licenseFiles[lfile.id].urls">
							<a v-bind:href="info.url" target="_blank">{{info.name}}</a>
						</div>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSaveSubmit('addForm')">保存</el-button>
					<router-link to="/advpro/advList" type="button" class="el-button el-button--warning">取消</router-link>
				</el-form-item>
			</el-form>
		</el-container>
	</div>
</template>

<script>
import {mapState, mapActions}from 'vuex';
import {Upload, UploadSingle} from '../../common';

export default {
	name: 'createeditAdvertiser',

    components: {
        Upload,
        UploadSingle
    },

	data(){
		return {
			advCategory:[],
			categorySelect:[110, 110003],
			categoryLicense:[{"id": 1001,"name": "《计算机软件著作权登记证书》","required": 1},
          		{"id": 1002,"name": "《网络文化经营许可证》","required": 1},
          		{"id": 1004,"name": "游戏运营授权书","required": 0},
          		{"id": 1051,"name": "网络游戏出版物号核发单（或广电总局官网游戏审批结果截图加盖公章）","required": 0},
          		{"id": 1052,"name": "网络游戏产品备案通知单（或中国文化市场网游戏备案记录截图加盖公章）","required": 0}
        	],
        	licenseFiles:{
        		'1001':{id: 1001, name: "《计算机软件著作权登记证书》", urls:[]},
        		'1002':{id: 1002,name: "《网络文化经营许可证》", urls:[]},
        		'1004':{id: 1004,name: "游戏运营授权书",urls:[]},
        		'1051':{id: 1051,name: "网络游戏出版物号核发单（或广电总局官网游戏审批结果截图加盖公章）" ,urls:[]},
        		'1052':{id: 1052,name: "网络游戏产品备案通知单（或中国文化市场网游戏备案记录截图加盖公章）", urls:[]}
        	},

        	waxUids: [{uid:'', upfile:{name:'', url:''}}],

			addForm: {
				name: '',
				contacts: '',
				phone: 0,
				category: '',
				waxUid: [],
				website: '',
				address: '',
				remarks: ''
			},
			addFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				contacts: [
					{ required: true, message: '请输入联系人', trigger: 'blur' }
				],
				phone: [
					{ required: true, message: '请输入联系电话', trigger: 'blur' }
				],
				website: [
					{ required: true, message: '请输入公司网址', trigger: 'blur' }
				]
			}
		}
	},

	methods:{
		...mapActions([
			'getAdvDev',
			'getAdvCategoryList',
			'createAdvertiser',
			'updateAdvertiser'
		]),

		uidInputSubtract(uid){
			for (let [i, uids] of this.waxUids.entries()) {
				if (uid == uids.uid){
					this.waxUids.splice(i, 1);
					break;
				}
			}
		},

		uidInputChange(uid){
			if (uid && uid.length >0){
				this.waxUids.push({uid:'', upfile:{name:'', url:''}});
			}
		},

		async checkCategoryState(){
			this.advCategory = this.category;
			if (!this.category || (this.category.length == 0)){
				let ctmp = await this.getAdvCategoryList();
				this.advCategory = ctmp;
			}

			for (let i = 0; i < this.advCategory.length; i++) {
				let tmp = {
					value: this.advCategory[i].id,
					label: this.advCategory[i].name,
					license: this.advCategory[i].license,
					children: []
				}
				for (let k = 0 ; k < (this.advCategory[i].children||[]).length; k++) {
					tmp.children.push({
						value: this.advCategory[i].children[k].id,
						label: this.advCategory[i].children[k].name
					});
				}

				this.advCategory[i] = tmp;
			}

//			let id = this.$route.query && this.$route.query.id || null;
			let tmp = this.cache || {};
			if (!(this.cache&&this.cache.id)){
				let id = this.$route.query.id;
				let advinfo = await this.getAdvDev(id);
				if (advinfo && advinfo.id){
					tmp = advinfo;
				}
			}

			if (tmp && Object.keys(tmp).length > 0){
				this.addForm.id = tmp.id || 0;
				this.addForm.name = tmp.name||'';
				this.addForm.contacts = tmp.contacts ||'';
				this.addForm.phone = tmp.phone ||'';
				this.addForm.website = tmp.website || '';
				this.addForm.address = tmp.address || '';
				this.addForm.remarks = tmp.remarks || '';

				this.categorySelect[0] = Number(tmp.industryLevel1||110);
				this.categorySelect[1] = Number(tmp.industryLevel2||110003);

				//uid
				for (let [i, uids] of (tmp.waxUid || []).entries()) {
					this.waxUids.push({uid: uids.uid, upfile:{name: uids.name||'', url: uids.url||''}})
				}
				this.waxUids.reverse();

				for (let [i, fid] of Object.keys(tmp.fileContent||{}).entries()) {
					if (this.licenseFiles[''+fid]) {
						this.licenseFiles[''+fid].urls = tmp.fileContent[''+fid].urls;
					}
				}

				console.log('licenseFiles.', this.licenseFiles);
			}
		},

		categoryChange(val){
			if (2 == val.length){
				for (let i = 0; i < this.advCategory.length; i++) {
					if (val[0] == this.advCategory[i].value) {
						this.categoryLicense = this.advCategory[i].license||[];
						this.licenseFiles = {};
						for (let[k, d] of this.categoryLicense.entries()) {
							this.licenseFiles[d.id] = {id: d.id, name: d.name, urls: []};
						}
						break;
					}
				}

				this.categorySelect = val;
			}
		},

		async checkInput(name){
			return new Promise((resolve, reject) => {
				this.$refs[name].validate((valid) => {
	          		if (valid) {
	          			console.log('resolve.');
						resolve(true);
	          		} else {
						resolve(false);
	          		}
	        	});
			}).then((success) => {
				return true;
			}, (failed)=>{
				return false;
			});
		},

		async onSaveSubmit(name){
			let isvalid = await new Promise((resolve, reject) => {
				this.$refs[name].validate((valid) => {
	          		if (valid) {
	          			console.log('resolve.');
						resolve(true);
	          		} else {
						resolve(false);
	          		}
	        	});
			});

			if (isvalid){
				let sdata = {};
				if (this.cache) Object.assign(sdata, this.cache);
				sdata.id = this.addForm.id;
				sdata.address = this.addForm.address;
				sdata.checkStatus = sdata.checkStatus || [];
				sdata.contacts = this.addForm.contacts;
				sdata.fileContent = {};
				sdata.industryLevel1 = '' + this.categorySelect[0]||0;
				sdata.industryLevel2 = '' + this.categorySelect[1]||0;
				sdata.name = this.addForm.name;
				sdata.phone = this.addForm.phone;
				sdata.remarks = this.addForm.remarks;
				sdata.waxUid = [];//this.addForm.waxUid.split(',');
				sdata.website = this.addForm.website;

				//资质文件
				for (let [i, lfile] of Object.keys(this.licenseFiles).entries()) {
					if (this.licenseFiles[lfile].urls&&this.licenseFiles[lfile].urls.length>0) {
						sdata.fileContent[''+lfile] = {
							ft: this.licenseFiles[lfile].name,
							urls: this.licenseFiles[lfile].urls
						}
					}
				}

				for (let [i, uids] of this.waxUids.entries()) {
					if (uids.uid && uids.uid.length > 0){
						sdata.waxUid.push({
							uid: uids.uid,
							name: uids.upfile.name||'',
							url: uids.upfile.url||''
						})
					}
				}

				console.log('submit data is.', sdata);
				let result = null;
				if (sdata.id){
					result = await this.updateAdvertiser(sdata);
				}else{
					result = await this.createAdvertiser(sdata);
				}
				console.log('submit result is.', result);
				if (result&&Object.keys(result).length > 0){
			        this.$router.push({
	                    path: '/advpro/advDetail'
	                });
				}else{
					console.log('submit result is. empty..');
				}
			}else{

			}
		}
	},

	computed:{
		...mapState({
			category:(state) => {
				return state.advpro.advcategory
			},

			cache:(state) => {
				return state.advpro.advertiser
			},
		})
	},

	mounted(){},

	created(){
		this.checkCategoryState();
	}
}
</script>

<style >
.el-container {
    position: relative;
    margin: 10px 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
  }
</style>