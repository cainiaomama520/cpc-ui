import Router from 'vue-router';
import Cookie from '../util/cookies';

const routes = [{
	path: '/',
	redirect: "/home",
	component: resolve => require(['../components/common/Home.vue'], resolve),
	children: [{
			path: '/home',
			component: resolve => require(['../components/page/Home.vue'], resolve) // vue-echarts-v3组件
		}
		// , {
		// 	path: '/campaign',
		// 	component: resolve => require(['../components/page/Campaign.vue'], resolve), // vue-echarts-v3组件
		// 	redirect: "/campaign/adCampaign",
		// 	children: [{
		// 		path: '/campaign/adCampaign',
		// 		component: resolve => require(['../components/subComponents/campaign/adCampaign.vue'], resolve),
		// 		name: 'adCampaign'
		// 	}, {
		// 		path: '/campaign/adGroup',
		// 		component: resolve => require(['../components/subComponents/campaign/adGroup.vue'], resolve),
		// 		name: 'adGroup'
		// 	}, {
		// 		path: '/campaign/adCreativity',
		// 		component: resolve => require(['../components/subComponents/campaign/adCreativity.vue'], resolve),
		// 		name: 'adCreativity'
		// 	}]
		// }
		, {
			path: '/campaignop',
			component: resolve => require(['../components/page/CampaignOp.vue'], resolve), // vue-echarts-v3组件
			redirect: "/campaignop/adCampaignOp",
			children: [{
				path: '/campaignop/adCampaignOp',
				component: resolve => require(['../components/subComponents/campaignOp/adCampaignOp.vue'], resolve),
				name: 'adCampaignOp'
			}, {
				path: '/campaignop/adGroupOp',
				component: resolve => require(['../components/subComponents/campaignOp/adGroupOp.vue'], resolve),
				name: 'adGroupOp'
			}, {
				path: '/campaignop/adCreativityOp',
				component: resolve => require(['../components/subComponents/campaignOp/adCreativityOp.vue'], resolve),
				name: 'adCreativityOp'
			}, {
				path: '/campaignop/adCampaignOpMb',
				component: resolve => require(['../components/subComponents/campaignOpMb/adCampaignOpMb.vue'], resolve),
				name: 'adCampaignOpMb'
			}, {
				path: '/campaignop/adGroupOpMb',
				component: resolve => require(['../components/subComponents/campaignOpMb/adGroupOpMb.vue'], resolve),
				name: 'adGroupOpMb'
			}, {
				path: '/campaignop/adCreativityOpMb',
				component: resolve => require(['../components/subComponents/campaignOpMb/adCreativityOpMb.vue'], resolve),
				name: 'adCreativityOpMb'
			}]
		}, {
			path: '/media',
			component: resolve => require(['../components/page/Media.vue'], resolve), // vue-echarts-v3组件
			redirect: "/media/hero",
			children: [{
				path: '/media/hero',
				component: resolve => require(['../components/subComponents/media/hero.vue'], resolve),
				name: 'hero'
			}, {
				path: '/media/mediaBuy',
				component: resolve => require(['../components/subComponents/media/mediaBuy.vue'], resolve),
				name: 'mediaBuy'
			}, ]
		}, {
			path: '/creatADCampaign',
			component: resolve => require(['../components/page/creatADCampaign.vue'], resolve), // vue-echarts-v3组件
			name: 'creatADCampaign',
			redirect: "/creatADCampaign/creatCampaign",
			children: [{
				path: '/creatADCampaign/creatCampaign',
				component: resolve => require(['../components/subComponents/creatADCampaign/creatCampaign.vue'], resolve),
				name: 'creatCampaign'
			}, {
				path: '/creatADCampaign/creatADGroup',
				component: resolve => require(['../components/subComponents/creatADCampaign/creatADGroup.vue'], resolve),
				name: 'creatADGroup'
			}, {
				path: '/creatADCampaign/creatMTADtivity',
				component: resolve => require(['../components/subComponents/creatADCampaign/creatMTADtivity.vue'], resolve),
				name: 'creatMTADtivity'
			}, {
				path: '/creatADCampaign/creatBDADtivity',
				component: resolve => require(['../components/subComponents/creatADCampaign/creatBDADtivity.vue'], resolve),
				name: 'creatBDADtivity'
			}, {
				path: '/creatADCampaign/creatWBADtivity',
				component: resolve => require(['../components/subComponents/creatADCampaign/creatWBADtivity.vue'], resolve),
				name: 'creatWBADtivity'
			}, {
				path: '/creatADCampaign/adDetail',
				component: resolve => require(['../components/subComponents/creatADCampaign/adDetail.vue'], resolve),
				name: 'adDetail'
			},{
				path: '/creatADCampaign/creatBILItivity',
				component: resolve => require(['../components/subComponents/creatADCampaign/creatBILItivity.vue'], resolve),
				name: 'creatBILItivity'
			} ]
		}, {
			path: '/advpro',
			component: resolve => require(['../components/page/advpro/Advpro.vue'], resolve), // vue-echarts-v3组件
			name: '客户/产品管理',
			redirect: "/advpro/advList",
			children: [{
				path: '/advpro/advList',
				component: resolve => require(['../components/page/advpro/advList.vue'], resolve),
				name: '客户列表'
			}, {
				path: '/advpro/proList',
				component: resolve => require(['../components/page/advpro/proList.vue'], resolve),
				name: '产品列表'
			}, {
				path: '/advpro/advForm',
				component: resolve => require(['../components/page/advpro/advForm.vue'], resolve),
				name: '客户填写'
			}, {
				path: '/advpro/advDetail',
				component: resolve => require(['../components/page/advpro/advDetail.vue'], resolve),
				name: '客户详情'
			}, {
				path: '/advpro/proDetail',
				component: resolve => require(['../components/page/advpro/proDetail.vue'], resolve),
				name: '产品详情'
			}, {
				path: '/advpro/proForm',
				component: resolve => require(['../components/page/advpro/proForm.vue'], resolve),
				name: '产品填写'
			}]
		}, {
			path: '/reports',
			component: resolve => require(['../components/page/reports/Reports.vue'], resolve), // vue-echarts-v3组件
			name: '数据报表',
			redirect: "/reports/reportAdmin",
			children: [{
				path: '/reports/reportAdmin',
				component: resolve => require(['../components/page/reports/reportAdmin.vue'], resolve),
				name: '运营'
			}, {
				path: '/reports/reportPeople',
				component: resolve => require(['../components/page/reports/reportPeople.vue'], resolve),
				name: '受众分析'
			}]
		}, {
			path: '/peoples',
			component: resolve => require(['../components/page/peoples/Peoples.vue'], resolve), // vue-echarts-v3组件
			name: '人群管理',
			redirect: "/peoples/peoplePacket",
			children: [{
				path: '/peoples/peoplePacket',
				component: resolve => require(['../components/page/peoples/peoplePacket.vue'], resolve),
				name: '人群数据包'
			}, {
				path: '/peoples/peopleDmp',
				component: resolve => require(['../components/page/peoples/peopleDmp.vue'], resolve),
				name: 'DMP定向包'
			}]
		}, {
			path: '/assist',
			component: resolve => require(['../components/page/assist/Assist.vue'], resolve), // vue-echarts-v3组件
			name: '辅助工具',
			redirect: "/assist/assistLink",
			children: [{
				path: '/assist/assistRecord',
				component: resolve => require(['../components/page/assist/assistRecord.vue'], resolve),
				name: '日志查询'
			}, {
				path: '/assist/assistLink',
				component: resolve => require(['../components/page/assist/assistLink.vue'], resolve),
				name: '监测链接'
			}, {
				path: '/assist/linkForm',
				component: resolve => require(['../components/page/assist/linkForm.vue'], resolve),
				name: '链接填写'
			}, {
				path: '/assist/multiLinkForm',
				component: resolve => require(['../components/page/assist/multiLinkForm.vue'], resolve),
				name: '批量链接填写'
			}]
		}
	]
}, {
	path: '/login',
	component: resolve => require(['../components/page/Login.vue'], resolve)
}];

const router = new Router({
	mode: 'history',
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				x: 0,
				y: 0
			};
		}
	}
});

router.beforeEach((to, from, next) => {
	let secret = Cookie.getCookie('token');
	if (to.path !== '/login' && !secret) {
		return next('/login');
	} else {
		return next();
	}
});

export default router;
