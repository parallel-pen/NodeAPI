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
  "username": "长尼玛",
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
  "username": "长尼玛",
  "my_content": []
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
  "username": "长尼玛",
  "my_content": []
}
```

## 内容操作

### 请求节点下分支列表

```GET /node/list```

params: (可选，为空时返回初始节点)

```json
{
  "node_id": 562523423523
}
```

response:

```json
{
  "code": 100000,
  "node_list": [
    {
      "node_id": 12,
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
  "node_id": 5643434
}
```

response:

```json
{
  "code": 100000,
  "father_node_id": 10,
  "content": "这是详细内容",
  "desc": "这是描述",
  "timestamp": "xxxx-xx-xx",
  "author": "长尼玛",
  "child_node": false
}
```

### 创建内容

```POST /node/create```

params:

```json
{
  "father_node_id": 10,
  "content": "这是详细内容",
  "desc": "这是描述"
}
```

response:

```json
{
  "code": 100000,
  "father_node_id": 10,
  "content": "这是详细内容",
  "desc": "这是描述",
  "timestamp": "xxxx-xx-xx",
  "author": "长尼玛",
  "child_node": false
}
```
