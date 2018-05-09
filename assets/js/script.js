var $ = $;
$(document).ready(function () {
    //parts
    $('.partQty').change(function(){
    	var currentPart = $(this);
    	var unitPrice = currentPart.attr('data-price');
    	var unitShipping = currentPart.attr('data-shipping');
    	var qty = currentPart.val();
    	var id = currentPart.attr('data-id');
    	var pTotal = qty * unitPrice;
    	var pShipping = qty * unitShipping;
    	$('.part-total-' + id).text(pTotal.toFixed(2));
    	$('.part-total-' + id).attr('data-shipping', pShipping.toFixed(2));
    	var subTotal = 0;
    	var shipping = 0;
    	$( '.part-total' ).each(function() {
			var partTotal = parseFloat($( this ).text());
			var partShipping = parseFloat($( this ).attr('data-shipping'));
			subTotal += partTotal;
			shipping += partShipping;
		});
		var tax = (subTotal * 0.15);
		var tTotal = tax + subTotal;
		var grandTotal = subTotal + tax + shipping;
		if(tTotal >= 15000){
			shipping = '0 (FREE)';
			grandTotal = subTotal + tax;
		}else{
			shipping = shipping.toFixed(2);
		}
		console.log(subTotal);
		$('.parts-tax').text(tax.toFixed(2));
		$('.parts-shipping').text(shipping);
		$('.parts-grand').text(grandTotal.toFixed(2));
    });
    
    $('#partOrderBtn').click(function(e){      
	  $("#parts-form").validate({              
	    rules: {
	      file: {
	        required: true,
	      }
	    }
	  }).form(); 
    });
    
    
     $("#add").click(function() {
     	$('#training-table tbody>tr:last').clone(true).insertAfter('#training-table tbody>tr:last');
        $('#training-table tbody>tr:last :input').val('');
        var rowCount = $('#training-table tbody>tr').length;
        var total = rowCount*1000;
        $('#pamt').text(rowCount+' X 1000 = '+total);
        return false;
     });
     
     $("#minus").click(function() {
     	var rowCount = $('#training-table tbody>tr').length;
     	if(rowCount >= 2){
     		$('#training-table tbody>tr:last').remove();
     		var rowCount = $('#training-table tbody>tr').length;
     		var total = rowCount*1000;
        	$('#pamt').text(rowCount+' X 1000 = '+total);
     	}
        return false;
     });
     
     $("#add-sam").click(function() {
     	$('#sam-table tbody>tr:last').clone(true).insertAfter('#sam-table tbody>tr:last');
        $('#sam-table tbody>tr:last [name="name[]"]').val('');
        $('.myDataTime').datetimepicker('destroy');
        $('.myDataTime').datetimepicker({step:15, format: 'Y-m-d H:i:s'});
        return false;
     });
     
     $("#minus-sam").click(function() {
     	var rowCount = $('#sam-table tbody>tr').length;
     	if(rowCount >= 2){
     		$('#sam-table tbody>tr:last').remove();
     	}
        return false;
     });
     
     $("#add-sag").click(function() {
     	$('#sag-table tbody>tr:last').clone(true).insertAfter('#sag-table tbody>tr:last');
        $('#sag-table tbody>tr:last :input').val('');
        $('#sag-table tbody>tr:last .ddprintAmt').html('');
        $('.myDataTime').datetimepicker('destroy');
        $('.myDataTime').datetimepicker({step:15, format: 'Y-m-d H:i:s'});
        return false;
     });
     
     $("#minus-sag").click(function() {
     	var rowCount = $('#sag-table tbody>tr').length;
     	if(rowCount >= 2){
     		$('#sag-table tbody>tr:last').remove();
     	}
        return false;
     });
     
     $("#add-samm").click(function() {
     	$('#samm-table tbody>tr:last').clone(true).insertAfter('#samm-table tbody>tr:last');
        $('#samm-table tbody>tr:last :input').val('');
        $('#samm-table tbody>tr:last .ddprintAmt').html('');
        $('.myDataTime').datetimepicker('destroy');
        $('.myDataTime').datetimepicker({step:15, format: 'Y-m-d H:i:s'});
        return false;
     });
     
     $("#minus-samm").click(function() {
     	var rowCount = $('#samm-table tbody>tr').length;
     	if(rowCount >= 2){
     		$('#samm-table tbody>tr:last').remove();
     	}
        return false;
     });
     
     $("#nominus-sag").click(function() {
     	$('#guestTab').html('');
        return false;
     });
    
    $(document).on('change', '.stDate', function(){
    	var otherDate = $(this).parent().siblings('.ddNo2').children('input').val();
    	if(otherDate != ''){
    		var tDays = daysBetween($(this).val(), otherDate);
    		$(this).parent().siblings('.ddNo').children('input').val(tDays);
    		calcAmt($(this).parent().siblings('.ddNo').children('input'));
    	}
    });
    
    $(document).on('change', '.enDate', function(){
    	var otherDate = $(this).parent().siblings('.ddNo1').children('input').val();
    	if(otherDate != ''){
    		var tDays = daysBetween(otherDate, $(this).val());
    		$(this).parent().siblings('.ddNo').children('input').val(tDays);
    		calcAmt($(this).parent().siblings('.ddNo').children('input'));
    	}
    });
    
    $(document).on('change', '.accReq', function(){
    	var accReq = $(this).val();
    	$(this).parent().siblings('.ddNo').children('input').attr('data-accreq', accReq);
    	calcAmt($(this).parent().siblings('.ddNo').children('input'));
    });
    
     $(document).on('change', '.accType', function(){
    	var accReq = $(this).find('option:selected').attr('data-p');
    	$(this).parent().siblings('.ddNo').children('input').attr('data-price', accReq);
    	calcAmt($(this).parent().siblings('.ddNo').children('input'));
    });
    
    function calcAmt(element){
    	var day = parseInt(element.val());
    	var price = parseInt(element.attr('data-price'));
    	var accReq = parseInt(element.attr('data-accreq'));
    	if(accReq){
    		var total = day*price;
    		element.parent().siblings('.ddprintAmt').html(total);
    	}else{
    		element.parent().siblings('.ddprintAmt').html('0');
    	}
    }
    
    function daysBetween(date1, date2) {
	    var ONE_DAY = 1000 * 60 * 60 * 24;
	    var date1_ms = new Date(date1);
	    var date2_ms = new Date(date2);
	    date2_ms.setSeconds(0);
	    var date_tom = new Date(date1);
	    date_tom.setDate(date1_ms.getDate()+1);
	    date_tom.setHours(13, 0, 0);
	   
	    if(date1_ms < date2_ms){
	    	 var difference_ms = date2_ms - date_tom;
	    	console.log(difference_ms);
	    	var reminder = difference_ms % ONE_DAY;
	    
		    if(difference_ms > 0){
		    	console.log('1212');
		    	return 1 + Math.ceil(difference_ms/ONE_DAY);
		    }
		    else{
		    	console.log('qwqw');
		    	return 1;
		    }
	    }
	    else{
	    	alert('Date of starting accommodation should be less the Date of leaving accommodation');
	    	return '';
	    }
	}
	
	$(document).on('change', '.isLPU', function(){
    	var isChecked = $(this).prop("checked");
		if( isChecked == 1 ) {
			$('.lpu-hide').fadeOut();
			$('.lpu-hide').children('input').val('LPU');
			$('.lpu-hide').children('select, input').removeAttr('required');
		} else {
			$('.lpu-hide').fadeIn();
			$('.lpu-hide').children('input').val('');
			$('.lpu-hide').children('select, input').attr('required', 'required');
		}
    });
    
    
    checkModal();
    /* to hide/show topbar above navigation bar */
    $(window).scroll(function () {
        if ($(window).scrollTop() > 40) {
            $('.top-strip').slideUp(200);
        } else if ($(window).scrollTop() < 40) {
            $('.top-strip').slideDown(200);
        }
    });
    
    //initilize popover
    $(".poper").popover({
        html:true,
        trigger:'hover'
    });

    
    /* open a Model from another model 
    <a data-open-modal="#openModalSelector" data-close-modal="#closeModalSelector" class="modalCloseOpen" href="#">click</a> */
    $('.modalCloseOpen').click(function () {
        var closeModal = $(this).attr('data-close-modal');
        var openModal = $(this).attr('data-open-modal');
        
        $(closeModal).modal('hide');
        $(closeModal).on('hidden.bs.modal', function (e) {
            $(openModal).modal('show');
        });
    });
    
    //nivo lightbox
	$('.gallery-item a').nivoLightbox({
		effect: 'fadeScale',                             // The effect to use when showing the lightbox
		theme: 'default',                           // The lightbox theme to use
		keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
		clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
		onInit: function(){},                       // Callback when lightbox has loaded
		beforeShowLightbox: function(){},           // Callback before the lightbox is shown
		afterShowLightbox: function(lightbox){},    // Callback after the lightbox is shown
		beforeHideLightbox: function(){},           // Callback before the lightbox is hidden
		afterHideLightbox: function(){},            // Callback after the lightbox is hidden
		onPrev: function(element){},                // Callback when the lightbox gallery goes to previous item
		onNext: function(element){},                // Callback when the lightbox gallery goes to next item
		errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
	});
	
	
	$('.membView').click(function(e){
		e.preventDefault();
		var title = $(this).attr('data-title');
		if(title !== undefined){
			$('#membViewLabel').html(title);
		}else{
			$('#membViewLabel').html('Member Information');
		}
		$('#membViewBody').html('Loading...');
		var url = $(this).attr('href');
		$.ajax({
			url: url,
			success: function(data){
			  	$('#membViewBody').html(data);
			},
			dataType: 'html'
		});
		$('#membViewModal').modal();
	});
});
 
