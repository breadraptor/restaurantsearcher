const csv = require('csv-parser')
const fs = require('fs')
const readline = require('readline')
let restaurants: restaurant[] = []
let cuisines: cuisine[] = []

type restaurant = {
    name: string,
    customer_rating: string,
    distance: string,
    price: string,
    cuisine_id: string
}

type cuisine = {
    id: string,
    name: string
}

async function setup() {
    console.log("==============")
    await loadRestaurants() // use an await-all promise for better performance in a bigger scenario
    await loadCuisines()
    // Comment main() and uncomment tests() for test results
    main()
    //tests()
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log("==============")
    console.log("Please enter search criteria for local restaurants! Hit enter to skip any field.")

    rl.question("Restaurant name: ", function(name: string) {
        rl.question("Restaurant cuisine type: ", function(cuisine: string) {
            rl.question("Restaurant rating (1-5 stars): ", function(rating: string) {
                rl.question("Restaurant distance (miles): ", function(distance: string) {
                    rl.question("Restaurant maximum average price: ", function(price: string) {
                        // input validation
                        if (isNaN(Number(rating)) || isNaN(Number(distance)) || isNaN(Number(price))) {
                            throw Error("Invalid input; rating, distance, and price must be numeric")
                        }
                        if (Number(rating) < 1 || Number(rating) > 5) {
                            throw Error("Expected rating from 1-5 stars")
                        }
                        // truthiness can get weird. setting all unused values to undefined for safety
                        if (name == "") name = undefined
                        if (rating == "") rating = undefined
                        if (distance == "") distance = undefined
                        if (price == "") price = undefined

                        // match up the input cuisine to its cuisine ID
                        let cuisineId: number
                        if (cuisine == "") {
                            cuisineId = undefined
                        }
                        else {
                            cuisineId = getCuisineId(cuisine)
                            if (cuisineId == undefined) {
                                console.log(`Cuisine type ${cuisine} not found. Field ignored.`)
                            }
                        }

                        searchRestaurants(name, Number(rating), Number(distance), Number(price), cuisineId)
                        
                        rl.question("Search again? Y/N: ", function(answer: string) {
                            if (answer.toUpperCase() == "Y") {
                                console.log("\n")
                                rl.close()
                                main()
                            }
                            else {
                                console.log("Enjoy your lunch!")
                                process.exit(0)
                            }
                        })
                    })
                })
            });
        })
    });
    
}

function searchRestaurants(name: string, rating: number, distance: number, price: number, cuisineId: number) {
    console.log("=============")
    let searchResults: restaurant[] = []
    // find all restaurants that match input criteria
    searchResults = restaurants.filter((res) => {
        if (name != undefined && !res.name.toLowerCase().includes(name.toLowerCase())) return false
        if (cuisineId != undefined && Number(res.cuisine_id) != cuisineId) return false
        if (rating != undefined && Number(res.customer_rating) < rating) return false
        if (distance != undefined && Number(res.distance) > distance) return false
        if (price != undefined && Number(res.price) > price) return false

        return true
    })

    if (searchResults.length > 0) {
        // sort results by distance, rating, and price; display top 5
        let sortedArray = searchResults.sort(compareRestaurant)
        console.log("Best results: ")
        console.log(sortedArray.slice(0, 5))
        return sortedArray
    }
    else {
        console.log("No results found matching criteria")
        return []
    }
}

let compareRestaurant = function(res1: restaurant, res2: restaurant) {
    if (Number(res1.distance) < Number(res2.distance)) return -1
    if (Number(res1.distance) > Number(res2.distance)) return 1
    if (Number(res1.customer_rating) > Number(res2.customer_rating)) return -1
    if (Number(res1.customer_rating) < Number(res2.customer_rating)) return 1
    if (Number(res1.price) < Number(res2.price)) return -1
    if (Number(res1.price) > Number(res2.price)) return 1
    
    // all comparisons were matches; just choose one
    return -1
}

async function loadRestaurants() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('csv/restaurants.csv')
        .pipe(csv())
        .on('data', (data: restaurant) => restaurants.push(data))
        .on('error', reject)
        .on('end', () => {
          resolve(restaurants)
        });
    })
}

async function loadCuisines() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('csv/cuisines.csv')
        .pipe(csv())
        .on('data', (data: cuisine) => cuisines.push(data))
        .on('error', reject)
        .on('end', () => {
          resolve(cuisines)
        });
    })
}

function getCuisineId(cuisine: string) {
    // this will find the *first* match; vague search terms could lead to unintended results. Improve by asking user for clarification
    let cuisineFind = cuisines.find((cus) => {return cus.name.toLowerCase().includes(cuisine.toLowerCase())})
    if (cuisineFind != undefined) {
        return Number(cuisineFind.id)
    }
    return undefined
}

function tests() {
    // These belong in a test suite but for time's sake I'll just put them here.
    console.log("\n")
    console.log("==============")
    console.log("TEST: No parameters given:")
    searchRestaurants(undefined, undefined, undefined, undefined, undefined)

    console.log("\n")
    console.log("==============")
    console.log("TEST: Name matches nothing:")
    searchRestaurants("jfkdlsjfdksfj", undefined, undefined, undefined, undefined)

    console.log("\n")
    console.log("==============")
    console.log("TEST: Name partial match:")
    searchRestaurants("Deliciousz", undefined, undefined,undefined, undefined)

    console.log("\n")
    console.log("==============")
    console.log("TEST: all parameters given:")
    searchRestaurants("iVa", 2, 10, 50, 10)

    console.log("\n")
    console.log("==============")
    console.log("TEST: Cheap & well-rated restaurants:")
    searchRestaurants(undefined, 5, undefined, 10, undefined)

    console.log("\n")
    console.log("==============")
    console.log("TEST: only Spanish restaurants:")
    searchRestaurants(undefined, undefined, undefined, undefined, 11)

    console.log("\n")
    console.log("==============")
    console.log("TEST: Cuisine ID match for Greek cuisine:")
    console.log("==============")
    console.log(getCuisineId("Greek"))

    console.log("\n")
    console.log("==============")
    console.log("TEST: Cuisine ID match for partial cuisine name 'Russ':")
    console.log("==============")
    console.log(getCuisineId("Russ"))

    console.log("\n")
    console.log("==============")
    console.log("TEST: Cuisine ID not found for unknown cuisine name 'Planet Mars':")
    console.log("==============")
    console.log(getCuisineId("Planet Mars"))
    
}

setup()