//-----BMI--COMMENT--TEXT-----------------------------------------------------------
var underweight_comment = `Individuals in this range might be at risk for health problems due to insufficient body 
weight. They may have weakened immunity, potential nutrient deficiencies, and a higher risk of osteoporosis.`;
var normalweight_comment = `People within this range typically have a lower risk of health issues related to weight. 
However, it's important to maintain a healthy lifestyle through balanced nutrition and regular exercise.`;
var overweight_comment = `Being overweight can increase the risk of various health problems like heart disease, high 
blood pressure, type 2 diabetes, and certain cancers. It's recommended to make dietary changes and incorporate physical 
activity to manage weight.`;
var obesity_class1_comment = ` Individuals in this category have an increased risk of developing health problems like 
cardiovascular diseases, high cholesterol, sleep apnea, and osteoarthritis. Lifestyle changes, including diet and 
exercise, are typically recommended.`;
var obesity_class2_comment = `Health risks become more severe in this category, including a higher likelihood of 
developing serious medical conditions like stroke, heart disease, and diabetes. Medical intervention, including 
professional guidance on diet and exercise, might be necessary.`;
var obesity_class3_comment = `Also known as morbid obesity, individuals in this category face significantly higher 
health risks, including a higher likelihood of early mortality due to obesity-related complications. Bariatric surgery 
or more aggressive medical interventions might be considered in addition to lifestyle changes.`;

//------NOTE--COMMENT---------------------------------------------------------------
var old_adult_note = `NOTE: BMI is a surrogate measure of body fatness because it is a measure of excess weight rather than 
excess body fat. On average, older adults tend to have more body fat than younger adults for an equivalent BMI.`;
var children_note = `NOTE: BMI is commonly used as a tool to assess weight status in adults. So, when it comes to children 
and adolescents under the age of 18, the accuracy and interpretation of BMI can be different 
due to ongoing growth and development.`;

//-------GENDER--ONCLICK--EVENT-----------------------------------------------------
const male_icon = document.querySelector(".male_icon");
const female_icon = document.querySelector(".female_icon");
const male_icon_path = male_icon.querySelector("path");
const female_icon_path = female_icon.querySelector("path");

male_icon.addEventListener("click", function () {
  const male_icon_scale = window.getComputedStyle(this).getPropertyValue("transform");
  if (male_icon_scale !== "matrix(1.2, 0, 0, 1.2, 0, 0)") {
    Object.assign(male_icon.style, {
      transform: "scale(1.2)",
      transition: "0.2s ease",
    });
    Object.assign(female_icon.style, {
      transform: "scale(1)",
      transition: "0.2s ease",
    });
    male_icon_path.setAttribute("fill", "#1a9be5");
    female_icon_path.setAttribute("fill", "#25231f");
  } else {
    Object.assign(male_icon.style, {
      transform: "scale(1)",
      transition: "0.2s ease",
    });
    male_icon_path.setAttribute("fill", "#25231f");
    female_icon_path.setAttribute("fill", "#25231f");
  }
});

female_icon.addEventListener("click", function () {
  const female_icon_scale = window.getComputedStyle(this).getPropertyValue("transform");
  if (female_icon_scale !== "matrix(1.2, 0, 0, 1.2, 0, 0)") {
    Object.assign(female_icon.style, {
      transform: "scale(1.2)",
      transition: "0.2s ease",
    });
    Object.assign(male_icon.style, {
      transform: "scale(1)",
      transition: "0.2s ease",
    });
    female_icon_path.setAttribute("fill", "#e55e7d");
    male_icon_path.setAttribute("fill", "#25231f");
  } else {
    Object.assign(female_icon.style, {
      transform: "scale(1)",
      transition: "0.2s ease",
    });
    male_icon_path.setAttribute("fill", "#25231f");
    female_icon_path.setAttribute("fill", "#25231f");
  }
});

//--------INPUT--SECTION----------------------------------------------------------------------
var age_input;
var gender_input;
var height_input;
var weight_input;

//----------CALCULATE--BUTTON-----------------------------------------------------------------
const calculate_button = document.querySelector(".calculate_button");

