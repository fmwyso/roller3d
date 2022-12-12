Written by fmwyso; feel free to send any comments, questions or suggestions to me on Discord (fmwyso#3492).
<br />
For a quick start guide, <a href="https://www.youtube.com/watch?v=eabQi0bLK0M">watch this YouTube video</a>. These are the OBS Chroma Key settings I used for the beginning of the video (with Diablo 2 in the background): <a href="https://imgur.com/a/joxL0ae">image here.</a> For the time being, only Chrome is supported. FireFox seems to be buggy for some reason...
<br /><br />
How to use the page:
1) You go to https://fmwyso.github.io/roller3d/
2) Click on "Connect with Twitch". Login if needed. Note that you shouldn't have to re-login every time you re-open it. 
3) Page should refresh and now say, "Automatically queueing subs/bits to <your_name>". !! At this point, your access token is visible in the URL. Do not let anyone see this !!
4) Now people will automatically be added to the roll queue.
 - Every bit message will get (bit_count/250) rolls. For example, a cheer of 250 gets 1 roll. A cheer of 249 doesn't get added to the queue. A cheer of 500 gets 2 rolls. Two cheers of 200 each (a total of 400) gets 0 rolls; nothing added to queue because each roll is less than 250. 
 - Every sub gets 1 roll per month. Multi-month subs / gift subs get 1 roll per month. For example, 6 month gift subs get 6 rolls.
  - If you sub for yourself, you get the roll(s).
  - If you give out 5 gift subs non-anonymously, you get 5 rolls. 
  - If you give out 5 gift subs anonymously, each of the 5 people you gave a sub get a roll. 
  - If you give out a 6 month gift sub to someone else, you get the 6 rolls for yourself. 
5) Before starting any rolls, edit the list of choices ("Possible Choices") to what you want; a new choice on each line. After you are done, click "Update Choices". You should now see your choices on the roller. 
6) To start rolling, click on "START roll queue". This will automatically roll for all users in the queue; giving a ~1 second break between users. To stop rolling, click the same button (which is now labeled "STOP roll queue"). 
7) All results will be stored in the "Roll Results" window.
8) If you want to add rolls manually, just edit the "Name" and "Roll Count" at the top. After clicking "Add to Roll Queue", it will add those number of rolls for the given name. Note that you cannot reduce the roll count for any person; you can only add more rolls or new rolls. 
<br />
This page heavily uses <a href="https://threejs.org/">threejs</a> and <a href="https://createjs.com/tweenjs">tweenjs</a>. 
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