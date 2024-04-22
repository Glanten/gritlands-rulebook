  /* open the sidenav menu to 250px */
  function openNav() {
    document.getElementById("sidenavmenu").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  function closeNav() {
    document.getElementById("sidenavmenu").style.width = "0";
    document.body.style.backgroundColor = "white";
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

/* introducing page content */

// get list of links from side navbar
document.addEventListener('DOMContentLoaded', function() {
  const links = [
    { id: 'homepage', text: 'Introduction', url: 'static/pagecontent/home.html' },
    { id: 'characters', text: 'Characters', url: 'static/pagecontent/characters.html' },
    { id: 'clans', text: 'Clans', url: 'static/pagecontent/clans.html' },
    { id: 'archetypes', text: 'Archetypes', url: 'static/pagecontent/archetypes.html' },
    { id: 'grit', text: 'GRIT', url: 'static/pagecontent/grit.html' },
    { id: 'health', text: 'Health', url: 'static/pagecontent/health.html' },
    { id: 'equipment', text: 'Equipment', url: 'static/pagecontent/equipment.html' },
    { id: 'consequences', text: 'Consequences', url: 'static/pagecontent/consequences.html' },
    { id: 'hotzones', text: 'Hotzones', url: 'static/pagecontent/hotzones.html' },
    { id: 'disclaimers', text: 'Disclaimers', url: 'static/pagecontent/disclaimers.html' },
  ];

  // Populate the sidebar with links
  const sidebar = document.getElementById('sidenavmenu');
  const pageSubtitle = this.getElementById('pagesubtitle')
  links.forEach(function(linkData) {
    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('contentlink');
    link.setAttribute('data-url', linkData.url);
    link.id = linkData.id;
    link.textContent = linkData.text;

    // Add click event listener to close the sidebar and load content
    (function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        closeNav();
        loadContent(linkData.url);
        // store URL of clicked link in localStorage
        localStorage.setItem('lastVisitedPage', linkData.url);
        localStorage.setItem('lastVisitedSubtitle', linkData.text);
        pageSubtitle.textContent = linkData.text;
      });
    })(link);
    // Append the link to the sidebar
    sidebar.appendChild(link);
  });

  // Function to fetch and display content from an HTML file
  function loadContent(url, sub) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('ERROR: Could not reach page!');
        }
        return response.text();
    })
    .then(text => {
      // Display the fetched content in the 'maincontent' div
      document.getElementById('maincontent').innerHTML = text;
    })
    .catch(error => {
      loadContent("static/pagecontent/404.html", "404");
      console.error('ERROR: Problem with fetch operation:', error);
    });
  }

  // load page last visited (if there is one)
  const lastVisitedPage = localStorage.getItem("lastVisitedPage");
  if (lastVisitedPage) {
    const lastVisitedSubtitle = localStorage.getItem("lastVisitedSubtitle");
    pageSubtitle.textContent = lastVisitedSubtitle;
    loadContent(lastVisitedPage);
  } else {
    const defaultPage = "static/pagecontent/home.html";
    const defaultSub = "Home";
    pageSubtitle.textContent = defaultSub;
    loadContent(defaultPage, "Home");
    sessionStorage.setItem('lastVisitedPage', defaultPage);
    sessionStorage.setItem('lastVisitedSubtitle', defaultSub);
  }
});