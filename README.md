## WACCA Leaderboard Tracker -- https://a2-ashleyfontaine-a25-nwp1.onrender.com/
I have created an application to track the high scores entered by players of the arcade rhythm game, "WACCA". Players input their username, score, combo, and breakdown of their accuracy, then set a password to update or delete their data later. 

To use the application, set a username and password and enter in a hypothetical performance.
The maximum score for any level is 1000000 points, and I've set the maximum combo for this level to be 1000. Score is used to determine a "Completion Grade", while accuracy is used to determine your completion of the song, a derived field. Once all boxes are filled, press submit to add your entry to the leaderboard.

To change your score or entry, use the same username and password with your new data. Once they validate, your new information entered will replace your old leaderboard info.

To delete an entry, simply use the delete form, underneath the entry form. Input the username and password of the entry to remove it.

A grid display is used for CSS positioning in this project.

## Technical Achievements
- **Tech Achievement 1 -- Updating Display**: Building a leaderboard application, I already had planned to have the server respond to updated by sending data back to the user. I went with a simple approach, having the server develop a single text string that could easily be inserted into the .innerHTML of the leaderboard table.

- **Tech Achievement 2 -- Modifying Data**: I decided that, rather than having a 3rd form with nearly identical boxes, I could reuse the entry form for double use, as well as handling what to do when users enter in the same name twice. To enact this, I simply have the server do a search through the leaderboard array to find a match name and then attempt to match the password. If the name is already there, it treats the entry data like updated information instead of a completely new entry.

### Design/Evaluation Achievements
- **Design Achievement 1 -- Testing UI**: 
For my first investigation, I tested with a Mr. Leu.

He took issue with the somewhat excessive nature of having to input 4 different boxes for accuracy. It's a lot of inputs of numbers that don't really even show up on the leaderboard that it felt exhaustive to have to input them all. 

I was surprised he commented on how smooth the forms were to use and how easy he discussed picking them up. It was very easy to tab through and input into several number based input boxes.

Based on their feedback, I could replace the accuracy inputs with a simple radio button to determine the player's completion level, since that's really the only thing accuracy is currently used for.

For my second investigation, I tested with a Mx. Jiang.

They took issue with inputing both the score and the breakdown of accuracy. Since they are dependent on each other, only one (the accuracy) really needs to be entered and the score can be dervied from there.

I was surprised when they commented on how straightfoward the setup was. I thought there might be more difficulty in understanding how to use a UI related to a game they were not all that familiar with, but they expressed the text on the page and the entry forms to be simple to understand.

Based on their feedback, I would calculate the player's score based off their accuracy. While this is in competition with the changed suggested in the first investigation, it does make it easier to not have to input a number that can be as great as 6 digits.
