define(['jquery'],function($){
	/*
	 * Car 类
	 */
	var opt = {
		plateNumberList : [null,"粤A1111","粤A2222","粤A3333","粤A4444"],
		colorList : [null,"yellow", "red", "yellow", "red"]
	};
	return {
		Car : function(num){
			//路段数组
        	this.serial = [];

        	//路段时间戳数组
        	this.date = [];

        	//小车ID
			this.carId = num;

			//小车车牌
			this.plateNum = opt.plateNumberList[num];

			//小车颜色
			this.color = opt.colorList[num];

			//小车车型
			this.type = "一型";

			//小车余额
			this.balance = Math.random().toFixed(5)*1000;

		    this.setSerial = function(serial, date){
	        	this.serial.push(serial);
	        	if(date) this.date.push(new Date(date));

	        	clearTimeout(this.timeout);
	        	var car = $("#car" + this.carId);
	        	car.removeClass("pause");
	        	/*if(car.hasClass("aniEnd")){
	        		return true;
	        	}*/
	        	return false;
	        };
	        this.getSerialNow = function(){
	        	return this.serial[0];
	        };
	        this.getPlateNum = function(){
	        	return this.plateNum;
	        };
	        this.getType = function(){
	        	return this.type;
	        };
	        this.move = function(){
	        	var s = this.serial[1];
	        	var d = this.date[1];
	        	var car = $("#car" + this.carId);
	        	var c = this.color;
	        	if(s){
	        		
	        		var wait = "";
	        		if(this.isWait(s)){
	        			wait = "wait";
	        		}

	        		$("#carList").append('<div data-car="'+ this.carId +'" id="car'+ this.carId +'" class="car '+ c +' slice'+ s +' ' + wait + '"><span>'+ this.carId +'</span></div>');
	        		car.remove();
	        		car = $("#car" + this.carId);

	        		if(d){
	        			var nd = this.date[0];
						var sec=(d-nd)/1000;
	        			// 计算播放时间，现在先默认8s
	        			//car.css("animation-duration",sec + "s");
	        			console.log(sec);
	        		}

	        		if(wait){
	        			var delay = car.css("animation-duration");
	        			delay = delay.replace("s","000");
	        			delay -= 80;
	        			this.timeout = setTimeout(function(){
	        				car.addClass("pause");
	        			}, delay);
	        		}

	        		//动画已经播放，清除数组第一位
	        		this.serial.shift();
	        		this.date.shift();
	        		
	        	}else{
	        		if(!car.hasClass("wait")){
		        		car.remove();
	        			return false;
		        	}
	        	}
	        	return true;
	        };
	        this.add = function(){
	        	var wait = "";
	        	if(this.isWait(this.serial[0])){
	        		wait = "wait";
	        	}
	        	$("#carList").append('<div data-car="'+ this.carId +'" id="car'+ this.carId +'" class="car '+ this.color +' '+ wait +' slice'+ this.serial[0] +'"><span>'+ this.carId +'</span></div>');
	        	var car = $("#car" + this.carId);
	        	if(wait){
	        		var delay = car.css("animation-duration");
	        		delay = delay.replace("s","000");
	        		delay -= 80;
	        		this.timeout = setTimeout(function(){
	        			car.addClass("pause");
	        		}, delay);
	        	}
	        };
	        this.remove = function(){
	        	$("#car"+this.serial).remove();
	        };
	        this.pay = function(price){
	        	this.balance -= price;
	        	if(this.balance < 0) this.setBalance();
	        	this.balance = this.balance.toFixed(2);
	        	return this.balance;
	        };
	        this.setBalance = function(){
	        	//设置随机余额
	        	this.balance = Math.random().toFixed(5)*1000;
	        };
	        this.isWait = function(serial){
	        	//判读是否需要停车等待
	        	/*if(serial == 5 || serial == 9){
		    		return true;
		    	}else{
		    		return false;
		    	}*/
		    	return false;
	        };
		}
    };
});