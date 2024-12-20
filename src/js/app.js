import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  const errors = [];
  if (!variables.name || variables.name.trim() === "") {
    errors.push("Agregue su nombre por favor");
  }
  if (!variables.lastName || variables.lastName.trim() === "") {
    errors.push("Agregue su apellido por favor");
  }
  if (!variables.twitter || variables.twitter.trim() === "") {
    errors.push("Agregue su twitter o por defecto complete con 1111");
  } else if (!/^@?(\w){1,30}$/.test(variables.twitter.trim())) {
    errors.push("El usuario debe de tener entrer 1 y 30 caracteres");
  }
  if (!variables.github || variables.github.trim() === "") {
    errors.push("Agregue su GitHub o por defecto complete con 1111");
  } else if (!/^[a-zA-Z0-9-]{1,30}$/.test(variables.github.trim())) {
    errors.push("El usuario de GitHub debe de tener entre 1 y 30 caracteres");
  }
  if (!variables.linkedin || variables.linkedin.trim() === "") {
    errors.push("Agregue su LinkedIn o por defecto complete con 1111");
  } else if (!/^([a-zA-Z0-9-]){1,30}$/.test(variables.linkedin.trim())) {
    errors.push("El usuario de LinkedIn debe de tener entre 1 y 30 caracteres");
  }
  if (!variables.instagram || variables.instagram.trim() === "") {
    errors.push("Agregue su Instagram o por defecto complete con 1111");
  } else if (!/^[a-zA-Z0-9._]{1,30}$/.test(variables.instagram.trim())) {
    errors.push("Agegue su usuario de Instagram entre 1 y 30 caracteres");
  }
  if (!variables.role || variables.role.trim() === "") {
    errors.push("Seleccione su rol por favor");
  }
  if (!variables.city || variables.city.trim() === "") {
    errors.push("Seleccione su ciudad por favor.");
  }
  if (!variables.country || variables.country.trim() === "") {
    errors.push("Seleccione su país por favor");
  }

  //
  //
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name ? variables.name : " "} ${
    variables.lastName ? variables.lastName : " "
  }</h1>
          <h2>${variables.role ? variables.role : " "}</h2>
          <h3>${variables.city ? variables.city : " "} ${","} ${
    variables.country ? variables.country : " "
  }  </h3>
          <ul class="${variables.socialMediaPosition}">
            <li><a href="https://twitter.com/${
              variables.twitter
            }"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/${
              variables.github
            }"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/school/${
              variables.linkedin
            }"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/${
              variables.instagram
            }"><i class="fab fa-instagram"></i></a></li>
          </ul>
          </div>
  <div class="error-box">
      ${
        errors.length > 0
          ? `
        <h3>Por favor verifique:</h3>
        <ul>${errors.map(err => `<li>${err}</li>`).join("")}</ul>
        `
          : ""
      }
  </div>`;
  const errorBox = document.querySelector(".error-box");
  if (errors.length > 0) {
    errorBox.style.position = "absolute";
    errorBox.style.bottom = "10px";
    errorBox.style.left = "10px";
    errorBox.style.backgroundColor = "#f8d7da";
    errorBox.style.color = "#721c24";
    errorBox.style.padding = "10px";
    errorBox.style.borderRadius = "5px";
  }
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
