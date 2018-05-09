       window.onload = function () {
           GetNewsContent(); GetAllNewsHeading();
       }
function GetNewsContent() {
    debugger;
    //-----for local

    function getQueryStrings() {
        var assoc = {};
        var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
        var queryString = location.search.substring(1);
        var keyValues = queryString.split('&');

        for (var i in keyValues) {
            var key = keyValues[i].split('=');
            if (key.length > 1) {
                assoc[decode(key[0])] = decode(key[1]);
            }
        }

        return assoc;
    }
    var qs = getQueryStrings();
    var nid = qs["nid"];
    var schoolid = qs["SchoolId"];
    var sessionid = qs["SessionId"]

    var servicepath = "https://econnectk12wcf.jupsoft.com/eConnectK12services.asmx/";
    //  var servicepath = "http://localhost:63747/eConnectK12services.asmx/";
    //  var ImageContainer = document.getElementById("news-content");
    var path = servicepath + "GetNews?callback=?";
    $.ajax({
        type: "POST",
        url: path,
        data: { SchoolId: JSON.stringify(schoolid), newsid: JSON.stringify(nid), SessionId: JSON.stringify(sessionid) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
            var str2 = JSON.stringify(response);
            var json = JSON.parse(str2);
            // var imgstr = '';
            //  alert(str2);
            document.getElementById("ContentPlaceHolder1_lblHeadline").innerHTML = json[0]["newstitle"].toString();
            document.getElementById("ContentPlaceHolder1_lblContent").innerHTML = json[0]["newscontent"].toString();
    

        },
        error: function (data) {

        }
    });

    return false;
}
function GetAllNewsHeading() {
    var schoolid = "62";
    var sessionid = "1";
    var servicepath = "https://eConnectK12wcf.jupsoft.com/eConnectK12services.asmx/";
    //  var servicepath = "http://localhost:63747/eConnectK12services.asmx/";
    var NewsTitle = document.getElementById("NewsContent");
    var path = servicepath + "GetTop10News?callback=?";
    $.ajax({
        type: "POST",
        url: path,
        data: { SchoolID: JSON.stringify(schoolid), Session: JSON.stringify(sessionid) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,

        success: function (response) {

            var str2 = JSON.stringify(response);
            var json = JSON.parse(str2);
            var newstr = '';

            for (var i = 0; i < json.length; i++) {

                var datevalue = json[i]['newsdate'];
                var date1 = datevalue.split(" ");
                var date = date1[0];
                var month = date1[1];
                var year = date1[2];

                // newstr += '<li><div class="outer-div-cir"><div class="circular-img"><h2>' + date + '<span>' + month + '</span></h2></div><div class="circular-content"><h3>' + json[i]['newstitle'] + '</h3><p>TEXT</p><p class="redmore"><a href="News_Update.aspx?nid=' + json[i]["nid"].toString() + ' &SchoolId=' + schoolid + ' &SessionId=' + sessionid + '">Read more...</a></p></div></div></li>';
              //  newstr += ' <div class="col-sm-6"><div class="viewall-news"><h3><a href="News_Update.aspx?nid=' + json[i]["nid"].toString() + ' &SchoolId=' + schoolid + ' &SessionId=' + sessionid + '">' + json[i]['newstitle'] + '</a></h3><p>' + datevalue + '</p></div></div>';
                newstr += '<tr><th scope="row" style="width: 20%;"><a href="allnews.aspx?nid=' + json[i]["nid"].toString() + ' &SchoolId=' + schoolid + ' &SessionId=' + sessionid + '">' + month + ' ' + date + ', ' + year + '</a></th><td><a style="text-align:left" href="allnews.aspx?nid=' + json[i]["nid"].toString() + ' &SchoolId=' + schoolid + ' &SessionId=' + sessionid + '">' + json[i]['newstitle'] + '</a></td></tr>';
            }
            NewsTitle.innerHTML = newstr;
            //var nt_example2 = $('#nt-example2').newsTicker({
            //    row_height: 130,
            //    max_rows: 3,
            //    duration: 4000,
            //    prevButton: $('#nt-example1-prev'),
            //    nextButton: $('#nt-example1-next')
            //});
        },
        error: function (data) {

        }
    });

    return false;
}
