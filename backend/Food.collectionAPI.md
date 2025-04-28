---
title: Food Nutrients APP API Document v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="food">FoodAPP API Document v1.0.0</h1>


Base URLs:

* <a href="https://api.nal.usda.gov">https://api.nal.usda.gov</a>

* <a href="http://localhost:5000">http://localhost:5000</a>


# Authentication
- HTTP Authentication, scheme: noauth

# External API - USDA Food Data
>Base URL is https://api.nal.usda.gov for below API
## Search food by name in USDA 

`GET /fdc/v1/foods/search?&query=<foodname>&api_key=<apikey>`
> Example responses
```json
{
    "totalHits": 414,
    "currentPage": 1,
    "totalPages": 9,
    "pageList": [
        1,
        2
    ],
    "foodSearchCriteria": {
        "query": "matcha",
        "generalSearchInput": "matcha",
        "pageNumber": 1,
        "numberOfResultsPerPage": 50,
        "pageSize": 50,
        "requireAllWords": false
    },
                    {
                    "nutrientId": 1258,
                    "nutrientName": "Fatty acids, total saturated",
                    "nutrientNumber": "606",
                    "unitName": "G",
                    "derivationCode": "LCCD",
                    "derivationDescription": "Calculated from a daily value percentage per serving size measure",
                    "derivationId": 75,
                    "value": 0.0,
                    "foodNutrientSourceId": 9,
                    "foodNutrientSourceCode": "12",
                    "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
                    "rank": 9700,
                    "indentLevel": 1,
                    "foodNutrientId": 29621919,
                    "percentDailyValue": 0
                }
            ],
            "finalFoodInputFoods": [],
            "foodMeasures": [],
            "foodAttributes": [],
            "foodAttributeTypes": [],
            "foodVersionIds": []
        }
        ],
    "aggregations": {
        "dataType": {
            "Branded": 414
        },
        "nutrients": {}
    }
}

```

## Get nutrients details by fdcId in USDA
`GET /fdc/v1/food/<fdcId>`
> Example responses
```json
{
    "foodClass": "Survey",
    "description": "Apple cider",
    "foodNutrients": [
        {
            "type": "FoodNutrient",
            "id": 28803969,
            "nutrient": {
                "id": 1003,
                "number": "203",
                "name": "Protein",
                "rank": 600,
                "unitName": "g"
            },
            "amount": 0.100
        },
               {
            "id": 284101,
            "measureUnit": {
                "id": 9999,
                "name": "undetermined",
                "abbreviation": "undetermined"
            },
            "modifier": "30001",
            "gramWeight": 31,
            "portionDescription": "1 fl oz (no ice)",
            "sequenceNumber": 4
        }
    ],
    "publicationDate": "10/28/2022",
    "inputFoods": [
        {
            "id": 119312,
            "unit": "GM",
            "portionDescription": "NONE",
            "portionCode": "0",
            "foodDescription": "Apple juice, canned or bottled, unsweetened, without added ascorbic acid",
            "amount": 100,
            "ingredientWeight": 100,
            "ingredientCode": 9016,
            "ingredientDescription": "Apple juice, canned or bottled, unsweetened, without added ascorbic acid",
            "sequenceNumber": 1
        }
    ]
}
```

# Authentication & User Management
> Base URL is localhost for below API
## Register User
`POST /api/user/register`
> Body parameter
```json
{
  "name": "testUser",
  "email": "testuser@example.com",
  "password": "12345678"
}
```

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|

> Example responses
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYzA4MzhiZThhZTRlMWI1N2RmYzNlIiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE3Mjc3OTMyMDgsImV4cCI6MTcyNzc5NjgwOH0.COeTjjX2a37OVJbpKpcQKeRpD9MeGJmvCDG5q-UctOY"
}
```

## User login
`POST /api/user/login`
> Body parameter
```json
{
  "email": "testuser@example.com",
  "password": "12345678"
}
```

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|

> Example responses
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYzA4MzhiZThhZTRlMWI1N2RmYzNlIiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE3Mjc3OTMzNzEsImV4cCI6MTcyNzc5Njk3MX0.oj_DFzgMgw4llV3pG4XMiA65ZY-53BGbvI384y4tfoA"
}
```

## Modify user account by admin

`PUT /api/user/admin/<Email>`

> Body parameter

```json
{
  "name": "maomao",
  "password":"11223344",
  "isActive": true
}

```

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|true|none|
|body|body|object|true|none|

> Example responses
```json
{
    "_id": "66f6d18473f7f06bef3dbb71",
    "name": "maomao",
    "email": "maomao@gmail.com",
    "password": "11223344",
    "isAdmin": false,
    "isActive": true,
    "__v": 0
}
```

## Create user account by admin

`POST api/user/admin`
> Body parameter
```json
{
  "name": "newUser",
  "email": "newtestuser@example.com",
  "password": "12345678",
  "isAdmin": false,
  "isActive": true
}
```

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|true|none|
|body|body|object|true|none|

> Example responses
```json
{
    "msg": "User created successfully",
    "user": {
        "name": "newUser",
        "email": "newtestuser@example.com",
        "password": "12345678",
        "isAdmin": false,
        "isActive": true,
        "_id": "66fd0659a9b31331c0df4b76",
        "__v": 0
    }
}
```

## Validate token

`GET /api/user/validate-token`

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|false|none|
|body|body|object|true|none|

> Example responses
```json
{
    "valid": true,
    "user": {
        "id": "66f6d18473f7f06bef3dbb71",
        "isAdmin": false
    }
}
```

## Get login user's information
`GET /api/user/me`
|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|true|none|

