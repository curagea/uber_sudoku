Santa Sudoku
===========
Updated December 22, 2014

Here's Santa Sudoku, a very simple Sudoku game with a little holiday flair.

I had a blast doing this code test, and I hope you enjoy it!

## Disclaimer
I haven't been active in web development for several months, so I spent some time
re-learning a few things. There's more that I could have done, to be sure, but
my main goal was to have a Sudoku game playable in some capacity. I also wanted
to give the game some visual appeal too, so it wouldn't look so bland. So yes, I
did spend some time drawing Santa.

## Setting Up the App
Within the app's folder, just run:
`npm install`
`grunt`
... and hit the index file in your browser!

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
Fairly simple organization: Javascript files are in js/, Sass files are in scss/.

## Browsers Tested
* Google Chrome on Mac
* IE10
* Mobile Safari on an iPhone 4S

It *should* look fine on a Retina Mac, though since I don't have one, I can't tell.

## Decisions

### Tables versus flexbox
I thought about using flex-box for the board markup, because semantically
speaking, tables are for tabular data, like listing different heights at
different times, for example. Then I realized that, essentially, the various
digits in a Sudoku game *are* tabular data; different digits reside at different
locations on a board. Also, flexbox wouldn't have been much simpler to deal with.

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

Also, the Santa sprite is a little tall for mobile :/

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
smartphone at this point. But a pixel is not a pixel is not a pixel, not with
Retina and similar display technologies running around. I believe server-side
detection is the more foolproof way to go regarding coding for responsive design,
but that's a little out of my skillset to implement.

## In Conclusion
That should be it! The code should be self-explanatory enough along with the
documentation. While challenging, the code test was quite a fun one to do :)
