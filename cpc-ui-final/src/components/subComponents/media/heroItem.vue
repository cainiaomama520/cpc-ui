<template lang="html">
	<div class="heroItem">
		<el-row :gutter="20" v-for="media in medias" :key="media.id">
			<el-card class="box-card" style="margin-bottom: 30px">
				<el-col :span="12" style="margin-bottom: 30px">
					<span class="firstSpan">{{media.name}}</span>
					<span class="sencondSpan">位置描述:</span>
					<span class="thirdSpan">{{media.creativeContent.comment}}</span>
					<span class="sencondSpan">素材要求:</span>
					<span class="thirdSpan">类型:{{media.creativeContent.creativeType}}</span>
					<span class="thirdSpan">尺寸:{{media.creativeContent.imgWh.join(';')}}</span>
					<span class="thirdSpan">格式:{{media.creativeContent.imgFormats.join(';')}}</span>
					<span class="thirdSpan">大小:{{media.creativeContent.imgSize}}</span>
					<span class="thirdSpan">链接:支持外链</span>
					<span class="thirdSpan">标题:24个中文字符以内</span>
					<span class="thirdSpan">品牌:6个中文字符以内</span>
				</el-col>
				<el-col :span="12">
					<span class="sencondSpan">样例:</span>
					<img class="exmpleImg" :src="media.imgUrl" alt="" style="width: 215px;height: 330px;">
				</el-col>
			</el-card>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: ["medias"],

		data() {
			return {
				type: '图片'
			};
		},

		watch: {
			medias: (val) => {
				console.log('..', val)
			}
		}
	}
</script>

<style lang="scss">
	.heroItem {
		/*// height: 100px;*/
		width: 100%;
		/*// background-color: cyan;*/
		/*border: 1px solid #e4e7ed;*/
		border-radius: 10px;
		margin-top: 30px;
		.firstSpan {
			display: block;
			font-size: 20px;
			margin-top: 20px;
			margin-left: 20px;
		}
		.sencondSpan {
			display: block;
			font-size: 16px;
			margin-top: 20px;
			margin-left: 40px;
		}
		.thirdSpan {
			display: block;
			font-size: 14px;
			margin-top: 10px;
			margin-left: 60px;
		}
		.lastSpan {
			margin-bottom: 30px
		}
		.exmpleImg {
			padding-top: 30px;
			padding-left: 20%;
		}
	}
</style>
