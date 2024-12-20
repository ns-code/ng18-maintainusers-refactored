## README

This project is a refactored version of https://github.com/ns-code/ng18-maintainusers

This version introduces signal usage. This refactoring enables the following benefits:

1. Much simplified Components code
2. A simple state management and
3. Simplified unit testing

This is an Angular-v18 project that illustrates CRUD functionality implementation for a maintain users application. It gets data from a backend REST API server https://github.com/ns-code/ns-maintain-users

## Install

Clone this repo using 'git clone https://github.com/ns-code/ng18-maintainusers-refactored.git'
After cloning run 'npm install' to install the needed packages. 

## Test

Run `ng test` to run the Karma/Jasmine unit test cases. (If you have a different version of Angular installed globally, then you can use 'npx ng test')

Run `ng e2e` to run the Cypress e2e integration test cases. (If you have a different version of Angular installed globally, then you can use 'npx ng e2e')

### Usage

With the above-mentioned API server running, run 'ng serve' (or 'npx ng run' if you have different version of Angular installed globally). The app can then be accessed using http://localhost:4200

