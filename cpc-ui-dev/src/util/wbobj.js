export default {
	install(Vue, options) {
		Vue.prototype.rootUrl = 'http://192.168.3.117:8080';
		// Vue.prototype.rootUrl = 'http://123.56.23.129:9898';
		// Vue.prototype.rootUrl = 'https://api.gdtrafficad.com';
		Vue.prototype.getUrlParams = function() {
			var url = location.search; //获取url中"?"符后的字串
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
			}
			return theRequest;
		};
		Vue.prototype.allurlsList = {
			// 广告主列表
			advertisersDropdown: '/api/advertisers-dropdown',
			// 广告主送审
			advertisersAudit: '/api/advertisers-audit',
			// 产品列表
			productsDropdown: '/api/products-dropdown',
			// 活动列表
			campaignsDropdown: '/api/campaigns-dropdown',
			// 广告组列表
			adgroupDropdown: '/api/ad-groups-dropdown',
			// 媒体列表
			mediaDropdown: '/api/common/dict-media',
			// 广告位列表
			adverRTBDropdown: '/api/rtb-resources-dropdown',
			// 创建活动
			creatCampaigns: '/api/campaigns',
			// 活动列表状态更改
			campaignsStatus: '/api/campaigns-status',
			// 激活单价历史记录
			activePriceHistories: '/api/active-price-histories',
			// 地域数据
			regionsLinkage: '/api/dict-wax-regions-linkage',
			// 兴趣数据
			interestsLinkage: '/api/dict-wax-interests-linkage',
			// 人生状态数据
			lifeStatuseLinkage: '/api/dict-wax-life-statuses-linkage',
			// dmpsome字段
			dmpDictData: '/api/dmp/dict-data',
			// 人群包类型列表
			crowPackLinkage: '/api/crowd-packets-dropdown',
			// 创建广告组
			creatADGroupUrl: '/api/ad-groups',
			// 广告组列表状态更改
			adGroupsStatus: '/api/ad-groups-status',
			// 账号媒体列表
			mediaBuyDropdown: '/api/media-buy-account-dropdown',
			// 媒体资源
			mediaResource: '/api/media-buy-tpl-dropdown',
			// 链接检测
			mediaCheckUrl: '/api/creatives-check-url',
			// 单个检测链接
			trackLinksCheck: '/api/track-links-check',
			// 创建广告创意
			creatadver: '/api/creatives',
			// 创意列表状态更改
			creativesStatus: '/api/creatives-status',
			// 媒体创意详情
			adgroupDetail: '/api/creatives-by-adgroup',
			// 活动管理侧边栏数据
			campaignMenuList: '/api/common/campaign-menu',
			// 创意审核
			creativeAudit: '/api/creatives-audit',
			// 创意链接下拉列表
			trackLinksDropdown: '/api/track-links-dropdown',
			// 话题列表
			TopicList: '/api/dmp/searchTopic',
			// DMP定向
			dmpTargetings: '/api/dmp-targetings',
			// 粉丝包
			waxFansList: '/api/wax-fans-packets-search',

			waxFansCreate: '/api/wax-fans-packets',
			// 查询粉丝包
			getFans: '/api/wax-fans-packets',
			// UID
			advertisersUid: '/api/advertisers-uid',

			//Stats
			statsUnits: '/api/report/doReport',

			//Batch Campaign
			batchCampaign: '/api/campaigns-batch',

			//Batch Group
			batchGroup: '/api/ad-groups-batch',

			//Batch Creative
			batchCreative: '/api/creatives-batch'
		}

		Vue.prototype.wbsubBoj = {
			wd: '0',// 边看变下
			type: '1', // 广告形式(feed1、card3、grid4)
			//	uid: '', // 微博UID
			privateBlog: '2', // 私密状态
			blogContextType: '2', // 博文形式
			text: '', // 博文内容
			picUrl: [], // 图片
			picName: [], // 图片名
			picNames: [], // 图片宫格名称
			picObjUrls: [], //图片name&url
			appCallupType: '1', // h5/APP,
			appH5Url: '', // H5链接
			appDeeplinkUrl: '', // url schemes
			cardTitle: '', // card标题
			cardDesc: '', // card内容
			cardButtonUrl: '', // card按钮地址
			cardType: '1', // 品牌card类型
			cardButtonType: 'none', // card按钮类型
			cardButtonAction: 'none', // 按钮动作
			appType: '0', // 安卓/iOS
			landingpageUrl: '', // card链接/跳转链接
			videoPath: [], // 上传视频
			gridPicType: '1', // 宫格类型
			tagType: '1', // 标签类型
			trackLinkId: '',
			uid: '', // 微博UID
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
		};
		//广告形式以下字段
		Vue.prototype.wbsubTypeBoj = {
			wd: '0',// 边看变下
			//	uid: '', // 微博UID
			privateBlog: '2', // 私密状态
			blogContextType: '2', // 博文形式
			picObjUrls: [], //图片name&url
			text: '', // 博文内容
			picUrl: [], // 图片
			picName: [], // 图片名
			picNames: [], // 图片宫格名称
			appCallupType: '1', // h5/APP,
			appH5Url: '', // H5链接
			appDeeplinkUrl: '', // url schemes
			cardTitle: '', // card标题
			cardDesc: '', // card内容
			cardButtonUrl: '', // card按钮地址
			cardType: '1', // 品牌card类型
			appType: '0', // 安卓/iOS
			cardButtonType: 'none', // card按钮类型
			cardButtonAction: 'none', // 按钮动作
			landingpageUrl: '', // card链接/跳转链接
			videoPath: [], // 上传视频
			gridPicType: '1', // 宫格类型
			tagType: '1', // 标签类型
			trackLinkId: '',
			uid: '', // 微博UID
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
		}
		// Card类型以下字段
		Vue.prototype.wbsubCardTypeBoj = {
			wd: '0',// 边看变下
			privateBlog: '2', // 私密状态
			blogContextType: '2', // 博文形式
			text: '', // 博文内容
			picUrl: [], // 图片
			picName: [], // 图片名
			picNames: [], // 图片宫格名称
			picObjUrls: [], //图片name&url
			appCallupType: '1', // h5/APP,
			appH5Url: '', // H5链接
			appType: '0', // 安卓/iOS
			appDeeplinkUrl: '', // url schemes
			cardTitle: '', // card标题
			cardDesc: '', // card内容
			cardButtonUrl: '', // card按钮地址
			landingpageUrl: '', // card链接/跳转链接
			cardButtonAction: 'none', // 按钮动作
			videoPath: [], // 上传视频
			gridPicType: '1', // 宫格类型
			tagType: '1', // 标签类型
			trackLinkId: '',
			uid: '', // 微博UID
		}
		// Card按钮动作以下字段
		Vue.prototype.wbsubCardButtonTypeBoj = {
			privateBlog: '2', // 私密状态
			blogContextType: '2', // 博文形式
			text: '', // 博文内容
			picUrl: [], // 图片
			picName: [], // 图片名
			picNames: [], // 图片宫格名称
			picObjUrls: [], //图片name&url
			appCallupType: '1', // h5/APP,
			appH5Url: '', // H5链接
			appDeeplinkUrl: '', // url schemes
			cardTitle: '', // card标题
			cardDesc: '', // card内容
			appType: '0', // 安卓/iOS
			cardButtonUrl: '', // card按钮地址
			landingpageUrl: '', // card链接/跳转链接
			videoPath: [], // 上传视频
			gridPicType: '1', // 宫格类型
			tagType: '1', // 标签类型
			trackLinkId: '',
			uid: '', // 微博UID
		}
		// 创建广告组字段重置
		Vue.prototype.adGroupMedia = {
			date: '', //时间
			// name: '', // 广告组名称
			// mediaType: 'RTB', //媒体类型 = ['RTB', 'MEDIA_BUY'],
			media: 'WAX', //媒体 = ['NONE', 'WAX', 'BAIDU_GD'],
			mediaBuyResourceId: '', // 账户媒体
			totalBudget: '', // 总预算
			dayBudget: '', //日预算
			dmpTargetingId: '', //定向ID
			linkTpl: '', //链接模板
			ageRange: 'agenone', // 存储年龄
			ageValues: [0, 70], // 年龄数组
			locs: 'locnone', // 存储地域
			locsValues: [], // 存储数组
			interest: 'intnone', // 存储兴趣
			interestValues: [], // 存储兴趣数组
			activeAct: 'actnone', // 存储行为属性
			appLoveStr: 'appnone', // 存储App偏好
			iphoneType: 'iphnone', // 存储行为属性
			periodTime: 'pernone', // 投放时段
			selectTimes: [], //存储选择时间
			mexTargeting: {
				targetOs: 'ALL', //操作系统 = ['IOS', 'ANDROID', 'ALL'],
				brand: [], // 手机品牌
				targetConnType: 'ALL', //网络类型 = ['All', 'WIFI', 'CELL_2G', 'CELL_3G', 'CELL_4G'],
			},
			topic: [],
			/*指定话题*/
			throwSpeedType: 'CONSTANT', // 消耗模式（均匀消耗，加速消耗）
			bidType: 'CPM', // 出价方式 = ['CPM', 'CPC', 'PDB', 'OCPC'],
			bidPrice: '', // 出价
			totalBudget: '', // 总预算
			// targetingType: 'COMMON', // 定向类型 = ['COMMON', 'PACKET', 'TOPIC', 'BLOG'],
			targetingDmp: {
				// targetingType: 'COMMON', // 定向类型 = ['COMMON', 'PACKET', 'TOPIC', 'BLOG'],
				// // type: '1', // 定向类型(1,2)
				// targetOs: 'ALL', //操作系统 = ['IOS', 'ANDROID', 'ALL'],
				// brand: [], // 手机品牌
				// targetConnType: 'ALL', //网络类型 = ['All', 'WIFI', 'CELL_2G', 'CELL_3G', 'CELL_4G'],
				// content: {
				// 	blackPackage: 'false',
				// 	gender: [],
				// 	app: [], // app偏好
				// 	life_status: [], // 人生状态
				// 	packageid: '', // 人群包id
				// 	type: 'DEVICE',
				// 	age: [], // 年龄
				// 	loc: [], // 地域
				// 	interest: [], // 兴趣
				// }
			}
		}
		Vue.prototype.adGroupType = {
			date: '', //时间
			// name: '', // 广告组名称
			// mediaType: 'RTB', //媒体类型 = ['RTB', 'MEDIA_BUY'],
			// media: 'WAX', //媒体 = ['NONE', 'WAX', 'BAIDU_GD'],
			mediaBuyResourceId: '', // 账户媒体
			totalBudget: '', // 总预算
			dayBudget: '', //日预算
			dmpTargetingId: '', //定向ID
			linkTpl: '', //链接模板
			ageRange: 'agenone', // 存储年龄
			ageValues: [0, 70], // 年龄数组
			locs: 'locnone', // 存储地域
			locsValues: [], // 存储数组
			interest: 'intnone', // 存储兴趣
			interestValues: [], // 存储兴趣数组
			activeAct: 'actnone', // 存储行为属性
			appLoveStr: 'appnone', // 存储App偏好
			iphoneType: 'iphnone', // 存储行为属性
			periodTime: 'pernone', // 投放时段
			selectTimes: [], //存储选择时间
			mexTargeting: {
				targetOs: 'ALL', //操作系统 = ['IOS', 'ANDROID', 'ALL'],
				brand: [], // 手机品牌
				targetConnType: 'ALL', //网络类型 = ['All', 'WIFI', 'CELL_2G', 'CELL_3G', 'CELL_4G'],
			},
			topic: [],
			/*指定话题*/
			throwSpeedType: 'CONSTANT', // 消耗模式（均匀消耗，加速消耗）
			bidType: 'CPM', // 出价方式 = ['CPM', 'CPC', 'PDB', 'OCPC'],
			bidPrice: '', // 出价
			totalBudget: '', // 总预算
			targetingDmp: {
				// targetingType: 'COMMON', // 定向类型 = ['COMMON', 'PACKET', 'TOPIC', 'BLOG'],
				// // type: '1', // 定向类型(1,2)
				// targetOs: 'ALL', //操作系统 = ['IOS', 'ANDROID', 'ALL'],
				// brand: [], // 手机品牌
				// targetConnType: 'ALL', //网络类型 = ['All', 'WIFI', 'CELL_2G', 'CELL_3G', 'CELL_4G'],
				// content: {
				// 	blackPackage: 'false',
				// 	gender: [],
				// 	app: [], // app偏好
				// 	life_status: [], // 人生状态
				// 	packageid: '', // 人群包id
				// 	type: 'DEVICE',
				// 	age: [], // 年龄
				// 	loc: [], // 地域
				// 	interest: [], // 兴趣
				// }
			}
		}
		Vue.prototype.dmpTargeting = {
			dmpType: 'WAX', // dmp类型 = ['WAX'],
			name: '', // 话题名称
			content: {
				blackPackage: 'false',
				gender: [],
				app_category_list: [], // app偏好
				life_status: [], // 人生状态
				packageid: '', // 人群包id
				type: 'DEVICE',
				ageRange: [], // 年龄
				loc: [], // 地域
				interest: [], // 兴趣
				topic: '',
				/*指定话题*/
				topicLabel: '',
				packetList: [], //粉丝包
			}
		}
	}
}
