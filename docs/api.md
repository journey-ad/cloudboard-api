# CloudBoard API 文档

### 获取新密钥

GET /api/key-gen

生成一个新的加密密钥。

#### 响应

```
{
  "key": "cb_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

#### 错误响应

```
{
  "error": "生成密钥失败"
}
状态码: 500
```

### 获取剪贴板内容

GET /api/sync?key={key}

#### 参数

| 参数名 | 类型  | 必需  | 描述  |
| --- | --- | --- | --- |
| key | string | 是   | 加密密钥 |

#### 响应

```
{
  "code": 200,
  "msg": "success",
  "data": {
    "content": "剪贴板内容",
    "type": "text",
    "timestamp": 1234567890
  },
  "ttl": 600
}
```

### 更新剪贴板内容

POST /api/sync

#### 请求体

支持 `application/json`、`multipart/form-data` 和 `application/x-www-form-urlencoded` 格式：

```
{
  "key": "cb_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "content": "要同步的内容",
  "type": "text"
}
```

#### 参数说明

| 参数名 | 类型  | 必需  | 描述  |
| --- | --- | --- | --- |
| key | string | 是   | 加密密钥 |
| content | string | 是   | 要同步的内容 |
| type | string | 否   | 内容类型，默认为 "text" |
