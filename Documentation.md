**## For any changes regarding Navigation Bar**

    src > containers > navs > Topnav.js

Topnav.js file contains logo and user profile name and logo and the settings menu

**## For any changes regarding SideNavigation Bar**

    src > containers > navs > Sidebar.js

Sidebar.js file contains sidebar menu data
    
    
  **## For any changes regarding All Courses**

    src > student > app > pages > product > data-list.js

this file contains the structure for all courses cards and its css will be there with name of course1.css

**## For any changes regarding All Courses card details**

    src > student > app > pages > product > details.js

In this file it contains All course card details which fetches session id from All Course and then fetch this route **`/student/sessions/details/${session_id}** to get relevant details from database.
In course card details page it also contains **full profile link** which is getting from 

    src > student > app > pages > product > image-list.js

which fetches the **trainer_id** from details.js component and fetch this route **/student/sessions/trainer/${id}** to get the data.

**## For any changes regarding Live Session**

    src > student > app > pages > product > livesession.js
    
this file contains the live session card which fetching from this route /student/sessions/live;


**## For any changes regarding MyCourse**

    src > student > app > pages > faq.js

This file contains the my courses card which fetching from **/student/courses**

all of the cards css are on course.css and course1.css 

**## For any changes regarding MyCourse details page**
This page contains the video player, comment section, material section and video playlist tab and start quiz button.

for changes in *videoplayer* 

    src > student > app > pages > videoplayer.js

**## For any changes regarding Profile page / Setting page**

    src > student > app > pages > profile > setting.js

this file contains form for uploading profile picture and student information


**## For any changes regarding Affiliate page || Blogs page**
 

    src > student > app > pages > profile > affiliate.js
    src > student > app > pages > profile > blogs.js

to change disable ui it is in the disable.js component

    src > student > app > pages > profile > disabled.js

all of css are on the same path.


**## For any changes regarding Login/Signup**

    src > student > user > login.js
    src > student > app > register.js
    src > student > app > forgot-password.js
    src > student > app > reset-password.js

css is on the same path with name of **auth.css**

**## For any changes regarding Quiz**

    src > student > quiz.js

its css is with the name of **quiz.css**


*all of these component are children of layout which is under*
> src > layout > AppLayout.js

***For authentication we have used redux saga***

> src > redux > auth

**For any changes regarding url paramaters fetching logo favicon and company name quiz data**

    src > context.js






