function openModal(modal) {
  $(".n-modal-overlay").addClass("open");
  $(".n-modal").removeClass("open");
  $(".n-modal[data-modal='"+modal+"']").addClass("open");
}

function closeModal(modal) {
  $(".n-modal-overlay").removeClass("open");
  modal.removeClass("open");
}

$(document).ready(function(){

  $(".modal-link").click(function(){
    var modal = $(this).data("modal");
    openModal(modal)
  })

  $(".n-modal-close").click(function(){
    var modal = $(this).closest(".n-modal");
    closeModal(modal) 
  })

  $("body").on("click", ".n-modal-alter-close", function(){
    var modal = $(this).closest(".n-modal");
    closeModal(modal) 
  })


  /************/

  $(document).on( "mousemove", function( event ) {
    var y = event.pageY - $(".pitem").offset().top;
    var x = event.pageX - $(".pitem").offset().left;
    var cw = $( ".pitem").width();
    var ch = $( ".pitem").height();
    
    if(x>=0 && x<cw/2){
      var k1 = -2*(x-cw/2)/cw;
    }
    else if(x<0){
      var k1=1;
    }
    else if(x>=cw){
      var k1=-1;
    }
    else if(x>=cw/2 && x<cw){
      
      var k1 = -2*(x-cw/2)/cw;
    } 
    if(y>=0 && y<ch/2){
      var k2 = -2*(y-ch/2)/ch;
    }
    else if(y>=ch/2 && y<ch){         
      var k2 = -2*(y-ch/2)/ch;
    }
    else if(y<0){
      var k2=1;
    }
    else if(y>=ch){
      var k2=-1;
    }
   
    var str1 = "perspective( 90px ) rotateY("+(-1.5)*k1+"deg) rotateX("+k2+"deg) translateX("+10*k1+"px) translateY("+5*k2+"px)";

    $(".pitem").find(">div .cl1").css("transform",str1);  
  });     
})