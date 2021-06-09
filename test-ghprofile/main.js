/**
 * - Github graphql single api endpoint.
 */
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
//get all the DOM element created above
const errorPanel = document.querySelector(".error__pane"),
  form = document.querySelector(".username__form"),
  input = document.querySelector(".username_input"),
  button = document.querySelector(".username_button"),
  loadingIndicator = document.querySelector(".loading");

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
    method: "post",
    mode: "cors",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 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`,
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
