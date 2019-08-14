<template lang="html">
	<div class="creatWBADtivity">
		<el-row>
			<el-col :span='20'>
				<el-form :model="form" :rules='rulesForm' ref='form' label-width="120px" class="demo-ruleForm">
					<el-form-item label="广告组名称:" v-if="this.$route.query.value == 'copy'">
						<el-select v-model="editObj.adGroupId" filterable placeholder="" style="width:235px">
							<el-option key="" label="全部" value=""></el-option>
							<el-option v-for="(item,index) in adGroupList" :key="item.id" :label="item.id+'-'+item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标题:" prop='name' class='currentWidth'>
						<el-input v-model="form.name" placeholder='请输入标题'></el-input>
					</el-form-item>
					<el-form-item label="广告位:">
						<el-radio-group v-model="form.resourceAdSiteId">
							<el-radio label='1'>主信息流+热门信息流</el-radio>
							<el-radio label='2'>正文页博文下方</el-radio>
							<el-radio label='3'>正文页评论流</el-radio>
							<el-radio label='4'>图集流</el-radio>
						</el-radio-group>
					</el-form-item>
					<div v-if='form.resourceAdSiteId == 1' key='resourceAdSiteId'>
						<el-form-item label="广告形式:">
							<el-radio-group v-model="form.type">
								<el-radio label='1'>普通博文</el-radio>
								<el-radio label='2'>图文/视频Card</el-radio>
								<el-radio label='3'>4/6/9宫格</el-radio>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="微博UID:" prop='uid' class='currentWidth'>
																	<el-input v-model="form.uid" placeholder='请输入微博UID'></el-input>
																</el-form-item>-->
						<!--普通博文-->
						<div v-if="form.type == 1" key='type'>
							<el-form-item label="博文形式:">
								<el-radio-group v-model="form.blogContextType">
									<el-radio label='2'>新建博文</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="博文内容" prop="text" class='currentWidth'
							:rules="[
									{ required: true, message: '请输入博文内容', trigger: 'blur' },
									{ min: 0, max: 140, message: '博文内容不得对于140字符', trigger: 'blur' }
								]">
								<el-input type="textarea" v-model="form.text" placeholder='请输入博文内容'></el-input>
							</el-form-item>
							<el-form-item label="广告图片">
								<el-upload class="upload-demo" :before-upload="bwBeforeAvatarUpload" :headers="myHeaders" :action='this.loadImgs' :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='9'>
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">格式JPG、PNG、GIF，不超过5MB，最多上传9张，微博正文若无链接，不多于140字，若有链接，正文处直接添加链接（占10个字），其余不多于130字</div>
								</el-upload>
							</el-form-item>
						</div>
						<!--图文/视频Card-->
						<div v-if="form.type == 2" key='type1'>
							<el-form-item label="Card类型:">
								<el-radio-group v-model="form.cardType">
									<el-radio label='1'>图文</el-radio>
									<el-radio label='2'>视频</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="边看边下:">
								<el-radio-group v-model="form.wd">
									<el-radio label='0'>不开启</el-radio>
									<el-radio label='1'>开启</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="Card按钮:">
								<el-radio-group v-model="form.cardButtonType">
									<el-radio label='none'>无</el-radio>
									<el-radio label='join'>参与</el-radio>
									<el-radio label='buy'>购买</el-radio>
									<el-radio label='download'>下载</el-radio>
								</el-radio-group>
							</el-form-item>
							<div v-if="form.cardButtonType == 'download'" key='cardButtonType'>
								<el-form-item label="按钮动作:">
									<el-radio-group v-model="form.cardButtonAction">
										<el-radio label='none'>下载App</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="系统类型:">
									<el-radio-group v-model="form.appType">
										<el-radio label='0'>iOS</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="按钮链接:" prop='cardButtonUrl' class='currentWidth'>
									<el-input v-model="form.cardButtonUrl" placeholder='请输入按钮链接'></el-input>
								</el-form-item>
							</div>
							<div v-if="form.cardButtonType != 'none' && form.cardButtonType != 'download'" key='cardButtonType1'>
								<el-form-item label="按钮动作:">
									<el-radio-group v-model="form.appCallupType">
										<el-radio label='1'>跳转H5</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="H5链接:" prop='appH5Url' class='currentWidth'>
									<el-input v-model="form.appH5Url" placeholder='请输入H5链接'></el-input>
								</el-form-item>
							</div>
							<el-form-item label="博文内容" prop="text" class='currentWidth'
							:rules="[
									{ required: true, message: '请输入博文内容', trigger: 'blur' },
									{ min: 0, max: 130, message: '博文内容不得对于130字符', trigger: 'blur' }
								]">
								<el-input type="textarea" v-model="form.text" placeholder='请输入博文内容'></el-input>
							</el-form-item>
							<el-form-item label="Card标题:" prop='cardTitle' class='currentWidth'>
								<el-input v-model="form.cardTitle" placeholder='请输入card标题'></el-input>
							</el-form-item>
							<el-form-item label="Card内容" prop="cardDesc" class='currentWidth'>
								<el-input type="textarea" v-model="form.cardDesc" placeholder='请输入card内容'></el-input>
							</el-form-item>
							<el-form-item label="Card链接:" prop='landingpageUrl' class='currentWidth'>
								<el-input v-model="form.landingpageUrl" placeholder='请输入card链接'></el-input>
							</el-form-item>
							<div v-if="form.cardType == 2" key='cardType'>
								<el-form-item label="视频封面">
									<el-upload class="upload-demo" :before-upload="twBeforeAvatarUpload" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='1'>
										<el-button size="small" type="primary">点击上传</el-button>
										<div slot="tip" class="el-upload__tip"></div>
									</el-upload>
								</el-form-item>
								<el-form-item label="广告视频">
									<el-upload class="upload-demo" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" accept='video' :on-change='videoAction' :on-remove="handleVideoRemove" :file-list="form.videoPath" list-type="text" :limit='1'>
										<el-button size="small" type="primary">点击上传</el-button>
										<div slot="tip" class="el-upload__tip">
											填写的微博正文内容，≤130 个字符，可以在文字中间添加链 接(不可在尾部添加);
											<br>微博图片 url，尺寸仅支持 580X326;图片仅支持 png，大小 ≤70K;
											<br>标题:不使用按钮时，标题最多允许 18 个字符;使用按钮时， 标题最多为 14 个字符;(标题不能包含##)
											<br>描述，不使用按钮时，最多允许 38 个字符，使用按钮时，最 多为 34 个字符;
											<br>按钮，按钮类型为 none(无)、join(参与)、buy(购买)、 download(下载)四种;
											<br>活动链接及按钮链接:可配置不一样，支持外链; 附:视频尺寸:16:9;视频时长≤1 分钟;视频格式:MP4;视 频分辨率:720P 及以上;
										</div>
									</el-upload>
								</el-form-item>
							</div>
							<el-form-item label="广告图片" v-if="form.cardType == 1" key='cardType1'>
								<el-upload class="upload-demo" :before-upload="twBeforeAvatarUpload" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='1'>
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">
										填写的微博正文内容，不多于 130 个字符，可以在文字中间添加链接(不可在尾部添加)</br>
										微博图片 url，尺寸仅支持 592X296;图片仅支持 png 及 jpg，大小不能超过 70K<br>
										标题:不使用按钮时，标题最多允许 18 个字符;使用按钮时，标题最多为 14 个字符;(标题不能包含##)<br>
										描述，不使用按钮时，最多允许 38 个字符，使用按钮时，最多为 34 个字符;<br>
										按钮，按钮类型为 none(无)、join(参与)、buy(购买)、download(下载)四种;<br>
										活动链接及按钮链接:可配置不一样，支持外链;
									</div>
								</el-upload>
							</el-form-item>
						</div>
						<!--4/6/9宫格-->
						<div v-if="form.type == 3" key='type2'>
							<el-form-item label="博文内容" prop="text" class='currentWidth'
							:rules="[
									{ required: true, message: '请输入博文内容', trigger: 'blur' },
									{ min: 10, max: 30, message: '博文内容不得少于10字符，对于30字符', trigger: 'blur' }
								]">
								<el-input type="textarea" v-model="form.text" placeholder='请输入博文内容'></el-input>
							</el-form-item>
							<el-form-item label="宫格类型:">
								<el-radio-group v-model="form.gridPicType">
									<el-radio label='1'>4图</el-radio>
									<el-radio label='2'>6图</el-radio>
									<el-radio label='3'>9图</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="广告图片" v-if="form.cardType == 1" key='cardType5'>
								<el-upload class="upload-demo" :before-upload="cardBeforeAvatarUpload" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit=howMImages>
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">
										微博正文，至少输入 10 个汉字，最多不超过 30 个汉字，不允许包含链接;
										<br>图片 url，为确保展示效果，支持上传 4,6,9 张图片，图片尺寸为 1242*1242 像素，每张图片<=100k，图片格式为png/jpg;
										<br>标签类型，4,6,9 个图片标签文案要求保持一致，可选项如下:(1) 立即下载 (2) 立即使用 (3) 玩游戏 (4) 立即安装 (5) 立即购买 (6) 了解详情(7) 去看看
										<br>标签链接:直接提供 appid，由微博拼装;点击 ios 跳转至 appstore，点击 Android 直接下载;
									</div>
								</el-upload>
							</el-form-item>
							<el-form-item label="标签类型">
								<el-select v-model="form.tagType" placeholder="请选择">
									<el-option v-for="item in tagTypeArray" :key="item.value" :label="item.name" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="链接类型:">
								<el-radio-group v-model="form.appCallupType">
									<el-radio label='1'>跳转H5</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="H5链接:" prop='appH5Url' class='currentWidth'>
								<el-input v-model="form.appH5Url" placeholder='请输入H5链接'></el-input>
							</el-form-item>
						</div>
					</div>
					<div v-if='form.resourceAdSiteId == 2' key='resourceAdSiteId1'>
						<el-form-item label="广告形式:">
							<el-radio-group v-model="form.type">
								<el-radio label='4'>Banner</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="点击动作:">
							<el-radio-group v-model="form.appCallupType">
								<el-radio label='1'>跳转H5</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="H5链接:" prop='appH5Url' class='currentWidth'>
							<el-input v-model="form.appH5Url" placeholder='请输入H5链接'></el-input>
						</el-form-item>
						<el-form-item label="广告图片" v-if="form.cardType == 1" key='cardType2'>
							<el-upload class="upload-demo" :before-upload="bannerBeforeAvatarUpload" :headers="myHeaders" :action='this.loadImgs' :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='1'>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">
									图片尺寸为 320*50/640*100 像素，每张图片<=40k，图片格式为png/jpg
									<br>
								</div>
							</el-upload>
						</el-form-item>
					</div>
					<div v-if='form.resourceAdSiteId == 3 || form.resourceAdSiteId == 4' key='resourceAdSiteId3'>
						<el-form-item label="广告形式:">
							<el-radio-group v-model="form.type">
								<el-radio label='2'>图文/视频Card</el-radio>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="微博UID:" prop='uid' class='currentWidth'>
																	<el-input v-model="form.uid" placeholder='请输入微博UID'></el-input>
																</el-form-item>-->
						<el-form-item label="Card类型:">
							<el-radio-group v-model="form.cardType">
								<el-radio label='1'>图文</el-radio>
								<el-radio label='2'>视频</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="边看边下:">
							<el-radio-group v-model="form.wd">
								<el-radio label='0'>不开启</el-radio>
								<el-radio label='1'>开启</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="Card按钮:">
							<el-radio-group v-model="form.cardButtonType">
								<el-radio label='none'>无</el-radio>
								<el-radio label='join'>参与</el-radio>
								<el-radio label='buy'>购买</el-radio>
								<el-radio label='download'>下载</el-radio>
							</el-radio-group>
						</el-form-item>
						<div v-if="form.cardButtonType == 'download'" key='cardButtonType2'>
							<el-form-item label="按钮动作:">
								<el-radio-group v-model="form.cardButtonAction">
									<el-radio label='none'>下载App</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="系统类型:">
								<el-radio-group v-model="form.appType">
									<el-radio label='0'>iOS</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="按钮链接:" prop='cardButtonUrl' class='currentWidth'>
								<el-input v-model="form.cardButtonUrl" placeholder='请输入按钮链接'></el-input>
							</el-form-item>
						</div>
						<div v-if="form.cardButtonType != 'none' && form.cardButtonType != 'download'" key='cardButtonType3'>
							<el-form-item label="按钮动作:">
								<el-radio-group v-model="form.appCallupType">
									<el-radio label='1'>跳转H5</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="H5链接:" prop='appH5Url' class='currentWidth'>
								<el-input v-model="form.appH5Url" placeholder='请输入H5链接'></el-input>
							</el-form-item>
						</div>
						<el-form-item label="博文内容" prop="text" class='currentWidth'
						:rules="[
								{ required: true, message: '请输入博文内容', trigger: 'blur' },
								{ min: 0, max: 130, message: '博文内容不得对于130字符', trigger: 'blur' }
							]">
							<el-input type="textarea" v-model="form.text" placeholder='请输入博文内容'></el-input>
						</el-form-item>
						<el-form-item label="Card标题:" prop='cardTitle' class='currentWidth'>
							<el-input v-model="form.cardTitle" placeholder='请输入card标题'></el-input>
						</el-form-item>
						<el-form-item label="Card内容" prop="cardDesc" class='currentWidth'>
							<el-input type="textarea" v-model="form.cardDesc" placeholder='请输入card内容'></el-input>
						</el-form-item>
						<el-form-item label="Card链接:" prop='landingpageUrl' class='currentWidth'>
							<el-input v-model="form.landingpageUrl" placeholder='请输入card链接'></el-input>
						</el-form-item>
						<div v-if="form.cardType == 2" key='cardType3'>
							<el-form-item label="视频封面">
								<el-upload class="upload-demo" :before-upload="twBeforeAvatarUpload" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='9'>
									<el-button size="small" type="primary">点击上传</el-button>
									<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
								</el-upload>
							</el-form-item>
							<el-form-item label="广告视频">
								<el-upload class="upload-demo" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" accept='video' :on-change='videoAction' :on-remove="handleVideoRemove" :file-list="form.videoPath" list-type="text" :limit='1'>
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">
										填写的微博正文内容，≤130 个字符，可以在文字中间添加链 接(不可在尾部添加);
										<br>微博图片 url，尺寸仅支持 580X326;图片仅支持 png，大小 ≤70K;
										<br>标题:不使用按钮时，标题最多允许 18 个字符;使用按钮时， 标题最多为 14 个字符;(标题不能包含##)
										<br>描述，不使用按钮时，最多允许 38 个字符，使用按钮时，最 多为 34 个字符;
										<br>按钮，按钮类型为 none(无)、join(参与)、buy(购买)、 download(下载)四种;
										<br>活动链接及按钮链接:可配置不一样，支持外链; 附:视频尺寸:16:9;视频时长≤1 分钟;视频格式:MP4;视 频分辨率:720P 及以上;</div>
								</el-upload>
							</el-form-item>
						</div>
						<el-form-item label="广告图片" v-if="form.cardType == 1" key='cardType4'>
							<el-upload class="upload-demo" :before-upload="twBeforeAvatarUpload" :headers="myHeaders" :action=this.loadImgs :on-preview="handlePreview" :on-remove="handleRemove" :on-change='filesAction' :file-list="form.picObjUrls" list-type="picture" :limit='9'>
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">
									填写的微博正文内容，不多于 130 个字符，可以在文字中间添加链接(不可在尾部添加)</br>
									微博图片 url，尺寸仅支持 592X296;图片仅支持 png 及 jpg，大小不能超过 70K<br>
									标题:不使用按钮时，标题最多允许 18 个字符;使用按钮时，标题最多为 14 个字符;(标题不能包含##)<br>
									描述，不使用按钮时，最多允许 38 个字符，使用按钮时，最多为 34 个字符;<br>
									按钮，按钮类型为 none(无)、join(参与)、buy(购买)、download(下载)四种;<br>
									活动链接及按钮链接:可配置不一样，支持外链;
								</div>
							</el-upload>
						</el-form-item>
					</div>
					<el-form-item label="私密状态:" v-if='form.resourceAdSiteId != 2' key='resourceAdSiteId4'>
						<el-radio-group v-model="form.privateBlog">
							<el-radio label='2'>公开</el-radio>
							<!--<el-radio label='3'>不展示在微博主页</el-radio>-->
						</el-radio-group>
					</el-form-item>

					<!-- <el-form-item label="广告主曝光监测">
						<el-select v-model="form.impTrackingUrl.id" filterable placeholder="请选择曝光链接" style="width:235px">
							<el-option v-for="item in impTrackingUrlList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="广告主点击检测" prop="clkTrackingUrl.id">
						<el-select v-model="form.clkTrackingUrl.id" filterable placeholder="请选择点击链接" style="width:235px">
							<el-option v-for="item in clkTrackingUrlList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item label="广告主监测链接" prop='trackLinkId'>
						<el-select v-model="form.trackLinkId" filterable placeholder="请选择监测链接" style="width:235px">
							<el-option v-for="item in trackLinkArr" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="选择UID" prop='uid'>
						<el-select v-model="form.uid" filterable placeholder="请选择UID" style="width:235px">
							<el-option v-for="item in uidArray" :key="item.uid" :label="item.name" :value="item.uid">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item style="padding-top:50px;padding-left:60%">
						<el-button type="primary" @click="cancleAction()">取&emsp;消</el-button>
						<el-button type="primary" @click="submitForm('form')">提&emsp;交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<div class="currentWB" >
			<div v-if='form.type != 4'>
				<div class="bigCardImgDiv" >
					<div class="contentDiv">
						<div class="contentHeader">
						</div>
						<div class="midden">
							{{form.text}}
						</div>
						<img v-if="form.type == 2 && form.picObjUrls.length > 0" class="bigCardImg" :src="form.picObjUrls[0].url" alt="">
						<div v-if="form.type != 2 && form.picObjUrls.length > 0" class="muchImg">
								<img class="nineImg" v-for='(imgItem,index) in form.picObjUrls' :src="imgItem.url" alt="">
						</div>
						<div v-if="form.type == 2" class="cardMessageDiv">
							<div class="carMLeftDiv">
								<div class="carMLeftTop">
									{{form.cardTitle}}
								</div>
								<div class="carMLeftBottom">
									{{form.cardDesc}}
								</div>
							</div>
							<div class="carMRightDiv" v-if="form.landingpageUrl != ''">
								<a target='_BLANK' :href="form.landingpageUrl"><el-button type="primary" round size="mini" icon="el-icon-download"></el-button></a>
							</div>
						</div>
						<div class="contentFooter"></div>
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
				adGroupList:[],
				myHeaders: {
					Authorization: 'Bearer ' + Cookie.getCookie('token')
				},
				loadImgs: this.rootUrl + '/api/common/upload',
				isEditBool: false,
				canWatch: false,
				editObj: {},
				clkTrackingUrlList: [],
				impTrackingUrlList: [],
				advertiserId: localStorage.getItem("GTadvertiserId"),
				productId: localStorage.getItem("GTproductId"),
				trackLinkArr: [],
				trackLinkId: '',
				uidArray: [],
				form: {
					wd: '0',// 边看变下
					uid: '', // 微博UID
					name: '',
					resourceAdSiteId: '1', // 广告位
					type: '1', // 广告形式(feed1、card3、grid4)
					//				uid: '', // 微博UID
					privateBlog: '2', // 私密状态
					blogContextType: '2', // 博文形式
					//				mid: '', // 博文链接
					text: '', // 博文内容
					//				picUrl: [], // 图片
					//				picName: [], // 图片名
					picObjUrls: [], //图片name&url
					picNames: [], // 图片宫格名称
					appCallupType: '1', // h5/APP,
					appH5Url: '', // H5链接
					appDeeplinkUrl: '', // url schemes
					appType: '0', // 安卓/iOS
					//				appUrl: '', // 下载链接
					//				appName: '', // 应用名称
					//				appClassify: [], // 应用分类
					//				appDeveloper: '', // 应用开发者
					//				appDesc: '', // 应用描述
					//				appIcon: [], // 应用图标
					//				appIconName: [], // 应用图标图片名
					//				appImages: [], // 应用广告图片
					//				appImageNames: [], // 应用广告图片名
					cardTitle: '', // card标题
					cardDesc: '', // card内容
					cardButtonUrl: '', // card按钮地址
					cardType: '1', // 品牌card类型
					cardButtonType: 'none', // card按钮类型
					cardButtonAction: 'none', // 按钮动作
					landingpageUrl: '', // card链接/跳转链接
					videoPath: [], // 上传视频
					gridPicType: '1', // 宫格类型
					tagType: '1', // 标签类型
					trackLinkId: '',
					// clkTrackingUrl: {
					// 	advertiserId: localStorage.getItem("GTadvertiserId"),
					// 	name: '',
					// 	url: '',
					// 	type: 'CLK'
					// },
					// impTrackingUrl: {
					// 	advertiserId: localStorage.getItem("GTadvertiserId"),
					// 	name: '',
					// 	url: '',
					// 	type: 'IMP'
					// }
				},
				howMImages: 4,
				rulesForm: {
					uid: [{
						required: true,
						message: '请选择UID',
						trigger: 'blur'
					}, ],
					trackLinkId: [{
						required: true,
						message: '请选择监测链接',
						trigger: 'blur'
					}, ],
					name: [{
						required: true,
						message: '请填写标题',
						trigger: 'blur'
					}],
					text: [{
						required: true,
						message: '请填写博文内容',
						trigger: 'blur'
					}],
					// text: [{
					// 	required: true,
					// 	message: '请填写博文内容',
					// 	trigger: 'blur'
					// }],
					cardTitle: [{
						required: true,
						message: '请填写card标题',
						trigger: 'blur'
					}],
					cardDesc: [{
						required: true,
						message: '请填写card内容',
						trigger: 'blur'
					}],
					appH5Url: [{
						required: true,
						message: '请填写H5链接',
						trigger: 'blur'
					}],
					cardButtonUrl: [{
						validator: validateAmount,
						trigger: 'blur'
					}]
				},
				//标签类型
				tagTypeArray: [{
						value: '1',
						name: '立即下载'
					},
					{
						value: '2',
						name: '立即使用'
					},
					{
						value: '3',
						name: '玩游戏'
					},
					{
						value: '4',
						name: '立即安装'
					},
					{
						value: '5',
						name: '立即购买'
					},
					{
						value: '6',
						name: '了解详情'
					},
					{
						value: '7',
						name: '去看看'
					},
				],
			};
		},
		watch: {
			'form.resourceAdSiteId': function(al) {
				if(!this.canWatch) {
					return;
				}
				console.log(al)
				this.resourceInit(this.wbsubBoj);
				if(al == '1') {
					this.form.type = '1';
				} else if(al == '2') {
					this.form.type = '4';
				} else if(al == '3' ||al == '4') {
					this.form.type = '2';
				}
			},
			'form.type': function(al) {
				if(!this.canWatch) {
					return;
				}
				this.resourceInit(this.wbsubTypeBoj);
			},
			'form.cardType': function(al) {
				if(!this.canWatch) {
					return;
				}
				this.resourceInit(this.wbsubCardTypeBoj);
			},
			'form.cardButtonType': function(al) {
				if(!this.canWatch) {
					return;
				}
				this.resourceInit(this.wbsubCardButtonTypeBoj);
			},
			'form.gridPicType': function(al) {
				if(!this.canWatch) {
					return;
				}
				if(al == '1') {
					this.howMImages = 4;
				} else if(al == '2') {
					this.howMImages = 6;
				} else {
					this.howMImages = 9;
				}
				this.form.picObjUrls = [];
			},
			'form.videoPath': function(val) {
				//				debugger
				console.log(val);
			}
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
			this.getGTAdGroupList('RTB').then(function(result) {
				v.adGroupList = result;
			});
			if(v.$route.query.id != undefined) {
				v.$store.commit('clearState');
				console.log(v.$route.query.id);
				v.isEditBool = true;
				new Promise(function(resolve, reject) {
					if(v.$route.query.value == 'new') {
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
							if (r.media == 'WAX') {
								v.getAdvertisersUidList(r.advertiser.id);
							}
							resolve(r);
						})
					} else {
						v.$api.get(v.allurlsList.creatadver + '/' + v.$route.query.id, '', function(r) {
							console.log(r);
							// if (v.$route.query.value != 'new') {
							v.form = JSON.parse(r.content);
							v.editObj = r;
							// }
							v.advertiserId = r.advertiserId;
							v.productId = r.productId;
							if (v.editObj.media == 'WAX') {
								v.getAdvertisersUidList(r.advertiserId);
							}
							v.getTrackingList();
							resolve(r);
						})
					}

				}).then(function(result) {
					v.canWatch = true;
				})
			} else {
				v.canWatch = true;
				v.getTrackingList();
				if (localStorage.getItem("GTmedia") != undefined && localStorage.getItem("GTmedia") == 'WAX') {
					v.getAdvertisersUidList(localStorage.getItem("GTadvertiserId"))
				}
			}
			if(this.$store.state.creatCp.currentStep == 4) {
				v.$router.push({
					name: 'creatCampaign'
				});
			}
		},
		methods: {
			// 图片限制
			bwBeforeAvatarUpload(file){
        const isJPG = (file.type === 'image/png')||(file.type === 'image/jpeg')||(file.type === 'image/gif');
        const isLt2M = file.size / 1024 / 1024 < 5;
				if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
			twBeforeAvatarUpload(file){
        const isJPG = (file.type === 'image/png')||(file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 0.07;
				var v = this;
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.onload = function (e) {
 	          var data = e.target.result;
 	           //加载图片获取图片真实宽度和高度
 	           var image = new Image();
 	            image.onload=function(){
 	              var width = image.width;
 	              var height = image.height;
								var result;
								if (v.form.cardType == 1) {
									result = (width == 592 && height == 296);
								} else {
									result = (width == 580 && height == 326);
								}

								if (isJPG && isLt2M && result) {
									resolve(isJPG && isLt2M && result);
								} else {
									if (!result) {
										if (v.form.cardType == 1) {
											v.$message.error('上传图片尺寸仅支持 592*296!');
										} else {
											v.$message.error('上传图片尺寸仅支持 580*326!');
										}

					        }
									if (!isJPG) {
					          v.$message.error('上传图片只能是 JPG/PNG 格式!');
					        }
					        if (!isLt2M) {
				          	v.$message.error('上传图片大小不能超过 70K!');
					        }
									reject('图片尺寸不对')
								}
 	            };
 	            image.src= data;
 	        };
 					reader.readAsDataURL(file);
				})
      },
			cardBeforeAvatarUpload(file) {
				const isJPG = (file.type === 'image/png')||(file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 0.1;
				var v = this;
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.onload = function (e) {
 	          var data = e.target.result;
 	           //加载图片获取图片真实宽度和高度
 	           var image = new Image();
 	            image.onload=function(){
 	              var width = image.width;
 	              var height = image.height;
								var result = (width == 1242 && height == 1242);
								if (isJPG && isLt2M && result) {
									resolve(isJPG && isLt2M && result);
								} else {
									if (!result) {
						         v.$message.error('上传图片尺寸仅支持 1242*1242!');
					        }
									if (!isJPG) {
					          v.$message.error('上传图片只能是 JPG/PNG 格式!');
					        }
					        if (!isLt2M) {
				          	v.$message.error('上传图片大小不能超过 100K!');
					        }
									reject('图片尺寸不对')
								}
 	            };
 	            image.src= data;
 	        };
 					reader.readAsDataURL(file);
				})
			},
			bannerBeforeAvatarUpload(file) {
				const isJPG = (file.type === 'image/png')||(file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 0.04;
				var v = this;
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.onload = function (e) {
 	          var data = e.target.result;
 	           //加载图片获取图片真实宽度和高度
 	           var image = new Image();
 	            image.onload=function(){
 	              var width = image.width;
 	              var height = image.height;
								var result = (width == 320 && height == 50);
								var result1 = (width == 640 && height == 100);
								if (isJPG && isLt2M && (result||result1)) {
									resolve(isJPG && isLt2M && result);
								} else {
									if (!result && !result1) {
						         v.$message.error('上传图片尺寸仅支持 320*50/640*100!');
					        }
									if (!isJPG) {
					          v.$message.error('上传图片只能是 JPG/PNG 格式!');
					        }
					        if (!isLt2M) {
				          	v.$message.error('上传图片大小不能超过 40K!');
					        }
									reject('图片尺寸不对')
								}
 	            };
 	            image.src= data;
 	        };
 					reader.readAsDataURL(file);
				})
			},
			getAdvertisersUidList(adverid) {
				var v = this;
				this.$api.get(this.allurlsList.advertisersUid +'/'+ adverid, '', function(r) {
					console.log(r);
					v.uidArray = r;
				})
			},
			getTrackingList() {
				var params = '?advertiserId=' + this.advertiserId + '&productId=' + this.productId;
				var v = this;
				this.$api.get(this.allurlsList.trackLinksDropdown + params, '', function(r) {
					v.trackLinkArr = r;
				})
			},
			changeImp() {
				var v = this;
				this.$api.post(this.allurlsList.trackLinksCheck, this.form.impTrackingUrl, function(r) {
					console.log(r);
					v.form.impTrackingUrl = r;
				})
			},
			changeClk() {
				var v = this;
				this.$api.post(this.allurlsList.trackLinksCheck, this.form.clkTrackingUrl, function(r) {
					console.log(r);
					v.form.clkTrackingUrl = r;
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
				this.form.videoPath.push(obj);
			},
			handleRemove(file, fileList) {
				this.form.picObjUrls = fileList
				console.log(file, fileList);
			},
			handleVideoRemove(file, fileList) {
				this.form.videoPath = fileList
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			// 广告位数据重置
			resourceInit(obj) {
 				let curr = JSON.parse(JSON.stringify(obj));
				this.form = Object.assign({}, this.form, obj);
				this.form.picObjUrls = [];
				this.form.videoPath = [];
			},
			cancleAction() {
				this.$router.go(-1);
			},
			submitForm(formName) {
				var v = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var rtbResourceId = '';
						if(v.form.type == '1') {
							rtbResourceId = '2';
						} else if(v.form.type == '3') {
							rtbResourceId = '4';
						} else if(v.form.type == '4') {
							rtbResourceId = '1';
						} else if(v.form.type == '2') {
							if(v.form.cardType == '1') {
								rtbResourceId = '3';
							} else if(v.form.cardType == '2') {
								rtbResourceId = '5';
								if (v.form.videoPath.length == 0) {
										v.$message.warning('视频不能为空!');
										return;
								}
							}
						}
						if (v.form.picObjUrls.length == 0) {
								v.$message.warning('图片不能为空!');
								return;
						}
						if(v.isEditBool) {
							v.editObj.content = v.form;
							v.editObj.rtbResourceId = rtbResourceId;
							v.editObj.trackLinkId = v.form.trackLinkId;
							// v.editObj.clkTrackingUrl = v.form.clkTrackingUrl;
							// v.editObj.impTrackingUrl = v.form.impTrackingUrl;
							v.editObj.name = v.form.name;
							if(v.$route.query.value == 'edit') {
								v.editObj.id = v.$route.query.id;
								v.$api.put(v.allurlsList.creatadver, v.editObj, function(r) {
									v.$router.go(-1);
								})
							} else if(v.$route.query.value == 'copy' || v.$route.query.value == 'new') {
								v.editObj.id = '';
								if (v.$route.query.value == 'copy') {
									v.editObj.isCopy = true;
								}
								v.$api.post(v.allurlsList.creatadver, v.editObj, function(r) {
									v.$router.go(-1);
								})
							}
							return;
						}
						var obj = {
							advertiserId: localStorage.getItem("GTadvertiserId"),
							adGroupId: localStorage.getItem("GTadGroupId"),
							productId: localStorage.getItem("GTproductId"),
							campaignId: localStorage.getItem("GTcampaignId"),
							media: localStorage.getItem("GTmedia"),
							mediaType: localStorage.getItem("GTmediaType"),
							// clkTrackingUrl: v.form.clkTrackingUrl,
							// impTrackingUrl: v.form.impTrackingUrl,
							name: v.form.name,
							trackLinkId: v.form.trackLinkId,
							rtbResourceId: rtbResourceId,
							content: v.form
						}
						v.$api.post(v.allurlsList.creatadver, obj, function(r) {
							localStorage.setItem("GTcreativId", r.id);
							// v.$store.commit('changeCurrentStep', {
							// 	name: v.form.name,
							// 	step: 4
							// })
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
	.creatWBADtivity {
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
		.currentWB {
			position: fixed;
			top: 25%;
			right: 13%;
			width:246px;
			height: 436px;
			// background-color: red;
			.bannerImgDiv {
				position: relative;
				width: 100%;
				height: 436px;
				background-image: url('/static/img/img_bg_weibo_banner.png') ;
				background-size:cover;
				.img1 {
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.img2 {
					position: absolute;
					width: 100%;
					height: 23%;
					top: 46%;
					left: 0;
				}
			}
			.bigCardImgDiv {
				position: relative;
				width: 100%;
				height: 436px;
				// 框架
			 background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAAG0CAYAAAAB9dobAAAAAXNSR0IArs4c6QAAGQlJREFUeAHtnVePG0e3RXuUc87RluGc4Ef//39gGPCTZNmyopVznvvtuiiiRXMPY/fMJlcBI5KHTfbpdWpVVTc5o7WrV6+uNzQIQGCpCOzQ0Vy7dm2pDoqDgcAqE7hy5UqzbZUBcOwQWFYCiL2sleW4VpoAYq90+Tn4ZSWA2MtaWY5rpQkg9kqXn4NfVgKIvayV5bhWmgBir3T5OfhlJYDYy1pZjmulCSD2Spefg19WAoi9rJXluFaaAGKvdPk5+GUlgNjLWlmOa6UJIPZKl5+DX1YCiL2sleW4VpoAYq90+Tn4ZSVQfh/79OnTy3p8HBcEVpJAEfvcuXMrefAcNASWkcCTJ0+aIvbx48eX8fg4JgisJAGJzTn2Spaeg152Aoi97BXm+FaSAGKvZNk56GUnUM6xpz3Id+/eNTdu3NjwZRcvXmx27ty54TY8CYFlJuD++q/+imi7Tbpd+zXj7s8k9vPnz5sjR440x44dG/n+Dx8+bLTN0aNHRz5PEAKrQmBY4lHHPWobJ/uo14+KzbQUf/HiRbN///5R71diek7b0CAAgc0hMNGMPTx67Nixo9m9e7fNWM99/PjxP/8RwaiRyb7JEj+hU5mnT5827Y8Z9RGF2uHDhwdHrpXPrl27mgMHDgxiN2/ebM6ePdts2zbTmDx4n1F3Hj9+3Ki2dX/a15kzZ5rt27d/svmzZ8+a9+/fl1wfPXr0yXN6oFOwQ4cO/SdOoD8CE4mtdKaV8tKlS58cxfDg8MmTK/ZAHf/Vq1flZ+/evWUQlFTDXxQ6ePBgc//+/WZtbW2wQtqzZ09ZDem5RTYJqpyqxB8+fCjySmLtX7LX53Rf0mvQGR7g3759W/JD7EVWZ/r3mljsUW+tmUezijqEmjqpzru5aDaK1v/HXr9+3Uii9fX1ciuhJZEeS2Ix1PULNXHU7KzTmuvXr5dY/efBgwdFuMuXL9fQXLeSVquA+qN89KO4VhPKq4p99+7d5tSpU+VxjdWd6/jevHlTH3K7SQRmFltS37p1q1wgO3nyZElfF8wU08yD3KMrqlmufVHxzp07ZUleeVVRJIiW69pW1yzqNY179+41+/btGyyXR+9l+qhmWNVUg4x+lI8k18pg+HqJBnIdB21jAtOuctvvNs9r9T4zi62ZWp2uveSq9/Ucv1jSLtOn99tSaJmr89p2TFtryS3RNLtrdpykaVv9tJtq1B5I2s/V+zpf1oCs6yIaNJSPaqjcFKPlEZhZbI3adaZuH7bOv9QpaKMJDH/+r9lRS1tJVJuW3xJds2WdqXVOK8m0fV3Oi3Vb2nq/yj2J1NqnRL5w4UKj0wLN1Fp2l18k+F9cwus8WufOGgAkPm08gdu3b4/faIIt1BdmaTOLPcvOeE3TtM+JJY9k0pJXpy91Gd7mpPNuCayr02r1PFzCtweD+poqtx6379fn3a0ukmnJrdVBPX/XfQ0mL1++LIO1+96Ce89Vjs8q5KKYzfyZiUZ1nVMPN8X0HG1jAhJJUqsDaGbWubZm43arF6I0S0p6/UhmDQS6r9tRbdKZuv1aDRTKQ7Oz9qdTKa3KtA/tU6szDTC0yQnM80nQPK9VhjPP2Bq9tUxTqwWX1FoGDn9sUzbin0JAjHRRTMtayaMlt340M2qZLqkkppbEmp3FWYLpfFtNt3pcz30l5KiZvmw8xT/KqV4J1wU6rSzqZ+uSW7O4lusbNQ1MOi7a5hOYWWx1PAms8+l6Tq2ZmiviGxdVUmpm1GDYXkpLYF18rEtzSVbPsTUY1Nm8nuPWx9pu3qZBQufQGmiUky7cqWn/ek6Dh2LaRoOQaj/clIdWHXp9+0s2w9vxuB8CM4ut9FRgrn5PV6hRFxzrO+gi1okTJ+rDgSB1RTR4YsF3NCPXc3i9da2phK6tndeomVtCnz9/vm7O7YIJaMXU/qbiuLefWOx51/zjEuF5CEBgNAFJrdOyhYs974flo9MlCoHlJzBqQhz2adQ2lUyVuj6e9Hbt6tWr68M7mvTFbAcBCGw9AhooRn9esvVyJSMIQGAKAhOfY0/xnmy6AQF9pKUvfCyi6Qq5/lINDQLDBIrY9TPR4Sd5vHgCi/h4qmal96J2lQa3bQLlHLv9eWr7Se5DAAJ5BDTglxmbb4rlFY+MIeAI6BeGuHjm6BCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCiO3IEIdAMAHEDi4eqUPAEUBsR4Y4BIIJIHZw8UgdAo4AYjsyxCEQTACxg4tH6hBwBBDbkSEOgWACiB1cPFKHgCOA2I4McQgEE0Ds4OKROgQcAcR2ZIhDIJgAYgcXj9Qh4AggtiNDHALBBBA7uHikDgFHALEdGeIQCCaA2MHFI3UIOAKI7cgQh0AwAcQOLh6pQ8ARQGxHhjgEggkgdnDxSB0CjgBiOzLEIRBMALGDi0fqEHAEENuRIQ6BYAKIHVw8UoeAI4DYjgxxCAQTQOzg4pE6BBwBxHZkiEMgmABiBxeP1CHgCCC2I0McAsEEEDu4eKQOAUcAsR0Z4hAIJoDYwcUjdQg4AojtyBCHQDABxA4uHqlDwBFAbEeGOASCCSB2cPFIHQKOAGI7MsQhEEwAsYOLR+oQcAQQ25EhDoFgAogdXDxSh4AjgNiODHEIBBNA7ODikToEHAHEdmSIQyCYAGIHF4/UIeAIILYjQxwCwQQQO7h4pA4BRwCxHRniEAgmgNjBxSN1CDgCO/TEy5cv3fPEIQCBQALM2IFFI2UIjCOA2OMI8TwEAgkgdmDRSBkC4wgg9jhCPA+BQALl4lnXeX/8+LF5+/Zt8+HDh4l2tWPHjmbXrl3N2traRNsveiPl+v79+2Z9fX3sW2/btq3kun379rHbLnoD5VdzXeR7byZ/9REdk/rMuKb+UXMdt20Xz797967Rz1bsJ52LrSLpqvskB1/h6zWvX79uDhw40PQpjHJ8/vx5kbrmMsmtct2zZ0+zd+/eSTZfyDYaeJTrNFwn3bH4v3r1qvCXOH017VMsp2lv3rxp9KO+0tdEkNBPOl2Ka/R98eLFTJ1PI3ZXHdd1HOUqYWZp6pDqYH202rG6kLrm38c+6r50K3bTSl1fr5qpdn21hH7SqdizFqoWqC7h6+MubzUIaVk1T5v3eCfdtyToUuqah/bR12A1LzvVbtJTvXp8s9ym9JNOxV4E6EW8xyQFnHWmbr+3BqI+hFtEru28N7rfx77EbJJz6o3y1HN95LqI/thHP+lU7EV08kW8x7gOscjn0/Jd5LHP+l5JzBaV66LexzHvVGy3U+IQgEC3BBC7W768OwQ2hQBibwp2dgqBbgkgdrd8eXcIbAoBxN4U7P3vdN++fY1+aKtBoL+vFa0Gzy17lH1+g2/LQlihxJixV6jYHOrqEGDGXnCt+/q+8iRpa+mtX1JRqzO2vlOtpi9JbJW/nLOVmBU4S/BPp2KrM837jaLaIbtmvYj9qINupU6qXKrYlV993PUXJOr+Jrmt3ObNaRE1HJfvIvYxqi7j9jvt852KvXv37rm+fy0A+vXNPpp+i0lFm+crgzrerdTavxhx8ODBktqzZ8+2UoqDXMRunu+Lq3Z9/CZaSj/p9Bx7586d5dcZB9Wb8s7+/fv/M+NM+RZTbT7P/nSsff7a5lQHFrCx2InhLE2rENWurzZPP9HA0Ec/6XTGFmgdhA5GvyU0yZffNUtr9NXvNy9i2TNNsbW/Q4cOlZlj2l+g32qz9fBxz3tKNPx+XTzW+b/6yTR/aKFOHuo3fbWEftK52IIt+LOOxn0Vq+5HHUSDUR+jat1nH7ftZXkf+5t1Hxogt/ogqWPb6v2k06X4rMXldRCAwHwEEHs+frwaAluSQG9i62ps+7PTp0+fDoA8efJkcF+/LK/Hm7V01N/dUtNHLzrP1me9o85P79+/P8iZO4slIO760Z/G0m1SU77qQ+rf83zCMu8x93KOffXq1ebEiRPN3bt3y0Hr/FUfbehCldrNmzfLxbJ//vmnXDyR1LqI8uOPPzaHDx+e9xiner1yOXr0aHPr1q3m0qVLpXM9fvy4+fLLL8tHbzoWNQ0++lGe33333VT7YGNPQDyvX78+6Bu64i3m33zzTXPv3r3m2rVrpT4acOt333X/l19+8W/awzN37txpHjx4UPrLt99+2/z111/lDyzqCvqpU6d6yODTXXQutmY7iXL79u1y0BrFdMVb7bfffms+++yzIsjDhw/LzFg/Jzx+/HhTP3v9NOXuHulq7JUrV8pHbBpxJa46jfKtn6crrsHmyJEjJZH2yqO7zFbnnf/888/CXJOAOD969Kj0C62QJIhuv/766+aPP/4o/UpyS6LNburj6icSXH1YK8/Tp0+XmXszcut8Ka4R98aNG+VzRh28Zm4tsc6ePVtG5XoFWqJoua7tdcVR24xaAncJSYPO77//Xvar0VcyKy8NOq7N+20p974bxfv8GLDPfemYNTNr9lXtJbL6zPnz50u/keT//vvvQGQte/vuI64uyk2DjgZ65agJQSsMrfY2o3UutmZBySqBJY4eq3AamSW5PgaTQHpenUhS992ZKnjl8NNPP5U81WlUJP1oeVibcpPM9UfH1nfTx0Hi1HXTPjbjo6e///678FXfUH/RIK8myU+ePNlcvny5PNZEsFl9pSTQ+ufMmTMlP/WLukrVfc3am9E675WSVrNz7YharkgUHXz9hQQduJa96kSSX0sZ3SrWd9Pqwl24U97nzp0rA5KuEegc/Pvvv+89Tw0mOnerTLtgpPee5xtWs+aklZJWSL/++ms5fdPAevHixcHbSRaJr+W4+ojqpesfffyF0kESI+7oOoBmba3wPv/88zKZqb+0+/iIl3UW6lzsmrmWJhJXI6wukun8WRdCatP5lGZwia/zXI10Os/us2mw0dJJxVE+X331Vfk5duxYSUPFU4dXAdWZdPVT54LqaH03zWa6+CimGggX+aP31Hv3/aUi8VTf+OGHH4rUdVUkeVUbXadRbqqHVnzqIxJag8E83zNfRO2++OKL5sKFC0Vonc6JnXJS39AA1Hfr/OKZDkhLXC1tVQjNNjr3qBdC9HwVR2KrgCqaZvm+mwqg0VZNyz41nS/VUVcyq2BaGuqCjY5Fedars+UFPf6j/W/Wvrs4TPWTn3/+uQisJXethQZSDaC1T2gWV19SXVSz4dVfF7mNe09NXJJYqzjVRROUJgkNOptxurD2v1lovXbiccnzPAQgsPUJaCDsbSm+9XGQIQSWhwBiL08tORIIDAgg9gAFdyCwPATKxTOtyWkQgMDyEPg/toPVsLk2IRwAAAAASUVORK5CYII=");
				background-size:cover;
				.contentDiv {
					position: absolute;
					width: 100%;
					top: 13%;
					height: 78%;
					// background-color: cyan;
					overflow: auto;
					.contentHeader{
						position: relative;
						margin-left: 3%;
						width: 94%;
						height: 8.2%;
						// 微博头
					 background-image:url("data:image/png;base64,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");
						background-size:cover;
					}
					.midden {
						position: relative;
						text-align: left;
						margin-left: 6%;
						margin-top: 10px;
						width: 88%;
						font-size: 12px;
						line-height: 14px;
						overflow: hidden;
						word-break: break-all;
						word-wrap: break-word;
					}
					.bigCardImg {
						position: relative;
						margin-left: 3%;
						width: 94%;
						background-size:cover;
						padding-top: 5px;
					}
					.muchImg {
						width: 96%;
						// height: 100px;
						// background: red;
						margin-left: 2%;
						margin-right: 2%;
						.nineImg {
							width: 30%;
					    padding: 3px 1.6%;
					    height: 50px;
						}
					}

					.cardMessageDiv {
						position: relative;
						margin-left: 6%;
						margin-top: 5px;
						width: 92%;
						min-height: 35px;
						.carMLeftDiv {
							position: relative;
							width: 70%;
							float: left;
							.carMLeftTop {
								font-size: 12px;
								text-align: left;
								color: #53595e;
								overflow: hidden;
								white-space: nowrap;
								text-overflow:ellipsis;
							}
							.carMLeftBottom {
								font-size: 12px;
								text-align: left;
								color: #858c92;
								overflow: hidden;
								white-space: nowrap;
								text-overflow:ellipsis;
							}
						}
						.carMRightDiv {
							position: relative;
							margin-left: 80%;
							width: 20%;
						}
					}
					.contentFooter {
						position: relative;
						margin-top: 3px;
						margin-left: 3%;
						width: 94%;
						height: 7%;
						// 底部
					 background-image:url("data:image/png;base64,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");
						background-size:cover;
					}
				}
			}
			.mediaMidden {
				// width: 100%;
				height: 100%;
				.pageTitleSpan {
					display: inline-block;
					font-size: 20px;
					padding: 20px;
				}
				.container {
					margin-top: 30px;
					margin-left: 40px;
				}
				.itemDiv {
					padding: 30px;
					padding-top: 20px;
					// background-color: red;
					.heroPagintion {
						margin-top: 30px;
					}
				}
				.exmpleImg {
					width: 80%;
					padding-top: 30px;
					padding-left: 20%;
				}
			}
		}
	}
</style>
