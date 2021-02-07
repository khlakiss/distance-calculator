import { Office } from '../models/Office';

export class Partner {
    id: number;
    urlName: string;
    organization: string;
    customerLocations: string;
    willWorkRemotely: boolean;
    website: string;
    services: string;
    offices: Office[];

    constructor(id: number, urlName: string, organization: string, customerLocations: string, willWorkRemotely: boolean, website: string, services: string, offices: Office[]) {
        this.id = id;
        this.urlName = urlName;
        this.organization = organization;
        this.customerLocations = customerLocations;
        this.willWorkRemotely = willWorkRemotely;
        this.website = website;
        this.services = services;
        this.offices = offices;
    }
}
