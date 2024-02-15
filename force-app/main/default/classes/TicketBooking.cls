public with sharing class TicketBooking {
    @AuraEnabled(cacheable=true)
    public static Decimal getPrice(Id RecordId){
        System.debug('Inside method');
        Decimal concerts = [SELECT Id, Name,
        Price__c FROM Concert__c WHERE Id = :recordId].Price__c;
        return concerts;
        
    }

}