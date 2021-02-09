export class Company {
    name: string;
    address: string;
    lat: string;
    long: string;

    constructor(name: string, address: string, lat: string, long: string) {
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.long = long;
    }
}
