define(['jquery','echarts'],function($,echarts){
	/*
	 * Chart 类
	 */
	return {
		init : function(dom,option){
			var value = [60, 20, 5, 30, 20, 3, 1];
			// 指定图表的配置项和数据
			var option = {
				xAxis: [{
					axisLabel: {
						textStyle: {
							color: '#fff',
							fontSize: 13
						}
					},
					type: 'category',
					data: ["已接收", "校验正常", "校验异常", "已记账", "正常清分", "争议支付", "坏账"]
				}],
				yAxis: [{
					axisLabel: {
						textStyle: {
							color: '#fff',
						}
					},
				}],
				series: [{
					type: 'bar',
					itemStyle: {
						normal: {
							color: function(params) {
								var colorList = [
									'#FF5F8D', '#FF704A', '#E8D100', '#A2EA32', '#46C2F2',
									'#819AF2', '#AA5BE8'
								];
								return colorList[params.dataIndex]
							},
							label: {
								show: true,
								position: 'top',
								offset: [0, -6],
								textStyle: {
									color: '#FFF',
									fontSize: '20'
								}
							}
						}
					},
					barWidth: 22,
					data: value
				}]
			};
			this.dom = document.getElementById('chart');

	        this.myChart = echarts.init(this.dom);
			// 使用刚指定的配置项和数据显示图表。
	        this.myChart.setOption(option);
		},
		setOption: function (option) {
			this.myChart.setOption(option);
		}
    };
})