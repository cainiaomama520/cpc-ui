let vue = require('vue');
import * as _ from "underscore";
/**
 * generate today string
 * @returns {string}
 */
export function dayToString(date) {
	let dt = date || new Date();
	let m = "00" + (dt.getMonth() + 1);
	let d = "00" + dt.getDate();
	return `${dt.getFullYear()}-${m.slice(m.length - 2)}-${d.slice(d.length - 2)}`
}

export function dayToWeekDay(day) {
	let r = "星期";
	switch(day) {
		case 0:
			r += "日";
			break;
		case 1:
			r += "一";
			break;
		case 2:
			r += "二";
			break;
		case 3:
			r += "三";
			break;
		case 4:
			r += "四";
			break;
		case 5:
			r += "五";
			break;
		case 6:
			r += "六";
			break;
		default:
			r = "未知";
			break;
	}
	return r;
}

export function dayToWeek(d) {
	let day = d || new Date();
	return `${day.getFullYear()}年${day.getMonth() + 1}月 第${Math.ceil((day.getDate() - day.getDay())/7) + 1}周`;
}

export function timeTransform(d, t) {
	if(!d) return "";
	let date = new Date(d);
	switch(t) {
		case "hour":
			return `${date.getDate()}日${date.getHours()}时`;
		case "day":
			return dayToString(date);
		case "week":
			return dayToWeek(date);
		default:
			return date;
	}
}

export function timeTransformArray(ary, type) {
	let date = ary || [];
	return date.map(d => timeTransform(d, type));
}

export function objectFilter(obj) {
	for(let i in obj)((obj[i] == undefined) && delete obj[i]);
	return obj;
}

export function replaceNull(str, rep = "---") {
	let r = (str == undefined || str == null || str == "") ? rep : str;
	return r;
}

export function pubMessage(dispatch, promise) {
	return promise.then(d => {
		if(d.data.code) throw d.data.message;
		dispatch('setMessage', {
			type: 'success',
			message: {
				message: "操作成功"
			}
		});
		return d.data;
	}).catch(e => {
		dispatch('setMessage', {
			type: 'error',
			message: e
		});
	});
}

export function pickKeys(ary, ...key) {
	if(!Array.isArray(ary) || ary.size < 1 || !key || key.size < 1) return {};
	let obj = {};
	key.forEach(k => {
		if(k) obj[k] = [];
	});
	ary.forEach(a => {
		key.forEach(k => {
			a[k] != undefined && obj[k].unshift(a[k]);
		})
	});
	return obj;
}

export let normalize = (i, max, min) => {
	return i <= max && i >= min ? (i - min) / (max - min) : 0;
};

export let recover = (i, max, min) => {
	return i >= 0 && i <= 1 ? i * (max - min) + min : 0;
};

export async function get(url, data, options) {
	return new Promise(function(resolve, reject) {
		vue.http.get(url, {
				params: data
			}, _.extend({
				emulateJSON: true
			}, options))
			.then(res => resolve(res))
			.catch(error => reject(error));
	});
}

export async function getJson(url, data, options) {
	return get(url, data, options).then((res = {}) => Promise.resolve(res.body));
}

export async function post(url, data, options) {
	return new Promise(function(resolve, reject) {
		vue.http.post(url, {
				params: data
			}, _.extend({
				emulateJSON: true
			}, options))
			.then(res => resolve(res))
			.catch(error => reject(error));
	});
}

export async function postJson(url, data, options) {
	return post(url, data, options).then((res = {}) => Promise.resolve(res.body));
}

export function stringfyObject(obj) {
	for(let o in obj) {
		if(obj.hasOwnProperty(o)) obj[o] = obj[o] && obj[o] + "" || "";
	}
	return obj;
}
export function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}