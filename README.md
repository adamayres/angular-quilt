## angular-quilt

> An Angular directive for page layout and widget management.

### Install

#### Download

```javascript
bower install angular-quilt --save

```

#### Include Script

```html
<script src="/bower_components/angular-quilt/dist/angular-quilt.js">
```

#### Add module dependency

```javascript
angular.module('myApp', ['ngQuilt']);
```

#### Use directive

```html
<ng:quilt quilt-url="/quilts/page.quilt.json"></ng:quilt>
```

#### Example quilt

```json
{
  "rows": [
    {
      "columns": [
        {
          "width": 12,
          "components": [
            {
              "id": "test-content",
              "parameters": {
                "content": "Header"
              }
            }
          ]
        }
      ]
    },
    {
      "columns": [
        {
          "width": 8,
          "components": [
            {
              "id": "test-content",
              "parameters": {
                "content": "Main Content"
              }
            }
          ]
        }, {
          "width": 4,
          "components": [
            {
              "id": "test-content",
              "parameters": {
                "content": "Side Content"
              }
            }
          ]
        }
      ]
    },
    {
      "columns": [
        {
          "width": 12,
          "components": [
            {
              "id": "test-content",
              "parameters": {
                "content": "Footer"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### API Doc

**TODO**
