a tiny application to guess the secret word in the contents of a txt file!

my first solo experience with connecting nodejs and react; was a fun time :)

DONE
- functioning react frontend and nodejs backend
- functional routes between home, about, signin, and signup pages
- axios-based get and post requests
- useState hooks that handle the entries as well as the username/password information
- headers and footers
- handles post requests
- moved footer to bottom of page with css style formatting
- read from file to access secret word in the backend
- read from gitignored file to access sql password
- link an about page + routering + link logic
- a signup page
- sql connection for signup/signin page post requests
- a sql user table of username/password information
- working signup info -> sql! disallows insertion of repeat usernames as well
- working login validation -> sql!
- basic score variable
    - table of scores and usernames
- basic login sessions (keeps track of username) stored in localStorage
- logout button that resets variable kept in localStorage
- conditionally rendered components
- randomized word selection and word/score resetting and successful guess

TODO
- refactor 'word' in home.js
- sign in with google?
- once you get to word, new component that lets you go back to home
- change logout to erase localstorage and still display conditional greeting message
- statistics page/summary stats for a given day; keep track of timestamps?
- a word of the day
    - some metric that will lyk if you're getting closer or further
        - number of letters
        - display a hint everytime you get the wrong answer
    - limited tries?
- make a database to store past responses
    - tables:
        - users
            - username
            - password
        - responses
            - id (auto_increment primary key)
            - submitter (foreign key referencing users)
            - the word itself
    - ideas:
        - group by answer content to get number of times each answer has been submitted
        - make a login to store user information
    - a secret password that j brings you somewhere else!

BUGS
- if you inspect element an unseen username into localstorage, submitting a score will explode ur backend bc  score needs to be a foreign key e.g. all usernames need to be in the users table (also you can submit scores on behalf of players you aren't signed in for)

LONG TERM IDEAS
- some sort of psychological game - can you guess what the most popular current input is?
- hangman?
    - now database could store user statistics
- an nlp bot you can play 20 questions with?


