import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { ResponsiblePartyViewModel } from './responsible-party2-view-model';

// Enum version wouldn't work in templates.  Can't have strings in enums.
export class ResponsiblePartyType {
    constructor(private value: string, private title: string) {
    }

    toString() {
        return this.value;
    }

    getTitle(): string {
        return this.title;
    }

    static siteContact = new ResponsiblePartyType("siteContact", "Site Contact");
    static siteMetadataCustodian = new ResponsiblePartyType("siteMetadataCustodian", "Site Metadata Custodian");
    static siteDataCenter = new ResponsiblePartyType("siteDataCenter", "Site Data Center");
    static siteDataSource = new ResponsiblePartyType("siteDataSource", "Site Data Source");
}

/**
 * This class represents the responsible parties.  It is used for 4 different types.  May be 1+ of each except where noted.
 * This group will contain each one as an item (even if only 1).
 *
 * 1. Site Contact
 * 2. Site Metadata Custodian (1 only)
 * 3. Site Date Center
 * 4. Site Date Source
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-group',
    templateUrl: 'responsible-party2-group.component.html',
})
export class ResponsiblePartyGroupComponent extends AbstractGroup<ResponsiblePartyViewModel> implements OnInit {
    private _partyName: ResponsiblePartyType;
    @Input()
    set partyName(partyName: ResponsiblePartyType) { //ResponsiblePartyType) {
        console.log(' INPUT for partyName: ', partyName.toString());
        this._partyName = partyName;
    }

    get partyName(): ResponsiblePartyType {
        return this._partyName;
    }


    @Input()
    set siteLogModel(siteLogModel: any) {
        console.log('INPUT for sitelogmodel - ', siteLogModel);
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel[this.partyName.toString()]);
            console.log(this.partyName.toString() + ': ', this.getItemsCollection());
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        console.log('INPUT for sitelogmodelOrig - ', originalSiteLogModel);
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel[this.partyName.toString()]);
            console.log(this.partyName.toString() + ' (Original): ', this.getItemsOriginalCollection());
        }
    }

    constructor() {
        super();
    }

    ngOnInit() {
        if (!this.partyName) {
            throw new Error("Party attribute is required for ResponsiblePartyGroupComponent");
        } else {
        }

        this.unlimitedItems = (this.partyName !== ResponsiblePartyType.siteMetadataCustodian);
        this.setupForm();
    }

    private setupForm() {
        this.groupArrayForm = new FormArray([]);
        this.siteInfoForm.addControl(this.partyName.toString(), this.groupArrayForm);
    }

    getItemName(): string {
        return this.partyName.getTitle();
    }

    compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        let name1: string = obj1.individualName;
        let name2: string = obj2.individualName;
        return name1.localeCompare(name2);
    }

    newViewModelItem(): ResponsiblePartyViewModel {
        return new ResponsiblePartyViewModel();
    }
}
