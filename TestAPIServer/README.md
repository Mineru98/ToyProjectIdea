# Test API Server

## POST /api/verfiy/signin

### Request

**Body**

|Name|Type|Description|Required|
|-|-|-|-|
|username|String|사용자이름|O|
|password|String|비밀번호|O|

### Response

**Key**

|Name|Type|Description|
|-|-|-|
|code|Number|통신 결과 코드|
|token|String|인증 토큰|

## GET /api/user/get/users

### Request

**Headers**

|Key|Type|Description|Required|
|-|-|-|-|
|Authorization|String|인증 토큰|O|

### Response

**Key**

|Name|Type|Description|
|-|-|-|
|code|Number|통신 결과 코드|
|users|Array<User.Id>|모든 유저 리스트|

## GET /api/user/get/user/:id

### Request

**Headers**

|Key|Type|Description|Required|
|-|-|-|-|
|Authorization|String|인증 토큰|O|

**Params**

|Name|Type|Description|Required|
|-|-|-|-|
|id|Number|User Id|O|

### Response

**Key**

|Name|Type|Description|
|-|-|-|
|code|Number|통신 결과 코드|
|username|String|유저 이름|

## POST /api/user/apply/user

### Request

**Headers**

|Key|Type|Description|Required|
|-|-|-|-|
|Authorization|String|인증 토큰|O|

**Body**

|Name|Type|Description|Required|
|-|-|-|-|
|username|String|사용자이름|O|
|password|String|비밀번호|O|

### Response

**Key**

|Name|Type|Description|
|-|-|-|
|code|Number|통신 결과 코드|
