This is first my own react project.

version 100:

Plan:
1.i start to do a page where you can search forecast to one day and five days also in choosed location.
2.Next thing i was planning the working time record program where you can add your payment and how much is the tax precent.
in this page you can login as employee or employer. Both characters has a two different accounts and permissions.
3.Next view is perhaps webshop view, this can change soon. Iam not sure if i ever publish this webpage.
4.Planning....

report:
1.i make type.d.ts file because i like these file interfaces, its so handy!! First i use it to forecast component and later to another components also.

report: made up some graphics. I also added the toolbar and drawer where user can navigate to different pages. I also update the interface value to upcoming worktime page.

version 110:

report: Build up the components, forecast has it api call function. not connected yet. also changing web page changing the headliner text. Also modified interface file.

report : added forecast view some background photos. Upgrade also app.css file styles. I like to use this kind of styling. Added also textfield on forecast and search button. 

plan: Planning to do component about me and there i will put some information.
report: Where can i find working examble code about map loop for json object. Trying to find examble but not. i 
need this option on forecast component.

version 120:

report: Made up the LogIn component. Here employee or employer can sign in to website. Made also some textfields to work_time component. Here
comes also some datepickers. Also update some icon to buttons.

report: Build up the working time component. Select component gives the saved
workID values where user can choose right one.

version 130:
report: Still figuring out how to work out with map loop to json array. Added in employer view where employer can edit employee data.
started also login component where employee or employer can log in.

version 131:
report: login component works fine. It opens different view what user account you use. Made also error handling to login view. if textfields are empty or passwd or usrname is wrong. 

version 132:
report:
made up the Work_time component. When user choose the page, opens up the login view. depends what user are logged in text field are open and next thing to do is back end code to worktime component. I use the same textfield handler in both components but in onSubmit drives different function.

version 133:
report: Employee field data saving and error handling is working now okay. Next thing to do is create
the employer view and print out the saved data from employee. I also want to add delete button.

Also employer error handling and data saving is working now.

bug: Fix the textfields that when user saves the data fields must become empty.

bug: the map loop throws an error and i think that interface is empty? I have to make a temp array and after that array i can save it to interface. (This bug fixed.)
Plan: make edit button work.
report : In emåployee view you can delete now what there are saved now.

version 134
Added some photos to about me page and projects page. Also make routing work to this pages
is startpage i added a dialog where is littlebit information about the page. I made the interface to forecast
where we can save the json data what needed and printout it to list with icons.

version 135
I make the projects view with dialog. Every project button opens the view where is short story about
project and some photos and link to projects code.

version 136
report:
Started to make a forecast component. Trying to save fron json to object but it doesnt work. Some how index numer is not okay to complier so i have to figure out why this doesn't work.

version 137
report: Forecast is working now. When you are saving items to object in component you have to be carefull
when react re renders the page, In my case that cause data  missing. Now i have to make a search view where
user can type the town or city. I have to make there also somekind of error handling.

bug:
Text field error helper test wont work. i made an if clause what gives user that api call response if
city not found.

bug: when you come back to forecast view again, it starts loading but nothing happens. after refreshing a page it works fine. Perhaps i have to plan how to set boolean variables wich allows application to
load api again. his is because props boolean stays false if user is selecting different page.(this fixed now)

version 138
Added information aboutme component. Link is not working and profile picture location must adjust to better
place

I put my own forecast api to this page and also i have to do apicall for longitude and latitude for place what user select.
Next i have to make a text fields where user can give countrycode. But this weatherapi doesn't work on us :)

version 139
forecast view is working now and user can give the wanted town or city to input field.
plan: I have to make this page mobile user friendly. I have to edit css that my page is working on mobile devices.

Now i tested the mobile view. Page is scaling the smaller devices and in mobile devices, hamburger menu disappear and
there is showing button navigation and headliner font is scaling smaller. I have to do more breakpoints to css

version 140
Building up the newas page. I choose to use news API called site. Documentations are clear. 
i add graphics, there is now textfield for search word and also select component to country code.

version 141
News page api has made. Still get cors error, so i have to check the solution about it. Also added search buttons to this news page.

version 142
cors server is up and configured. Some problem there is, because i dont know how to make apicall with
this cors server.

version 143
cors is okay now. I use a proxy setting in package.json. Lets build some graphics to news api component. 
bug: This version has problem on news_page components. It wont save data from json. I have to figure out, what is the problem.

version 144
Now the news page saves the data like i want. Next plan is to make a graphics, and aslo fix one bug from forecast api.

fixed. now the page shows top news from choosed country and everything based on search word. next thing to do is add calendar where user can choose time line. Then i have to do the error handling on textfields and etc. 

Bug: The news link is too long, it isi,nt responsive at all. It goes over the list column lines(fixed). 

added backdrop while site is loading api request. added also images from everything news view. Somehow this image works only everything cathegory. Api response dont have url link to image in top news.

added also in type.d.ts file a new interface to save needed data from apicall. This data will used to graphics.

Report:
now news page is woking well. The links button is not overflowing any more. There is only button, what takes user to source web page. I also notice the security, when user open the link from my page. I use the MUI's recomended setting.

report: Fixing also the working time component. still missing features, but i have to fix the data save
problems. 

version 145 
started to add some features on work_time component. There will be field, where user can check hours and payment in total.
there is some asyncronous data problems, but i have to figure it out first how to deal it easily.

version 146
new features updated on workingtime. Now the program calculates the hours, payment, and payment after taxes.



npm installs in this project:

npm install @mui/lab

npm install @mui/material @emotion/react @emotion/styled

npm install @mui/material @mui/styled-engine-sc styled-components

npm install @fontsource/roboto

npm install @mui/icons-material

npm install react-router-dom @types/react-router-dom

npm install moment-jalaali

npm install @date-io/jalaali

npm install date-fns --save

npm install @mui/x-date-pickers

folder cors-server
npm init -y 
npm i express
to start: node app