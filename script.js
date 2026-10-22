console.log("Merhaba");
document.addEventListener("DOMContentLoaded", function(){
    const kartlar = document.querySelectorAll(".yazi-karti");

    console.log("Kart sayısı:", kartlar.length);
    kartlar.forEach(function(kart){
    console.log(kart);
  }); 
});
