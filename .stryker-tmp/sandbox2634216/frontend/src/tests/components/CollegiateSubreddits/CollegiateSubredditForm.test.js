import { render, waitFor, fireEvent } from "@testing-library/react";
import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { collegiateSubredditsFixtures } from "fixtures/collegiateSubredditsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("CollegiateSubredditForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Name/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a CollegiateSubreddit ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <CollegiateSubredditForm initialCollegiateSubreddit={collegiateSubredditsFixtures.oneSubreddit} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/CollegiateSubredditForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/CollegiateSubredditForm-id/)).toHaveValue("1");
    });


    // test("Correct Error messsages on bad input", async () => {

    //     const { getByTestId, getByText } = render(
    //         <Router  >
    //             <CollegiateSubredditForm />
    //         </Router>
    //     );
    //     await waitFor(() => expect(getByTestId("CollegiateSubredditForm-name")).toBeInTheDocument());
    //     const nameField = getByTestId("CollegiateSubredditForm-name");
    //     const localDateTimeField = getByTestId("CollegiateSubredditForm-localDateTime");
    //     const submitButton = getByTestId("CollegiateSubredditForm-submit");

    //     fireEvent.change(quarterYYYYQField, { target: { value: 'bad-input' } });
    //     fireEvent.change(localDateTimeField, { target: { value: 'bad-input' } });
    //     fireEvent.click(submitButton);

    //     await waitFor(() => expect(getByText(/QuarterYYYYQ must be in the format YYYYQ/)).toBeInTheDocument());
    //     expect(getByText(/localDateTime must be in ISO format/)).toBeInTheDocument();
    // });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubredditForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("CollegiateSubredditForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Name is required./)).toBeInTheDocument());
        expect(getByText(/Location is required./)).toBeInTheDocument();
        expect(getByText(/Subreddit is required./)).toBeInTheDocument();

    });

    // test("No Error messsages on good input", async () => {

    //     const mockSubmitAction = jest.fn();


    //     const { getByTestId, queryByText } = render(
    //         <Router  >
    //             <CollegiateSubredditForm submitAction={mockSubmitAction} />
    //         </Router>
    //     );
    //     await waitFor(() => expect(getByTestId("CollegiateSubredditForm-name")).toBeInTheDocument());

    //     const quarterYYYYQField = getByTestId("CollegiateSubredditForm-name");
    //     const nameField = getByTestId("CollegiateSubredditForm-name");
    //     const localDateTimeField = getByTestId("CollegiateSubredditForm-localDateTime");
    //     const submitButton = getByTestId("CollegiateSubredditForm-submit");

    //     fireEvent.change(quarterYYYYQField, { target: { value: '20221' } });
    //     fireEvent.change(nameField, { target: { value: 'noon on January 2nd' } });
    //     fireEvent.change(localDateTimeField, { target: { value: '2022-01-02T12:00' } });
    //     fireEvent.click(submitButton);

    //     await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    //     expect(queryByText(/QuarterYYYYQ must be in the format YYYYQ/)).not.toBeInTheDocument();
    //     expect(queryByText(/localDateTime must be in ISO format/)).not.toBeInTheDocument();

    // });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubredditForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("CollegiateSubredditForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


