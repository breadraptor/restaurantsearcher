# Take Home Asessment
Solution by Nancy McCollough
10/3/2021

## Run Instructions
The solution is written in Typescript and run with Node in the command line.

Run these commands in the root folder to view the interactive search feature. 
`npm install`  
`node dist/main.js`  

To run "test suite", open `scripts/main.ts`, comment out the `main()` call, and uncomment the `tests()` call.
Then run:  
`tsc scripts/main.ts`  
`node dist/main.js`  
You may need to install Typescript with `npm install typescript`. Or, you can view the test results below.

## Test Results
```
==============
TEST: No parameters given:
=============
Best results:
[
  {
    name: 'Deliciousgenix',
    customer_rating: '4',
    distance: '1',
    price: '10',
    cuisine_id: '11'
  },
  {
    name: 'Deliciouszilla',
    customer_rating: '4',
    distance: '1',
    price: '15',
    cuisine_id: '2'
  },
  {
    name: 'Fodder Table',
    customer_rating: '4',
    distance: '1',
    price: '20',
    cuisine_id: '8'
  },
  {
    name: 'Dished Grill',
    customer_rating: '3',
    distance: '1',
    price: '10',
    cuisine_id: '8'
  },
  {
    name: 'Sizzle Yummy',
    customer_rating: '3',
    distance: '1',
    price: '15',
    cuisine_id: '18'
  }
]


==============
TEST: Name matches nothing:
=============
No results found matching criteria


==============
TEST: Name partial match:
=============
Best results:
[
  {
    name: 'Deliciouszilla',
    customer_rating: '4',
    distance: '1',
    price: '15',
    cuisine_id: '2'
  },
  {
    name: 'Deliciouszoid',
    customer_rating: '3',
    distance: '2',
    price: '30',
    cuisine_id: '4'
  },
  {
    name: 'Deliciouszen',
    customer_rating: '2',
    distance: '6',
    price: '30',
    cuisine_id: '5'
  }
]


==============
TEST: all parameters given:
=============
Best results:
[
  {
    name: 'Bariva',
    customer_rating: '5',
    distance: '10',
    price: '40',
    cuisine_id: '10'
  }
]


==============
TEST: Cheap & well-rated restaurants:
=============
Best results:
[
  {
    name: 'Grove Table',
    customer_rating: '5',
    distance: '2',
    price: '10',
    cuisine_id: '13'
  },
  {
    name: 'Chop Grill',
    customer_rating: '5',
    distance: '8',
    price: '10',
    cuisine_id: '17'
  },
  {
    name: 'Tasteful Grill',
    customer_rating: '5',
    distance: '9',
    price: '10',
    cuisine_id: '2'
  },
  {
    name: 'Aroma Chow',
    customer_rating: '5',
    distance: '10',
    price: '10',
    cuisine_id: '18'
  }
]


==============
TEST: only Spanish restaurants:
=============
Best results:
[
  {
    name: 'Deliciousgenix',
    customer_rating: '4',
    distance: '1',
    price: '10',
    cuisine_id: '11'
  },
  {
    name: 'Bang Kitchen',
    customer_rating: '1',
    distance: '1',
    price: '40',
    cuisine_id: '11'
  },
  {
    name: 'Traditional Chow',
    customer_rating: '5',
    distance: '2',
    price: '15',
    cuisine_id: '11'
  },
  {
    name: 'Place Chow',
    customer_rating: '2',
    distance: '2',
    price: '15',
    cuisine_id: '11'
  },
  {
    name: 'Takeout Tasty',
    customer_rating: '5',
    distance: '5',
    price: '20',
    cuisine_id: '11'
  }
]


==============
TEST: Cuisine ID match for Greek cuisine:
==============
12


==============
TEST: Cuisine ID match for partial cuisine name 'Russ':
==============
18


==============
TEST: Cuisine ID not found for unknown cuisine name 'Planet Mars':
==============
undefined```