// login ajax
$(document).ready(function($) {
    $('.auth-form, .ajax-form').submit(function(e) {
        e.preventDefault();
        var submitBtn = $(this).find('.submit');
        var alertWrap = $(this).find('.alert-wrapper');
        var redirectUrl = $(this).attr('data-redirect');
        var reset = $(this).attr('data-reset');
        submitBtn.val("Please Wait...");
        alertWrap.html('');
        submitBtn.button('loading');
        var form = $(this);
        $.ajax({
            type : "POST",
            url : form.attr('action'),
            data : form.serialize(),
            success : function(response) {
                //var response = JSON.parse(data);
                if (response.success == 1) {
                    alertWrap.html(alertMaker(response.message, 'success'));
                    form[0].reset();
                    if(redirectUrl !== undefined ){
                    	form[0].reset();
                    }
                    submitBtn.button('reset');
                    if(redirectUrl !== undefined ){
                    	window.location.href = redirectUrl;	
                    }
                } else {
                    submitBtn.button('reset');
                    alertWrap.html(alertMaker(response.message, 'danger'));
                }
            },
            error : function(){
            	submitBtn.button('reset');
                alertWrap.html(alertMaker('Something Went Wrong. Try again', 'danger'));
            }
        });
    });
    
    $('#al-presently').change(function(){
	    var selection = $(this).val();
	    var hString = '';
	    switch(selection){
	        case 'Working':
	            hString = "<div class=\"row\"> <div class=\"col-md-4\"> <div class=\"form-group\"> <label for=\"name\">Company<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c1\" placeholder=\"Company\" value=\"\" required=\"required\"\/> <\/div><\/div><div class=\"col-md-4\"> <div class=\"form-group\"> <label for=\"name\">Location<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c2\" placeholder=\"Location\" value=\"\" required=\"required\"\/> <\/div><\/div><div class=\"col-md-4\"> <div class=\"form-group\"> <label for=\"name\">Designation\/Role<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c3\" placeholder=\"Designation\/Role\" value=\"\" required=\"required\"\/> <\/div><\/div><\/div>";
	            break;
	        case 'Studying':
	            hString = "<div class=\"row\"> <div class=\"col-md-4\"> <div class=\"form-group\"> <label for=\"name\">College<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c1\" placeholder=\"College\" value=\"\" required=\"required\"\/> <\/div><\/div><div class=\"col-md-4\"> <div class=\"form-group\"> <label for=\"name\">Location<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c2\" placeholder=\"Location\" value=\"\" required=\"required\"\/> <\/div><\/div><div class=\"col-md-4\"> <div class=\"form-group\"> <label for=\"name\">Course<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c3\" placeholder=\"Course\" value=\"\" required=\"required\"\/> <\/div><\/div><\/div>";
	            break;
	        case 'Preparing for exam':
	            hString = "<div class=\"row\"> <div class=\"col-md-6\"> <div class=\"form-group\"> <label for=\"name\">Which Exam<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c1\" placeholder=\"Which Exam\" value=\"\" required=\"required\"\/> <\/div><\/div><div class=\"col-md-6\"> <div class=\"form-group\"> <label for=\"name\">Present Location<\/label> <input type=\"text\" class=\"form-control\" name=\"presently_c2\" placeholder=\"Present Location\" value=\"\" required=\"required\"\/> <input type=\"hidden\" name=\"presently_c3\" value=\"\"\/> <\/div><\/div><\/div>";
	            break;
	    }
	    $('#alPresent-holder').html(hString);
	});
});

