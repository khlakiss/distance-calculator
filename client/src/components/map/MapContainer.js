import React, { useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAlert } from 'react-alert';

const getNearByPartnersURL = 'http://localhost:1337/distance/getNearByPartners';

const MapContainer = () => {
    const googleMapRef = useRef(null);
    let googleMap = null;
    const alert = useAlert();

    // create marker on google map
    const createMarker = (markerObj) => {
        const marker = new window.google.maps.Marker({
            position: { lat: markerObj.lat, lng: markerObj.lng },
            map: googleMap,
            icon: {
                url: markerObj.icon,
                scaledSize: new window.google.maps.Size(50, 50)
            },
            title: markerObj.title
        });

        const infowindow = new window.google.maps.InfoWindow({ content: markerObj.info });
        marker.addListener('click', () => infowindow.open(googleMap, marker));

        return marker;
    };

    // initialize the google map
    const initGoogleMap = () => {
        return new window.google.maps.Map(googleMapRef.current, {
            center: { lat: 51.5144636, lng: -0.142571 },
            zoom: 100
        });
    };

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
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Success') {

                    // Set Rami's markers
                    let markerList = [
                        {
                            lat: 51.5144636,
                            lng: -0.142571,
                            icon: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
                            info: '<div><h2>Rami</h2><p>Washmen.</p></div>',
                            title: 'Rami'
                        }
                    ];

                    //fetch the result of the api into markers list
                    const items = data.data;
                    items.forEach((company) => {
                        console.log(company);
                        markerList.push({
                            lat: Number(company.lat),
                            lng: Number(company.long),
                            info: '<div> <h2>' + company.name + '</h2> <p>' + company.address + '</p> </div>',
                            title: company.name
                        });
                    });

                    //initiate the map based on the data
                    googleMap = initGoogleMap();
                    var bounds = new window.google.maps.LatLngBounds();
                    markerList.map((x) => {
                        const marker = createMarker(x);
                        bounds.extend(marker.position);
                    });
                    googleMap.fitBounds(bounds);

                    //return success and empty the array
                    alert.success('Success');
                    markerList = [];
                } else {
                    alert.error('Something Went Wrong!');
                }
            })
            .catch((err) => {
                alert.error('Something Went Wrong!');
            });
    }

    return (
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
                    <div ref={googleMapRef} style={{ width: 1110, height: 480 }} />
                </Form.Group>
            </Container>
        </Form>
    );
};

export default MapContainer;