calculate_button.addEventListener("click", function () {
  //INNER--PART
  let BMI = 0;
  age_input = document.getElementById("age_input").value;
  height_input = document.getElementById("height_input").value;
  weight_input = document.getElementById("weight_input").value;

  if (window.getComputedStyle(male_icon).getPropertyValue("transform") === "matrix(1.2, 0, 0, 1.2, 0, 0)") {
    gender_input = 0;
  } else if (window.getComputedStyle(female_icon).getPropertyValue("transform") === "matrix(1.2, 0, 0, 1.2, 0, 0)") {
    gender_input = 1;
  } else {
    gender_input = null;
  }

  //BMI--RESULT
  BMI = weight_input / Math.pow(height_input * 0.01, 2);
  BMI = BMI.toFixed(1);
  document.getElementById("BMI_result").textContent = BMI;
  var BMI_range = function () {
    if (BMI >= 15 && BMI < 18.5) {
      return 1; //Thieu can
    } else if (BMI >= 18.5 && BMI < 25) {
      return 2; //Binh thuong
    } else if (BMI >= 25 && BMI < 30) {
      return 3; //Thua can
    } else if (BMI >= 30 && BMI < 35) {
      return 3.1; //Beo phi lv1
    } else if (BMI >= 35 && BMI < 40) {
      return 3.2; //Beo phi lv2
    } else if (BMI >= 40 && BMI < 50) {
      return 3.3; //Beo phi lv3
    } else if (BMI < 15 || BMI >= 50) {
      return 0; //not human
    } else {
      return -1; //Quen nham, hoac nhap khong hop le
    }
  };

  //ASSESS--RESULT
  var assess_result = function () {
    if (BMI_range() === 1) {
      return "Underweight";
    } else if (BMI_range() === 2) {
      return "Normal weight";
    } else if (BMI_range() === 3) {
      return "Overweight";
    } else if (BMI_range() === 3.1) {
      return "Obesity Class 1";
    } else if (BMI_range() === 3.2) {
      return "Obesity Class 2";
    } else if (BMI_range() === 3.3) {
      return "Obesity Class 3";
    }
  };
  document.getElementById("assess_result").textContent = assess_result();

  //COMMENT--RESULT
  var comment_result = function () {
    if (BMI_range() === 1) {
      return underweight_comment;
    } else if (BMI_range() === 2) {
      return normalweight_comment;
    } else if (BMI_range() === 3) {
      return overweight_comment;
    } else if (BMI_range() === 3.1) {
      return obesity_class1_comment;
    } else if (BMI_range() === 3.2) {
      return obesity_class2_comment;
    } else if (BMI_range() === 3.3) {
      return obesity_class3_comment;
    }
  };
  document.getElementById("comment_result").textContent = comment_result();

  //NOTE--RESULT
  var note_result = function () {
    if (age_input < 18) {
      return children_note;
    } else if (age_input > 65) {
      return old_adult_note;
    } else {
      document.getElementById("note").style.display = "none";
      return " ";
    }
  };
  document.getElementById("note_result").textContent = note_result();

  //Pop-up trigger
  //dieu kien mo popup result
  if (BMI_range() === 0 && height_input != "" && weight_input != "" && age_input != "" && gender_input != null) {
    const confuse_popup = document.querySelector(".confuse_popup_container");
    confuse_popup.style.display = "flex";
  } else if (age_input && height_input && weight_input != "" && gender_input != null) {
    const popup = document.querySelector(".popup_container");
    popup.style.display = "flex";
  } else {
    const warning_popup = document.querySelector(".warning_popup_container");
    warning_popup.style.display = "flex";
  }
});

//----------------DONE--BUTTON--IN--POPUP-------------------------------------------------
const done_button = document.querySelector(".done_button");
done_button.addEventListener("click", function () {
  const popup = document.querySelector(".popup_container");
  popup.style.display = "none";
});
//---------------CLOSE--BUTTON--IN--POPUP-------------------------------------------------
const close_button = document.querySelector(".close_button");
close_button.addEventListener("click", function () {
  const popup = document.querySelector(".popup_container");
  popup.style.display = "none";
});
//---------------CLOSE--BUTTON--IN--WARNING--POPUP-------------------------------------------------
const ok_button = document.querySelector(".ok_button");
ok_button.addEventListener("click", function () {
  const warning_popup = document.querySelector(".warning_popup_container");
  warning_popup.style.display = "none";
});

//---------------CLOSE--BUTTON--IN--CONFUSE--POPUP-------------------------------------------------
const ok2_button = document.querySelector(".ok2_button");
ok2_button.addEventListener("click", function () {
  const confuse_popup = document.querySelector(".confuse_popup_container");
  confuse_popup.style.display = "none";
});
