// Sondos
//user.js

window.onload = function() {
    openGeneralOnly();
    var generalLink = document.getElementById('generalLink');
    generalLink.classList.add('active');
    generalLink.style.fontWeight = 'bold';
    generalLink.style.color = '#CAF746'; 
    toggleFontWeight('generalLink');
    calculateBMI();
  };
  
  //left panel 
  function toggleOption(optionName) {
    var generalContent = document.getElementById("generalContent");
    var infoContent = document.getElementById("infoContent");
    var bmiContent = document.getElementById("bmiContent");
    var healthInfoContent = document.getElementById("healthInfoContent");
    var socialLinksContent = document.getElementById("socialLinksContent");
    var moreContent = document.getElementById("moreContent"); // Add this line
  
    var generalLink = document.getElementById("generalLink");
    var infoLink = document.getElementById("infoLink");
    var bmiLink = document.getElementById("bmiLink");
    var healthInfoLink = document.getElementById("healthInfoLink");
    var socialLinks = document.getElementById("socialLinksLink");
    var moreLink = document.getElementById("moreLink"); // Add this line
  
    generalContent.style.display = "none";
    infoContent.style.display = "none";
    bmiContent.style.display = "none";
    healthInfoContent.style.display = "none";
    socialLinksContent.style.display = "none";
    moreContent.style.display = "none"; // Add this line
  
    generalLink.classList.remove("active");
    infoLink.classList.remove("active");
    bmiLink.classList.remove("active");
    healthInfoLink.classList.remove("active");
    socialLinks.classList.remove("active");
    moreLink.classList.remove("active"); // Add this line
  
    if (optionName === "general") {
      generalContent.style.display = "block";
      generalLink.classList.add("active");
    } else if (optionName === "info") {
      infoContent.style.display = "block";
      infoLink.classList.add("active");
    } else if (optionName === "bmi") {
      bmiContent.style.display = "block";
      bmiLink.classList.add("active");
    } else if (optionName === "healthInfo") {
      healthInfoContent.style.display = "block";
      healthInfoLink.classList.add("active");
    } else if (optionName === "socialLinks") {
      socialLinksContent.style.display = "block";
      socialLinks.classList.add("active");
    }  else if (optionName === "more") {
      moreContent.style.display = "block";
      moreLink.classList.add("active");
    }
  }
  
  function openGeneralOnly()
  {
    var generalContent = document.getElementById("generalContent");
    generalContent.style.display = "block";
    infoContent.style.display = "none";
    bmiContent.style.display = "none";
    healthInfoContent.style.display = "none";
    socialLinksContent.style.display="none";
  }
  
  function toggleFontWeight(linkId) {
    var links = document.querySelectorAll('.top-panel a'); 
    links.forEach(function(link) {
        if (link.id === linkId) { 
            link.classList.add('active');
            link.style.fontWeight = 'bold';
            link.style.color = '#CAF746'; 
        } else { 
            link.classList.remove('active');
            link.style.fontWeight = 'normal';
            link.style.color = 'white'; 
        }
    });
  }
  
  
  //BMI
  function calculateBMI() {
    var heightInput = document.getElementById("heightCm").value;
    var weightInput = document.getElementById("weightKg").value;
    
    var heightMeters = parseFloat(heightInput) / 100; 
    
    var weightKg = parseFloat(weightInput);
    
    var bmi = weightKg / (heightMeters * heightMeters);
    
    var bmiOutput = document.getElementById("bmi");
    bmiOutput.textContent = bmi.toFixed(2); 
    
    var descOutput = document.getElementById("desc");
    var color;
    if (bmi < 18.5) {
        descOutput.textContent = "Underweight";
        color = getComputedStyle(document.documentElement).getPropertyValue("--underweight");
    } else if (bmi >= 18.5 && bmi < 25) {
        descOutput.textContent = "Normal";
        color = getComputedStyle(document.documentElement).getPropertyValue("--normal");
    } else if (bmi >= 25 && bmi < 30) {
        descOutput.textContent = "Overweight";
        color = getComputedStyle(document.documentElement).getPropertyValue("--overweight");
    } else {
        descOutput.textContent = "Obese";
        color = getComputedStyle(document.documentElement).getPropertyValue("--obese");
    }
    descOutput.style.color = color; 
    
    var scaleDivs = document.querySelectorAll(".bmi-scale div");
    scaleDivs.forEach(function(div) {
        var range = div.querySelector("p").textContent.split('-');
        var minRange = parseFloat(range[0]);
        var maxRange = parseFloat(range[1]);
        
        if (bmi >= minRange && bmi < maxRange) {
            var color = div.style.getPropertyValue("--color");
        }
    });
  }
  function openLink(linkId) {
    var link = document.getElementById(linkId).value;
    if (link.trim() !== '') {
        window.open(link, '_blank');
    } else {
        alert("Please enter a valid link before opening.");
    }
  }
  

  