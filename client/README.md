# This is first my own react project.

The page is released in kapsi server. The address is https://www.tonimaenpaa.fi 
I am testing and building a page still so sometimes you will get server error but try later again.

## version 100:

Plan:
1.i start to do a page where you can search forecast to one day and five days also in choosed location.
2.Next thing i was planning the working time record program where you can add your payment and how much is the tax precent.
in this page you can login as employee or employer. Both characters has a two different accounts and permissions.
3.there is news page, where user can search english top news choosed coutry or choose keyword to find news.
4.There is my projects page, where user can watch short description about my projekts.
5.about me page, where is short description about me.

report:
1.i make type.d.ts file because i like these file interfaces, its so handy!! First i use it to forecast component and later to another components also.

report: made up some graphics. I also added the toolbar and drawer where user can navigate to different pages. I also update the interface value to upcoming worktime page.

## version 110:

report: Build up the components, forecast has it api call function. not connected yet. also changing web page changing the headliner text. Also modified interface file.

report : added forecast view some background photos. Upgrade also app.css file styles. I like to use this kind of styling. Added also textfield on forecast and search button. 

plan: Planning to do component about me and there i will put some information.
report: Where can i find working examble code about map loop for json object. Trying to find examble but not. i 
need this option on forecast component.

## version 120:

report: Made up the LogIn component. Here employee or employer can sign in to website. Made also some textfields to work_time component. Here
comes also some datepickers. Also update some icon to buttons.

report: Build up the working time component. Select component gives the saved
workID values where user can choose right one.

## version 130:
report: Still figuring out how to work out with map loop to json array. Added in employer view where employer can edit employee data.
started also login component where employee or employer can log in.

## version 131:
report: login component works fine. It opens different view what user account you use. Made also error handling to login view. if textfields are empty or passwd or usrname is wrong. 

## version 132:
report:
made up the Work_time component. When user choose the page, opens up the login view. depends what user are logged in text field are open and next thing to do is back end code to worktime component. I use the same textfield handler in both components but in onSubmit drives different function.

## version 133:
report: Employee field data saving and error handling is working now okay. Next thing to do is create
the employer view and print out the saved data from employee. I also want to add delete button.

Also employer error handling and data saving is working now.

bug: Fix the textfields that when user saves the data fields must become empty.

bug: the map loop throws an error and i think that interface is empty? I have to make a temp array and after that array i can save it to interface. (This bug fixed.)
Plan: make edit button work.
report : In emåployee view you can delete now what there are saved now.

## version 134
Added some photos to about me page and projects page. Also make routing work to this pages
is startpage i added a dialog where is littlebit information about the page. I made the interface to forecast
where we can save the json data what needed and printout it to list with icons.

## version 135
I make the projects view with dialog. Every project button opens the view where is short story about
project and some photos and link to projects code.

## version 136
report:
Started to make a forecast component. Trying to save fron json to object but it doesnt work. Some how index numer is not okay to complier so i have to figure out why this doesn't work.

## version 137
report: Forecast is working now. When you are saving items to object in component you have to be carefull
when react re renders the page, In my case that cause data  missing. Now i have to make a search view where
user can type the town or city. I have to make there also somekind of error handling.

bug:
Text field error helper test wont work. i made an if clause what gives user that api call response if
city not found.

bug: when you come back to forecast view again, it starts loading but nothing happens. after refreshing a page it works fine. Perhaps i have to plan how to set boolean variables wich allows application to
load api again. his is because props boolean stays false if user is selecting different page.(this fixed now)

## version 138
Added information aboutme component. Link is not working and profile picture location must adjust to better
place

I put my own forecast api to this page and also i have to do apicall for longitude and latitude for place what user select.
Next i have to make a text fields where user can give countrycode. But this weatherapi doesn't work on us :)

## version 139
forecast view is working now and user can give the wanted town or city to input field.
plan: I have to make this page mobile user friendly. I have to edit css that my page is working on mobile devices.

Now i tested the mobile view. Page is scaling the smaller devices and in mobile devices, hamburger menu disappear and
there is showing button navigation and headliner font is scaling smaller. I have to do more breakpoints to css

## version 140
Building up the newas page. I choose to use news API called site. Documentations are clear. 
i add graphics, there is now textfield for search word and also select component to country code.

## version 141
News page api has made. Still get cors error, so i have to check the solution about it. Also added search buttons to this news page.

## version 142
cors server is up and configured. Some problem there is, because i dont know how to make apicall with
this cors server.

