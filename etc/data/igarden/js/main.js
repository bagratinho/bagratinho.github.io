function initTabs() {
	var tabPanels = $(".tab-panel");
	for (var i = 0; i<tabPanels.length; i++) {
		var node = tabPanels.eq(i).find("li.active");
		var index = tabPanels.eq(i).find("li").index(node);
		tabPanels.eq(i).next(".tabs").find("li").eq(index).addClass("active")
	}
	$(".tab-panel").on("click","> li",function(){
		var node = $(this);
		var parent = $(this).closest("ul");
		var index = parent.find("li").index(node);
		console.log(index)
		parent.find("> li").removeClass("active")
		parent.find("> li").eq(index).addClass("active")
		parent.next(".tabs").find("> li").removeClass("active")
		parent.next(".tabs").find("> li").eq(index).addClass("active")
	})
}

$(document).ready(function(){
	initTabs();
})