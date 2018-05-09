function ValidateEmail(emailid) {
    if (emailid.value != '') {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailid.value)) {
            return (true);
        }
        alert("You have entered an invalid email address!")
        emailid.value = '';
        emailid.focus();
        return (false);
    }

}
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}
function SaveContactInfo(fullname, emailid, subject, question,address,phone) {
    if (fullname.value.trim() == '') {
        alert("Enter the Full Name");
        fullname.focus();
        return false;
    }
    if (emailid.value.trim() == '') {
        alert("Enter the Email Address");
        emailid.focus();
        return false;
    }
    if (address.value.trim() == '') {
        alert("Enter the Address");
        address.focus();
        return false;
    }
    if (phone.value.trim() == '') {
        alert("Enter the Phone No.");
        phone.focus();
        return false;
    } 
    if (subject.value.trim() == '') {
        alert("Enter the Subject");
        subject.focus();
        return false;
    }
    if (question.value.trim() == '') {
        alert("Enter the Message");
        question.focus();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "myservice.asmx/SaveContactDetails",
        data: "{fullname:'" + fullname.value + "',emailid:'" + emailid.value + "',subject:'" + subject.value + "',question:'" + question.value + "',address:'" + address.value + "',phone:'" + phone.value + "'}",
        dataType: "json",
        success: function OnSuccess(data) {

            alert(data.d);
            fullname.value = '';
            emailid.value = '';
            subject.value = '';
            question.value = '';
            phone.value = '';
            address.value = '';
            return true;

        },
        failure: function (data) {
            return false;
        },
        error: function (data) {
            return false;
        }
    });
}
function saveRegistrationInfo(team_name, team_email, team_phone, team_phonecode, team_password, confirm_password, team_leader, team_address, team_university) {
    if (team_name.value.trim() == '') {
        alert('Enter the Team Name');
        team_name.focus();
        return false;
    }
    if (team_leader.value.trim() == '') {
        alert('Enter the Team Leader Name');
        team_leader.focus();
        return false;
    }
    if (team_address.value.trim() == '') {
        alert('Enter the Address');
        team_address.focus();
        return false;
    }
    if (team_university.value.trim() == '') {
        alert('Enter the University / Organization Name');
        team_university.focus();
        return false;
    }
    if (team_email.value.trim() == '') {
        alert('Enter the Team Email Id');
        team_email.focus();
        return false;
    }
    if (team_phone.value.trim() == '') {
        alert('Enter the Team Phone No.');
        team_phone.focus();
        return false;
    }
    if (team_password.value.trim() == '') {
        alert('Enter the Password.');
        team_password.focus();
        return false;
    }
    if (confirm_password.value.trim() == '') {
        alert('Enter the Confirm Password.');
        confirm_password.focus();
        return false;
    }
    if (team_password.value.trim() == '') {
        alert('Enter the Password.');
        team_password.focus();
        return false;
    }
    if (confirm_password.value.trim() != team_password.value.trim()) {
        alert('Confirm Password did not match.');
        confirm_password.value = '';
        confirm_password.focus();
        return false;
    }
    var code = team_phonecode.options[team_phonecode.selectedIndex].value;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "myservice.asmx/SaveRegistrationDetails",
        data: "{team_name:'" + team_name.value + "',team_email:'" + team_email.value + "',team_phone:'" + team_phone.value + "',team_phonecode:'" + code + "',team_password:'" + team_password.value + "',team_leader:'" + team_leader.value + "',team_address:'" + team_address.value + "',team_university:'" + team_university.value + "'}",
        dataType: "json",
        success: function OnSuccess(data) {

            alert(data.d);
            if (data.d.toString() != "Email Id already exist") {
                team_password.value = '';
                team_name.value = '';
                team_email.value = '';
                team_phone.value = '';
                team_phonecode.value = "+91";
                confirm_password.value = '';
                team_address.value = '';
                team_leader.value = '';
                team_university.value = '';
               
                return true;
            }
            else {
                team_email.focus();
                return false;
            }

        },
        failure: function (data) {
            return false;
        },
        error: function (data) {
            return false;
        }
    });
}
function gotoLogin(login_id, login_password) {
    if (login_id.value.trim() == '') {
        alert('Enter the Team Email Id.');
        login_id.focus();
        return false;
    }
    if (login_password.value.trim() == '') {
        alert('Enter the Password.');
        login_password.focus();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "myservice.asmx/CheckLoginInfo",
        data: "{login_id:'" + login_id.value + "',login_password:'" + login_password.value + "'}",
        dataType: "json",
        success: function OnSuccess(data) {
            if (data.d.toString() == '') {
                login_password.value = '';
                login_id.value = '';
                location.reload();
                return true;
            }
            else {
                alert(data.d);
                login_password.value = '';
            }

        },
        failure: function (data) {
            return false;
        },
        error: function (data) {
            return false;
        }
    });
}
function GetPasswordInfo(forgot_email) {

    if (forgot_email.value.trim() == '') {
        alert('Enter the Team Email Id');
        forgot_email.focus();
        return false;
    }
    
     $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "myservice.asmx/GetPasswordDetails",
        data: "{team_email:'" + forgot_email.value + "'}",
        dataType: "json",
        success: function OnSuccess(data) {

            alert(data.d);
            if (data.d.toString() != "Invalid Email Id") {
                forgot_email.value = '';
                
                return true;
            }
            else {
                forgot_email.focus();
                return false;
            }

        },
        failure: function (data) {
            return false;
        },
        error: function (data) {
            return false;
        }
    });
}