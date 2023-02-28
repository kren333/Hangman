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

TODO
- login sessions: how do you make it not just say ur logged in?
    - sign in with google?
- and then store the score in a big table of scores w/userid and timestamp maybe 
    - allows for summary stats for a given day
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

LONG TERM IDEAS
- some sort of psychological game - can you guess what the most popular current input is?
- hangman?
    - now database could store user statistics


