var $prev = $($(".page-button")[0]);

$(".page-button").each((i, e) => {
	var $pageNumber = $(e);

	$pageNumber.on("click", function (e) {
		e.preventDefault();
		if ($prev == $pageNumber) {
			return;
		}

		$prev.removeClass("page-button-active");
		$pageNumber.addClass("page-button-active");

		$prev = $pageNumber;
	});
});

//유저 삭제
$(".delete-indivisual").click(function() {
	var $row = $(this).closest("tr");
	var userId = $row.find(".noticeId span").text();
	if (confirm(userId + "번 유저를 삭제하시겠습니까?")) {
		function modify(id, callback){
			$.ajax({
				url: "/admin/member/blockUsers",
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(userId, function() {
			alert(userId + "번 유저가 삭제되었습니다.");
			$row.hide();

		});
	}
});


// 유저 복구
$(".restore-indivisual").click(function() {
	var $row = $(this).closest("tr");
	var userId = $row.find(".noticeId span").text();
	if (confirm(userId + "번 유저를 복구하시겠습니까?")) {
		function modify(id, callback){
			$.ajax({
				url: "/admin/member/restoreUsers",
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(userId, function() {
			alert(userId + "번 유저가 복구 되었습니다.");
			$row.hide();

		});
	}
});

//게시글 삭제
$(".delete-board").click(function() {
	var $row = $(this).closest("tr");
	var postId = $row.find(".postId").text();
	var postType = $row.find(".postType").text();
	var confirmMessage = postType === '카페' ? postId + "번 카페 게시글을 삭제하시겠습니까?" : postId + "번 스터디 게시글을 삭제하시겠습니까?";

	if (confirm(confirmMessage)) {
		function modify(id, callback){
			var url = postType === '카페' ? "/admin/board/cafeBlockPost" : "/admin/board/studyBlockPost";

			$.ajax({
				url: url,
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(postId, function() {
			alert(postType + " 게시글이 삭제되었습니다.");
			$row.hide();
		});
	}
});
// 스터디 게시글 삭제
$(".delete-boardSS").click(function() {
	var $row = $(this).closest("tr");
	var postId = $row.find(".postId").text();
	console.log(postId)

	if (confirm( postId + "번 스터디 게시글을 삭제하시겠습니까?")) {
		function modify(id, callback){
			$.ajax({
				url: "/admin/board/studyBlockPost",
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(postId, function() {
			alert(postType + " 게시글이 삭제되었습니다.");
			$row.hide();
		});
	}
});

$(".delete-boardCC").click(function() {
	var $row = $(this).closest("tr");
	var postId = $row.find(".postId").text();

	if (confirm(postId + "번 카페 게시글을 삭제하시겠습니까?")) {
		function modify(id, callback){
			$.ajax({
				url: "/admin/board/cafeBlockPost",
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(postId, function() {
			alert(postType + " 게시글이 삭제되었습니다.");
			$row.hide();
		});
	}
});
//게시글 복구
$(".restore-board").click(function() {
	var $row = $(this).closest("tr");
	var postId = $row.find(".postId").text();
	var postType = $row.find(".postType").text();
	var confirmMessage = postType === '카페' ? "카페 게시글을 복구 하시겠습니까?" : "스터디 게시글을 복구 하시겠습니까?";

	if (confirm(confirmMessage)) {
		function modify(id, callback){
			var url = postType === '카페' ? "/admin/board/cafeRestorePost" : "/admin/board/studyRestorePost";

			$.ajax({
				url: url,
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(postId, function() {
			alert(postType + " 게시글이 복구 되었습니다.");
			$row.hide();
		});
	}
});



$(".delete-reply").click(function() {
	var $row = $(this).closest("tr");
	var postId = $row.find(".postId").text();

	if (confirm(postId + "번 댓글을 삭제하시겠습니까?")) {
		function modify(id, callback){
			$.ajax({
				url: "/admin/board/deleteReply",
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(postId, function() {
			alert(postType + " 댓글이 삭제되었습니다.");
			$row.hide();
		});
	}
});
//게시글 복구
$(".restore-reply").click(function() {
	var $row = $(this).closest("tr");
	var postId = $row.find(".postId").text();

	if (confirm(postId + "번 댓글을 복구하시겠습니까?")) {
		function modify(id, callback){
			$.ajax({
				url: "/admin/board/restoreReply",
				type: "PUT",
				data: JSON.stringify(id),
				contentType: "application/json;charset=utf-8",
				success: function(){
					if(callback){
						callback();
					}
				}
			});
		}
		modify(postId, function() {
			alert(postType + " 댓글이 복구되었습니다.");
			$row.hide();
		});
	}
});