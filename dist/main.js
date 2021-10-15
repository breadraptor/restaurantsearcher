var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var csv = require('csv-parser');
var fs = require('fs');
var readline = require('readline');
var restaurants = [];
var cuisines = [];
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("==============");
                    return [4 /*yield*/, loadRestaurants()]; // use an await-all promise for better performance in a bigger scenario
                case 1:
                    _a.sent(); // use an await-all promise for better performance in a bigger scenario
                    return [4 /*yield*/, loadCuisines()
                        // Comment main() and uncomment tests() for test results
                    ];
                case 2:
                    _a.sent();
                    // Comment main() and uncomment tests() for test results
                    main();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("==============");
    console.log("Please enter search criteria for local restaurants! Hit enter to skip any field.");
    rl.question("Restaurant name: ", function (name) {
        rl.question("Restaurant cuisine type: ", function (cuisine) {
            rl.question("Restaurant rating (1-5 stars): ", function (rating) {
                rl.question("Restaurant distance (miles): ", function (distance) {
                    rl.question("Restaurant maximum average price: ", function (price) {
                        // input validation
                        if (isNaN(Number(rating)) || isNaN(Number(distance)) || isNaN(Number(price))) {
                            throw Error("Invalid input; rating, distance, and price must be numeric");
                        }
                        if (rating != "" && Number(rating) < 1 || Number(rating) > 5) {
                            throw Error("Expected rating from 1-5 stars");
                        }
                        // truthiness can get weird. setting all unused values to undefined for safety
                        if (name == "")
                            name = undefined;
                        if (rating == "")
                            rating = undefined;
                        if (distance == "")
                            distance = undefined;
                        if (price == "")
                            price = undefined;
                        // match up the input cuisine to its cuisine ID
                        var cuisineId;
                        if (cuisine == "") {
                            cuisineId = undefined;
                        }
                        else {
                            cuisineId = getCuisineId(cuisine);
                            if (cuisineId == undefined) {
                                console.log("Cuisine type " + cuisine + " not found. Field ignored.");
                            }
                        }
                        searchRestaurants(name, Number(rating), Number(distance), Number(price), cuisineId);
                        rl.question("Search again? Y/N: ", function (answer) {
                            if (answer.toUpperCase() == "Y") {
                                console.log("\n");
                                rl.close();
                                main();
                            }
                            else {
                                console.log("Enjoy your lunch!");
                                process.exit(0);
                            }
                        });
                    });
                });
            });
        });
    });
}
function searchRestaurants(name, rating, distance, price, cuisineId) {
    console.log("=============");
    var searchResults = [];
    // find all restaurants that match input criteria
    searchResults = restaurants.filter(function (res) {
        if (name != undefined && !res.name.toLowerCase().includes(name.toLowerCase()))
            return false;
        if (cuisineId != undefined && Number(res.cuisine_id) != cuisineId)
            return false;
        if (rating != undefined && Number(res.customer_rating) < rating)
            return false;
        if (distance != undefined && Number(res.distance) > distance)
            return false;
        if (price != undefined && Number(res.price) > price)
            return false;
        return true;
    });
    if (searchResults.length > 0) {
        // sort results by distance, rating, and price; display top 5
        var sortedArray = searchResults.sort(compareRestaurant);
        console.log("Best results: ");
        console.log(sortedArray.slice(0, 5));
        return sortedArray;
    }
    else {
        console.log("No results found matching criteria");
        return [];
    }
}
var compareRestaurant = function (res1, res2) {
    if (Number(res1.distance) < Number(res2.distance))
        return -1;
    if (Number(res1.distance) > Number(res2.distance))
        return 1;
    if (Number(res1.customer_rating) > Number(res2.customer_rating))
        return -1;
    if (Number(res1.customer_rating) < Number(res2.customer_rating))
        return 1;
    if (Number(res1.price) < Number(res2.price))
        return -1;
    if (Number(res1.price) > Number(res2.price))
        return 1;
    // all comparisons were matches; just choose one
    return -1;
};
function loadRestaurants() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.createReadStream('csv/restaurants.csv')
                        .pipe(csv())
                        .on('data', function (data) { return restaurants.push(data); })
                        .on('error', reject)
                        .on('end', function () {
                        resolve(restaurants);
                    });
                })];
        });
    });
}
function loadCuisines() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.createReadStream('csv/cuisines.csv')
                        .pipe(csv())
                        .on('data', function (data) { return cuisines.push(data); })
                        .on('error', reject)
                        .on('end', function () {
                        resolve(cuisines);
                    });
                })];
        });
    });
}
function getCuisineId(cuisine) {
    // this will find the *first* match; vague search terms could lead to unintended results. Improve by asking user for clarification
    var cuisineFind = cuisines.find(function (cus) { return cus.name.toLowerCase().includes(cuisine.toLowerCase()); });
    if (cuisineFind != undefined) {
        return Number(cuisineFind.id);
    }
    return undefined;
}
function tests() {
    // These belong in a test suite but for time's sake I'll just put them here.
    console.log("\n");
    console.log("==============");
    console.log("TEST: No parameters given:");
    searchRestaurants(undefined, undefined, undefined, undefined, undefined);
    console.log("\n");
    console.log("==============");
    console.log("TEST: Name matches nothing:");
    searchRestaurants("jfkdlsjfdksfj", undefined, undefined, undefined, undefined);
    console.log("\n");
    console.log("==============");
    console.log("TEST: Name partial match:");
    searchRestaurants("Deliciousz", undefined, undefined, undefined, undefined);
    console.log("\n");
    console.log("==============");
    console.log("TEST: all parameters given:");
    searchRestaurants("iVa", 2, 10, 50, 10);
    console.log("\n");
    console.log("==============");
    console.log("TEST: Cheap & well-rated restaurants:");
    searchRestaurants(undefined, 5, undefined, 10, undefined);
    console.log("\n");
    console.log("==============");
    console.log("TEST: only Spanish restaurants:");
    searchRestaurants(undefined, undefined, undefined, undefined, 11);
    console.log("\n");
    console.log("==============");
    console.log("TEST: Cuisine ID match for Greek cuisine:");
    console.log("==============");
    console.log(getCuisineId("Greek"));
    console.log("\n");
    console.log("==============");
    console.log("TEST: Cuisine ID match for partial cuisine name 'Russ':");
    console.log("==============");
    console.log(getCuisineId("Russ"));
    console.log("\n");
    console.log("==============");
    console.log("TEST: Cuisine ID not found for unknown cuisine name 'Planet Mars':");
    console.log("==============");
    console.log(getCuisineId("Planet Mars"));
}
setup();
//# sourceMappingURL=main.js.map