## version 143
cors is okay now. I use a proxy setting in package.json. Lets build some graphics to news api component. 
bug: This version has problem on news_page components. It wont save data from json. I have to figure out, what is the problem.

## version 144
Now the news page saves the data like i want. Next plan is to make a graphics, and aslo fix one bug from forecast api.

fixed. now the page shows top news from choosed country and everything based on search word. next thing to do is add calendar where user can choose time line. Then i have to do the error handling on textfields and etc. 

Bug: The news link is too long, it isi,nt responsive at all. It goes over the list column lines(fixed). 

added backdrop while site is loading api request. added also images from everything news view. Somehow this image works only everything cathegory. Api response dont have url link to image in top news.

added also in type.d.ts file a new interface to save needed data from apicall. This data will used to graphics.

Report:
now news page is woking well. The links button is not overflowing any more. There is only button, what takes user to source web page. I also notice the security, when user open the link from my page. I use the MUI's recomended setting.

report: Fixing also the working time component. still missing features, but i have to fix the data save
problems. 

## version 145 
started to add some features on work_time component. There will be field, where user can check hours and payment in total.
there is some asyncronous data problems, but i have to figure it out first how to deal it easily.

## version 146
new features updated on workingtime. Now the program calculates the hours, payment, and payment after taxes.

report: adding some styles. addin button, what is enabled, when user want to edit saved data.

bug: when hitting the edit button from employee view, text shows on textfields but you cannot write there nothing. after saving the field it allows you to give input to textfield.. Problem is perhaps in texhadler object. I have to figure out this to next version.

## version 147

version 146 bug fixed. Now user can edit saved data from employeeview. Also textfields are working now. I made changes and wont use employee view interface connected useref values.

i also add the employee info to employer view. 

I make a errorhandling on news page. It has been forgatted earlier.

# verson 148 Backend building and sql database adding

Plan: Starting to make some backend code. Iam planning to move the apicalls to backend. I have tro figure out what sql server i should use. Backend will work on node expre

I have to think about the routes how to make them and what route have token.

## version 149

Backend and database is now okay, but still not connected to client. I have to plan, how move the apicaals to backend
bug. node gives error in fetch import. I have to figure out how to make apicall. This fetch wont work

## version 150

I make the forecast apicall route to backend. I am usin the axios because node-fetch didnt work.

Also added to database blog page data schema. 

## version151
Now i have apicalls in forecast component in backend. I make there a router, what will do the apicall and save the searched data to database.
I also make a route, what returns the database data back to client. In client app i have to modify the code, that i can delete apicall from there.

Now forecast component is working. In client side we get the data from batabase dependin on searchword. If database hav the 
user choosen location, then it returns an old data. otherwise we get new forecast from api in backend router called apiForecastRouter.ts.

### Plan: I have to make i datetime if clause. There i will compare, if the database values are too old, lets 
search the new forecast.

## version 152
### bug: apiNews.ts have empty object error bug. But i have to go get some sleep..

I still problem, that i get the cannot read undefined on apiNews.ts apicall. I make there also then clause, that program will wait that data is saved. I also check console logging that data is valid and the keyword is working. I dont know waht to do about this..

## version 153

Bug fixed. but apicalls are the wrong order Lets fix that for next. Then i can make changes to client side.

report: Now i have editesd the client side apicalls. It happens now in server and i also added a feature that when you load the page first tiem, it will load from database the lastest search and loop it to graphics. I have to make here also timestamp based search times.

### make timestamp based search control newspage also

### next i have to make worktime app.
first of all, we have to secure connection, when user is logged in. I use token. And also data saving should happen on database.
If i save the passwords to sql, i should use i security hash to password.

## version 154
Now the login works fine. It takes user from database. The password is crypted to database.

Plan: In worktime app i have to move the client app data to database.
plan: Perhaps i should do the relation on database. This how i can print out soecific workers work time writings(this is done)
plan: i have to make button, where user can do new employee username and passwords.

client app have now the apicall funktion. I have to get data from backend if token is valid.

## version 155

worktime component has token secured access to apiWorkTime.ts. It can add data and read it also. 


### bug: employee view data adding wont show nothing..

The request should do right. Now the user id is missing and that cause the problem. now we have to think about it little bit.

## version 156

now the worktime component get data from back end. It also can get the work time data only spefific user_id relation. If user make new user to this program, another user can see only his own work time data.

### plan
i have to make the workid:s relation to specific employee. also i have to make relation to employer field, what is user payment and taxes. i have to edit database littlebit and make also new database search absed on them. And work id:s are saved in client app. That should be on database.

