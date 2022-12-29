# Recipe / Ingredient web app

## Menus
- Home
- Recipes
- AddReciepts

## Server
- json server
- port 3001

```command
npm install json-server --save-dev
npm run server 
```
- modify package.json
```
"server": "json-server -p3001 --watch db.json"
```


## database

- no Sql, json document hosted locally, name db.json

## Pages content
### Home
- have a hero banner with a video in the bacground
- view recent recipes and a '... more ...' link to view recipes
- Add a recipe, takes you to add recipe page,
- small explanation of the whole web app and how to use it
- able to add favourite 3 types of recipe in the dashboard

### Recipes
- recipes with limit number, and option to load more, or pagnation
- search for recipes by recipe name or country from one input
- each recipe to have a country flag display from url
- On click of a recipe card component, it should load more details with option to perform modification to the data and display comments and rating if not null.
- Allow comments per specific recipe, and rating (comes later in the sprint after the mvp)

```
https://restcountries.com/v3.1/all
```

### AddRecipes

form that adds a new recipe and post it to the server as json data. sample post
```json
{
"recipe": [
        {
            "name": "Crock Pot Roast",
            "author": "jesse",
            "ingredients": [
                {
                    "ingredientId": "asd123sdf234",
                    "quantity": "1",
                    "name": " beef roast",
                    "type": "Meat"
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
            "comment": [
                {
                    "message": "deliciouse",
                    "date": "11/11/2022"
                },
                {
                    "message": "easy to make",
                    "date": "12/12/2022"
                },
                {
                    "message": "indeed",
                    "date": "12/12/2022"
                }
            ]
        }
    ]
    }

```

