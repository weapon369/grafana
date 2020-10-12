+++
title = "Short URL HTTP API "
description = "Grafana Short URL HTTP API"
keywords = ["grafana", "http", "documentation", "api", "shortUrl"]
aliases = ["/docs/grafana/latest/http_api/short_url/"]
type = "docs"
[menu.docs]
name = "Short URL"
parent = "http_api"
+++

# Short URL API

This API can be used to create shortened URLs. This allows URLs containing complex query parameters to be represented by smaller, simpler URLs of the format `/goto/:uid`.

## Create short URL

`POST /api/short-urls`

Creates a new short URL.

**Example request:**

```http
POST /api/short-urls HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJrIjoiT0tTcG1pUlY2RnVKZTFVaDFsNFZXdE9ZWmNrMkZYbk

{
  "path": "/d/TxKARsmGz/new-dashboard?orgId=1&from=1599389322894&to=1599410922894"
}
```

JSON body schema:

- **path** – The path to shorten.

**Example response:**

```http
HTTP/1.1 200
Content-Type: application/json

AT76wBvGk
```

Status codes:

- **200** – Created
- **400** – Errors (invalid JSON, missing or invalid fields)