# Numble

[Demo](https://numble-22d7kxr51-sm-wm.vercel.app)

#### Description

Numble-Web is a web-based number game, inspired by wordle, where the player needs to guess a 4 digit number in multiple attempts. It’s a fun and engaging puzzle that challenges players’ logic and deduction skills!

#### Features

- **4-Digit Number Guessing:** The goal is to guess a 4-digit number correctly.
- **Feedback on Each Guess:** After each attempt, the number of green and yellow tiles will be revealed to show how close the attempt was to the solution:
  - Correct digits in the right place are marked green.
  - Correct digits in the wrong place are marked yellow.
  - Wrong digits are indicated as red, helping players refine their guesses.
- **Limited Attempts:** Players have a set number of attempts(10 guesses) to solve the puzzle.
- **User-Friendly Interface:** Interactive and intuitive gameplay designed for ease of use.
- **Statistics Tracking:** Players can view their game performance with a detailed statistics page, which includes:
  - Total games played.
  - Total XP and current XP earned.
  - Win percentage.
  - Streak and max streak of consecutive wins.
  - A guess distribution chart showing how many attempts it took to find the correct number in each game.
  - Login functionality to keep track of personal stats.

##### Game Play Screen
<img width="500" alt="Screenshot 2024-10-06 at 8 01 09 PM" src="https://github.com/user-attachments/assets/a83f525a-5c94-4b28-9edb-3eecdb7961a1">

##### Statistics Page

The game tracks your performance with detailed stats, allowing you to see your progress over time.
<img src="https://github.com/user-attachments/assets/0d6ded29-c051-4c79-a83a-c6e34790a448" alt="Statistics Page" width="500"/>

##### Game Play Video
https://github.com/user-attachments/assets/4e118587-a020-449f-955c-0b97e20d854e

#### Technology Overall Stack:
- Frontend: Next.js (React), Material UI, Redux, Axios, TailwindCSS
- Backend: Node.js, Express.js, PostgreSQL, JWT, Bcrypt
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT), bcrypt (password hashing)
