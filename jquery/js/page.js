	var ministers=[];
      function requestCrossDomain( site, callback ) {
          
        if ( !site ) {
              alert('No site was passed.');
              return false;
          }
           
         var yql = "select * from htmlstring where url='" + site + "' and xpath='//body/section'";
      
      var resturl = "https://query.yahooapis.com/v1/public/yql?q="
         + encodeURIComponent(yql) + "&format=json"
         + "&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
          $.get( resturl, cbFunc );
           
          function cbFunc(data) {
          if ( data.query.results ) {
              if ( typeof callback === 'function') {
                  callback(data.query.results.result);
              }
          }
          else throw new Error('Nothing returned from getJSON.');
          }
      }
      
      requestCrossDomain('https://news.ontario.ca/cabinet/en', function(results) { 
        $("#container").html(results);  
        $( ".bioCard" ).each(function( index,obj ) {
         let minister={"name":"","src":"","description":[]};
         minister.name=$(obj).find("article header h3 a").text();
         minister.src=$(obj).find("a img").attr("src"); 
         let roles=  $(obj).find("article p a");
         for(let count=0;count<roles.length;count++){
             minister.description.push($(roles[count]).text());   
         }    
         ministers.push(minister);    
      }); 
      for(let count=0;count<ministers.length;count++){
      if(count==0){
      	$("#menu").append(`<li><a href="#" class="active" onclick="getDetails(this,${count})">${ministers[count].name}</a></li>`);
      }else{
      	$("#menu").append(`<li><a href="#" onclick="getDetails(this,${count})">${ministers[count].name}</a></li>`);
      }
      }
      getDetails(null,0); 
      });
      
      
      function getDetails(obj,count){
         $('#personImage').attr('src', ministers[count].src);
         $("#detailedContent").html("");
         $("#detailedContent").append(`<p style="font-weight: bold; color: #4C141B;">${ministers[count].name}</p>`);
         for(let count2=0;count2<ministers[count].description.length;count2++){
             $("#detailedContent").append(`<p style="font-weight: italics; color: grey;">${ministers[count].description[count2]}</p>`);
         }    
      }