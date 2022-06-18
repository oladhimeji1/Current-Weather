window.addEventListener('load', ()=>{
   
    var long, lat;
    var tempDegree = document.getElementById('degree');
    var locationTimeZone = document.getElementById('location-timezone');
    var tempDesc = document.getElementById('temperature-description');
    var tempSec = document.getElementById('degree-section');
    const tempSpan = document.getElementById('xx');
    
    if(navigator.geolocation){
        // alert('ols');
        navigator.geolocation.getCurrentPosition(position =>{
            // alert("Yes");
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // const proxy = 'https://cors-anywhere.herokuapp.com/'
            // const api = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=56e0e24ec2e1880720e54c034209cc6d`;
            const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=56e0e24ec2e1880720e54c034209cc6d`;
            // const api = `http://api.weatherapi.com/v1/current.json/cc111330d48842ed84b222725221506=${lat},${long}`
            console.log('okhh');
            fetch(api)
            .then(response =>{
                return response.json()
                // console.log(response);
                
            })
            .then(data =>{
                console.log(data);
                const { temp, humidity, icon } = data.current;
                const { description, main } = data.current.weather;

                // Set Dom Elements from the API
                tempDegree.innerHTML = temp;
                document.getElementById('small').innerHTML = data['current']['weather'][0]['main'];
                tempDesc.innerHTML = data['current']['weather'][0]['description'];
                locationTimeZone.innerHTML = data.timezone;

                var iconX = data['current']['weather'][0]['icon'];
                var iconurl = "http://openweathermap.org/img/w/" + iconX + ".png";
                document.getElementById('wicon').src = iconurl;

                // Formular
                var cel = (temp - 32) * (5 / 9);

                // Change Temp to Celsius/Farenheight
                tempSec.addEventListener('click', ()=>{
                    if(tempSpan.innerHTML == 'F'){
                        tempDegree.innerHTML = Math.floor(cel);
                        tempSpan.innerHTML = '<sup>'+ 'o' + '</sup>' + 'C';
                    } else{
                        tempSpan.innerHTML = 'F'
                        tempDegree.innerHTML = temp;
                    }
                })

           });
     });

    // }
    // function setIcons(icon, iconID){
        // const skycons = new Skycons({"color": "white"});
        // const currentIcon = icon.replace(/-/g, '_').upperCase();
        // var iconX = data['current']['weather'][0]['icon'];
        // var iconurl = "http://openweathermap.org/img/w/" + iconX + ".png";
        // document.getElementById('wicon').attr('src', iconurl);
        // skycons.play();
        // return skycons.set(iconID, Skycons[currentIcon]);
     
    }

});