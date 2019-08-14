<template lang="html">
	<div class="mediaBuy">
		<div class="mediaBuyMidden">
			<div class="searchDiv">
				<el-input placeholder="请输入帐号媒体名称,如UC,头条" style="width:400px" v-model="searchValue" @keyup.enter.native="searchClick()">
					<el-button slot="append" icon="el-icon-search" @click="searchClick()"></el-button>
				</el-input>
				<el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true" style="margin-left:50px">新建</el-button>
			</div>
			<div class="itemDiv" v-for="buy in medias">
				<MediaBuyItem v-bind:buy="buy"></MediaBuyItem>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol"></el-pagination>
			</div>
		</div>
		<el-dialog :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
				<el-form-item label="名称:" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="Email:" prop="name">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="链接模板:">
					<el-table ref="singleTable" :data="form.example" highlight-current-row size='small'>
						</el-table-column>
						<el-table-column label="模板名称" width="160">
							<template slot-scope="scope" prop="name">
								<el-input v-model="scope.row.exampleName" placeholder="请输入模板名称"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="链接模板" width="160">
							<template slot-scope="scope" prop="name">
								<el-input v-model="scope.row.exampleText" placeholder="请输入模板"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="110">
							<template slot-scope="scope">
								<el-button size="mini" icon="el-icon-delete" @click="pageDeletAction(scope.$index, form.example)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<img src="/static/img/add.png" alt="" class="addImage" @click='imageButtonAction(form.example,addPage)'>
				</el-form-item>
				<el-form-item label="备注:" prop="name">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import MediaBuyItem from './mediaBuyItem.vue'
	export default {
		components: {
			MediaBuyItem
		},

		data() {
			return {
				pageCtr: {
					pageSize: 100,
					pageTatol: 0,
					pageCurrent: 1
				},

				searchValue: '',
				medias: [],

				dialogFormVisible: false,
				addPage: {},
				form: {
					// name:''
					example: []
				},
				formLabelWidth: '120px',
				rules: {
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}, ],
				}
			}
		},

		watch: {
			'form.example': function(val) {
				console.log(val);
			},
			addPage: function(val) {
				console.log('2222222' + val);
			}
		},

		methods: {
			...mapActions([
				'setMessage',
				'getMediabuyList',
				'createMediabuy',
				'updateMediabuy'
			]),

			handleSizeChange(val) {
				this.pageCtr.pageSize = val;
			},

			async handleCurrentChange(val) {
				let condition = {};
				if(this.searchValue.length > 0) {
					condition['rules[0].field'] = 'name';
					condition['rules[0].op'] = 'like';
					condition['rules[0].data'] = this.searchValue;
				}
				condition['groupOp'] = 'AND';
				condition['page'] = Number(val) - 1;
				condition['size'] = this.pageCtr.pageSize;

				await this.getMediaBuyData(condition);
			},

			async getMediaBuyData(options) {
				let medialist = await this.getMediabuyList(options);
				if(medialist && medialist.content && medialist.content.length > 0) {
					this.pageCtr.pageTatol = medialist.totalElements || 0;
					this.medias = medialist.content || [];
				} else {
					this.pageCtr.pageTatol = 0;
					this.medias = [];
				}
			},

			imageButtonAction(data, littleData) {
				littleData = {};
				data.push(littleData);
			},

			pageDeletAction(index, rows) {
				rows.splice(index, 1);
			},

			async submitForm(form) {
				let isvalid = await new Promise((resolve, reject) => {
					this.$refs[form].validate((valid) => {
						if(valid) {
							console.log('resolve.');
							resolve(true);
						} else {
							resolve(false);
						}
					});
				});

				if(isvalid) {
					//检查模板
					let links = [];
					for(let [i, link] of (this.form.example || []).entries()) {
						if(link.exampleName && link.exampleText && link.exampleName.length > 0 && link.exampleText.length > 0) {
							links.push({
								name: link.exampleName,
								content: link.exampleText
							});
						}
					}

					let sdata = {};
					if(links.length > 0) {
						sdata['email'] = this.form.email;
						sdata['name'] = this.form.name;
						sdata['remarks'] = this.form.desc;
						sdata['linkTplContent'] = links;

						let result = await this.createMediabuy(sdata);
						if(result && Object.keys(result).length > 0) {
							console.log("create success.", result);
							this.setMessage({
								type: 'info',
								message: '创建账户成功'
							});
							this.dialogFormVisible = false;
							this.form = {};
							await this.getMediaBuyData({
								page: 0,
								size: 100,
								sort: ['id,desc']
							});
						} else {
							this.form = {};
							this.setMessage({
								type: 'error',
								message: '创建账户失败'
							});
						}
					} else {
						this.form = {};
						this.setMessage({
							type: 'error',
							message: '参数不完整'
						});
					}
				}
			}
		},

		created() {
			this.getMediaBuyData({
				page: 0,
				size: 100,
				sort: ['id,desc']
			});
		}
	}
</script>

<style lang="scss" scoped>
	.mediaBuy {
		// position: absolute;
		height: 100%;
	}
	
	.addImage {
		position: absolute;
		left: 90%;
		bottom: 0px;
		cursor: pointer;
	}
	
	.mediaBuyMidden {
		// width: 100%;
		height: 100%;
		// background-color: red;
		.searchDiv {
			padding-top: 40px;
			padding-left: 50px;
			// position: relative;
			// float: left;
			.el-select .el-input {
				width: 100px;
			}
		}
		.itemDiv {
			padding: 30px;
			padding-top: 20px;
			padding-bottom: 0px;
			// background-color: red;
			.heroPagintion {
				margin-top: 30px;
			}
		}
	}
	
	.el-table .cell {
		text-align: center;
	}
	
	.el-table th>.cell {
		text-align: center;
		color: #333;
		font-size: 12px;
	}
	
	.el-table th,
	.el-table tr {
		background-color: #f7f7f7;
	}
	
	.el-button--mini,
	.el-button--mini.is-round {
		background: #f4dde4;
		color: #e14b78;
	}
	
	.el-table .cell {
		height: 30px;
	}
	
	.el-input__inner {
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #333;
	}
</style>