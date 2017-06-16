import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { JsonViewModelService } from './json-view-model.service';
import { JsonViewModelServiceSpecData } from './json-view-model.service.spec.data';
import { SiteLogViewModel } from './view-model/site-log-view-model';
import { SiteLogDataModel } from './data-model/site-log-data-model';

export function main() {
    let backend: MockBackend = null;
    let jsonViewModelService: JsonViewModelService;
    let completeValidSitelog: any = JsonViewModelServiceSpecData.data();

    describe('JsonViewModelService', () => {

        beforeEach(() => {

            let injector = ReflectiveInjector.resolveAndCreate([
                JsonViewModelService,
                // JsonixService,
                // ConstantsService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function (backend: MockBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);
            jsonViewModelService = injector.get(JsonViewModelService);
            backend = injector.get(MockBackend);
        });

        it('should be defined', () => {
            expect(jsonViewModelService).toBeDefined();
            expect(completeValidSitelog).toBeDefined();
        });

        it('should translate parts - data to view', () => {
            let siteLog: SiteLogViewModel = jsonViewModelService.dataModelToViewModel(completeValidSitelog);
            expect(siteLog).toBeDefined();

            let siteIdentification = siteLog.siteInformation.siteIdentification;
            expect(siteIdentification).toBeDefined();
            expect(siteIdentification.fourCharacterID).toEqual('ADE1');

            expect(siteLog.siteLocation).toBeDefined();
            expect(siteLog.siteLocation.city).toEqual('Salisbury');
            expect(siteLog.gnssReceivers).toBeDefined();
            expect(siteLog.gnssReceivers.length).not.toBe(0);
            expect(siteLog.gnssAntennas).toBeDefined();
            expect(siteLog.gnssAntennas.length).not.toBe(0);
            expect(siteLog.surveyedLocalTies).toBeDefined();
            expect(siteLog.surveyedLocalTies.length).not.toBe(0);
            expect(siteLog.frequencyStandards).toBeDefined();
            expect(siteLog.frequencyStandards.length).not.toBe(0);
            expect(siteLog.humiditySensors).toBeDefined();
            expect(siteLog.humiditySensors.length).not.toBe(0);
            expect(siteLog.humiditySensors[0].heightDiffToAntenna).toBe(0);
            expect(siteLog.humiditySensors[0].calibrationDate).toBe('2016-11-30T13:56:58.396Z');
            expect(siteLog.humiditySensors[0].accuracyPercentRelativeHumidity).toBe(22.22);
            expect(siteLog.humiditySensors[0].dataSamplingInterval).toBe(120);

            expect(siteLog.pressureSensors).toBeDefined();
            expect(siteLog.pressureSensors.length).not.toBe(0);
            expect(siteLog.temperatureSensors).toBeDefined();
            expect(siteLog.temperatureSensors.length).not.toBe(0);
            expect(siteLog.waterVaporSensors).toBeDefined();
            expect(siteLog.waterVaporSensors.length).not.toBe(0);
            expect(siteLog.siteOwner).toEqual([]);
            expect(siteLog.siteContacts).toBeDefined();
            expect(siteLog.siteMetadataCustodian).toBeDefined();
            expect(siteLog.siteDataSource).toEqual([]);
            expect(siteLog.moreInformation).toBeDefined();
            expect(siteLog.dataStreams).toBeDefined();
        });

        it('should translate parts - view to data', () => {

            let siteLogViewModel: SiteLogViewModel = jsonViewModelService.dataModelToViewModel(completeValidSitelog);
            let siteLogDataModel: SiteLogDataModel = jsonViewModelService.viewModelToDataModel(siteLogViewModel);

            expect(siteLogDataModel.humiditySensors).toBeDefined();
            expect(siteLogDataModel.humiditySensors.length).not.toBe(0);
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.heightDiffToAntenna).toBe(0);
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.calibrationDate.value[0]).toBe('2016-11-30T13:56:58.396Z');
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.accuracyPercentRelativeHumidity).toBe(22.22);
            expect(siteLogDataModel.humiditySensors[0].humiditySensor.dataSamplingInterval).toBe(120);

            expect(siteLogDataModel.pressureSensors).toBeDefined();
            expect(siteLogDataModel.pressureSensors.length).not.toBe(0);
            expect(siteLogDataModel.temperatureSensors).toBeDefined();
            expect(siteLogDataModel.temperatureSensors.length).not.toBe(0);
            expect(siteLogDataModel.waterVaporSensors).toBeDefined();
            expect(siteLogDataModel.waterVaporSensors.length).not.toBe(0);
            expect(siteLogDataModel.siteOwner).toBeNull();
            expect(siteLogDataModel.siteContacts).toBeDefined();
            expect(siteLogDataModel.siteMetadataCustodian).toBeDefined();
            expect(siteLogDataModel.siteDataSource).toBeNull();
            expect(siteLogDataModel.moreInformation).toBeDefined();
            expect(siteLogDataModel.dataStreams).toBeDefined();

        });
    });
}
