var bigMacPrices = [  	
    { countryName: 'South Africa', price: 1.77 }, 	
    { countryName: 'United States', price: 4.93 }, 	
    { countryName: 'Ukraine', price: 1.54 }, 	
    { countryName: 'Australia', price: 3.74 }, 	
    { countryName: 'China', price: 2.72 }, 	
    { countryName: 'Denmark', price: 4.32 }, 	
    { countryName: 'New Zealand', price: 3.91 }, 	
    { countryName: 'Ireland', price: 4.25 }, 	
    { countryName: 'United Kingdom', price: 4.22 }, 	
    { countryName: 'Israel', price: 4.29 }]; //end array

     function averageBigMacPrice(bigMacIndex){ 	
        var totalPrice = 0;  	

        for(var i = 0; i < bigMacIndex.length; i++){ 		
            totalPrice += bigMacIndex[i].price; 	
        } //end for loop
        return totalPrice / bigMacIndex.length; 
    } //end function
        
        var avg = averageBigMacPrice(bigMacPrices); 
        console.log("Average big mac price: " + avg);   
        var min = Math.abs(bigMacPrices[0].price - avg); 
        var indexMin = 0;

        for(var i = 0; i < bigMacPrices.length; i++){ 	
            if(Math.abs(bigMacPrices[i].price - avg) < min){ 		
                min = Math.abs(bigMacPrices[i].price - avg); 		
                indexMin = i; 	
            } // end if
        } //end for

       console.log("Country name closest to the average big mac price: " + bigMacPrices[indexMin].countryName +
       "\nBig mac price closest to the average big mac price: " + bigMacPrices[indexMin].price);