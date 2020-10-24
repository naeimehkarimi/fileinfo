function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }
  
  function isPdf(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'pdf':
        //etc
        return true;
    }
    return false;
  }
$(document).ready(   
    function (e) {
    $("#form").on("submit", function (e) {
      e.preventDefault();
      nameRegex=/([\u0600-\u06FF]|[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc])+/i;
      ageRegex=/(\d)+/i;
      emailRegex=/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/i;
      //(0|\+98|0098)?9[0123][0-9]{8}
      mobileRegex=/(0)?9[0-9]{9}/i;
      var fisrtnameState=nameRegex.test($("#name").val());
      var lastnameState=nameRegex.test($("#family").val());
      var ageState=ageRegex.test($("#age").val());
      if(ageState==true){
          var age=Number($("#age").val());
          if(age>=10&&age<=100) ageState=true;
          else ageState=false;
      }
      var emailState=emailRegex.test($("#email").val());
      var mobileState=mobileRegex.test($("#mobile").val());
      var file = $("#file");
      var isPDF=isPdf(file.val());
      
      var formData=new FormData(this);
      console.log(formData);
      var object = {};
       formData.forEach(function(value, key){
         object[key] = value;
        });
        console.log(object);
        var json = JSON.stringify(object);
        console.log(json);

      if(fisrtnameState&&lastnameState&&ageState&&emailState&&mobileState&&isPDF){
        console.log("تمام موارد درست است!");
        $.ajax({
            url: "http://37.152.181.44:8070/save",
            type: "POST",
            data: json ,
            dataType : 'json',
            contentType: 'json',
            crossDomain: true,
            cache: false,
            processData: false,
            success: function (data) {
            if (data == "invalid") {
                // invalid file format.
                $("#err").html("Invalid File !").fadeIn();
            } else {
                // view uploaded file.
                $("#preview").html(data).fadeIn();
                $("#form")[0].reset();
                myParseData=JSON.parse(data);
                $("#nameRow").html(myParseData.name);
                $("#familyRow").html(myParseData.family);
                $("#ageRow").html(myParseData.age);
                $("#emailRow").html(myParseData.email);
                $("#mobileRow").html(myParseData.mobile);
                // $("#cvRow").html('<a href="'+myParseData.file+'"> download CV</a>');
            }
            },
            error: function (e) {
                  console.log(e);
            $("#err").html(e).fadeIn();
            },
        });
      }else{
          
          if(!fisrtnameState) { 
              alert("در وارد کردن نام اشتباهی شده است");
              console.log("در وارد کردن نام اشتباهی شده است");}
          if(!lastnameState)  { 
              alert("در وارد کردن نام خانوادگی شتباهی شده است");
              console.log("در وارد کردن نام خانوادگی شتباهی شده است");
          }
          if(!ageState) { 
              alert("در وارد کردن سن شتباهی شده است");
              console.log("در وارد کردن سن شتباهی شده است");
          }
          if(!emailState){ 
              alert("در وارد کردن ایمیل شتباهی شده است");
              console.log("در وارد کردن ایمیل شتباهی شده است");
          }
          if(!mobileState) { 
              alert("در وارد کردن شماره موبایل شتباهی شده است");
              console.log("در وارد کردن شماره موبایل شتباهی شده است");
          }
          if(!isPDF) { 
              alert("در وارد کردن فایل شتباهی شده است");
              console.log("در وارد کردن فایل شتباهی شده است");
          }
      }

    });
  }
  );