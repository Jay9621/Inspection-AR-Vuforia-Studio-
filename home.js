/////////////////////////////////////////////Inspection Report///////////////////////////////////
$scope.app.params.cartLabel = "Cart";
$scope.cart = [];

// Function to open the popup when the button is clicked
$scope.openPartInputPopup = function () {
    $scope.inspectionData = {}; // Initialize the object to store user input

    // Show the popup for inspection input
    $scope.popupInspectionInput = $ionicPopup.show({
        template: `
            <div>
                <label>Sr No:</label>
                <input type="number" ng-model="inspectionData.srNo" placeholder="Enter Serial Number" />
            </div>
            <div>
                <label>Inspection Detail:</label>
                <input type="text" ng-model="inspectionData.inspectionDetail" placeholder="Enter Inspection Detail" />
            </div>
            <div>
                <label>Comment:</label>
                <input type="text" ng-model="inspectionData.comment" placeholder="Enter Comment" />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" ng-model="inspectionData.username" placeholder="Enter Username" />
            </div>
            <div>
                <label>Pass/Fail:</label>
                <select ng-model="inspectionData.passFail">
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                </select>
            </div>
            <div class="popup-buttons">
                <button class="button button-positive" ng-click="addToInspectionCart(inspectionData); closePopupInspectionInput();">Add to Cart</button>
                <button class="btnclose" ng-click="closePopupInspectionInput();">Close</button>
            </div>
        `,
        scope: $scope
    });

    // Function to close the popup
    $scope.closePopupInspectionInput = function () {
        $scope.popupInspectionInput.close();
    };
};

// Function to add an item to the cart
$scope.addToInspectionCart = function (inspectionData) {
    if (!$scope.cart) {
        $scope.cart = []; // Initialize cart if not already
    }

    var newInspectionItem = {
        srNo: inspectionData.srNo,
        inspectionDetail: inspectionData.inspectionDetail,
        comment: inspectionData.comment,
        username: inspectionData.username,
        passFail: inspectionData.passFail
    };

    // Add the new item to the cart array
    $scope.cart.push(newInspectionItem);
    $scope.app.params.cart = $scope.cart;

    console.log("Item added to cart:", newInspectionItem);

    // Store the cart data in ThingWorx
    $scope.storeCartInThingWorx();
};

// Store the cart data into ThingWorx Data Table
// Add to the inspection cart
$scope.addToInspectionCart = function (inspectionData) {
    if (!$scope.cart) {
        $scope.cart = []; // Initialize cart if not already
    }

    var newInspectionItem = {
        srNo: inspectionData.srNo,
        inspectionDetail: inspectionData.inspectionDetail,
        comment: inspectionData.comment,
        username: inspectionData.username,
        passFail: inspectionData.passFail
    };

    // Add the new item to the cart array
    $scope.cart.push(newInspectionItem);
    $scope.app.params.cart = $scope.cart;

    console.log("Item added to cart:", newInspectionItem);

    // Store the cart data in ThingWorx
    $scope.storeCartInThingWorx();
};

// Store the cart data into ThingWorx Thing Properties
$scope.storeCartInThingWorx = function () {
    if ($scope.cart && $scope.cart.length > 0) {
        $scope.cart.forEach(function (item) {
            // Prepare the parameters for the SetPropertyValues service
            var serviceParams = {
                srNo: item.srNo,
                inspectionDetail: item.inspectionDetail,
                comment: item.comment,
                username: item.username,
                passFail: item.passFail
            };

            // Call the SetPropertyValues service on the bound ThingWorx Thing
            $scope.app.fn.triggerDataService('SetPropertyValues', serviceParams)
                .then(function () {
                    console.log("Item stored in ThingWorx:", item);
                })
                .catch(function (error) {
                    console.error("Error storing item in ThingWorx:", error);
                });
        });
    } else {
        console.warn("No items in cart to store in ThingWorx.");
    }
};

// Clear the cart and reset the cart label
$scope.clearCart = function () {
    $scope.app.params.cart = [];
    $scope.cart = {};
    $scope.app.params.cartLabel = "Cart";
};

