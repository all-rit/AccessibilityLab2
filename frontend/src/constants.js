/*
Data object for mainpage display.
Passed to system in following manner:
data.**insert lab or about page here**
which gives you an array of data
[0] = video link
[1] = title
[2] = description
[3] = links (which is an array within itself)
*/

const defaultVideo = 'https://www.youtube.com/embed/X9La_LjqGmY'

const data = {
  aboutPage: [defaultVideo,
              'About',
              'Learn more about the project as a whole.',
              ['http://all.rit.edu', 'http://all.rit.edu', 'http://all.rit.edu']
             ],
  lab1: ['https://www.youtube.com/embed/LlY0vmOO7iQ',
          'Lab 1 - Audio Cues',
          'Learn more about the first lab.',
          ['http://all.rit.edu', 'http://all.rit.edu', 'http://all.rit.edu']
        ],
  lab2: ['https://www.youtube.com/embed/770uTBSxEE8',
          'Lab 2 - Use of Colors',
          'Learn more about how color vision deficiencies matter in web apps.',
          ['http://all.rit.edu', 'http://all.rit.edu', 'http://all.rit.edu']
        ],
  lab3: ['https://www.youtube.com/embed/oV8BT1OpTb8',
          'Lab 3 - Where to Click',
          'Learn more about the third lab.',
          ['http://all.rit.edu', 'http://all.rit.edu', 'http://all.rit.edu']
        ],
  lab4: ['https://www.youtube.com/embed/USTwY5D0c8Y',
          'Lab 4 - Autoplay Video',
          'Learn more about the fourth lab.',
          ['http://all.rit.edu', 'http://all.rit.edu', 'http://all.rit.edu']
        ],
  lab5: ['https://www.youtube.com/embed/76BcJ-mUQ9M',
          'Lab 5 - Captions',
          'Learn more about the fifth lab.',
          ['http://all.rit.edu', 'http://all.rit.edu', 'http://all.rit.edu']
        ],
}

export default data;
