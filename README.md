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

```POST /registered```

params:
```json
{
  "account": "raylin51",
  "password": "(secret)",
  "inviteCode": "adfadsf"
}
```

response:

```json
{
  "code": 100000,
  "uid": 1,
  "token": "fdafadhskghaiudgaiu",
  "myContent": []
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
  "myContent": []
}
```

## 内容操作

### 请求节点下分支列表

```GET /node/list```

params: (可选，为空时返回初始节点)

```json
{
  "nodeId": 562523423523
}
```

response:

```json
{
  "code": 100000,
  "nodeList": [
    {
      "nodeId": 12,
      "desc": "这是概括描述"
    }
  ]
}
```

### 请求节点详细内容

```GET /node/content```

params: (可选，为空时返回初始节点)

```json
{
  "nodeId": 5643434
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
