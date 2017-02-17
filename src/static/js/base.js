$(document).ready(function(){
	$(".content-markdown").each(function(){
		var content = $(this).text()
		var markedcontent = marked(content)
		$(this).html(markedcontent)
	})
	
})

$(document).ready(function(){
	$(".post-detail-item img").each(function(){
		$(this).addClass("img-responsive")
	})
	
})


var contentInput = $("#id_content")
$("#preview-content").html(marked(contentInput.val()))

function setContent(value){
	var markedContent = marked(value)
	$("#preview-content").html(markedContent)
	$("#preview-content img").each(function(){
		$(this).addClass("img-responsive")
	})
}
setContent(contentInput.val())

contentInput.keyup(function(){
	setContent(contentInput.val())
})

var titleInput = $("#id_title")
$("#preview-title").text(titleInput.val())

titleInput.keyup(function(){
	$("#preview-title").text(titleInput.val())
})

$(".comment-reply-btn").click(function(event){
	event.preventDefault()
	$(this).parent().next(".comment-reply").fadeToggle()
})

