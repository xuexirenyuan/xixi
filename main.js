/* jshint devel:true */
// Initialize your app
var language_pack = {
    now_lang : 0,
    loadProperties : function(new_lang){
        var self = this
        var tmp_lang = 'en'
		switch(new_lang) {
			case 2:
				tmp_lang = 'zh'
				break
			case 3:
				tmp_lang = 'ja'
				break
			case 4:
				tmp_lang = 'ko'
				break
			case 5:
				tmp_lang = 'es'
				break
			case 6:
				tmp_lang = 'vi'
				break
			case 7:
				tmp_lang = 'id'
				break
			case 8:
				tmp_lang = 'pt'
				break
		}
        jQuery.i18n.properties({
            name: 'strings',
            path:'language/',
            language: tmp_lang,
            cache: false,
            mode:'map',
            callback: function() {
				$('[data-i18n-placeholder]').each(function () {
					$(this).attr('placeholder', $.i18n.prop($(this).data('i18n-placeholder')));
				})
				$('[data-i18n-text]').each(function () {
					var html = $(this).html();
					var reg = /<(.*)>/;
					if (reg.test(html)) {
						var htmlValue = reg.exec(html)[0];
						$(this).html(htmlValue + $.i18n.prop($(this).data('i18n-text')));
					}
					else {
						$(this).text($.i18n.prop($(this).data('i18n-text')));
					}
				})
                document.title = $.i18n.map['title'];
            }
        });
        self.now_lang = new_lang;
    }
}

/**
* 文本框根据输入内容自适应高度
* @param                {HTMLElement}        输入框元素
* @param                {Number}                设置光标与输入框保持的距离(默认0)
* @param                {Number}                设置最大高度(可选)
*/
var autoTextarea = function (elem, extra, maxHeight) {
	extra = extra || 0;
	var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
	isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
	addEvent = function (type, callback) {
			elem.addEventListener ?
					elem.addEventListener(type, callback, false) :
					elem.attachEvent('on' + type, callback);
	},
	getStyle = elem.currentStyle ? function (name) {
			var val = elem.currentStyle[name];
			if (name === 'height' && val.search(/px/i) !== 1) {
					var rect = elem.getBoundingClientRect();
					return rect.bottom - rect.top -
							parseFloat(getStyle('paddingTop')) -
							parseFloat(getStyle('paddingBottom')) + 'px';        
			};

			return val;
	} : function (name) {
					return getComputedStyle(elem, null)[name];
	},
	minHeight = parseFloat(getStyle('height'));
	elem.style.resize = 'none';

	var change = function () {
			var scrollTop, height,
					padding = 0,
					style = elem.style;

			if (elem._length === elem.value.length) return;
			elem._length = elem.value.length;

			if (!isFirefox && !isOpera) {
					padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
			};
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			elem.style.height = minHeight + 'px';
			if (elem.scrollHeight > minHeight) {
					if (maxHeight && elem.scrollHeight > maxHeight) {
							height = maxHeight - padding;
							style.overflowY = 'auto';
					} else {
							height = elem.scrollHeight - padding;
							style.overflowY = 'hidden';
					};
					style.height = height + extra + 'px';
					scrollTop += parseInt(style.height) - elem.currHeight;
					document.body.scrollTop = scrollTop;
					document.documentElement.scrollTop = scrollTop;
					elem.currHeight = parseInt(style.height);
			};
	};

	addEvent('propertychange', change);
	addEvent('input', change);
	addEvent('focus', change);
	change();
};

$(function () {
	autoTextarea(document.getElementById("address"))
	/**
	 * 0、en-US 英语
	 * 1、zh 中文简体
	 * 2、zh-TW/zh-HK/zh-Hant/zh-MO 中文繁体
	 * 3、ja-JP 日语
	 * 4、ko-KR 韩语
	 * 5、es-ES 西班牙
	 * 6、vi-VN 越南
	 * 7、id-ID 印度尼西亚
	 * 8、pt-PT 葡萄牙语(葡萄牙)
	 */
	let language = navigator.language
	if(language) {
		language = language.toLowerCase()
	}
	let languageIndex = 0
	if(language === 'zh-tw' || language === 'zh-hk' || language === 'zh-hant' || language === 'zh-mo') {
		languageIndex = 2
	} else if(language === 'ja-jp') {
		languageIndex = 3
	} else if(language === 'ko-kr') {
		languageIndex = 4
	} else if(language === 'es-es') {
		languageIndex = 5
	} else if(language === 'vi-vn') {
		languageIndex = 6
	} else if(language === 'id-id') {
		languageIndex = 7
	} else if(language === 'pt-pt') {
		languageIndex = 8
	}
	language_pack.loadProperties(languageIndex)
	function changeNumber() {
		console.log($("#number").val())
		if($("#number").val() && $("#number").val() >= 0) {
			$("#ratio").text('≈ $'+parseFloat($("#number").val()).toFixed(2)).show()
			$("#btn-connect").addClass('next-button-fill')
		} else {
			$("#ratio").text('≈ $'+parseFloat($("#number").val()).toFixed(2)).hide()
			$("#btn-connect").removeClass('next-button-fill')
		}
	}
	$("#number").bind('input propertychange', changeNumber)
	
	$("input,textarea").focus(function () {
	    // 输入框获取焦点
		$(this).removeClass('blur')
		$(this).addClass('focus')
	}).blur(function () {
	    // 输入框失去焦点
		$(this).removeClass('focus')
		$(this).addClass('blur')
	});
	window.updateamount = function (amount) {
		$("#number").val(amount)
		changeNumber()
	}
});
