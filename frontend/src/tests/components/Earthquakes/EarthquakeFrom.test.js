import { render, waitFor, fireEvent, getByTestId } from "@testing-library/react";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { earthquakesFixtures } from "fixtures/earthquakesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("Earthquake tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Distance/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Retrieve/)).toBeInTheDocument());
    });


    test("renders correctly when passing in an Earthquake ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <EarthquakeForm initialEarthquake={earthquakesFixtures.oneEarthquakes} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/EarthquakeForm-distance/)).toBeInTheDocument());
        expect(getByText(/Distance/)).toBeInTheDocument();
        await waitFor(() => expect(getByTestId(/EarthquakeForm-minMag/)).toBeInTheDocument());
        expect(getByText(/Minimum Magnitude/)).toBeInTheDocument();
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-retrieve")).toBeInTheDocument());
        const distance = getByTestId("EarthquakeForm-distance");
        const minMag = getByTestId("EarthquakeForm-minMag");
        const submitButton = getByTestId("EarthquakeForm-retrieve");

        fireEvent.change(distance, { target: { value: 'bad-input' } });
        fireEvent.change(minMag, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Distance is in km, e.g. 2.5 for 2.5 km/)).toBeInTheDocument());
        expect(getByText(/Minimum magnitude must be in the form 3.7/)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-retrieve")).toBeInTheDocument());
        const submitButton = getByTestId("EarthquakeForm-retrieve");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Distance from Storke Tower is required./)).toBeInTheDocument());
        expect(getByText(/Minimum magnitude of an earthquake is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <EarthquakeForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-minMag")).toBeInTheDocument());

        const distance = getByTestId("EarthquakeForm-distance");
        const minMag = getByTestId("EarthquakeForm-minMag");
        const submitButton = getByTestId("EarthquakeForm-retrieve");

        fireEvent.change(distance, { target: { value: '10' } });
        fireEvent.change(minMag, { target: { value: '3.5' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/Distance is in km, e.g. 2.5 for 2.5 km/)).not.toBeInTheDocument();
        expect(queryByText(/Minimum magnitude of an earthquake is required./)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("EarthquakeForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});