<template lang="html">
	<div class="mediaBuyItem">
		<div class="mediaHeader">
			<span>{{buy.name}}</span>
			<el-button type="primary" icon="el-icon-edit" style="margin-right:40px;float:right;margin-top:5px" @click="dialogFormVisible = true" circle></el-button>
		</div>
		<div class="mediaBody">
			<div>
				<span class="leftSpan">ID:</span>
				<span class="rightSpan">{{buy.id}}</span>
			</div>
			<div>
				<span class="leftSpan">名称:</span>
				<span class="rightSpan">{{buy.name}}</span>
			</div>
			<div>
				<span class="leftSpan">email:</span>
				<span class="rightSpan">{{buy.email}}</span>
			</div>
			<div v-for="link in buy.linkTplContent">
				<span class="leftSpan">模板：{{link.name}}</span>
				<span class="rightSpan">格式：{{link.content}}</span>
			</div>
			<div>
				<span class="leftSpan">创建者:</span>
				<span class="rightSpan">{{buy.updateBy}}</span>
			</div>
			<div>
				<span class="leftSpan">创建日期:</span>
				<span class="rightSpan">{{buy.updateDate}}</span>
			</div>
			<div>
				<span class="leftSpan">备注:</span>
				<span class="rightSpan">{{buy.remarks}}</span>
			</div>
		</div>
		<el-dialog :visible.sync="dialogFormVisible">
			<el-form :model="froms" :rules="rules" ref="froms" label-width="100px" class="demo-ruleForm">
				<el-form-item label="名称:" prop="name">
					<el-input v-model="froms.name"></el-input>
				</el-form-item>
				<el-form-item label="Email:" prop="name">
					<el-input v-model="froms.email"></el-input>
				</el-form-item>
				<el-form-item label="链接模板:">
					<el-table ref="singleTable" :data="froms.linkTplContent" highlight-current-row size='small'>
						</el-table-column>
						<el-table-column label="模板名称" width="160">
							<template slot-scope="scope" prop="name">
								<el-input v-model="scope.row.name" placeholder="请输入模板名称"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="链接模板" width="160">
							<template slot-scope="scope" prop="name">
								<el-input v-model="scope.row.content" placeholder="请输入模板"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="110">
							<template slot-scope="scope">
								<el-button size="mini" icon="el-icon-delete" @click="pageDeletAction(scope.$index, froms.linkTplContent)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<img src="/static/img/add.png" alt="" class="addImage" @click='imageButtonAction(froms.linkTplContent,addPage)'>
				</el-form-item>
				<el-form-item label="备注:" prop="name">
					<el-input type="textarea" v-model="froms.remarks"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('froms')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		props: ["buy"],

		data() {
			return {
				dialogFormVisible: false,
				addPage: {},
				formLabelWidth: '120px',
				froms: {},
				rules: {
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
				}
			};
		},

		methods: {
			...mapActions([
				'setMessage',
				'updateMediabuy'
			]),

			async submitForm() {
				let editres = await this.updateMediabuy(this.froms);
				console.log("update.", editres);
				if(editres && Object.keys(editres).length > 0) {
					this.setMessage({
						type: 'info',
						message: '更新成功'
					});
					this.dialogFormVisible = false;
				} else {
					this.setMessage({
						type: 'error',
						message: '更新失败'
					});
				}
			},

			imageButtonAction(data, littleData) {
				littleData = {};
				data.push(littleData);
			},

			pageDeletAction(index, rows) {
				rows.splice(index, 1);
			},
		},

		created() {
			this.froms['id'] = this.buy.id || 0;
			this.froms['remarks'] = this.buy.remarks || '';
			this.froms['createDate'] = this.buy.createDate || 0;
			this.froms['updateDate'] = this.buy.updateDate || 0;
			this.froms['createBy'] = this.buy.createBy || 0;
			this.froms['updateBy'] = this.buy.updateBy || 0;
			this.froms['delFlag'] = this.buy.delFlag || 'ON';
			this.froms['name'] = this.buy.name || '';
			this.froms['email'] = this.buy.email || '';
			this.froms['linkTplContent'] = [];
			for(let [i, cnt] of this.buy.linkTplContent.entries()) {
				this.froms['linkTplContent'].push({
					name: cnt.name,
					content: cnt.content
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mediaBuyItem {
		// height: 100px;
		width: 100%;
		// background-color: cyan;
		border: 1px solid #e4e7ed;
		border-radius: 10px;
		margin-top: 30px;
		.mediaHeader {
			height: 50px;
			border-bottom: 1px solid #e4e7ed;
			background-color: #edf0f5;
			span {
				display: inline-block;
				font-size: 16px;
				margin-top: 15px;
				margin-left: 40px;
			}
		}
		.mediaBody {
			padding: 40px;
			padding-top: 20px;
			// padding-right: 40px;
			span {
				display: inline-block;
				line-height: 30px;
				font-size: 14px;
			}
			.leftSpan {
				width: 10%;
				float: left;
			}
			.rightSpan {
				width: 90%;
			}
		}
	}
</style>