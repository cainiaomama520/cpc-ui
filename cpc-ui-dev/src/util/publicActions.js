export default {
	install(Vue, options) {
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
		// 广告主列表
		Vue.prototype.getGTAdvertiserList = function() {
			var v = this;
			return new Promise(function(resolve, reject) {
				v.$api.get(v.allurlsList.advertisersDropdown, '', function(r) {
					resolve(r);
				})
			})
		};
		// 产品列表
		Vue.prototype.getGTProductList = function() {
			var v = this;
			return new Promise(function(resolve, reject) {
				v.$api.get(v.allurlsList.productsDropdown, '', function(r) {
					resolve(r);
				})
			})
		};
		// 活动列表
		Vue.prototype.getGTCampaignsList = function(mtype) {
			var v = this;
			return new Promise(function(resolve, reject) {
				v.$api.get(v.allurlsList.campaignsDropdown + '?mediaType=' + mtype, '', function(r) {
					resolve(r);
				})
			})
		};
		// 广告组列表
		Vue.prototype.getGTAdGroupList = function(mtype) {
			var v = this;
			return new Promise(function(resolve, reject) {
				v.$api.get(v.allurlsList.adgroupDropdown + '?mediaType=' + mtype, '', function(r) {
					resolve(r);
				})
			})
		};
		// 媒体列表
		Vue.prototype.getGTMediaList = function() {
			var v = this;
			return new Promise(function(resolve, reject) {
				v.$api.get(v.allurlsList.mediaDropdown, '', function(r) {
					resolve(r);
				})
			})
		};
		// 广告位列表
		Vue.prototype.getGTRTBList = function() {
			var v = this;
			return new Promise(function(resolve, reject) {
				v.$api.get(v.allurlsList.adverRTBDropdown, '', function(r) {
					resolve(r);
				})
			})
		};
		// 过滤数组元素为null
		Vue.prototype.haveNoNullArray = function(val) {
			for (var i = 0; i < val.length; i++) {
				val[i].pid = 0;
				if (val[i].children == null) {
					val[i].children = [];
				} else {
					var obj = val[i].children;
					for (var j = 0; j < obj.length; j++) {
						if (obj[j].children == null) {
							obj[j].children = [];
						} else {
							var objK = obj[j].children;
							for (var k = 0; k < objK.length; k++) {
								if (objK[k].children == null) {
									objK[k].children = [];
								}
							}
						}
					}
				}
			}
			return val;
		};
		// 获取结构数据的值
		Vue.prototype.getTreeDataValue = function(val) {
			var array = [];
			for (var i = 0; i < val.length; i++) {
				if (val[i].children.length == 0) {
					array.push(val[i].value);
				} else {
					var obj = val[i].children;
					for (var j = 0; j < obj.length; j++) {
						if (obj[j].children.length == 0) {
							array.push(obj[j].value);
						} else {
							var objK = obj[j].children;
							for (var k = 0; k < objK.length; k++) {
								if (objK[k].children.length == 0) {
									array.push(objK[k].value);
								}
							}
						}
					}
				}
			}
			return array;
		}
		Vue.prototype.getTreeDataLabel = function(val) {
			var array = [];
			for (var i = 0; i < val.length; i++) {
				if (val[i].children.length == 0) {
					array.push(val[i].label);
				} else {
					var obj = val[i].children;
					for (var j = 0; j < obj.length; j++) {
						if (obj[j].children.length == 0) {
							array.push(obj[j].label);
						} else {
							var objK = obj[j].children;
							for (var k = 0; k < objK.length; k++) {
								if (objK[k].children.length == 0) {
									array.push(objK[k].label);
								}
							}
						}
					}
				}
			}
			return array;
		}
		// 遍历数组的值为el-tran的类型
		Vue.prototype.elTranData = function(val) {
			var arr = [];
			if (val != null && val.length > 0) {
				for (var i = 0; i < val.length; i++) {
					var obj = {};
					obj.key = val[i].id;
					obj.label = val[i].name;
					arr.push(obj);
				}
			}
			return arr;
		}
	}
}