function alertMaker(message, type){
	var alert="";
	alert += "<div class=\"alert alert-"+ type +"\">";
	alert += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;<\/button>";
	alert += message;
	alert += "<\/div>";
 	return alert;
}

/* open popup if URL have id of modal in it. */
function checkModal() {
    if (location.href.indexOf("#") !== -1) {
        var hashTag = location.href.substr(location.href.indexOf("#"));
        var chk = $(hashTag).hasClass("modal");
        if (chk) {
            $(hashTag).modal('show');
        }
    }
}


$(document).ready(function () {
    $('.opPop').click(function(e) {
        e.preventDefault();
        swal({   title: 'Sorry!',   text: 'View, Edit and Delete option will be available 1st Oct, 2015 onwards',   type: 'info',   confirmButtonText: 'Ok' });
    });
    
});

$(document).ready(function () {
    $(".owlPartner").owlCarousel({
				"items" : 4,
				"autoPlay": 2000,
		        "itemsDesktop" : [1199,4],
		        "itemsDesktopSmall" : [991,3],
		         "itemsMobile" : [767,1],
		         "pagination": false,
		         "navigation": false
});
});


$(document).ready(function($) {
    $('#register-form').submit(function(e) {
        e.preventDefault();
		var form = $(this);
		if(1){
			//sendOTP(form);
          //  DoRegistration();
		}
		
    });
	
	$('#regotp-form').submit(function(e) {
        e.preventDefault();
		var form = $(this);
		if(1){
			verifyBySendOtp(form, $('#register-form'));
		}
		
    });
	
});

