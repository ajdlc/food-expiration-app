/**
 * ************************************************************
 * Data Object
 * ************************************************************
 */
//#region 
let data = {
    title: "Food Expiration Application",
    message: "Hello Friday.",
    weather: "Sunny and Cold!",
    fridge: [
        {
            name: "Applesauce",
            expDate: "05-18-2021"
        },
        {
            name: "Milk",
            expDate: "04-27-2020"
        },
        {
            name: "Eggs",
            expDate: "09-27-2020"
        },
        {
            name: "Ground Beef",
            expDate: "04-27-2020"
        },
        {
            name: "Cheese",
            expDate: "03-27-2022"
        },
        {
            name: "Ham",
            expDate: "02-27-2020"
        },
        {
            name: "Salsa",
            expDate: "03-30-2020"
        }
    ]
}
//#endregion

/**
 * ************************************************************
 * Vue Instance
 * ************************************************************
 */
//#region 
let vm = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data,
    methods: {
        checkExp(expDate) {
            // Constants for return message representation
            const expired = 0;
            const expiring = 1;
            const notExpired = 2;

            // Date format for expDate
            let dateParts = expDate.split("-");
            // fDate = Year-Month-Day
            let fDate = dateParts[2] + "-" + dateParts[0] + "-" + dateParts[1];
            let today = new Date();
            let itemExpDate = new Date(fDate);
            let nextWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)

            // Check to see if item is expired

            if (itemExpDate >= today && itemExpDate > nextWeekDate) {
                return notExpired;
            }
            if (itemExpDate >= today && itemExpDate <= nextWeekDate) {
                return expiring;
            }
            if(itemExpDate < today) {
                return expired;
            }

        }
    }
});
//#endregion