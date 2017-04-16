	var board = document.getElementById('board');
	var square = board.getElementsByTagName('div');
	var player= document.getElementById('player');
	var playerTxt= player.firstChild;
	var start= document.getElementById('start');
	var startTxt=start.firstChild;
	var tip=document.getElementById('tip');
	var tipTxt=tip.firstChild;
	var i;
	//黑先
	var piece;
	//定义战况
	var situation=[];
	//胜利条件
	var win=/(1){5,}|1(.{14}1){4,}|1(.{15}1){4,}|1(.{16}1){4,}|0{5}|0(.{14}0){4,}|0(.{15}0){4,}|0(.{16}0){4,}/;
	start.onclick=startGame;
	startGame();
	//棋局开始
	function startGame() {
		start.onclick=null;
		//清空棋子背景
		for (i = 0; i < square.length; i++) {
			square[i].style="";
		}
		board.onmouseover=function () {
			board.style.cursor="crosshair";
		}
		//增加棋子点击事件
		for (i = 0; i < square.length; i++) {
			square[i].onclick=go;
		}
		//重置提示信息
		playerTxt.nodeValue="黑方";
		player.parentNode.firstChild.nodeValue="轮到";
		tipTxt.nodeValue="对弈开始";
		startTxt.nodeValue="已经开始";
		//重置参数
		piece=0;
		for (i = 0; i < 240; i++) {
		situation[i]= 2;
		}
	}
	//落子
	function go() {
		var result;
		var id;
		var idNum=Number(this.id.replace("sq",""));
		if (startTxt.nodeValue==="重新开始") {} else {
			tipTxt.nodeValue="对弈中..";
			startTxt.nodeValue="重新开始";
			start.onclick=startGame;
		}
		//改变战况
		situation[idNum] = piece;
		//落子，轮换棋手
		if (piece) {
			this.style.background= "radial-gradient(#fff 60%, transparent 0)";
			piece=0;
			playerTxt.nodeValue="黑方";
			board.onmouseover=function () {
				board.style.cursor="crosshair";
			}
		} else {
			this.style.background= "radial-gradient(#000 60%, transparent 0)";
			piece=1;
			playerTxt.nodeValue="白方";
			board.onmouseover=function () {
				board.style.cursor="cell";
			}
		}
		this.onclick=null;
		//判断战况
		situation=situation.join("");
		if (win.test(situation)) {
			board.onmouseover=function () {
				board.style="";
			};
			tipTxt.nodeValue="对弈结束";
			player.parentNode.firstChild.nodeValue="恭喜";
			result=win.exec(situation);
			if (Number(result[0][0])) {
				playerTxt.nodeValue="白胜";
				alert("白胜");
				//??????????????????????????????????划线

			} else {
				playerTxt.nodeValue="黑胜";
				alert("黑胜");
				//划线

			}
			for (i = 0; i < square.length; i++) {
				square[i].onclick=null;
			}
		}
		situation=situation.split("");
	}
