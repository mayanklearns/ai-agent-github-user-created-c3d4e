# PLAN.md

## 1. Architectural Vision

This plan addresses the requirement to add an `aria-live` region to the existing GitHub user lookup application. The goal is to provide screen reader users with status updates during the API request lifecycle (start, success, failure).

- **`index.html`**: Will be modified to include a new `div` element with the ID `github-status`. This element will have the `aria-live="polite"` attribute and be visually hidden but accessible to screen readers.
- **`script.js`**: Will be updated to control the text content of the `#github-status` element, reflecting the current state of the user lookup process.

## 2. Component Strategy (HTML)

- A new `div` will be added to `index.html`.
- **Element**: `<div id="github-status" class="visually-hidden" aria-live="polite"></div>`
- **Rationale**:
    - `id="github-status"`: Meets the requirement for the specific ID.
    - `aria-live="polite"`: Fulfills the accessibility requirement, ensuring screen readers announce changes without interrupting the user.
    - `class="visually-hidden"`: This is a Bootstrap 5 utility class that hides the element visually but keeps it available for screen readers. This is the correct approach for an `aria-live` region that is not meant to be a primary visual component. It's superior to `display: none;` which would hide it from assistive technologies.

This element will be placed near the other status-related `divs` for logical grouping.

## 3. Styling Strategy (CSS)

- No changes to `style.css` are required.
- The Bootstrap 5 `visually-hidden` class will be used directly in the HTML to manage the appearance of the new `aria-live` element.

## 4. Logic & Interactivity (JavaScript)

The `script.js` file will be modified as follows:

1.  **Get Element Reference**: At the beginning of the script, get a reference to the new `#github-status` element.
    ```javascript
    const statusDiv = document.getElementById('github-status');
    ```
2.  **Update on Fetch Start**: Inside the `'submit'` event listener, before the `try` block, update the status to indicate the lookup has started.
    ```javascript
    statusDiv.textContent = 'Looking up GitHub user...';
    ```
3.  **Update on Success**: In the `try` block, upon a successful API response (`response.ok`), update the status to announce the success.
    ```javascript
    statusDiv.textContent = 'User found. Account creation date is displayed.';
    ```
4.  **Update on Failure**: In both the `else` block (for API errors like 404) and the `catch` block (for network errors), update the status to announce the failure, including the specific error message.
    ```javascript
    statusDiv.textContent = `Error: ${data.message || 'Failed to fetch GitHub user data.'}`;
    // and
    statusDiv.textContent = 'Error: Network error or unable to connect to GitHub API.';
    ```

## 5. Evaluation Criteria Compliance Checklist

- [x] **The element with ID 'github-status' has an aria-live attribute set to 'polite'.**
    - This will be achieved by adding `<div id="github-status" aria-live="polite" ...>` to `index.html`.
- [x] **There is a script on the page that references 'github-status'.**
    - `script.js` will be modified to get the element by ID and update its `textContent` property, satisfying this requirement.
- [x] **Ensure existing functionality remains intact.**
    - The changes are additive. The existing visual feedback (`#github-created-at` and `#error-message` divs) will continue to function as before. The new `aria-live` region provides an additional, non-visual layer of feedback.
- [x] **Update `README.md` with new URLs.**
    - The `README.md` will be updated with the provided repository and live demo URLs in the final review phase.
