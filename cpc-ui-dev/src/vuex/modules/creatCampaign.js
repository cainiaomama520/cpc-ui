export default {
	state: {
		titleName: '',
		leftArray: [],
		currentStep: 1,
		currentName: '',
		advCreativeMediaType: 'RTB',
		RTBListAdvertiseId: '',
		RTBListProductId: '',
		RTBListCampaignsId: '',
		MBYListAdvertiseId: '',
		MBYListProductId: '',
		MBYListCampaignsId: '',
	},
	mutations: {
		setRTBListAdvertiseId(state, val) {
			state.RTBListAdvertiseId = val;
		},
		setRTBListProductId(state, val) {
			state.RTBListProductId = val;
		},
		setRTBListCampaignsId(state, val) {
			state.RTBListCampaignsId = val;
		},
		setMBYListAdvertiseId(state, val) {
			state.MBYListAdvertiseId = val;
		},
		setMBYListProductId(state, val) {
			state.MBYListProductId = val;
		},
		setMBYListCampaignsId(state, val) {
			state.MBYListCampaignsId = val;
		},
		changeTitleName(state, name) {
			state.titleName = name;
		},
		changeCurrentStep(state, obj) {
			var currentObj = {
				label: obj.name,
				children: []
			}
			if(obj.step == 2) {
				state.leftArray.push(currentObj);
			} else if(obj.step == 3) {
				state.leftArray[0].children.splice(0);
				state.leftArray[0].children.push(currentObj);
			} else {
				state.leftArray[0].children[0].children.splice(0);
				state.leftArray[0].children[0].children.push(currentObj);
			}
			state.currentName = currentObj.label;
			state.currentStep = obj.step;
			var obj1 = JSON.stringify(this.state.creatCp);
			localStorage.setItem("currentCCObj", obj1);
		},
		setValues(state, obj) {
			state.leftArray = obj.leftArray;
			state.currentStep = obj.currentStep;
			state.currentName = obj.currentName;
		},
		clearState(state) {
			state.leftArray = [];
			state.currentStep = 1;
			state.currentName = '';
			localStorage.removeItem('currentCCObj');
			localStorage.removeItem("GTadvertiserId");
			localStorage.removeItem("GTproductId");
			localStorage.removeItem("GTcampaignId");
			localStorage.removeItem("GTadGroupId");
			localStorage.removeItem("GTmediaBuyResourceId");
			localStorage.removeItem("GTmedia");
			localStorage.removeItem("GTmediaType");
			localStorage.removeItem("GTcreativId");
		},
		setAdvCreativeMediaType(state, val) {
			state.advCreativeMediaType = val;
		},
	}
};