function sendOTP(form) {
  var data = {
	"countryCode": $('#phoneCode').val().replace('+', ''),
	"mobileNumber": $('#phoneTeam').val()
  };
  $.ajax({
	url: '/sendotp.php?action=generateOTP',
	type: 'POST',
	data: data,
	success: function (response) {
		if (response == 'OTP SENT SUCCESSFULLY') {
			$('#regFormWrapper').hide();
			$('#otpFromWrapper').show();
		}
	},
	error: function (jqXHR, textStatus, ex) {
		var alertWrap = form.find('.alert-wrapper');
		alertWrap.html(alertMaker("Error in sending OTP, Please check Team phone number", 'danger'));
	}
  });
}
function verifyBySendOtp(otpform, regform) {
	
	var submitBtn = otpform.find('.submit');
	var alertWrap = otpform.find('.alert-wrapper');
	submitBtn.val("Please Wait...");
	alertWrap.html('');
	submitBtn.button('loading');
  var data = {
	countryCode: $('#phoneCode').val().replace('+', ''),
	mobileNumber: $('#phoneTeam').val(),
	oneTimePassword: $('#smsOTP').val()
  };
  $.ajax({
	url: '/sendotp.php?action=verifyBySendOtp',
	type: 'POST',
	data: data,
	success: function (response) {
	  if (response == 'NUMBER VERIFIED SUCCESSFULLY') {
		alertWrap.html(alertMaker("OTP Verified, Submitting Form, Please Wait...", 'info'));
		// submit regform
		var form = regform;
		var redirectUrl = form.attr('data-redirect');
        $.ajax({
            type : "POST",
            url : form.attr('action'),
            data : form.serialize(),
            success : function(response) {
                //var response = JSON.parse(data);
                if (response.success == 1) {
					//console.log('in mate');
                    //alertWrap.html(alertMaker(response.message, 'success'));
                    form[0].reset();
                    if(redirectUrl !== undefined ){
                    	form[0].reset();
                    }
                    submitBtn.button('reset');
                    if(redirectUrl !== undefined ){
                    	window.location.href = redirectUrl;	
                    }
                } else {
                    submitBtn.button('reset');
					var alertWrap = form.find('.alert-wrapper');
                    alertWrap.html(alertMaker(response.message, 'danger'));
					$('#regFormWrapper').show();
					$('#otpFromWrapper').hide();
                }
            },
            error : function(){
            	submitBtn.button('reset');
                alertWrap.html(alertMaker('Something Went Wrong. Try again', 'danger'));
            }
        });
	  }
	  else{
		   submitBtn.button('reset');
		   alertWrap.html(alertMaker("Incorrect OTP", 'danger'));
	  }
	},
	error: function (jqXHR, textStatus, ex) {
		alert('network error, please refresh page and try again');
	}
  });
}