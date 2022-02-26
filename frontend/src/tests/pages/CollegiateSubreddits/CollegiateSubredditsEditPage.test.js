// import { fireEvent, queryByTestId, render, waitFor } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { MemoryRouter } from "react-router-dom";
// import CollegiateSubredditsEditPage from "main/pages/CollegiateSubreddits/CollegiateSubredditsEditPage";

// import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
// import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
// import axios from "axios";
// import AxiosMockAdapter from "axios-mock-adapter";


// const mockToast = jest.fn();
// jest.mock('react-toastify', () => {
//     const originalModule = jest.requireActual('react-toastify');
//     return {
//         __esModule: true,
//         ...originalModule,
//         toast: (x) => mockToast(x)
//     };
// });

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => {
//     const originalModule = jest.requireActual('react-router-dom');
//     return {
//         __esModule: true,
//         ...originalModule,
//         useParams: () => ({
//             id: 17
//         }),
//         Navigate: (x) => { mockNavigate(x); return null; }
//     };
// });

// describe("CollegiateSubredditsEditPage tests", () => {

//     describe("when the backend doesn't return a todo", () => {

//         const axiosMock = new AxiosMockAdapter(axios);

//         beforeEach(() => {
//             axiosMock.reset();
//             axiosMock.resetHistory();
//             axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
//             axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
//             axiosMock.onGet("/api/collegiatesubreddits", { params: { id: 17 } }).timeout();
//         });

//         const queryClient = new QueryClient();
//         test("renders header but table is not present", async () => {
//             const {getByText, queryByTestId} = render(
//                 <QueryClientProvider client={queryClient}>
//                     <MemoryRouter>
//                         <CollegiateSubredditsEditPage />
//                     </MemoryRouter>
//                 </QueryClientProvider>
//             );
//             await waitFor(() => expect(getByText("Edit CollegiateSubreddit")).toBeInTheDocument());
//             expect(queryByTestId("CollegiateSubredditForm-name")).not.toBeInTheDocument();
//         });
//     });

//     describe("tests where backend is working normally", () => {

//         const axiosMock = new AxiosMockAdapter(axios);

//         beforeEach(() => {
//             axiosMock.reset();
//             axiosMock.resetHistory();
//             axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
//             axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
//             axiosMock.onGet("/api/collegiatesubreddit", { params: { id: 17 } }).reply(200, {
//                 id: 17,
//                 name: "name",
//                 location: "location",
//                 subreddit: "subreddit"
//             });
//             axiosMock.onPut('/api/collegiatesubreddit').reply(200, {
//                 id: "17",
//                 name: "name2",
//                 location: "location2",
//                 subreddit: "subreddit2"
//             });
//         });

//         const queryClient = new QueryClient();
//         test("renders without crashing", () => {
//             render(
//                 <QueryClientProvider client={queryClient}>
//                     <MemoryRouter>
//                         <CollegiateSubredditsEditPage />
//                     </MemoryRouter>
//                 </QueryClientProvider>
//             );
//         });

//         test("Is populated with the data provided", async () => {

//             const { getByTestId } = render(
//                 <QueryClientProvider client={queryClient}>
//                     <MemoryRouter>
//                         <CollegiateSubredditsEditPage />
//                     </MemoryRouter>
//                 </QueryClientProvider>
//             );

//             await waitFor(() => expect(getByTestId("CollegiateSubredditForm-name")).toBeInTheDocument());

//             const idField = getByTestId("CollegiateSubredditForm-id");
//             const nameField = getByTestId("CollegiateSubredditForm-name");
//             const locationField = getByTestId("CollegiateSubredditForm-location");
//             const subredditField = getByTestId("CollegiateSubredditForm-subreddit");
//             const submitButton = getByTestId("CollegiateSubredditForm-submit");

//             expect(idField).toHaveValue("17");
//             expect(nameField).toHaveValue("name");
//             expect(locationField).toHaveValue("location");
//             expect(subredditField).toHaveValue("subreddit");
//         });

//         test("Changes when you click Update", async () => {



//             const { getByTestId } = render(
//                 <QueryClientProvider client={queryClient}>
//                     <MemoryRouter>
//                         <CollegiateSubredditsEditPage />
//                     </MemoryRouter>
//                 </QueryClientProvider>
//             );

//             await waitFor(() => expect(getByTestId("CollegiateSubredditForm-name")).toBeInTheDocument());

//             const idField = getByTestId("CollegiateSubredditForm-id");
//             const nameField = getByTestId("CollegiateSubredditForm-name");
//             const locationField = getByTestId("CollegiateSubredditForm-location");
//             const subredditField = getByTestId("CollegiateSubredditForm-localDsubredditateTime");
//             const submitButton = getByTestId("CollegiateSubredditForm-submit");

//             expect(idField).toHaveValue("17");
//             expect(nameField).toHaveValue("20221");
//             expect(locationField).toHaveValue("Pi Day");
//             expect(subredditField).toHaveValue("2022-03-14T15:00");

//             expect(submitButton).toBeInTheDocument();

//             fireEvent.change(nameField, { target: { value: 'name2' } })
//             fireEvent.change(locationField, { target: { value: 'location2' } })
//             fireEvent.change(subredditField, { target: { value: "subreddit2" } })

//             fireEvent.click(submitButton);

//             await waitFor(() => expect(mockToast).toBeCalled);
//             expect(mockToast).toBeCalledWith("CollegiateSubreddit Updated - id: 17 name: name2");
//             expect(mockNavigate).toBeCalledWith({ "to": "/collegiatesubreddits/list" });

//             expect(axiosMock.history.put.length).toBe(1); // times called
//             expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
//             expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
//                 name: 'name2',
//                 location: "location2",
//                 subreddit: "subreddit2"
//             })); // posted object

//         });

       
//     });
// });