also make new user is not completed. Backend code is okay but client is missing view add new employee.

### report version 155 bug fixed.

## version 157

Now user can add new user to database. I also add in apiWorktime.ts some different database searches. When employer ask get the router return all employer data and all employees data.

### bug:
1. employer data wont saved.
2. employer data wont work also in get
3. employee view time is undefined..
4. also employee data wont load after saving the worktime data.

4 is fixed. there was missing databasesearch on post method employee route.
3 is fixed. It was wrong name value in map loop.
2 is fixed. found a typo in apiworktimerouter
1 is fixed also.

## version 158
 i have make a select element in employer view, There he can choose correct employee and store his user_id that we can use correct workingplace id:S and payments to right employee.

 now i have to clean unused valus avay from clients code and make also delete and put routes

 Now is possible to delete specific employee data in client view,

 ## version 159
 I add annoying captcha to start page. After success captcha server gives a token, what we need to make apicalls to server.

 I also update the npm packages to client.

 ## version 160
 Now i have token in forecast and newspage routes. succesfull capcha gives the client token.

 I modified captcha littlebit. Now there is only number and uppercase letters
 Delete route is working now in work_time.tsx. Next i have to modify the edit field.

 Put is not easy to make. Now all form are connected to POST datasaving function.

 ## version 161
 i change the letter and number captcha to googles iam not robot tag.. The old one was too annoying.

 Lets keep the old captcha for backup if the new one doesnt work agaist the bad robots.

 Googles captcha working well. It takes after successed test the token key and post it to backend code. 
 There we make another post to googles site and check if the client given token is valid. If it is, lets
 return the token from client to secured connection, what needs forecast api and newspage.
 
 ## version 162
 Now user can edit also the worktime data. I changed littlebit server code and also client code. 

 ### bug:
 There was the option, what calculate the payment before and after taxes. This wont work anymore. We
 have to do this some another way. Lets plan it littleb it.

 fixing the bug: I have to count on server side how much is the payment and after taxes also. Then return to client
 counted hours, payment and payment after taxes. Now it calculate it in back end. Next the data has to visualize in client side

 ## version 163

 Now the client view shows the calculated payment and sum of working hours. 

 Plan. I have to make srver side apiworktime easier way. Now there is lots of copied database search.
 i have to make couple of functions in there.

 I have to make also view in employer page, where user can add working places id to specifig employee.

 ## version 164
 There was in client side empty object error, when new user employee is loged in. It fixed now. 
 New feature is that employer can make mor working place id per employee. I add the buttons and change error handling
 in client side and serverside.

 ## version 165
 Now we add the working place id:s view and add also delete buttons to employer view, where user can delete employee or workplace id:s. 
 This feature not working now but i will build it soon.

 ### bug:
 Employer can now delete created workingplace ids but all data removal to specific employee doesnt work.
 And also i have to make use_effect rules in client software some another way. Now it makes after delete request also get request..
 I think that i have to plan that delete all database searches. Whatid number we need.. 

 ## version 166
 Now user can delete also all data what is ralatited to specific employee. Also i found the problem source, what cause database errors.
 In client side there was if clauses, where we save to request settings id numbers etc. I build it betterway and many odd things 
 vanish from my program..

 I also made a information, that dont use my worktime app any real life things or dont save any personal data there.

 ## version 167

 Fixed couple of bugs. There was someerrors in delete route employer view. I also fix the login component error helper text.

 ## version 168

 I made the time rule, that user can search keywords newsapi and forecast only once per five nminutes.
at this version there was some conlfict with github so i have to be careful. 
i have to make some kind of calculator, when user can check, if the search time is over 5 minutes but how. I dont want to make so many 
back end calls

Now we have search time rule. User can make only 1 search per 5 min. Client application shows, if time is not complete, we are showing the old search.

## version 168.1
Bug fixes and code cleaning. Delete the unused values from forecast api. 

### bug:
forecast page wont show the forecast town what is saved to database.


## version 168.2
Some bug fixes and add build files to project

## version 169
I make some changes about the search rule in apis. Now the client side sends a timestamp and in server side we compare timestamps and allow the search, if difference is 3 minutes

i have still usestate delay problem in client app. I have to figure out it. The viewing forecast town name is changing too late. Only second search changes it

Usestate fixed. I have to test it and find out is the problem really solved.

I fixed the github links and also fix google capcha. 

Plan: Should i protect the apiAuht route and apiSign route to secondary token? 

