This took me some time to figure out.

Following are the biggest mistakes that I made - 

1. Not copying the API_URL properly where I did not add the s in the http.
2. Did not use the "use strict" mode in JS, resulting in me not passing the tests simply due to me not adding the "let" or "const" keyword prior to the trimmed variable declaration.
3. According to Cursor, the way I created the loop to add the creature types was not the most ideal - I was suggested to use immediate reassignment and the map followed by join methods
4. Used the find method to get the specific object for specific attributes like HP, attack, and defense. Using array indexing would be a better idea.

I also used Cursor to take care of repetitive code - like generating the initial declarations for grabbing the DOM elements to be modified.
