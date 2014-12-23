Santa Sudoku
===========
Updated December 22, 2014

Here's Santa Sudoku, a very simple Sudoku game with a little holiday flair. It
has just one board that's easy to solve.

I had a blast doing this code test, and I hope you enjoy it!

## Disclaimer
I haven't been active in web development for several months, so I spent some time
re-learning a few things. There's more that I could have done, to be sure, but
my main goal was to have a Sudoku game playable in some capacity. I also wanted
to give the game some visual appeal too, so it wouldn't look so bland. So yes, I
did spend some time drawing and animating Santa.

## Setting Up the App
Within the app's folder, just run:
```
npm install
grunt
```
This should generate the css/ folder holding the stylesheet, and index.html. All
generated files are compressed.

Then just hit that HTML in your browser!

## Tools Used
This application uses the following:
* **Jade** for HTML templating
* **jQuery**
* **Sass**

Jade was chosen because I needed a fairly simple templating engine to render the
game board. I wasn't about to write all the board cells by hand! Mustache.js
felt a little too logic-less for my tastes. Trying out Jade was a good workout.

I picked jQuery out of familiarity.

Sass saved my hands from RSI.

## App Structure
Fairly simple organization. Should be self-explanatory, though on production I
would put jQuery and third-party plugins in a separate folder within js/. Same
goes for Sass files.

The image files have also been optimized to reduce file size.

## Browsers Tested
* Google Chrome on Mac
* IE10
* Mobile Safari on an iPhone 4S

It *should* look fine on a Retina Mac, but since I don't have one, I can't tell.

## Decisions

### Tables versus flexbox
I thought about using flex-box for the board markup, but tables are more appropriate,
semantically speaking. Digits are data for the board, after all.

At least I didn't use tables for layout :/

### Storing the board state
At the start of this project, I had in mind three structures to store the board
state, and the difference between the structures was only that they stored digits
in slightly different ways. There was the Rows array which stored digits by row,
Columns storing digits by column, and Blocks storing by 3x3. Order didn't matter
in each. I had these structures on the basis of "less work at the cost of more
space". Later, I realized it would be a pain to update these structures when a
new digit is stored. Moreover, constructing a row or column when needed from
just one structure was just as fast as a simple fetch. So I ditched the multiple
structures in favor of just one structure to hold the digits. "More work, less
space".

## TODOs (or: Stuff That Could Have Been Done)

### More game options
These included restarting a game, and showing the solution as a last resort.

### Showing when a row/column/block is successfully completed
I wanted to highlight, in some way, a row/column/block whenever it's valid and
completed. That would require an extra check whenever a digit is successfully
entered and stored.

### Unit tests
I usually write them after implementing code first. Probably a bad habit that I
should banish.

### Loading the initial board state as JSON into the template at compile-time
Would have been a nice exercise to try :).

### Animating Santa using CSS keyframes
Santa's moods are each in its own sprite, as animated GIFs. With time, I could
combine all the frames into one spritsheet and use keyframe animation. Saves
HTTP requests and file size.

### Different ways of entering digits
The current implementation checks when an input loses focus and has its text
changed. Ideally, I'd have the check on keypress instead, so it highlights
immediately on an invalid entry (like putting in a non-digit). Moreover, it would
allow just one character in each cell; any attempts to put in more characters
would simply replace the existing one.

I've also seen one game where the player chooses from a list of possible digits
in each cell. I'd much like to try that one out.

### A more robust way of detecting mobile devices
I have a CSS media query set to detect device width by pixels. It's arbitrarily
set at 1024px because that value seems to be the absolute max for any given
smartphone at this point, but more should be written, like adding device-pixel-ratio.

## In Conclusion
That should be it! The code should be self-explanatory enough along with the
documentation. While challenging, the code test was quite a fun one to do :)
