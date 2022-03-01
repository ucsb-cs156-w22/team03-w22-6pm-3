import React from 'react'
import { useBackend, useBackendMutation } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { useCurrentUser } from 'main/utils/currentUser'
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

export default function EarthquakesIndexPage() {

  const currentUser = useCurrentUser();

  const { data: earthquakes, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"],
      { method: "GET", url: "/api/earthquakes/all" },
      []
    );

  const ListProperties = [];
  earthquakes.forEach(function (prop) {
    ListProperties.push(prop.properties)
  });

  const objectToAxiosParams = (data) => ({
    url: "/api/earthquakes/purge",
    method: "POST"
  });

  const onSuccess = (data) => {
    toast("Earthquakes purged");
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all
    ["/api/earthquakes/all"]
  );

  const onSubmit = async () => {
    mutation.mutate();
  };

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <EarthquakesTable earthquakes={ListProperties} currentUser={currentUser} />
        <Button
          type="submit"
          onClick={onSubmit}
          data-testid="EarthquakesList-purge"
        >
          Purge
        </Button>
      </div>
    </BasicLayout>
  );
}