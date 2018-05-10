## 请求Header

```json
{
  "Authorization": "fadsfasdfadsg"
}
```

## 错误信息返回范例

```json
{
  "code": 200000, # 非100000的code都为错误返回
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
  "token": "fdafadhskghaiudgaiu", //每次请求放在http header中进行用户身份验证
  "username": "长尼玛",
  "my_content": []  //用户遍及的内容
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
  "token": "fdafadhskghaiudgaiu", //每次请求放在http header中进行用户身份验证
  "username": "长尼玛",
  "my_content": [] //用户编辑的内容
}
```

## 内容操作

### 请求节点下分支列表

```GET /node/list```

params: 

```json
{
  "node_id": 562523423523 // 节点id，非必传，为空时为初始节点
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

params:

```json
{
  "node_id": 5643434 //节点id，非必传，为空时为初始节点
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
  "child_node": false //表示下面是否还有子节点
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
  "child_node": false //表示下面是否还有子节点
}
```
