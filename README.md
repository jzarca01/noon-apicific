# Noon-Apicific

An API Wrapper for Noon-Pacific

## Usage

```javascript
const NoonApicific = require('noon-apicific')
const noon = new NoonApicific({
    clientId: ""
})
```

### Get collections

```javascript
noon.getCollections()
```

### Get latest mixtape

```javascript
noon.getLatestMixtape()
```

### Get mixtape details

```javascript
noon.getMixtape('noon-265')
```

### Get mixtapes by collection

```javascript
noon.getMixtapesByCollection(collection = 'los-angeles', maxResults = '50')
maxResults can be 'ALL'
```

### Get mixtapes

```javascript
noon.getMixtapes(maxResults = '50')
maxResults can be 'ALL'
```

### Get tracks

```javascript
noon.getTracks(maxResults = '50')
maxResults can be 'ALL'
```