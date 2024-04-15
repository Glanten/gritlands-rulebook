/* open the sidenav menu to 250px */
function openNav() {
    document.getElementById("sidenavmenu").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
  
/* close the sidenav menu to 0 */
function closeNav() {
    document.getElementById("sidenavmenu").style.width = "0";
    document.body.style.backgroundColor = "white";
}

/* when the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.scrollY; /* was window.pageYOffset but that is deprecated*/
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("topnavbar").style.top = "0";
  } else {
    document.getElementById("topnavbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
