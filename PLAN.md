## PLAN.md

### Architectural Vision
- `index.html`: Main HTML file containing the form, input fields, and the display area for the creation date. It will link to Bootstrap CSS, a custom `style.css`, and a `script.js` file.
- `style.css`: Custom CSS for minor styling adjustments if needed.
- `script.js`: JavaScript file to handle fetching data from the GitHub API and updating the DOM.
- `README.md`: Project documentation.
- `LICENSE`: Existing license file.

### Component Strategy
- **HTML Structure (`index.html`):**
    - Use Bootstrap 5 CDN for styling.
    - A `div` with class `container` for content centering.
    - A `h1` for the page title.
    - A `form` element with `id="github-user-23f3004197"`.
        - Inside the form, a `div` with class `mb-3` for the username input.
            - `label` for username.
            - `input` with `type="text"`, `id="username-input"`, `class="form-control"`, and `placeholder="Enter GitHub username"`.
        - A `button` with `type="submit"`, `class="btn btn-primary"`, and text "Fetch Creation Date".
    - A `div` to display the creation date with `id="github-created-at"`. Initially, it will be empty or contain a placeholder.
    - A `div` to display error messages with `id="error-message"` with text color danger class.

### Styling Strategy
- Use Bootstrap 5 CDN for responsive design and basic styling.
- `style.css` will be used for any minor custom styles, mainly to ensure good spacing or alignment if Bootstrap defaults are not sufficient. I will start with an empty `style.css` and add styles only if necessary.

### Logic & Interactivity (`script.js`)
1.  **Event Listener:** Attach a `submit` event listener to the form `github-user-23f3004197`.
2.  **Prevent Default:** Prevent the default form submission behavior.
3.  **Get Username:** Retrieve the value from the username input field (`#username-input`).
4.  **Get Token (Optional):** Check if a `token` query parameter exists in the URL. If it does, include it in the API request header.
5.  **GitHub API Call:**
    - Construct the GitHub API URL: `https://api.github.com/users/{username}`.
    - Use `fetch` to make an asynchronous GET request to the API.
    - If a token is present, add an `Authorization` header: `Bearer YOUR_TOKEN`.
6.  **Handle Response:**
    - Parse the JSON response.
    - If the response is successful:
        - Extract the `created_at` field from the response.
        - Format the `created_at` date to `YYYY-MM-DD UTC`.
        - Display the formatted date in the `#github-created-at` element.
        - Clear any previous error messages.
    - If there's an error (e.g., user not found, network issue):
        - Display an appropriate error message in `#error-message`.
        - Clear the `#github-created-at` element.
7.  **Date Formatting:** Implement a helper function to format the ISO date string to `YYYY-MM-DD UTC`.

### Evaluation Criteria Compliance
- [x] **Form element with ID 'github-user-23f3004197':** The `index.html` will contain `<form id="github-user-23f3004197">`.
- [x] **Element with ID 'github-created-at' contains text that looks like a date (e.g., includes a year starting with '20'):** The `script.js` will fetch the `created_at` date from the GitHub API and display it in `YYYY-MM-DD UTC` format within `<div id="github-created-at">`.
- [x] **Script on the page that fetches data from the GitHub API (https://api.github.com/users/):** The `script.js` will use `fetch` to interact with `https://api.github.com/users/{username}`.