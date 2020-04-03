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
    alerts: [],
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
    ],
    newItem: {
        name: "",
        expDate: ""
    },
    icons: {
        trashcan: {
            default: "mdi-delete",
            hover: "mdi-delete-empty",
            state: "default" 
        }
    },
    showDeleteDialog: false,
    itemIndexToDelete: -1
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
    computed: {
        sortedFridge: function() {
            // Sort the fridge based on expiration date
            const sFridge = this.fridge.sort((a, b) => {
                let aDate = a.expDate.split("-");
                let bDate = b.expDate.split("-");

                // Compare Year
                if (parseInt(aDate[2]) < parseInt(bDate[2])) {
                    return -1;
                } else if(parseInt(aDate[2]) > parseInt(bDate[2])) {
                    return 1;
                } else if(parseInt(aDate[2]) == parseInt(bDate[2])) {
                    // Years are the same, check months
                    if (parseInt(aDate[0]) < parseInt(bDate[0])) {
                        return -1;
                    } else if(parseInt(aDate[0]) > parseInt(bDate[0])) {
                        return 1;
                    } else if(parseInt(aDate[0]) == parseInt(bDate[0])) {
                        // Months are the same, check days
                        if (parseInt(aDate[1]) < parseInt(bDate[1])) {
                            return -1;
                        } else if(parseInt(aDate[1]) > parseInt(bDate[1])) {
                            return 1;
                        } else if(parseInt(aDate[1]) == parseInt(bDate[1])) {
                            // The dates are exactly the same
                            return 0;
                        }
                    }
                }
            });

            // For Icon assignment
            sFridge.forEach((item) => {
                item.icons = {};
                item.icons.trashcan = Object.assign({}, this.icons.trashcan);
            })
            
            return sFridge;
        }
    },
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

        },
        addFoodItem() {
            // Reset the alert array - to clear previous alerts
            this.alerts = [];
            // Check fields for empty strings
            //#region 
            if (this.newItem.name === "") {
                // Return alert with message "Please enter name"
                this.alerts.push({
                    message: "Please enter a name.",
                    type: "error"
                })
            }
            if (this.newItem.expDate === "") {
                // Return alert with message "Please enter date"
                this.alerts.push({
                    message: "Please enter a date.",
                    type: "error"
                })
            }
            //#endregion

            // Check to see if there are alerts to stop code execution
            if (this.alerts.length > 0) {
                return;
            }
            // Add new food item to fridge
            //#region 
            this.fridge.push(this.newItem);

            // Clear out newItem properties and show success alert
            this.newItem = {
                message: "",
                expDate: ""
            };

            this.alerts.push({
                message: "Item Added!",
                type: "success"
            })
            //#endregion
        },
        showDelete(i) {
            this.itemIndexToDelete = i;
            this.showDeleteDialog = true;
        },
        deleteItem() {
            this.fridge.splice(this.itemIndexToDelete, 1);
            // Clear the index
            this.cancelDelete();
        },
        cancelDelete() {
            // Clear the index
            this.itemIndexToDelete = -1;
            // Hide the dialog
            this.showDeleteDialog = false;
        },
        editItem(item) {
            // Super Shorthand version
            // this.fridge.find(fItem => fItem.name === item.name && fItem.expDate === item.expDate);
            // Equivalent to
            // this.fridge.find((fItem) => {
            //     if (fItem.name === item.name && fItem.expDate === item.expDate) {
            //         return fItem;
            //     }
            // })
        }
    }
});
//#endregion