> Example responses

```json
{
    "_id": "66fc0838be8ae4e1b57dfc3e",
    "name": "testUser",
    "email": "testuser@example.com",
    "isAdmin": false,
    "isActive": true,
    "__v": 0
}
```

# Food Data
> Base URL is localhost for below API
## Search food by foodname
`GET /api/food/search?query=<foodname>`
> Example responses
```json
{
    "foodClass": "Survey",
    "description": "Apple cider",
    "foodNutrients": [
        {
            "type": "FoodNutrient",
            "id": 28803969,
            "nutrient": {
                "id": 1003,
                "number": "203",
                "name": "Protein",
                "rank": 600,
                "unitName": "g"
            },
            "amount": 0.100
        },
              {
            "id": 284101,
            "measureUnit": {
                "id": 9999,
                "name": "undetermined",
                "abbreviation": "undetermined"
            },
            "modifier": "30001",
            "gramWeight": 31,
            "portionDescription": "1 fl oz (no ice)",
            "sequenceNumber": 4
        }
    ],
    "publicationDate": "10/28/2022",
    "inputFoods": [
        {
            "id": 119312,
            "unit": "GM",
            "portionDescription": "NONE",
            "portionCode": "0",
            "foodDescription": "Apple juice, canned or bottled, unsweetened, without added ascorbic acid",
            "ingredientCode": 9016,
            "ingredientDescription": "Apple juice, canned or bottled, unsweetened, without added ascorbic acid",
            "ingredientWeight": 100,
            "amount": 100,
            "sequenceNumber": 1
        }
    ]
}
```

## Get nutrients details by fdcId
`GET /api/food/<fdcId>`
> Example responses
```json
{
    "fdcId": 167782,
    "description": "Abiyuch, raw",
    "foodNutrients": [
        {
            "nutrientName": "Proximates",
            "value": 0
        },
        {
            "nutrientName": "Water",
            "value": 79.9
        },
               {
            "nutrientName": "Fatty acids, total trans",
            "value": 0
        }
    ]
}

```

# MyFood Management
> Base URL is localhost for below API
## Add a food to myfood
`POST /api/myfood/`
> Body parameter

```json
{
  "fdcId": "167782",
  "description": "Test delete"
}
```

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|false|none|
|body|body|object|true|none|

> Example responses
```json
{
    "userId": "66f6d18473f7f06bef3dbb71",
    "fdcId": "167782",
    "description": "Test delete",
    "show": true,
    "isActive": true,
    "_id": "66fd0af3a9b31331c0df4b7b",
    "createdAt": "2024-10-02T08:57:23.264Z",
    "updatedAt": "2024-10-02T08:57:23.264Z",
    "__v": 0
}
```

## Get all food list in myfood
`GET /api/myfood/`
|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|true|none|

> Example responses

```json
[
    {
        "fdcId": "2346270",
        "description": "Sangria, red",
        "energy": {
            "nutrientName": "Energy",
            "value": 96,
            "unit": "kcal"
        },
        "fat": {
            "nutrientName": "Fat",
            "value": 0,
            "unit": "g"
        },
        "carbohydrate": {
            "nutrientName": "Total Carbohydrate",
            "value": 0,
            "unit": "g"
        },
        "protein": {
            "nutrientName": "Protein",
            "value": 0.04,
            "unit": "g"
        }
    },
    {
        "fdcId": "2344788",
        "description": "Apple, candied",
        "energy": {
            "nutrientName": "Energy",
            "value": 134,
            "unit": "kcal"
        },
        "fat": {
            "nutrientName": "Fat",
            "value": 0,
            "unit": "g"
        },
        "carbohydrate": {
            "nutrientName": "Total Carbohydrate",
            "value": 0,
            "unit": "g"
        },
        "protein": {
            "nutrientName": "Protein",
            "value": 1.34,
            "unit": "g"
        }
    }
]
```

## Delete food from my foodlist
`Delete /api/myfood/<fdcId>`
|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|true|none|
|body|body|object|false|none|

> Example responses
```json
{
    "_id": "66f6d25673f7f06bef3dc0a0",
    "userId": "66f6d22873f7f06bef3dc057",
    "fdcId": "2346270",
    "description": "addfood",
    "show": false,
    "isActive": true,
    "createdAt": "2024-09-27T15:42:14.329Z",
    "updatedAt": "2024-10-02T08:25:42.687Z",
    "__v": 0
}
```

## Get all food list in myfood
`GET /api/myfood/`
|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-auth-token|header|string|true|none|

> Example responses

```json
[
    {
        "fdcId": "2346270",
        "description": "Sangria, red",
        "energy": {
            "nutrientName": "Energy",
            "value": 96,
            "unit": "kcal"
        },
        "fat": {
            "nutrientName": "Fat",
            "value": 0,
            "unit": "g"
        },
        "carbohydrate": {
            "nutrientName": "Total Carbohydrate",
            "value": 0,
            "unit": "g"
        },
        "protein": {
            "nutrientName": "Protein",
            "value": 0.04,
            "unit": "g"
        }
    },
    {
        "fdcId": "2344788",
        "description": "Apple, candied",
        "energy": {
            "nutrientName": "Energy",
            "value": 134,
            "unit": "kcal"
        },
        "fat": {
            "nutrientName": "Fat",
            "value": 0,
            "unit": "g"
        },
        "carbohydrate": {
            "nutrientName": "Total Carbohydrate",
            "value": 0,
            "unit": "g"
        },
        "protein": {
            "nutrientName": "Protein",
            "value": 1.34,
            "unit": "g"
        }
    }
]
```

