# Algolia Setup Guide

I was unable to automate the setup in your Algolia dashboard, but I've prepared everything you need.

## 1. Login to Algolia
Go to [dashboard.algolia.com](https://dashboard.algolia.com/) and log in.

## 2. Select Application
Ensure you are in the application: **`Y6495VQAFE`**.

## 3. Create Index
1.  Go to **Search** > **Index** in the left sidebar.
2.  Click **Create Index**.
3.  Enter the name: **`prod_EVENTS`**.
4.  Click **Create**.

## 4. Upload Data
I have created a JSON file with ready-to-use events here:
`c:\Users\USER1\AMA Event Studio\ama-event-studio\events.json`

1.  In your new `prod_EVENTS` index, click **Upload Records** (or "Add records").
2.  Choose **Upload file**.
3.  Select the `events.json` file from your project folder.

## 5. Configure Index
Go to the **Configuration** tab of your index and set the following:

*   **Searchable Attributes**:
    *   `event_name`
    *   `venue_name`
    *   `event_type`
    *   `persona`
    *   `audience_segment`

*   **Attributes for Faceting**:
    *   `event_date_label`
    *   `venue_name`
    *   `audience_segment`
    *   `persona`
    *   `is_approved`

## 6. Re-enable Local Host
Once you have done this:
1.  Open `.env.local`.
2.  Uncomment your Algolia keys (remove the `#`).
3.  Restart your dev server.

Your app will then be connected to the live "Search Protocol".
