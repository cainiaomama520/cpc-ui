<template lang="html">
	<div class="hero">
		<div class="mediaMidden">
			<div class="searchDiv">
				<el-input placeholder="请输入资源位名称,如Banner" style="width:400px" class="input-with-select" v-model="searchValue" @keyup.enter.native="handleSearch()">
					<el-select v-model="selectValue" slot="prepend" placeholder="资源方" @change="selectChange()">
						<el-option label="WAX" value="WAX"></el-option>
						<el-option label="BAIDU_GD" value="BAIDU_GD"></el-option>
						<el-option label="BILIBILI" value="BILIBILI"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
				</el-input>
			</div>
			<div class="itemDiv">
				<HeroItem v-bind:medias="medias"></HeroItem>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="pageCtr.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCtr.pageTatol"></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import HeroItem from './heroItem.vue'
	export default {
		components: {
			HeroItem
		},

		data() {
			return {
				pageCtr: {
					pageSize: 100,
					pageTatol: 0,
					pageCurrent: 1
				},
				medias: [],
				selectValue: 'WAX',
				searchValue: ''
			}
		},

		methods: {
			...mapActions([
				'getMediasList'
			]),

			async selectChange() {
				let condition = {
					'rules[0].field': 'media',
					'rules[0].op': 'eq',
					'rules[0].data': this.selectValue,
				}
				if(this.searchValue.length > 0) {
					condition['rules[1].field'] = 'name';
					condition['rules[1].op'] = 'like';
					condition['rules[1].data'] = this.searchValue;
				}
				condition['groupOp'] = 'AND';

				await this.getMediaData(condition);
			},

			async handleSearch() {
				let condition = {
					'rules[0].field': 'media',
					'rules[0].op': 'eq',
					'rules[0].data': this.selectValue,
				}
				if(this.searchValue.length > 0) {
					condition['rules[1].field'] = 'name';
					condition['rules[1].op'] = 'like';
					condition['rules[1].data'] = this.searchValue;
				}
				condition['groupOp'] = 'AND';

				await this.getMediaData(condition);
			},

			handleSizeChange(val) {
				this.pageCtr.pageSize = val;
			},

			async handleCurrentChange(val) {
				let condition = {
					'rules[0].field': 'media',
					'rules[0].op': 'eq',
					'rules[0].data': this.selectValue,
				}
				if(this.searchValue.length > 0) {
					condition['rules[1].field'] = 'name';
					condition['rules[1].op'] = 'like';
					condition['rules[1].data'] = this.searchValue;
				}
				condition['groupOp'] = 'AND';
				condition['page'] = Number(val) - 1;
				condition['size'] = this.pageCtr.pageSize;

				await this.getMediaData(condition);
			},

			async getMediaData(options) {
				let medialist = await this.getMediasList(options);
				if(medialist && medialist.content && medialist.content.length > 0) {
					this.pageCtr.pageTatol = medialist.totalElements || 0;
					this.medias = medialist.content || [];
				} else {
					this.pageCtr.pageTatol = 0;
					this.medias = [];
				}
				console.log('this.medias', this.medias);
			},
		},

		created() {
			let condition = {
				'rules[0].field': 'media',
				'rules[0].op': 'eq',
				'rules[0].data': this.selectValue,
			}
			if(this.searchValue.length > 0) {
				condition['rules[1].field'] = 'name';
				condition['rules[1].op'] = 'like';
				condition['rules[1].data'] = this.searchValue;
			}
			condition['groupOp'] = 'AND';
			condition['page'] = 0;
			condition['size'] = this.pageCtr.pageSize;

			this.getMediaData(condition);
		}
	}
</script>

<style lang="scss">
	.hero {
		// position: absolute;
		height: 100%;
	}

	.mediaMidden {
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
			// background-color: red;
			.heroPagintion {
				margin-top: 30px;
			}
		}
	}
</style>
