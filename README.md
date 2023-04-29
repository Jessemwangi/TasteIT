<h2>Recipe Website</h2>

This full-stack React application was developed during my training at Business College Helsinki. The app allows users to enter their favorite recipes and share them with others. Users can also review and rate recipes entered by others, as well as leave comments on recipes they have tried. The app is built using a full-stack approach, with a backend server and database implemented using technologies such as Node.js and MongoDB. The frontend is built using React, allowing for a smooth and responsive user experience. Overall, this app demonstrates my skills as a full-stack developer and my ability to create a functional and user-friendly application..

### Technologies used

    -   React
    -   CSS
    -   Bootstrap 
    -   HTML

### Database Schems
```json
{
  "recipe": [
    {
      "id": 1,
      "name": "Crock Pot Roast",
      "author": "Jesse Mwangi",
      "ingredients": [
        {
          "ingredientId": "asd123sdf234",
          "quantity": "1",
          "name": " beef roast",
          "type": "MeatFish"
        },
        {
          "ingredientId": "asd123sdf235",
          "quantity": "1 package",
          "name": "brown gravy mix",
          "type": "Baking"
        },
        {
          "ingredientId": "asd123sdf236",
          "quantity": "1 package",
          "name": "dried Italian salad dressing mix",
          "type": "Condiments"
        },
        {
          "ingredientId": "asd123sdf237",
          "quantity": "1 package",
          "name": "dry ranch dressing mix",
          "type": "Condiments"
        },
        {
          "ingredientId": "asd123sdf238",
          "quantity": "1/2 cup",
          "name": "water",
          "type": "Liquids"
        }
      ],
      "steps": [
        {
          "stepid": 1,
          "name": "Place beef roast in crock pot.",
          "timers": 3
        },
        {
          "stepid": 2,
          "name": "Mix the dried mixes together in a bowl and sprinkle over the roast.",
          "timers": 3
        },
        {
          "stepid": 3,
          "name": "Pour the water around the roast.",
          "timers": 5
        }
      ],
      "country": {
        "name": "India",
        "flagUrl": "https://flagcdn.com/in.svg"
      },
      "imageURL": "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg",
      "alturl": "http://www.food.com/recipe/to-die-for-crock-pot-roast-27208",
      "rating": 4.7,
      "featured": true
    }
    ]
}


```

storage location firebase
### Screen shot

<img src="src/Assets/tasteIT.png" alt="TasteIt"/>

### Disclaimer

<p>Image use and flag are both work of other end point, courtesy of</p> 
    -   images are courtesy of <a href = "https://unsplash.com">Unsplash</a>
    -   Country and flags 

### Intake taken

<p> Used the latest way to create navigation using 'createBrowserRouter'

```Javascript
    createBrowserRouter(createRoutesFromElements(<Route path="/" element={<Name />}>));
```


<p> Organize data into the right structure, the json database had to be in an organized for quick access
and CRUD operation. comments had to be added, receipt needed to be placed in the featured (PUT action), 
