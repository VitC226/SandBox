requirejs.config({

	paths: {
		"jquery": "libs/jquery",
		"sockjs": "libs/sockjs-0.3.4",
		"echarts": "libs/echarts",
		"stomp": "libs/stomp",
		"sandbox": "classes/sandbox",
		"car": "classes/car",
		"scene": "classes/scene",
		"chart": "classes/chart"
	},
	//
	shim: {
		"$": {
			exports: "jquery"
		},
	},
	baseUrl: 'js'

});

require(['jquery', "chart", "sandbox", "sockjs", "stomp", "car"], function($, chart) {
	var sandbox = $.SandBox;

	var stompClient;
	// var url = "http://10.173.11.155:8888/Sandboxie/";
	var Urlroot = "http://10.173.235.250:8080/Sandboxie/";

	//连接Socket
	//connect(Urlroot + 'data');

	sandbox.init();
	//设置收费站名称
	sandbox.setStationName("市南路", "大学城");
 	
 	for(var a = 1; a < 32; a++){
 		if(a == 32) a=1;
 		sandbox.carMove(1, a);
 	}

 	setTimeout(function(){
 		for(var b = 8; b < 32; b++){
	 		if(b == 32) b=1;
	 		sandbox.carMove(2, b);
	 	}
 	}, 1500);

 	setTimeout(function(){
 		for(var c = 18; c < 32; c++){
	 		if(c == 32) c=1;
	 		sandbox.carMove(3, c);
	 	}
 	}, 3000);

 	setTimeout(function(){
 		for(var d = 24; d < 32; d++){
	 		if(d == 32) d=1;
	 		sandbox.carMove(4, d);
	 	}
 	}, 4500);

});