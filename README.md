# GRITLANDS RULEBOOK

#### Video Demo: <URL_HERE>

#### Description:

I decided to create a Progressive Web App (PWA) that contains the rulebook content for the Gritlands LARP.

I run a small (~90 players) 'grimly hilarious' post-apocalyse LARP in the UK called "Gritlands" which has been very
popular, and has a very attractive rulebook (thanks to one of my fellow game team members, Ben, who is a graphic
designer by trade). One problem with a stylish rulebook, however, is that our Games Operation Desk (GOD) team can
have trouble finding a specific entry, clarification, or ruling when a player comes and asks a rules question. I
wanted to create a mobile application with all of the rules presented in a simple and easy-to-read format; and
because some of the sites we run the game at tend to have poor phone signal / mobile reception, I wanted it to be able
to run completely offline.

I also considered that, since our game is very new (as of the time of writing, we've only run two events), we are
likely to review and change some of our rules to make them more streamlined or correct mistakes and oversights.

At first I looked into writing an Android app with Kotlin and Android Studio, then I looked into React Native; but
while these methods would be very powerful, they also seemed very complex for what I wanted to achieve. The filesize
for a React app was huge, whereas I knew I could create this rulebook app as a website with a much smaller footprint.

A colleague at work asked if I'd considered trying a PWA. After a little research, I'd found exactly what I was looking
for. Thanks Sammo!

I was inspired largely by an Android app called "Survival Manual" that my brother, Sam, had once shown me. It contains
a wealth of information and each entry was accessed from a pop-out side menu. I wanted to mimic the pop-out menu design
and found a very easy-to-follow tutorial on the W3 Schools site. I had an issue with one of the tutorials which
included some deprecated code (which I found thanks to my browser's inspect function), but thanks to I was able to find
the right documentation and update my JavaScript thanks to the easy-to-follow links from the browser console.

If I had been building the website with Python/Flask, I would have built it in pieces with Jinja placeholders and every
page would have been separate. That would have made hyperlinks and browser navigation much easier, but because I
couldn't guarantee Python would run on a PWA I had to limit things to HTML, CSS, and JavaScript. For that reason, I
wanted to build a single page that would host all of the rulebook's information. Rather than navigate to discrete HTML
pages, I decided to have the navmenu links change the content of the page to match the topic.

So rather than take you to another page (which would have had a lot of duplicated code, like the _huge_ navmenu) the
links in the navmenu actually call a JavaScript function to change the content of a "main content" <div> in the page. I
then had to add some smoke-and-mirrors effects to get the site/app to remember which page the user had last visited,
and the title of that page. If there was no history, the page's "main content" would be populated from home.html,
otherwise it would be populated by the last-visited page's content.

Originally I wanted to avoid writing a huge list of links for the pop-out navbar, so I populated the pop-out menu's
links using JavaScript to build each link from an array of pages, but that quickly became cumbersome and I found it
difficult to get other JavaScript functions to work around it. I resigned myself to write the navbar directly onto the
main page in HTML; at least with the way my app navigated between "pages" I would only have to write the menu once.

I also toyed with the idea of having something like a SQLite database that would hold each page's content, and looked
into storing data on a user's device with IndexedDB and the like. My intent was, partially, to allow almost anyone
(or rather, anyone with the right access) to be able to update rulebook entries if I was, for whatever reason,
unavailable. While this might have been a more elegant solution, I reminded myself to KISS (Keep It Simple, Stupid);
so I wrote the content for each page in plain HTML. My hope is that, if we need to update the rulebook in the future
and I am, for whatever reason, unable to do it myself, someone with a basic understanding of HTML can find and edit the
rules as necessary.

As an aside, I mostly write plot, design adversaries, and plan encounters for Gritlands, so this was the closest I had
got in a long time to going over the mechanics with a fine-toothed comb. I found a bunch of discrepancies and confusing
which I was able to rewrite for clarity or take to the rest of the game team to discuss; so making this rulebook app
has already improved the rules for our game!

Getting the content into the project was largely a process of copying and pasting text from our existing rulebook PDFs
into appropriately-formatted HTML blocks. This was a little tedious, but I managed to do some of it during my lunch
breaks at work. The hardest part was having a really nice start to May - the sun was out, the flowers I'd planted in
the garden were coming into bloom, the birds were singing, and I had cloistered myself in front of a monitor to do
data-entry!

I asked Ben (aforementioned graphic designer) to send me a bunch of images I could use as icons for the site/app. I
also found some general "material icons" from Google Fonts which I used as iconography for menu buttons, etc.

One of the bigger hurdles was getting the website to work as a PWA. Fortunately I was still able to use the PWA
functionality of the Lighthouse extension in Chromium-based browsers (it will be deprecated in the future), and this
made turning my site into a PWA much easier.

I followed the Mozilla Foundation's "Cycle Tracker" tutorial to create a test PWA and found it pretty straightforward.
When it came to turning my rulebook site into a PWA, however, I ran into a host of problems with offline mode. The
service worker was not caching pages properly, so offline mode would only show you the index/home page and nothing else
until you reconnected. I agonised over this for ages, watched a bunch of YouTube tutorials ("Net Ninja" has a good
series on PWAs), and eventually resorted to copying and pasting the salient elements of my JavaScript into ChatGPT. It
was no DuckDebugger, but ChatGPT found the service worker code (which I had got directly from Mozilla) was faulty, and
suggested the changes necessary to get it working. I had spent hours rewriting my manifest's scope and starting page,
rewriting my service worker's cache array... but in the end it was "install event" JavaScript from the Mozilla tutorial
that needed rewriting. I guess some of the older tutorials on the web could do with some updates huh?

After that - boom - the app was working in offline mode after being "installed" to my smartphone! Now I could present
it to the rest of the game team, our GOD team, our referees, and even our players, and no one would have to worry about
mobile phone reception when checking the rules. Even better, if we published any changes to the rulebook, a user would
only have to open the app whilst connected to the Internet and it'd automatically update to the latest version.

Could I have added more to the rulebook app? Definitely. I thought about adding a "dark mode" or even four different
styles, one for each player faction. I was going to put a couple of calculators in there so players could work out
things like "how many hit points does my character have" or a character builder for character generation. But those
were really out-of-scope when compared to my original mission: create an offline rulebook that can be used on a laptop
or smartphone. Plus, I started this in late February or early March, and it's now almost the end of May! I started cs50
because I wanted to make video games in the Godot engine and had zero programming experience; I'll never get any closer
to learning Godot or game development if I develop and redesign this rulebook over and over.

I've hosted the site/app at https://glanten.github.io/gritlands-rulebook/ and, once our LARP's website is finished, I
will be able to link to it from there too.

Which reminds me - I also learned about Git and GitHub during this project, so that was some exciting extra-curricular
stuff I wasn't expecting!
