import { render, waitFor, fireEvent } from "@testing-library/react";
import EarthquakesCreatePage from "main/pages/Earthquakes/EarthquakesCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});


describe("EarthquakesCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const eq = {
            length: 1,
            distance: 20,
            minMag: 2.5
        };

        axiosMock.onPost("/api/earthquakes/retrieve").reply( 202, eq );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("EarthquakeForm-distance")).toBeInTheDocument();
        });

        const distance = getByTestId("EarthquakeForm-distance");
        const minMag = getByTestId("EarthquakeForm-minMag");
        const submitButton = getByTestId("EarthquakeForm-retrieve");

        fireEvent.change(distance, { target: { value: '20' } });
        fireEvent.change(minMag, { target: { value: '2.5' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "distance": "20",
            "minMag": "2.5",
        });

        expect(mockToast).toBeCalledWith("Earthquakes retrieved: 1");
        expect(mockToast).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toBeCalledWith({ "to": "/earthquakes/list" });
    });


});
