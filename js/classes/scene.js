define(['jquery'],function($){
	/*
	 * Scene 类
	 */
	var getNowFormatDate = function(){
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    return currentdate;
	}
	return {
		/*
		 * 收费站
		 */
		Station : function(id, name, price){
			//收费站名
        	this.name = name;

        	//收费站ID
        	this.id = id;

        	//收费站价格
			this.price = price;

		    this.setName = function(name){
	        	this.name = name;
	        	$("#title"+this.id).html(name);
	        };

	        this.charge = function(car, timeout, enter){
	        	//车型
	        	var type = car.getType() + "  " + car.getPlateNum();

	        	//余额
	        	var blance = car.pay(this.price);

	        	//时间
	        	var date = getNowFormatDate();

	        	var s = $("#station"+this.id);

	        	s.find(".type").html(type);
	        	s.find(".in").html(this.name);

	        	var i = s.find(".money");
	        	if(enter){
	        		i.parent().hide();
	        	}
	        	else{
	        		i.html(this.price+" 元");
	        		i.parent().show()
	        	}
	        	s.find(".blance").html(blance+" 元");
	        	s.find(".datetime").html(date);
	        	s.find(".info").show(300);

	        	setTimeout(function(){
	        		s.find(".info").hide(300);
	        	},timeout);
	        };

	        this.rail = function(enter){
	        	var lane = $("#station"+this.id+" .lane");
	        	lane.removeClass("show");
	        	lane.find("img").attr("src", "img/allow.gif");
	        	lane.find("span").html(this.name);
	        	if(enter){
	        		var rail = $("#station"+this.id+" .rail");
	        		rail.addClass("open");
		        	setTimeout(function(){
		        		rail.removeClass("open");
		        	},2000);
	        	}

	        	setTimeout(function(){
	        		lane.addClass("show");
	        	},0);

	        	setTimeout(function(){
	        		lane.find("img").attr("src", "img/refuse.gif");
	        	},2000);
	        };
		},

		/*
		 * 停车场
		 */
		Park : function(){
			//车位
			this.space = 16;

			//价格
			this.price = 15;

			this.charge = function(car, timeout, enter){
	        	//车型
	        	var type = car.getType() + "  " + car.getPlateNum();

	        	//时间
	        	var date = getNowFormatDate();

	        	var s = $("#park");

	        	s.find(".type").html(type);

	        	var i = s.find(".price");
	        	var o = s.find(".out");
	        	var p = s.find(".park");
	        	if(enter){
	        		i.parent().hide();
	        		o.parent().hide();
	        		p.parent().hide();
	        		s.find("span.bold").html("15");
	        	}
	        	else{
	        		s.find("span.bold").html("16");
	        		i.html(this.price+" 元");
	        		i.parent().show();
	        		o.html(date);
	        		o.parent().show();
	        		p.html("10min");
	        		p.parent().show();
	        	}
	        	s.find(".in").html(date);
	        	
	        	s.find(".info").show(300);
	        	setTimeout(function(){
	        		s.find(".info").hide(300);
	        	},timeout);
	        };

	        this.rail = function(direction){
	        	var rail;
	        	if(direction == "in"){
	        		rail = $("#rail1");
	        	}
	        	else{
	        		rail = $("#rail2");
	        	}
	        	rail.addClass("open");
	        	setTimeout(function(){
	        		rail.removeClass("open");
	        	},1500);
	        };
		},

		/*
		 * 红绿灯
		 */
		Light : function(){
			this.green = function(){
	        	
	        };

	        this.red = function(){
	        	
	        };
		},

		/*
		 * 识别点
		 */
		Point : function(){
			this.detect = function(){
	        	var lane = $("#point");
	        	lane.removeClass("show");
	        	lane.find("img").attr("src", "");
	        	
	        	setTimeout(function(){
	        		lane.find("img").attr("src", "img/detect.gif");
	        		lane.addClass("show");
	        	},3000);
	        };
		}
    };
})