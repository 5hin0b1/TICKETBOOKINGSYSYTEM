import { LightningElement, api, track } from 'lwc';
import getPrice from '@salesforce/apex/TicketBooking.getPrice';
import Ticket__c from '@salesforce/schema/Ticket__c';
import Concert__c from '@salesforce/schema/Ticket__c.Concert__c';
import Price__c from '@salesforce/schema/Ticket__c.Price__c';
import IndividualObj__c from '@salesforce/schema/Ticket__c.IndividualObj__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class TicketBookingComponent extends LightningElement {

    showPrice;
    selectedFields = [Concert__c, IndividualObj__c, Price__c];
    @api recordId;
    @track recordId1;
    @track customFormModal = false;

createTicket(event){
    this.recordId1=event.detail.id;
    const evt = new ShowToastEvent({
        title: 'ticket Booked', message:'Record ID: ' + event.detail.id, variant: 'success'
    });
    this.dispatchEvent(evt);
    console.log('Ticket detail : ' + event.detail.fields);
}
handleChange(event){
    let targetId = event.target.value;
    console.log('targetId : ' + targetId);
    getPrice({ recordId:targetId })
    .then((data) => {
        console.log(data);
        this.showPrice = data;
        console.log('this.showPrice', this.showPrice);
        this.dispatchEvent(
            new ShowToastEvent ({
                title: "Price Updated Successfully",
                message: "",
                variant: "success"
            })
        );
    })
    .catch((error) => {
        console.log(error.message);
        this.dispatchEvent(
            new ShowToastEvent ({
                title: "Unable to update price",
                message: error.message,
                variant: "error"
            })
        );
    });
}
customShowModalPopup(){
    this.customFormModal = true;
}
customHideModalPopup(){
    this.customFormModal = false;
}
}
