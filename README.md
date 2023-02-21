a tiny application to guess the secret word in the contents of a txt file!

my first solo experience with connecting nodejs and react; was a fun time :)

TODO
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

LONG TERM IDEAS
- some sort of psychological game - can you guess what the most popular current input is?
- hangman?
    - now database could store user statistics

DONE
- functioning frontend and backend
- headers and footers
- handles post requests
- moved footer to bottom of page with css style formatting
- read from file to access secret word in the backend
- link an about page + routering + link logic
- a signup page
- working signup info -> sql!

