import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function EarthquakeForm({ earthquakeParams, submitAction, buttonLabel="Retrieve" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: earthquakeParams || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    // const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    // const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    // Stryker double regex
    const double_regex = /[+]?([0-9]*[.])?[0-9]+/i;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="distance">Distance</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-distance"
                    id="distance"
                    type="text"
                    isInvalid={Boolean(errors.distance)}
                    {...register("distance", { required: true, pattern: double_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.distance && 'Distance from Storke Tower is required.'}
                    {errors.distance?.type === 'pattern' && 'Distance is in km, e.g. 2.5 for 2.5 km'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="minMag">Minimum Magnitude</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-minMag"
                    id="minMag"
                    type="text"
                    isInvalid={Boolean(errors.minMag)}
                    {...register("minMag", { required: true, pattern: double_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.minMag && 'Minimum magnitude of an earthquake is required.'}
                    {errors.minMag?.type === 'pattern' && 'Minimum magnitude must be in the form 3.7'}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="Retrieve"
                data-testid="EarthquakeForm-retrieve"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="EarthquakeForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default EarthquakeForm;