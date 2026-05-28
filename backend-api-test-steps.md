# ParkEase Backend API Testing in Thunder Client

Thunder Client version 2.40 keeps workspace collections behind a paid feature, so the saved workspace collection may not appear automatically in the Activity panel.

To see the requests in Activity:

1. Open `thunder-client-import-curl.txt`.
2. Copy the first cURL command.
3. In Thunder Client, click `Import cURL`.
4. Paste it and import.
5. Send the request once. It will appear in Activity.
6. Repeat for the other requests.

Run order:

1. `GET /api/spots`
2. `POST /api/auth/register`
3. `POST /api/auth/login`
4. Copy the login `token`.
5. Copy one parking spot `_id` from `/api/spots`.
6. Replace `PASTE_TOKEN_HERE` and `PASTE_SPOT_ID_HERE`.
7. Run book, history, history by regNo, and unbook requests.
