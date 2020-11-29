$(function(){
	var current=0;
	var thumbListSize=6;
    var thumbnail=$('#thumbnail');
	var prev=thumbnail.find('>.left')
	var next=thumbnail.find('>.right')
	var container=thumbnail.find('>.container>ul');
	//페이지를 위치값 이동하기 위해 미리 ul태그를 선택하여 container를 jquery 객체로 담음
	var containWidth=thumbnail.find('>.container').width();
	var thumb=container.find('>.thumb');
	var maxSize=thumb.size(); //18
	var image=$('#gallery #image>p'); //큰 이미지 각각
	
	thumb.on('click',function(){
		image.css('display','none');
		var i=$(this).index(); 
		image.eq(i).css('display','block');
	})
	/*클릭*/
	next.on('click',function(){
		if(current<maxSize/thumbListSize-1)current++;
		//0<18/6-1 충족시킨다면 ? current 1씩 증가
		//다음버튼에 이벤트가 호출되면 다음페이지가 존재하는지 여부
		//다음 페이지가 있으면 번호를 1씩 증가
		listMove();
	})
	prev.on('click',function(){
		if(current>0)current--;
		listMove();
	})
	
	/* 클릭시 위치값 이동 */
	function listMove(){
		var tl=containWidth * current * -1;
		//이동거리 지정 = 720 * 보고있는페이지 * -1
		container.stop().animate({left:tl},400);
	}
	// 글자쓰는 플러그인 
	$('.ptitle').typed({
		strings:['<span class="txt1">I am Creative WEB PUBLISHER.</span>','<span class="txt2">I am YANG HYUN HWA.</span>'],
		typeSpeed:150, 
		backDelay:200, 
		loop:true, 
		
	})
	
});