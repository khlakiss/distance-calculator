import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Form, Button, Container, Alert, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAlert } from 'react-alert';

const getNearByPartnersURL = 'http://localhost:1337/distance/getNearByPartners';

const containerStyle = {
    width: '1200px',
    height: '440px'
};

const center = {
    lat: 51.5144636,
    lng: -0.142571
};

const companies = {
    text: '',
    lat: 51.5144636,
    lng: -0.142571
};

function MapContainer() {
    const alert = useAlert();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDww0aaleA_hEAXxHMMoU0QWrHkjMyuX4Y'
    });

    const range = React.useRef(null);
    const file = React.useRef(null);

    function handleSubmit(event) {
        event.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.append('range', range.current.value);
        bodyFormData.append('file', file.current.files[0]);

        fetch(getNearByPartnersURL, {
            body: bodyFormData,
            method: 'post'
        }).then((response) => {
            if (response.status === 200) {
                alert.success('Success');
            } else {
                alert.error('Something Went Wrong!');
            }
        });
    }

    return isLoaded ? (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Form.Group>
                    <Form.Label>Range</Form.Label>
                    <Form.Control required ref={range} required type="text" placeholder="Enter range" />
                </Form.Group>
                <Form.Group>
                    <Form.File required ref={file} id="partnersFile" label="Partners File" />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
                <Form.Group>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                        <Marker position={{ lat: 51.5144636, lng: -0.142571 }} title="asd" />
                    </GoogleMap>
                </Form.Group>
            </Container>
        </Form>
    ) : (
        <></>
    );
}

export default React.memo(MapContainer);
