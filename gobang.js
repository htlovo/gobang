	var board = document.getElementById('board');
	var player= document.getElementById('player');
	var start= document.getElementById('start');
	var ret=document.getElementById('retract');
	// var rep=document.getElementById('report').getElementsByTagName('p')[0];
	var i;
	var step;
	var record;
	//黑先
	var piece;
	//定义战况
	var situation=[];
	//胜利条件
	var win=/(1){5,}|1(.{14}1){4,}|1(.{15}1){4,}|1(.{16}1){4,}|0{5,}|0(.{14}0){4,}|0(.{15}0){4,}|0(.{16}0){4,}/;
	startGame();
	//棋局开始
	function startGame() {
		EventUtil.removeHandler(start,"click",startGame);
		addClass(start,"cantclick");
		EventUtil.removeHandler(ret,"click",retract);
		addClass(ret,"cantclick");
		//清空棋子背景
		var square = board.getElementsByTagName('div');
		for (i = 0; i < square.length; i++) {
			switch (i){
				case 112:
					square[i].className=" yuan";break;
				//合并case
				case 48:
				case 56:
				case 168:
				case 176:
					square[i].className=" star";break;
				default : 
					square[i].className="";
			}
		}
		board.className=" blackpointer";
		//增加棋子点击事件
		EventUtil.addHandler(board,"click",go);
		//重置提示信息
		player.className="blackpiece";
		tip.innerText="对弈开始";
		//重置先手，战况
		piece=0;
		for (i = 0; i < 240; i++) {
		situation[i]= 2;
		}
		//记录步数
		step=0;
		record=[];
	}
	//落子
	function go(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//判断点击处是否无子
		if (target.id!=="board"&&target.className.search(/whitepiece|blackpiece/)===-1) {
			if (step===0) {
				tip.innerText="对弈中";
				EventUtil.addHandler(start,"click",startGame);
				start.className=" ";
				EventUtil.addHandler(ret,"click",retract);
				ret.className=" ";
			}
			//匹配win的字符串
			var result;
			var idNum=+target.id.replace("sq","");
			//
			var winpiece;
			//记录历史
			step=step+1;
			record[step-1]={
				idNum:idNum,
				sq:target,
				row:Math.ceil((idNum+1)/16),
				col:((idNum+1)%16)
			}
			if (record[step-2]) {
				record[step-2].sq.className=record[step-2].sq.className.replace("lastpiece","");
			}
			addClass(target,"lastpiece");
			// if (step%2===0) {
			// 	rep.innerText="白"+record[step-1].row+" "+record[step-1].col;
			// 	console.log("白"+record[step-1].row+" "+record[step-1].col)
			// } else {
			// 	rep.innerText="黑"+record[step-1].row+" "+record[step-1].col;
			// 	console.log("黑"+record[step-1].row+" "+record[step-1].col)
			// }
			//改变战况
			situation[idNum] = piece;
			if (piece) {
				addClass(target,"whitepiece");
				piece=0;
				player.className="blackpiece";
				board.className=" blackpointer";
			} else {
				addClass(target,"blackpiece");
				piece=1;
				player.className="whitepiece"
				board.className=" whitepointer"
			}
			//战况转为字符串
			situation=situation.join("");
			//判断是否分出胜负
			if (win.test(situation)) {
				board.className=" ";
				player.className=" ";
				EventUtil.removeHandler(board,"click",go);
				EventUtil.removeHandler(ret,"click",retract);
				addClass(ret,"cantclick");
				result=win.exec(situation);
				if (+result[0][0]) {
					tip.innerText="白胜";
					//划线,合并部分case
					switch(result[0].length){
						case 5: 
						case 6:
						case 7:
						case 8:
						case 9: 
							for ( i = 0; i < result[0].length; i++) {
							winpiece = document.getElementById("sq"+(result.index+i));
							addClass(winpiece,"wleftline");
						};break;
						case 61: 
						case 76:
						case 91:
						case 106:
						case 121:
							for ( i = 0; i < (result[0].length-1)/15+1; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*15));
							addClass(winpiece,"wtoprightline");
						};break;
						case 65:
						case 81:
						case 97:
						case 113:
						case 129:
							for ( i = 0; i < (result[0].length-1)/16+1; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*16));
							addClass(winpiece,"wtopline");
						};break;
						case 69:
						case 86:
						case 103:
						case 120:
						case 137:
							for ( i = 0; i < (result[0].length-1)/17+1; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*17));
							addClass(winpiece,"wtopleftline");
						};break;
						default: alert("!!!!!");
					}
				} else {
					tip.innerText="黑胜";
					//划线
					switch(result[0].length){
						case 5: 
						case 6:
						case 7:
						case 8:
						case 9:
							for ( i = 0; i < result[0].length; i++) {
							winpiece = document.getElementById("sq"+(result.index+i));
							addClass(winpiece,"bleftline");
						};break;
						case 61: 
						case 76:
						case 91:
						case 106:
						case 121:
							for ( i = 0; i < (result[0].length-1)/15+1; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*15));
							addClass(winpiece,"btoprightline");
						};break;
						case 65:
						case 81:
						case 97:
						case 113:
						case 129:
							for ( i = 0; i < (result[0].length-1)/16+1; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*16));
							addClass(winpiece,"btopline");
						};break;
						case 69:
						case 86:
						case 103:
						case 120:
						case 137:
							for ( i = 0; i < (result[0].length-1)/17+1; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*17));
							addClass(winpiece,"btopleftline");
						};break;
						default: alert("!!!!!");
						console.log(result[0].length);
					}
				}
			}
			//战况转回数组
			situation=situation.split("");
		}
	}
	//悔棋
	function retract() {
		if (step>=1) {
			switch(record[step-1].idNum){
				case 51:
				case 59:
				case 179:
				case 187:
					record[step-1].sq.className=" star";break;
				case 119:
					record[step-1].sq.className=" yuan";break;
				default:
					record[step-1].sq.className=" ";
			}
			if (piece) {
				piece=0;
				player.className="blackpiece"
			} else {
				piece=1;
				player.className="whitepiece"
			}
			// if (step%2===0) {
			// 	console.log("-白"+record[step-1].row+" "+record[step-1].col)
			// } else {
			// 	console.log("-黑"+record[step-1].row+" "+record[step-1].col)
			// }
			if (step===1) {
				EventUtil.removeHandler(ret,"click",retract);
				addClass(ret,"cantclick");
			}
			situation[record[step-1].idNum] = 2;
			step=step-1;
			if (record[step-1]) {
				addClass(record[step-1].sq,"lastpiece");
			} 
		}
	}