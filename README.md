## 请求Header

```json
{
  "Authorization": "fadsfasdfadsg"
}
```

## 错误信息返回范例

```json
{
  "code": 200000,
  "msg": "xxx"
}
```

## 用户信息操作

### 注册

```POST /register```

params:
```json
{
  "account": "raylin51",
  "password": "(secret)",
  "invitation": "adfadsf"
}
```

response:

```json
{
  "code": 100000,
  "uid": 1,
  "token": "fdafadhskghaiudgaiu",
  "myContent": [],
  "recentView": {}
}
```

### 登录

```POST /login```

params:

```json
{
  "account": "raylin51",
  "password": "(secret)"
}
```

response:

```json
{
  "code": 100000,
  "uid": 1,
  "token": "fdafadhskghaiudgaiu",
  "myContent": [
    {
      "desc": "xxx",
      "nodeId": "xxx"
    }
  ],
  "recentView": {
    "desc": "xxxx",
    "nodeId": "124124"
  }
}
```

### 用户信息

```GET /userinfo```

params:无参数，利用header判断用户id,仅支持返回自己的用户信息

response:

```json
{
  "code": 100000,
  "account": "raylin51",
  "myContent": [],
  "recentView": {
    "desc": "raylzj51",
    "nodeId": "5b017bcddce961801905fc96"
  }
}
```

## 内容操作

### 请求节点详细内容

```GET /node/content```

params: 

```json
{
  "nodeId": 5643434,
  "first": 1 //可选，当nodeId为空时传该参数，表示请求首个节点
}
```

response:

```json
{
  "code": 100000,
  "nodeId": 12,
  "fatherId": 10,
  "content": "这是详细内容",
  "desc": "这是描述",
  "timestamp": "2018-05-13T14:27:08.000Z",
  "author": "raylzj51",
  "childNodes": [
    {
      "desc": "xxx",
      "nodeId": "1231241"
    }
  ]
}
```

### 创建内容

```POST /node/create```

params:

```json
{
  "fatherId": 10,
  "content": "这是详细内容",
  "desc": "这是描述"
}
```

response:

```json
{
  "code": 100000,
  "nodeId": 12,
  "fatherId": 10,
  "content": "这是详细内容",
  "desc": "这是描述",
  "timestamp": "2018-05-13T14:27:08.000Z",
  "author": "raylzj51",
  "childNodes": false
}
```
