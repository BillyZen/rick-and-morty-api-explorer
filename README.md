An api explorer for a Rick and Morty API carried out for Perdoo.

I have connected to a graphql API with Apollo Client.

I have created the UI for an API Explorer to showcase the results from the queries. This is includes switching between the 3 models (Characters, Locations, Episodes) as well as search functionality to filter specifically on the "name" property.

Some fields in the table show a small button with a "+" inside. This is to show that there is more detail to be found on this field so if you click the button you will open up a detail view. The styling is very limited in this page due to time constraints however the goal was to showcase the relationships in the data as well as provide a way to click on some fields (they will highlight when hovered over) to then begin a new search query for the table.

I made the decision to use a simple authentication mechanism using Auth0 as I already had a dev tennant set up that I could add a new test app to. This decision was made as it enabled me to showcase using a prisma generated database (just to store a simple app user model) as well as have a reason to set up tRPC properly and use its protected procedure functionality with context, as I know you guys are looking to move to the T3 stack.

I have carried out a couple of tests using jest and react test library. The challenge with this was more within the mocking of the authentication provider and the graphql client.

If you don't want to create your own log in please use: username: willjayandtay+123@hotmail.co.uk password: Perdoo123!
