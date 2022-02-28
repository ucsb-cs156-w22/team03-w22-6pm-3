const earthquakesFixtures = {
    oneEarthquakes: {
      "distance": "10",
      "minMag": "3.5"
    },
    oneEarthquakesTest: {
        "id": "abcd1234abcd1234abcd1234",
        "title": "M 2.2 - 10km ESE of Ojai, CA",
        "mag": 2.16,
        "place": "10km ESE of Ojai, CA",
        "time": 1644571919000
    },
    twoEarthquakes: [
       {
         properties:{
        "id": "abcd1234abcd1234abcd1234",
        "title": "M 2.2 - 10km ESE of Ojai, CA",
        "mag": 2.16,
        "place": "10km ESE of Ojai, CA",
        "time": 1644571919000,
         },
       },
       {
         properties: {
        "id": "abcd5678abcd5678abcd5678",
        "title": "M 2.6 - 5km ESE of Ojai, CA",
        "mag": 2.6,
        "place": "5km ESE of Ojai, CA",
        "time": 1644571918123,
         },
       }
     ]
   }
   
   export {earthquakesFixtures }; 