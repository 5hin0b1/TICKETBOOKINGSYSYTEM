public with sharing class concerData {
    @AuraEnabled(cacheable=true)
    public static List<Concert__c> getConcerts(){
        return [SELECT Id, Name, Concert_Type__c, Concert_Venue__c,
        Date_of_Concert__c, Price__c FROM Concert__c WHERE Date_of_Concert__c> TODAY ORDER BY Date_of_Concert__c ASC];
    }
}