import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getConcerts from '@salesforce/apex/TicketBooking.getConcerts';
import { loadStyle } from 'lightning/platformResourceLoader';
import CSS_FILE from '@salesforce/resourceUrl/ConcertComponentCSS'; 

export default class ConcertComponent extends NavigationMixin(LightningElement) {
    @track concertList;

    navigateToTicketBooking() {
        let cmpDef = {
            componentDef: 'c:ticketBooking'
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedDef
            }
        });
    }

    @wire(getConcerts)
    wiredConcerts({ data, error }) {
        if (data) {
            this.concertList = data;
            console.log(data);
        } else if (error) {
            console.log('Error fetching concerts:', error);
        }
    }

    connectedCallback() {
        // Load the CSS file
        loadStyle(this, CSS_FILE);
    }
}