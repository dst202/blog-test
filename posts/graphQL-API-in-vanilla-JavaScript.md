---
title: 'Make requests to the GitHub GraphQL API with JavaScript'
slug: 'GraphQL-API-in-vanilla-JavaScript'
date: '2021-06-09'
description: 'Learn how to query the Github GraphQl API to make a clone of the github user profile repositories page...'
image: 'https://res.cloudinary.com/cortehz/image/upload/v1671086836/blog_images/main-image/graphQl.webp'
tags: ['javascript']
---

Github has a GraphQl API where that "offers flexibility and the ability to define precisely the data you want to fetch" according to the [docs](https://docs.github.com/en/graphql/overview/about-the-graphql-api) and I completely agree. So, we are going to take it for a spin and build a Github profile repositories page that should look just like this.

![github user profile repository](https://res.cloudinary.com/cortehz/image/upload/v1623190866/blog_images/github-repos.png)

It should take a username and show the user's public repository overview. We won't be using any frameworks for this, so we are going all vanilla - pure, undiluted HTML5, CSS and JavaScript. We would try to make our HTML5 as semantic as possible (ASAP - did i just come up with a thing?) and use CSS flexbox to flesh out our layout. Hopefully you would learn a thing or two. If you are here, I am assuming basic knowledge of these tools.

I usually like to make sure the basic logic are functional before I go ahead with things like the layout and thats the method we are following. From the screenshot, we can see what data we need already for the repositories page, so from top down we'd need:

- User Profile - name, username and Avatar
- Total number of repositories
- Total number of public repositories
- Repositories - name, description, stars, Number of forks, Language written in, last updated time

From the [Github GraphQL explorer](https://docs.github.com/en/graphql/overview/explorer) we can see every data that can be queried, but you'd need to have an account and be logged in as it queries for live, production data. Once signed in the explorer comes with a simple query to view the user:

```graphql
query {
  viewer {
    login
  }
}
```

The Github GraphQL api has a single end point *https://api.github.com/graphql*. To be able to make a request to the and fetch needed data we need to have an Authorization token, to get this navigate to your profile > Settings > Developer settings > Personal access tokens, and "generate a token". Give the following permissions to match permissions we have in the expolorer:

```graphql
user
public_repo
repo
repo_deployment
repo:status
read:repo_hook
read:org
read:public_key
read:gpg_key

```

Find a more detailed guide in the [docs](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) on how to generate a personal token. Copy the token and save somewhere safe and we can hit the road.
I'm using VScode and have "Live Server" extension installed. Create a folder for the project with you directory looking like this:

![project directory structure](https://res.cloudinary.com/cortehz/image/upload/v1623158372/blog_images/github-profile-files.png)

After scaffolding a basic html, css and javascript project as above. Link _style.css_ & _main.js_ to the _index.html_ and _profile.css_ & _profile.js_ to the _profile.html_ respectively. Now to make a request to the GraphQL endpoint, add the following to your _main.js_ and run the _index.html_ via LiveServer extension in VSCode.

```javascript
/**
 * - Github graphql single api endpoint.
 */
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

//async function to run our http request immediately we run the web server
(async function () {
  //variable holding the requested user's username
  const username = 'cortehz';

  //graphql query to get needed data
  const data = {
    query: `
query GetUserGithubDetails($username: String!){
  user(login: $username) {  
    avatarUrl(size: 250)
    bio
    name
    login
    allRepos: repositories {
        totalCount
    }  
    repositories(privacy: PUBLIC, first: 20) {
      totalCount
      nodes {
        name
        description
        forkCount
        updatedAt
        stargazers {
          totalCount
        }
         languages(first: 1) {
          nodes {
            color
            name
          }
        }
        forks {
          totalCount
        }
      }
    }
    
  }
}


    `,
    variables: {
      username: `${username}`,
    },
  };
  //declaring variables in graphql queries

  //awaiting fetch request
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'post',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  /**
   * Execute the query, and await the response
   */
  const json = await response.json();

  /**
   * Check if the query produced errors, otherwise use the results
   */
  if (json.errors) {
    console.log(json.errors);
  } else {
    console.log(json.data);
  }
})();
```

There you have it, you have made a request to a GraphQL endpoint with fetch. It is a self-calling async function that makes a request to the GitHub GraphQL endpoint and awaits the response. This is a POST request with our query as the body of the post, an Authorization header with your generated personal token. The query takes a name _GetUserGithubDetails_ (this can be whatever you want it to be) and declaring our expected username variable (currently hardcoded). The varibles are strongly typed as can be seen in our **String** declaration. Next we are querying for the user and giving the username via the login parameter. On the _user_ level we want the _avatarUrl_ at a size of 250px, _bio_,_name_, _login_. Also we want all the repo count as well as details of the public repos and their content. All of these (repo details) exists under the _repositories_ so we make use of an alias _allRepos_. This gives access to the _totalCount_ of the user's repo so we can still query for the public repos and get the last 20 with _repositories(privacy: PUBLIC, last: 20)_. Under repositories, we want the _totalCount_ of the the publicRepos, a list of nodes which contains all the data we want from the particular repo.

You should get a response that looks like this printed to the console:

![github repostories JSON](https://res.cloudinary.com/cortehz/image/upload/v1623199736/blog_images/jsongithubprofile.png)

We are presently hard-coding our username but we want to be able to take in an input and make a request to fetch that users data. In our _index.html_ we are going to add a form with an input tag and a submit button to handle dynamic username inputs.

```html
<div class="container">
  <div class="content__container">
    <!-- Github icon from fontawesome -->
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      class="svg-inline--fa fa-github fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      width="48"
      height="48"
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
    <h1 class="github__header">Show Github Repositories</h1>

    <!-- panel to handle errors and show to the user -->
    <div class="error__pane"></div>
    <main class="main__container">
      <!-- form to collect user name and make a request -->
      <form class="username__form">
        <label for="username">Username</label>
        <input
          type="text"
          autocomplete="off"
          name="username"
          class="username_input"
          required
        />
        <button type="submit" class="username_button">
          <span>Show Repos</span>
          <span class="loading"></span>
        </button>
      </form>
    </main>
  </div>
</div>
```

We have created an empty container with the _error\_\_pane_ class to handle possible errors, also the form input with a required attribute to avoid empty submissions as well as an element to show some loading state in the button for a good user experience. Tried to make the inputs look as close to the Github as possible, borrowing some attributes from Github we can now add this to our _style.css_ to give some color to our elements:

```css
body,
html {
  background-color: #0d1117;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
    Apple Color Emoji, Segoe UI Emoji;
}

* {
  box-sizing: border-box;
}

/* make container a flex container */
.container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2rem;
  min-height: 100vh;
  width: 100%;
}

.content__container {
  display: flex;
  flex-direction: column;
  width: 340px;
  color: #fff;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.github__header {
  font-size: 1.2rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

/* class to toggle for when there is an error loading current user */
.is__error {
  display: flex;
  width: 340px;
  flex-wrap: nowrap;
  justify-content: space-between;
  word-break: break-all;
  border: 1px solid #f8514966;
  color: #ff7b72;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  background-image: linear-gradient(#f851491a, #f851491a);
}

/* button to clear current error*/
.cancel__error {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.main__container {
  width: 100%;
  background: #161c22;
  border-radius: 6px;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.username_input {
  background-color: #0d1117;
  color: #fff;
  padding: 0.6rem;
  border: 1px solid #20252d;
  margin-top: 0.3rem;
  margin-bottom: 1.2rem;
  border-radius: 6px;
}

.username_input:focus {
  outline: none;
  border: 1px solid #58a6ff;
  box-shadow: 0px 0px 2px 3px #0d2d6b;
}

.username_button {
  display: flex;
  justify-content: center;
  background: #34a042;
  border-radius: 6px;
  padding: 0.6rem;
  border: none;
  color: #fff;
}

/* loading styles */

/* class to add when we are loading a user */
.loading__indicator {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  margin-left: 10px;
  border-top: 2px solid #267530;
  background: transparent;
  width: 15px;
  height: 15px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.username_button:disabled {
  background: #34a0426f;
  cursor: not-allowed;
}
```

We should now have a page that looks like this:

![github user repostories input page](https://res.cloudinary.com/cortehz/image/upload/v1623158091/blog_images/github-profile.png)

In our _main.js_ we need to change our earlier self-calling async function to trigger only when the user submits the form, add the following to the top of the file, just beneath our endpoint URL declaration, replacing the self-calling async and hardcoded username.

```javascript

...

//get all the DOM element created above
const errorPanel = document.querySelector(".error__pane"),
form = document.querySelector(".username__form"),
input = document.querySelector(".username_input"),
button = document.querySelector(".username_button"),
loadingIndicator = document.querySelector(".loading")

//function to clear error
function clearError() {
  errorPanel.innerHTML = "";
  errorPanel.classList.remove("is__error");
}

//initialize an empty array to put our incoming data
let userData = [];

//async function to run our http request
async function getUserRepo(evt) {
  evt.preventDefault();
  const username = input.value;
  if (username === "") return;

  //add class to the loading indictor element
  loadingIndicator.classList.add("loading__indicator");

  ...

```

In our _if - else_ response handlers with the following, replacing the _console.logs_

```javascript
...

if (json.errors) {

  //add the is__error class if there's an error
  //set the innerHTML the the error message
  //add an onclick event to call clearError() and reset above two

    errorPanel.classList.add("is__error");
    errorPanel.innerHTML = `
        <p>${json.errors[0].message}</p>
        <span onClick="clearError()" class="cancel__error">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </span>
        `;

//reset our loading indicator once the request finishes with an error
    loadingIndicator.classList.remove("loading__indicator");
    loadingIndicator.innerHTML = "";
  } else {

    //if request was successfull populate our array with the incoming data
    userData.push(json.data);

    //we want to navigate to a new page so we call the history object of the window
    //we pass our data to the with pushState to make it available in the profile page
    //finally we navigate to the profile page
    window.location.href = "profile.html";
    window.history.pushState(userData, "profile", "/profile.html");

    //clear lingering errors and loading state after success
    clearError();
    form.reset();
    loadingIndicator.classList.remove("loading__indicator");
    loadingIndicator.innerHTML = "";
    }
  }


//finally we call the above getUserRepo() on form submit
form.addEventListener("submit", getUserRepo);

```

We have successfully refactored our _main.js_ to call on submit with some User experience for loading and error states. We also added an extra-check to stop the function from completing if the input turns out to be empty somehow asides our required flag in the input. We have also used the _pushState()_ available on the _window.history_ object. With this we can pass the current _userData_ down to the profile page. You might want to look at pushState on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) before you pass objects that surpasses the 2mb limit.

When we enter a nonexistent username we should see an error displayed similar to GitHub as a result of our error handler above. Try it out with a bunch of random usernames. You might need to try the most absurd, I found out developers have a username for the most weirdest of combinations, you might find someone for almost everything. Your error should look just like this:

![github user repostories error page](https://res.cloudinary.com/cortehz/image/upload/v1623191939/blog_images/github-error.png)

Next, in _profile.js_ and _profile.html_ we will receive the data passed down from _pushState_ and add to the DOM accordingly. The data can be found found the window object via _window.history.state[0].user_. First off, quickly create a minimal header and a tabbed navigation with some JavaScript similar to GitHub. We want to add this inside the body tag of _profile.html_:

```html
<header>
  <a href="/">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      class="svg-inline--fa fa-github fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      width="30"
      height="30"
    >
      <path
        fill="#fff"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  </a>

  <img
    alt="user profile thumbnail"
    class="profile__thumbnail"
    width="35"
    height="35"
  />
</header>
<!-- tabbed navigation -->
<nav class="profile__nav tabs">
  <ul class="nav__items" role="tablist">
    <li><a href="#overview">Overview</a></li>
    <li class="is__active">
      <a href="#repositories"
        ><span>Repositories</span> <span class="repo__total"></span
      ></a>
    </li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#packages">Packages</a></li>
  </ul>
</nav>

<main class="github__main">
  <!-- side bar -->
  <div class="side__bar__profile">
    <div class="avatar__container">
      <img class="profile__avatar" alt="github profile avatar" />
    </div>

    <h1>
      <span class="user__name"> </span>
      <span class="username"> </span>
    </h1>
    <div class="user__bio"></div>
  </div>

  <!-- main content -->
  <div class="profile__main nav__tabs__content">
    <section class="tab__content" id="overview">Overview</section>
    <!-- repository tab content -->
    <section class="tab__content is__active" id="repositories">
      <!-- filter section beginning -->
      <div class="section__filters">
        <div class="search__bar">
          <input type="text" placeholder="Find a repository..." />
        </div>
        <div class="search__bar">
          <p class="repos__showing"></p>
        </div>
        <!-- repo section container -->
        <ul class="repository__container"></ul>
      </div>
    </section>
    <section class="tab__content" id="projects">Projects</section>
    <section class="tab__content" id="packages">Packages</section>
  </div>
  <!-- main content end-->
</main>
<script src="/js/profile.js" async defer></script>
```

This give a quick markup for what our repos page should look like, it has a header, some tabbed navigation, side profile view and repos area. Since the side profile is a main part of the view I didn't consider using an `<aside>` tag for it. Next we are going to add some styling to it and then display our incoming data. Remember to link your `profile.css` in this file and these lines of code:

```css
body {
  margin: 0;
  color: #24292f;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
    Apple Color Emoji, Segoe UI Emoji;
}
a {
  color: #24292f;
}

img {
  max-width: 100%;
}

li,
ul {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
}

/* make header a flex container and place github logo and user avatar on opposite sides */
header {
  display: flex;
  background: #24292e;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

header img {
  border-radius: 50%;
}

/* main section that contains side profile and repo content */
.github__main {
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: auto;
}

/* side profile styling */
.side__bar__profile {
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-top: -32px;
  padding: 0 1rem;
}

@media screen and (max-width: 630px) {
  .side__bar__profile {
    margin-top: 0;
  }
}

.avatar__container img {
  border-radius: 50%;
}

.side__bar__profile h1 {
  display: flex;
  flex-direction: column;
}

span.username {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #586069;
}

/* content section */

/* navigation */
.nav__items {
  display: flex;
  overflow-x: scroll;
  margin: 0;
}
.profile__main {
  display: flex;
  flex-direction: column;
  flex: 5;
}

.profile__nav {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ebedef;
}
.side__placeholder {
  flex: 2;
}

.nav__items li {
  padding: 0.8rem;
}

.nav__items li a {
  display: flex;
  flex-wrap: nowrap;
}

.nav__items li.is__active {
  border-bottom: 2px solid #f4816c;
  font-weight: 600;
}

.repo__total {
  background-color: #d1d5da80;
  padding: 2px 9px;
  border-radius: 10px;
  margin-left: 5px;
}

.tab__content {
  display: none;
}

.tab__content.is__active {
  display: flex;
  width: 95%;
  padding: 10px;
}

/* repo section */
.section__filters {
  width: 100%;
}

.search__bar {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ebedef;
}

.search__bar input {
  width: 100%;
  border: 1px solid #ebedef;
  padding: 7px 15px;
  margin: 15px 0;
  border-radius: 6px;
}

.repository__container_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebedef;
  margin: 1.5rem 0;
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  color: #24292f;
}

.repository__container_list a {
  color: #0366d6;
  font-size: 20px;
  font-weight: 600;
}

.repo__detail {
  flex: 4;
}

.repo__description {
  word-wrap: break-word;
}

.repo__tags {
  display: flex;
  align-items: center;
  gap: 10px;
}

.repo__tags .tags {
  display: flex;
}

.tag {
  display: flex;
  align-items: center;
}

.language__color {
  display: block;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.star__button {
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #d9dbdb;
  padding: 3px 12px;
  height: 30px;
  background-color: #fafbfc;
  line-height: 20px;
}

.star__button img {
  margin-right: 5px;
}
```

Next we want to actually show the user some data when they are in the repository tab. All other tabs will be left empty as we are only pulling the repos. Add some JavaScript to _profile.js_ to handle the tabs:

```js
//tabs for top navigation

//select all tab DOM items/links
const tabs = document.querySelectorAll('.tabs li');

//select all tab link content
const sections = document.querySelectorAll('.nav__tabs__content .tab__content');

// click handler to all tabs that removes the current active tab and
// adds the currently clicked one as active
tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveTab();
    addActiveTab(tab);
  });
});

//loop through individual tab links and content and remove the is__active class
const removeActiveTab = () => {
  tabs.forEach((tab) => {
    tab.classList.remove('is__active');
  });
  sections.forEach((section) => {
    section.classList.remove('is__active');
  });
};

//add active class to currently clicked one and match the href to the tab section
//href on each tab link maps to the id of the content then adds an is__active class to that element
const addActiveTab = (tab) => {
  tab.classList.add('is__active');
  const href = tab.querySelector('a').getAttribute('href');
  const matchingSection = document.querySelector(href);
  matchingSection.classList.add('is__active');
};
```

Next we want to actually populate our dom with the data so right underneath these, add some logic to make use of the data like so:

```js
//using object destructuring to get needed data coming from our pushState in main.js
const { allRepos, avatarUrl, bio, login, name, repositories } =
  window.history.state[0].user;

//get all the DOM elements we want to pass our incoming data to
const avatar = document.querySelector('.profile__avatar'),
  headerProfilehumbnail = document.querySelector('.profile__thumbnail'),
  fullName = document.querySelector('.user__name'),
  username = document.querySelector('.username'),
  userBio = document.querySelector('.user__bio'),
  allRepoCount = document.querySelector('.repo__total'),
  repoResultShowing = document.querySelector('.repos__showing'),
  repoDetailsContainer = document.querySelector('.repository__container');

//set the src for images and innerHTML of our selected elements to incoming data
avatar.src = avatarUrl;
headerProfilehumbnail.src = avatarUrl;
fullName.innerHTML = name;
username.innerHTML = login;
userBio.innerHTML = bio;
allRepoCount.innerHTML = allRepos.totalCount;
repoResultShowing.innerHTML = `<strong>${repositories.totalCount}</strong> results for <strong>public</strong> repositories`;

// showing repos logic

//loop through the repositories array and destructure all the properties we need via .map()
//return a list item for each of those repository details and assign the list to the repoList variable
//.join("") removes the extra backticks from our template strings
//finally put each of the <li></li> in the innerHTML of the repoDetailsContainer which is a <ul>
const repoList = repositories.nodes
  .map(({ name, description, stargazers, updatedAt, languages, forks }) => {
    return `<li class="repository__container_list">
      <div class="repo__detail">
        <a href="#">${name}</a>
        <p class="repo__description">${description ? description : ''}</p>
        <span class="repo__tags">
          <div class="tag">
          <span class="language__color" style="background: ${
            languages.nodes.length ? languages.nodes[0].color : ''
          }">
          </span>
          ${languages.nodes.length ? languages.nodes[0].name : ''}
          </div>
          <div class="tag">
          <img alt="star icon for stars count" src="/assets/images/star-regular.svg"/>
          ${stargazers.totalCount}
          </div>
           <div class="tag">
          ${forks.totalCount}
          </div>
          <div class="tag">
          ${updatedAt}
          </div>
        </span>
      </div>
      <button class="star__button"> <img alt="star icon for stars count" src="/assets/images/star-regular.svg"/> star</button>
    </li>`;
  })
  .join('');

repoDetailsContainer.innerHTML = repoList;
```

Hopefully, the comments do some justice as to what is going on. In the end, we have successfully created a very minimal Github profile to fetch any users first 20 repositories through the GitHub GraphQL API and displayed the data. With GraphQL it is easy to query for data - through one endpoint - that might usually need requests to multiple endpoints in a REST API. If you want to take a look at the complete code please checkout the repo on GitHub [here](https://github.com/cortehz/github-profile). I hope this was worth your time. In part two, we would add a search to be able to filter through through the displayed repos.
