define(["jquery","car","scene","chart"],function($,car,scene,chart){
	jQuery.SandBox = {
		init:function() {
			//初始化Socket

			//初始化场景
			this.station1 = new scene.Station(1, "收费站1", 15);
			this.station2 = new scene.Station(2, "收费站2", 15);
			this.point = new scene.Point();
			this.park = new scene.Park();

			//初始化小车   
			this.carlist = [];

			// // 初始化图表
			chart.init();

			//初始化表格

			//路段动画重新播放
			$("#carList").on("webkitAnimationIteration", ".car", function(e){
				if(e.originalEvent.animationName == "move"){
					//每次结束路段动画时检查是否与场景有联动
					$.SandBox.sceneCheck($(this).data("car"), false);
					$.SandBox.next($(this).data("car"));
				}
			});

			//路段动画播放结束
			$("#carList").on("webkitAnimationEnd", ".car", function(e){
				if(e.originalEvent.animationName == "move"){
					$(this).addClass("aniEnd");
				}
			});
		},
		carMove: function(num, posiiton, date){
			var _car = this.carlist[num];
			if(_car){
				var run = _car.setSerial(posiiton, date);
				/*
				if(run){
					$.SandBox.sceneCheck(num, false);
					$.SandBox.next(num);
				}*/
			}else{
				var newCar = new car.Car(num);
				this.carlist[num] = newCar;
				newCar.setSerial(posiiton, date);
				newCar.add();
			}
		},
		next: function(num){
			var callback = this.carlist[num].move();
			if(callback){
				this.sceneCheck(num, true);
			}else {
				this.carlist[num] = null;
			}
		},
		sceneCheck: function(num, status){
			var _car = this.carlist[num];
			var cls = _car.getSerialNow().toString();
			switch(cls){
				case "4":
					if(status){
						//收费站1收费
						this.station1.charge(_car,5000);
						//抬杠
						this.station1.rail(true);
					}else{
					}
					break;
                case "12":
                    if(status){
						//收费站1收费
						this.station1.charge(_car,5000,true);
						//抬杠
						this.station1.rail();
					}
					break;
				case "14":
                    if(status){
						//识别
						this.point.detect();
					}
					break;
				case "20":
					//Etc抬杠
                    if(status){
                        //收费站2收费
                        this.station2.charge(_car,5000);
                        //抬杠
                        this.station2.rail(true);
                    }else{
                        //停车场入口抬杠
                    }
					break;
				case "22":
					if(status){
						this.park.rail("in");
					}else{
						//停车场入口收费
						//停车场入口降杠
                        this.park.charge(_car,5000, true);
					}
					break;
				case "24":
					if(status){
					}else{
						this.park.rail("out");
					}
					break;
				case "25":
					if(status){
					}else{
						//停车场出口收费
						//停车场出口降杠
						this.park.charge(_car,5000);
					}
					break;
				case "27":
					if(status){
					}else{
						//收费站2收费
						this.station2.charge(_car,5000,true);
						//抬杠
						this.station2.rail();
					}
					break;
				case "30":
					if(status){
						//识别
						this.point.detect();
					}else{
					}
					break;
				default:
					break;
			}
		},
		setStationName: function(name1,name2){
			if(name1) this.station1.setName(name1);
			if(name2) this.station2.setName(name2);
		}
	};
});