## versio 170
 I repair the refresh problem. The site was crashing if user refresh the browser. Now when this is done, 
 we go back to main page. I will figure out, how to stay the correct page. now i sade location to localstore.
 Same time i clean the console logs from code.

 I remove the button navigation from mobile view.

 BUGS: there will background image overflow on mobile version. also date-fns depencies is cousing error when i try to update the
 node moduls

## version 171
i did update the npm packages and vulnerabilities. I also fix the warnings what was caused by bad setState call in component.
I also make some styles.

## bug:
The worktime wont show error helper text some reason.
still in server when refresh the browser it gives the wrong route error code. To fix this i should use hashroute

## plan
I have to edit forecast to better graphical component.
I have to make my graphical works page on my page.

## version 172
- I get weird dot use require for import module error in server side. This was caused by node-fetch. I use npm uninstall node-fetch and npm install node-fetch@2 and this works fine.
- This error was caused by esm module changes.
- And i update nodemoduls in client sode and i got error from datetimepicker..
- this is fixed now and lets make a fresh build to server

## version 173
- Starting to make portfolio view using MUI paper and Card components. Also i fixed the browser update bug.
- It would be nice to find some code review components.

## version 174
- I have added some content to portfolio view and there is still a lot of work to do.
- I have to add more descriptions about my schoolprojects. But i make there expand image view where user can watch the image in full screen mode. 

## version 175
- I take the issue 11,12,17 and work with them. The issue 17 and 12 needs to complete later.

## version 176
- I fixed the issue 13. Now the worktime app helper text is working on login view

## version 177  
- I continued working with issue 17 and 11. I added the phone app to my own github and I add the link in the code button. I also made my gaming course final work to portfolio.

## version 178
- Lets work on issue21 fix styles and modify the forecast to card, not list.
- Now I fixed the styles and i made a neutral background images to forecast and news page.
- I also fix borders and in portfolio view I fix the elements background colors and paddings.
- In news page view i make list nicer.
- I didnt make in forecast view changes so we have to make a new issue about it.
- I also update dependencies and update the websocket pack and postcss.
- This version is not build and uploaded to server.

## version 179
- i made the issue 24 now. Perhaps we edit that startpage list later littlebit but now it looking quite good so lets put this version to server.

## version 180
- i have made now the add new user in login component. This hides the add new user textfields and when user hit the button, view shows. When user is saved, the view switched to ligin view back.
- I also fix the forecast view list items. Now the information is clearier in the listItem component.

- Now the projects are their own cards and user can expand view, if he/she wants to know more about project.
- I also add cancel button to worktime login component. If user doesn't want to add new user, then it can go back login view.

## version 181
- added the feedback part to site. I made own route to feedback post request, what is token protected. I also add to databace 3 values, what we save.
- This was issue 31. There is some styles to do in this feature.
- i also delete the menu text from toolbar.
## version 182
- started to make a footer to page. Now user can navigate also from footer to another page. This is github issue 35.
- Footer needs more ideas but the footer body and links are okay. I fixed also some security issues from server app.
- I also fix the issue 4 and 5. Then i fix some styles in the page. 
### bug: 
- I manage to track news page issue and forecast search time issue to server side timestamp. I have to figure out how to fix it. Perhaps moving the time stamp function to index.ts?

## version 183
- Started to fix issue 6 and issue 38. I make a rule to client app news and forecast page. User cam make 3 empty search before timerule starts to count 3 minutes. (Not tested yet).
- now i tested the new time rules and it works better now. I also give user a change to get new search, if earlier was empty. emptysearch limit is 2.
- Then i also make a new route to apiforecast that client app first ask about timestamp and dependin on time rule, we get new or old forecast.

### bug.
- forecast error text shows faulty information after empty search.


## npm installs in this project:

Mariadb 10.10

- npm install @mui/lab

- npm install @mui/material @emotion/react @emotion/styled

- npm install @mui/material @mui/styled-engine-sc styled-components

- npm install @fontsource/roboto

- npm install @mui/icons-material

- npm install react-router-dom @types/react-router-dom

- npm install moment-jalaali

- npm install @date-io/jalaali

- npm install date-fns --save

- npm install @mui/x-date-pickers

- npm install react-google-recaptcha-v2

- npm i --save-dev @types/react-google-recaptcha

server build:
First npx tsc -init
tsconfig and there uncommand outdir ./dist
at the end of config file add before last mark "exclude" : ["node_moduls", "client"]
and after that npx tsc

copy package.json to dist and remove the typescript depencies.
client build
npm run build
 