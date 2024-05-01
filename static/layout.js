// open the sidenav menu (to 250px)
function openNav() {
  document.getElementById("sidenavmenu").style.width = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

// close the sidenav menu
function closeNav() {
  document.getElementById("sidenavmenu").style.width = "0";
  document.body.style.backgroundColor = "white";
}

// open or close a named section (it should start closed)
function collapseSegment(segmentId, iconId) {
  let element = document.getElementById(segmentId);
  let icon = document.getElementById(iconId);
  if (element.style.display === "block") {
      element.style.display = "none";
      icon.src = "static\\images\\expand_more_white.svg"
  } else {
      element.style.display = "block";
      icon.src = "static\\images\\expand_less_white.svg";
  }
}

function archetypeSegment(segment, url, segmentName) {
  let currentSegment = document.getElementById(segment).subclass;
  let newSegment = segmentName;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('No network response');
      }
      return response.text();
    })
    .then(text => {
      // swap between clan wah and generic wah

      document.getElementById(segment).subclass = newSegment;

      // display fetched content in the archetype flavour text div
      document.getElementById(segment).innerHTML = text;
    })
    .catch(error => {
      console.error('ERROR:', error);
    })
}

/* when the user scrolls down, hide the navbar; when the user scrolls up, show the navbar */
var prevScrollpos = window.scrollY; /* was window.pageYOffset but that is deprecated */
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("topnavbar").style.top = "0";
  } else {
    document.getElementById("topnavbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

/* INTRODUCING PAGE CONTENT */

// get list of links from side navbar
document.addEventListener('DOMContentLoaded', function() {

  /* HISTORY & PSEUDO-COOKIES */
  // check if there is a page in user's history
  const lastVisitedPage = localStorage.getItem('lastVisitedPage');
  if (lastVisitedPage) {
    loadContent(lastVisitedPage);
    // try this also for the page's subtitle
    document.getElementById('pagesubtitle').textContent = localStorage.getItem('lastVisitedSubtitle');
  } else {
    // if there is no stored page, load the introduction
    loadContent('static/pagecontent/home.html');
    document.getElementById('pagesubtitle').textContent = 'Introduction';
  }

  /* LINKS IN THE POP-OUT NAVBAR */
  // get all elements with the class "contentlink"
  const links = document.querySelectorAll('.contentlink');
  // add click event listener for each link
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      // prevent default link behaviour
      event.preventDefault();
      // get URL from data-url attribute
      const url = this.getAttribute('data-url');
      const pageSubtitle = this.getAttribute('data-title')
      // load content from URL
      loadContent(url);
      localStorage.setItem('lastVisitedPage', url);
      localStorage.setItem('lastVisitedSubtitle', pageSubtitle);
      document.getElementById('pagesubtitle').textContent = pageSubtitle;
      closeNav();
    });
  });

  /* FETCH AND DISPLAY CONTENT FROM "STATIC" HTML PAGES */
  function loadContent(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('No network response');
        }
        return response.text();
      })
      .then(text => {
        // display fetched content in the main page
        document.getElementById("maincontent").innerHTML = text;
      })
      .catch(error => {
        console.error('ERROR:', error);
      })
  }
});
