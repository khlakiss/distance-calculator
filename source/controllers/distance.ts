import { Request, Response, NextFunction } from 'express';
import { Company } from '../models/Company';
import { Partner } from '../models/Partner';

const { greatCircleDistance } = require('great-circle-distance');

const ramiLat = '51.5144636';
const ramiLong = '-0.142571';

const getNearByPartners = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'File Not Found',
                data: []
            });
        } else if (!req.body.range) {
            return res.status(400).json({
                message: 'Range Not Found',
                data: []
            });
        } else {
            var stringFileData = req.file.buffer.toString();
            var range = req.body.range;
            var nearByCompanies: Company[] = [];
            if (stringFileData != '') {
                var jsonPartners = JSON.parse(stringFileData);
                var partners = jsonPartners as Partner[];
                partners.forEach((partner) => {
                    var offices = partner.offices;
                    offices.forEach((office) => {
                        var officeLat = office.coordinates.split(',')[0];
                        var officeLong = office.coordinates.split(',')[1];
                        const coords = {
                            lat1: ramiLat,
                            lng1: ramiLong,
                            lat2: officeLat,
                            lng2: officeLong
                        };

                        var distance = greatCircleDistance(coords);
                        if (distance <= range) {
                            var company: Company = new Company(partner.organization, office.address, officeLat, officeLong);
                            if (!nearByCompanies.includes(company)) {
                                nearByCompanies.push(company);
                            }
                        }
                    });
                });
                return res.status(200).json({
                    message: 'Success',
                    data: nearByCompanies.sort((a, b) => (a.name > b.name ? 1 : -1))
                });
            } else {
                return res.status(400).json({
                    message: 'Empty File',
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: []
        });
    }
};

export default { getNearByPartners };
