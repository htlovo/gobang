	var board = document.getElementById('board');
	var player= document.getElementById('player');
	var playerTxt= player.firstChild;
	var start= document.getElementById('start');
	var startTxt=start.firstChild;
	var tipTxt=document.getElementById('tip').firstChild;
	var ret=document.getElementById('retract');
	var i;
	var record;
	//黑先
	var piece;
	//定义战况
	var situation=[];
	//胜利条件
	var win=/(1){5,}|1(.{14}1){4,}|1(.{15}1){4,}|1(.{16}1){4,}|0{5}|0(.{14}0){4,}|0(.{15}0){4,}|0(.{16}0){4,}/;
	EventUtil.addHandler(start,"click",startGame);
	startGame();
	//棋局开始
	function startGame() {
		EventUtil.removeHandler(start,"click",startGame);
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
		EventUtil.addHandler(ret,"click",retract);
		//重置提示信息
		playerTxt.nodeValue="黑方";
		player.parentNode.firstChild.nodeValue="轮到";
		tipTxt.nodeValue="对弈开始";
		startTxt.nodeValue="已经开始";
		//重置先手，战况
		piece=0;
		for (i = 0; i < 240; i++) {
		situation[i]= 2;
		}
		//记录步数
		i=0;
		record=[];
	}
	//落子
	function go(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//判断点击处是否无子
		if (target.className.search(/whitepiece|blackpiece/)===-1) {
			if (startTxt.nodeValue!=="重新开始") {
				tipTxt.nodeValue="对弈中..";
				startTxt.nodeValue="重新开始";
				EventUtil.addHandler(start,"click",startGame);
			}

			//匹配win的字符串
			var result;
			var idNum=+target.id.replace("sq","");
			//
			var winpiece;
			//记录历史
			i=i+1;
			record[i-1]={
				idNum:idNum,
				sq:target,
				row:Math.ceil((idNum+1)/16),
				col:((idNum+1)%16)
			}
			if (i%2===0) {
			console.log("白"+record[i-1].row+" "+record[i-1].col)
			} else {
			console.log("黑"+record[i-1].row+" "+record[i-1].col)
			}
			//改变战况
			situation[idNum] = piece;
			if (piece) {
				addClass(target,"whitepiece");
				piece=0;
				playerTxt.nodeValue="黑方";
				board.className=" blackpointer";
			} else {
				addClass(target,"blackpiece");
				piece=1;
				playerTxt.nodeValue="白方";
				board.className=" whitepointer"
			}
			//战况转为字符串
			situation=situation.join("");
			//判断是否分出胜负
			if (win.test(situation)) {
				board.className="";
				tipTxt.nodeValue="对弈结束";
				EventUtil.removeHandler(board,"click",go);
				EventUtil.removeHandler(ret,"click",retract);
				player.parentNode.firstChild.nodeValue="恭喜";
				result=win.exec(situation);
				if (+result[0][0]) {
					playerTxt.nodeValue="白胜";
					//划线
					switch(result[0].length){
						case 5: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i));
							addClass(winpiece,"wleftline");
						};break;
						case 61: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*15));
							addClass(winpiece,"wtoprightline");
						};break;
						case 65: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*16));
							addClass(winpiece,"wtopline");
						};break;
						case 69: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*17));
							addClass(winpiece,"wtopleftline");
						};break;
						default: alert("!!!!!");
					}
				} else {
					playerTxt.nodeValue="黑胜";
					//划线
					switch(result[0].length){
						case 5: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i));
							addClass(winpiece,"bleftline");
						};break;
						case 61: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*15));
							addClass(winpiece,"btoprightline");
						};break;
						case 65: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*16));
							addClass(winpiece,"btopline");
						};break;
						case 69: for ( i = 0; i < 5; i++) {
							winpiece = document.getElementById("sq"+(result.index+i*17));
							addClass(winpiece,"btopleftline");
						};break;
						default: alert("!!!!!");
					}
				}
			}
			//战况转回数组
			situation=situation.split("");
		}
	}
	//悔棋
	function retract() {
		if (i>=1) {
			switch(record[i-1].idNum){
				case 51:
				case 59:
				case 179:
				case 187:
					record[i-1].sq.className=" star";break;
				case 119:
					record[i-1].sq.className=" yuan";break;
				default:
					record[i-1].sq.className=" ";
			}
			if (piece) {
				piece=0;
				playerTxt.nodeValue="黑方";
			} else {
				piece=1;
				playerTxt.nodeValue="白方";
			}
			if (i%2===0) {
				console.log("-白"+record[i-1].row+" "+record[i-1].col)
			} else {
				console.log("-黑"+record[i-1].row+" "+record[i-1].col)
			}
			situation[record[i-1].idNum] = 2;
			i=i-1;
		}
	}