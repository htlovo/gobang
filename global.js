//EventUtil 对象使用方法
// EventUtil.addHandler(btn,"click",function (event) {
// 	event = EventUtil.getEvent(event);
// 	var target = EventUtil.getTarget(event);
// 	EventUtil.preventDefault(event);
// 	EventUtil.stopPropagation(event);
// })
var EventUtil = {
	//增加事件处理函数，false表示在冒泡阶段
	addHandler: function (element,type,handler) {	
		if (element.addEventListener) {	
			element.addEventListener(type, handler, false);
		} else if (elment.attachEvent){
			element.attachEvent("on" + type, handler)
		} else {
			element["on" + type] = handler;
		}
	},
	//返回对event对象的引用
	getEvent: function (event) {
		return event ? event : window.event;
	},
	//返回事件的目标
	getTarget: function (event) {
		return event.target || event.srcElement;
	},
	//取消事件的默认事件
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue=false;
		}
	},
	//移除事件处理程序
	removeHandler: function (element, type ,handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	//阻止事件流
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			evnt.cancelBubble = true;
		}
	}
};
//增加类
function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}
