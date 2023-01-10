Written by fmwyso; feel free to send any comments, questions or suggestions to me on Discord (fmwyso#3492).
<br />
For a quick start guide, <a href="https://www.youtube.com/watch?v=eabQi0bLK0M">watch this YouTube video</a>. These are the OBS Chroma Key settings I used for the beginning of the video (with Diablo 2 in the background): <a href="https://imgur.com/a/joxL0ae">image here.</a> For the time being, only Chrome is supported. FireFox seems to be buggy for some reason...
<br /><br />

PRIVACY POLICY: Roller3D does not provide any information whatsoever to myself (fmwyso); it has no data servers or ability to retrieve any personal information from you. By using Roller3D, you will be allowing data provided by Twitch to be stored in a local HTML element or a Google Sheets page which only you have access to. You are the owner of that data and need to comply with any appropriate requirements of storing/accessing/processing that data. Simply put, Roller3D only allows you to access/store data already available to you in forms that are private to you (and you alone). 

How to use the page:
1) Navigate to https://fmwyso.github.io/roller3d/
2) Click on "Connect with Twitch". Login if needed. Note that you shouldn't have to re-login every time you re-open it. 
3) Page should refresh and now say, "Automatically queueing subs/bits to <your_name>". !! At this point, your access token is visible in the URL. Do not let anyone see this !!
4) Now people will automatically be added to the roll queue.
 - Every bit message will get (bit_count/250) rolls. For example, a cheer of 250 gets 1 roll. A cheer of 249 doesn't get added to the queue. A cheer of 500 gets 2 rolls. Two cheers of 200 each (a total of 400) gets 0 rolls; nothing added to queue because each roll is less than 250. 
 - Every sub gets 1 roll per month. Multi-month subs / gift subs get 1 roll per month. For example, 6 month gift subs get 6 rolls.
  - If you sub for yourself, you get the roll(s).
  - If you give out 5 gift subs non-anonymously, you get 5 rolls. 
  - If you give out 5 gift subs anonymously, each of the 5 people you gave a sub get a roll. 
  - If you give out a 6 month gift sub to someone else, you get the 6 rolls for yourself. 
5) Click on "Open Display Window" to open up the rolling visualization. Note that this window is required to be open in order to roll.
6) Edit the list of choices ("Possible Choices") to what you want; a new choice on each line. After you are done, click "Update Choices". You should now see your choices on the roller. 
7) By default, all roll results will be stored in a big text box. However, I recommend clicking "Sign in with Google" to open up a Google Sheets (that is dynamically generated). This will be created in your Google Drive. You can view it by visiting your Google Drive/Sheets folder. Once signed in, the "Sign in with Google" button should be replaced with "Now logging to spreadsheet" and you should see a Google Sheets page. Note that this Google Sheets will also store debug information in the tab "Debug"; if an issue occurs, that debug log will be very helpful for me :).
8) To start rolling, click on "START Roll Queue". This will automatically roll for all viewers in the queue (one viewer at a time); giving a ~1 second break between viewers. To stop rolling, click the same button (which is now labeled "STOP Roll Queue"). 
9) If you want to add rolls manually, just edit the "Name" and "Roll Count" at the top. After clicking "Add to Roll Queue", it will add those number of rolls for the given name. Note that you cannot reduce the roll count for any person; you can only add more rolls or new rolls. 
<br />
This page was made possible by the following libraries: <a href="https://developers.google.com/sheets/api/guides/concepts">Google Sheets API</a>, <a href="https://docs.sheetdb.io/">sheetdb</a>, <a href="https://threejs.org/">threejs</a> and <a href="https://createjs.com/tweenjs">tweenjs</a>. 
I want to thank the following authors/pages for their examples & code snippets that made this development possible:
<br />
<a href="https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom_selective">Temdog007's threejs example</a>
<br />
<a href="https://threejs.org/examples/webgl_shadowmap.html">threejs webgl_shadowmap example</a>
<br />
<a href="http://stemkoski.github.io/Three.js/index.html">stemkoski's threejs examples</a>
<br />
<a href="https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container">gman's stackoverflow reply on resizing canvas</a>
<br />
<a href="https://discourse.threejs.org/t/load-font-into-global-variable-efficiency/31608/2">hofk's reply on font loading for threejs</a>
<br />
<a href="https://github.com/twitchdev/pubsub-javascript-sample/blob/main/main.js">Twitch's PubSub Javascript Sample</a>
<br />
<a href="https://barrycarlyon.github.io/twitch_misc/authentication/implicit_auth/">Barry Carlyon's implicit twitch example</a>
<br />
<a href="https://github.com/sheetdb/sheetdb-js">Sheetdb's javascript library (used as an example)</a>
<br />
<a href="https://dev.to/jessesbyers/create-a-google-sheet-and-write-data-using-the-google-sheets-api-1mac">Jesse Smith Byers' Google Sheets API example</a>
<br />
<a href="https://stackoverflow.com/a/70772647">Iamblichus' reply describing how to use GIS</a>
<br />
<a href="https://scriptverse.academy/tutorials/html5-window-postmessage.html">Dennis Gabil's examples of window.postMessage()</a>