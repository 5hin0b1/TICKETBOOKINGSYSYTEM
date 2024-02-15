trigger UpdatePriceOnConcert on Concert__c (before insert,before update) {
    
    for(Concert__c con:trigger.new){
        if((con.Number_of_Tickets_Remaining__c)
        <(0.1*con.Number_of_ticket_available__c)){
        if(con.Price__c != null){
            con.price__c = con.Price__c *1.1;
            system.debug('Price = '+con.price__c);
        }
        }
    }
}