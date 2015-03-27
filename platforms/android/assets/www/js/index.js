var loadCount=0;
var vard0020_app = {
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
       document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        loadCount++;
        if(loadCount === 2)
        {
        vard0020_app.receivedEvent('deviceready');
        }
    },
    
    receivedEvent: function() {
        vard0020_app.showMap();
        vard0020_app.setPhoneContacts();
        vard0020_app.hammerListener();
    },
    
    hammerListener: function(){
      var app = {
      ul: document.querySelector("[data-role=listview]"),
      mc: null,
      modal:null,
      overlay:null,
      addListeners: function(){
        app.mc = new Hammer(app.ul, {});
        var singleTap = new Hammer.Tap({ event: 'tap' });
        var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
        app.mc.add([doubleTap, singleTap]);
        doubleTap.requireFailure(singleTap);

            app.mc.on("tap", function(ev){
          //single tap
          app.modal = document.getElementById("modal1");
          app.overlay = document.getElementById("overlay");
          app.modal.style.display = "block";
          app.overlay.style.display = "block";
          setTimeout(function(){
            app.modal.style.display = "none";
            app.overlay.style.display = "none";
          }, 2000);
        });
        app.mc.on("doubletap", function(ev){
          //double tap
          app.modal = document.getElementById("modal2");
          app.overlay = document.getElementById("overlay");
          app.modal.style.display = "block";
          app.overlay.style.display = "block";
          setTimeout(function(){
            app.modal.style.display = "none";
            app.overlay.style.display = "none";
          }, 2000);
        }); 
      }}
          app.addListeners();
   },
    
    
    setPhoneContacts: function(){
        var options = new ContactFindOptions();
        options.filter = "";  //leaving this empty will find return all contacts
        options.multiple = true;  //return multiple results
        var filter = ["displayName"];   //an array of fields to compare against the options.filter 
        navigator.contacts.find(filter, vard0020_app.successFunc, vard0020_app.errFunc, options);
    },
        
    successFunc: function(contacts){
        var array1 = [];
        var obj;
        for(var i = 0; i <12; i++)
        {
         var array2=[];
         for(var j=0;j<contacts[i].phoneNumbers.length;j++)
         { 
          array2.push(contacts[i].phoneNumbers[j].value);
            obj={
            "id":i,
            "name":contacts[i].displayName,
            "number":array2,
            "lat":null,
            "lng":null
                }
            }
            array1.push(obj);
        }
        //stringify the object and putting it in localstorage
        var myJson = JSON.stringify(array1);
        localStorage.setItem("myJson", myJson);
        
        //parsing it back
        var parsedContacts = JSON.parse(myJson);
        console.log(parsedContacts);
        
        //displaying the contacts in the listview
        var ul = document.getElementById("contact");
        for(var i = 0; i < 12; i++)
        {
            var li = document.createElement("li"); 
            li.innerHTML = parsedContacts[i].name;
            ul.appendChild(li);
        }
    },
    
    errFunc: function(){
        document.getElementById("contact").innerHTML = "Sorry no contacts found..";
    },
    //Finding and displaying geolocation
    showMap: function(){
      if( navigator.geolocation ){
      //finding the positions
        var params = {enableHighAccuracy: false, timeout:36000, maximumAge:60000};
        navigator.geolocation.getCurrentPosition( this.reportPosition, this.gpsError, params ); 
       }
          else{
                alert("Geolocation not supported..");
              }
         },
        
    reportPosition: function( position ){ 
        //creating canvas element
        var canvas = document.createElement("canvas");
        canvas.id = "myCanvas";
        canvas.width = 320;
        canvas.height = 320;
        document.body.appendChild(canvas);
        var context = canvas.getContext('2d');

          //creating and drawing image to Canvas element
          var imageObj = document.getElementById("map");
          imageObj.onload = function() {
          context.drawImage(imageObj, 0, 0);       
          };        
         //referencing to google static maps and setting the lattitude and longitude 
          imageObj.src = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + ',' +      
                 position.coords.longitude + "&zoom=12&size=200x200&markers=color:red|label:T|" + position.coords.latitude + ','              + position.coords.longitude; 
      },
};

vard0020_app.initialize();