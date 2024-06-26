/*
  I had some help with this JavaScript:

  Sidenav menu and collapsing segments - W3 Schools
  Error checking and pseudo-history - ChatGPT

  The rest was from my cs50 notes
*/

// open the sidenav menu (to 250px)
function openNav() {
  document.getElementById("sidenavmenu").style.width = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  document.body.style.overflow = "hidden";
  /*
  // trying to implement "back button" functionality but it doesn't seem to work
  history.pushState({ menuOpen: true }, "Menu", "#menu");
  */
}

// close the sidenav menu
function closeNav() {
  document.getElementById("sidenavmenu").style.width = "0";
  document.body.style.backgroundColor = "white";
  document.body.style.overflow = "auto";
}

/*
// use "back button" to close menu
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.menuOpen) {
    closeNav();
  }
});
*/

// open or close a named section (it should start closed)
function collapseSegment(segmentId, iconId) {
  var element = document.getElementById(segmentId);
  var icon = document.getElementById(iconId);
  if (element.style.display === "block") {
    element.style.display = "none";
    icon.src = "static\\images\\expand_more_white.svg";
  } else {
    element.style.display = "block";
    icon.src = "static\\images\\expand_less_white.svg";
  }
}

// clan-specific archetype buttons
function archetypeSegment(segment, url, buttonId) {
  buttonOutline(buttonId);
  var whichButton = document.getElementById(buttonId);
  if (whichButton.style.border != "5px solid black") {
    // define default archetype content
    var defaultContentSource = document.getElementById(segment).getAttribute("default_content");
    // get the default archetype content
    fetch(defaultContentSource)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No network response");
        }
        return response.text();
      })
      .then((text) => {
        // inject default archetype text
        document.getElementById(segment).innerHTML = text;
      })
      .catch((error) => {
        console.error("ERROR:", error);
      });
  } else {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No network response");
        }
        return response.text();
      })
      .then((text) => {
        // display fetched content in the archetype description section
        document.getElementById(segment).innerHTML = text;
      })
      .catch((error) => {
        console.error("ERROR:", error);
      });
  }
}

// outline clan-specific buttons
function buttonOutline(buttonId) {
  var button = document.getElementById(buttonId);
  var buttons = document.getElementsByClassName("clan_archetype_button");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].id === buttonId) {
      if (button.style.border === "5px solid black") {
        button.style.border = "5px solid transparent";
      } else {
        button.style.border = "5px solid black";
        button.style.borderRadius = "50%";
      }
    } else {
      buttons[i].style.border = "5px solid transparent";
    }
  }
}

/* when the user scrolls down, hide the navbar; when the user scrolls up, show the navbar */
var prevScrollpos = window.scrollY; // was window.pageYOffset but that is now deprecated
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("topnavbar").style.top = "0";
  } else {
    document.getElementById("topnavbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

/* INTRODUCING PAGE CONTENT */

// get list of links from side navbar
document.addEventListener("DOMContentLoaded", function () {
  /* HISTORY & PSEUDO-COOKIES */
  // check if there is a page in user's history
  const lastVisitedPage = localStorage.getItem("lastVisitedPage");
  if (lastVisitedPage) {
    loadContent(lastVisitedPage);
    // try this also for the page's subtitle
    document.getElementById("pagesubtitle").textContent = localStorage.getItem("lastVisitedSubtitle");
  } else {
    // if there is no stored page, load the introduction
    loadContent("static/pagecontent/home.html");
    document.getElementById("pagesubtitle").textContent = "Introduction";
  }

  /* LINKS IN THE POP-OUT NAVBAR */
  // get all elements with the class "contentlink"
  const links = document.querySelectorAll(".contentlink");
  // add click event listener for each link
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // prevent default link behaviour
      event.preventDefault();
      // get URL from data-url attribute
      const url = this.getAttribute("data-url");
      const pageSubtitle = this.getAttribute("data-title");
      // load content from URL
      loadContent(url);
      localStorage.setItem("lastVisitedPage", url);
      localStorage.setItem("lastVisitedSubtitle", pageSubtitle);
      document.getElementById("pagesubtitle").textContent = pageSubtitle;
      closeNav();
    });
  });

  /* FETCH AND DISPLAY CONTENT FROM "STATIC" HTML PAGES */
  function loadContent(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No network response");
        }
        return response.text();
      })
      .then((text) => {
        // display fetched content in the main page
        document.getElementById("maincontent").innerHTML = text;
      })
      .catch((error) => {
        console.error("ERROR:", error);
      });
  }
});
