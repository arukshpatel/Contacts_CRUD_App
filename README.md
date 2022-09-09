# Contacts CRUD App
This is basic CRUD application. It is a phone book, where you can <strong>Create</strong>
a contact, <strong>Read</strong> the contacts list from the database, <strong>Update</strong>
the contact, and <strong>Delete</strong> the contact(s).

Front-end of the application is developed using React.js and TailwindCSS. 

Back-end of the application is developed using Express.js alongside MongoDB.

---
### WARNING:
I am using the FREE tier of MongoDB (Mongo Atlas), so I have limited storage.

#### <i>Why is my account tier a concern?<br></i>
Because I have included my API key within the server file.<br>
<b>YES I know!!</b> That is one of THE dumbest things I can do, however, this project was only developed to be seen by Recruiters at AllTech, I suppose. 

The best approach would be to place my keys in <code>.env</code> file, but that defeats the purpose of having a project that'd be ready to use, if and when the recruiters see this.

To sum it up, <b>PLEASE LIMIT THE AMOUNT OF CONTACTS YOU SUBMIT. <br> i.e <code><i>n <= 100</i></code></b> n = num. of contacts

---

### Install
This project has been split into two subdirectories client and server. 
- `/client` = Frontend
- `/server` = Backend

1. Clone [this](https://github.com/arukshpatel/Contacts_CRUD_App.git) repo
2. `cd`(navigate in terminal) into the cloned directory
3. `cd` (navigate in terminal) into the `\client` directory
4. run `npm install`
5. `cd` (navigate in terminal) into the `\source` directory
6. run `npm install` 
7. Ensuring all the packages have downloaded, now is the time to boot the server and run the front-end.
8. To start server:
    - `cd` (navigate in terminal) into `\server`
    - run `npm run start` in terminal. It _should_ start on [localhost:8000](http://localhost:8000).<br>If successful, terminal should print: <br> _"Server started on port 8000. Visit http://localhost:8000 for more info"_
      - **TIP**: I highly recommend going to [localhost:8000](http://localhost:8000) to ensure server is working.
9. To start frontend client:
   - open a new terminal
   - `cd` (navigate in terminal) into `\client`
   - run `npm run start` in terminal. It _should_ start on [localhost:3000](http://localhost:3000).

10. To stop servers, simply press `^C` for Mac OSX or `Ctrl+C` in Windows in their respective terminals.

---

#### Note to AllTech Recruiter(s):

If everything is successfully loaded, and you are pleased with my work, I'd love to hear from you.

Although this is a very brief demonstration of my skills, I feel that I have the drive to learn and output the best project(s) for the company.

Hope to hear from you soon! 😊

Best,<br>
Aruksh Patel