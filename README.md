# API Musicaberta

> Status do Projeto: Concluido :heavy_check_mark:

## :memo: Descrição do projeto
Back-End (API) do projeto “Músicaberta (música aberta)” que permite compartilhamento de partituras online, a ideia é que qualquer pessoa possa pesquisar por partituras para baixá-las e/ou favoritar.

## :wrench: Tecnologias utilizadas
<a href="https://fastify.dev" target="_blank">
  <img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg" />
</a>
<a href="https://www.typescriptlang.org" target="_blank">
  <img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
</a>
<a href="https://www.prisma.io/docs/getting-started" target="_blank">
  <img width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" />
</a>

# Documentação da API

## Endpoint: `/users`

### 1. **POST /users**
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "avatarUrl": "http://example.com/avatar.jpg"
  }
  ```
- **Resposta**:
  - **Sucesso**: `201 Created`
    ```json
    {
      "user": {
        "id": "123",
        "createdAt": "2024-10-23T10:00:00Z",
        "name": "John Doe",
        "email": "john@example.com",
        "bio": "Music enthusiast",
        "roles": ["professor", "músico"],  
        "instruments": ["clarinete"],
        "avatarUrl": "http://example.com/avatar.jpg"
      }
    }
    ```
  - **Erro**: `400 Bad Request` (nenhum erro específico definido).

### 2. **PATCH /users/:id**
- **Descrição**: Atualiza os dados de um usuário específico.
- **Corpo da Requisição**:
  ```json
  {
    "bio": "Updated bio",
    "instruments": ["clarinete", "saxofone"],
    "roles": ["músico"]  
  }
  ```
- **Resposta**:
  - **Sucesso**: `200 OK`
    ```json
    {
      "user": {
        "id": "123",
        "createdAt": "2024-10-23T10:00:00Z",
        "name": "John Doe",
        "email": "john@example.com",
        "bio": "Updated bio",
        "roles": ["músico"], 
        "instruments": ["clarinete", "saxofone"],
        "avatarUrl": "http://example.com/avatar.jpg"
      }
    }
    ```
  - **Erro**: `400 Bad Request` (se o usuário não existir).

### 3. **GET /users/:id**
- **Descrição**: Retorna um usuário específico.
- **Parâmetro**: `id` (identificador do usuário).
- **Resposta**:
  - **Sucesso**: `200 OK`
    ```json
    {
      "user": {
        "id": "123",
        "createdAt": "2024-10-23T10:00:00Z",
        "name": "John Doe",
        "email": "john@example.com",
        "bio": "John Doe bio",
        "roles": ["professor", "músico"],  
        "instruments": ["clarinete"],
        "avatarUrl": "http://example.com/avatar.jpg"
      }
    }
    ```
  - **Erro**: `404 Not Found` (se o usuário não for encontrado).

## Endpoint: /sheets

### POST /sheets
- **Descrição:** Cria uma nova partitura.
- **Corpo da requisição:**
  ```json
  {
    "mp3Url": "mp3url.example.com",
    "pdfUrl": "pdfurl.example.com",
    "songWriter": "writer name",
    "title": "sheet title",
    "badges": ["badge"],
    "userId": "cm38yrmdu000008jygk9jat3w"
  }
  ```
- **Resposta:**
  - **Código 201:**
  ```json
  {
    "sheet": {
      "id": "cm38yt2zi000108jybp201wd7",
      "createdAt": "2024-10-23T10:00:00Z",
      "updatedAt": "2024-10-23T10:00:00Z",
      "title": "sheet title",
      "songWriter": "writer name",
      "mp3Url": "mp3url.example.com",
	  "pdfUrl": "pdfurl.example.com",
      "badges": ["badge"],
      "userId": "cm38yrmdu000008jygk9jat3w"
    }
  }
  ```

### POST /sheets/upload
- **Descrição:** Faz o upload de um arquivo PDF (multipart file).
- **Corpo da requisição:** (arquivo PDF na request)
- **Resposta:**
  - **Código 200:**
  ```json
  {
    "fileURL": "string",
    "message": "Upload succeeded"
  }
  ```
  - **Código 400:** Se não houver arquivo enviado.

### GET /sheets
- **Descrição:** Retorna todas as partituras.
- **Query Params:**
  - `search`: `string | undefined`
  - `sort`: `"asc" | "desc" | undefined`
  - `page`: `number` (obrigatório)
- **Resposta:**
```json
{
  "data": [ /* Array de Sheets */ ],
  "meta": {
    "current": number,
    "path": "/sheets",
    "prev": number | null,
    "next": number | null,
    "last": number,
    "total": number
  }
}
```

### GET /sheets/:id
- **Descrição:** Retorna as partituras de um usuário específico.
- **Parâmetros:**
  - `id`: `string`
- **Resposta:**
```json
{
  "sheets": [ /* Array de Sheet */ ]
}
```

### DELETE /sheets/:id
- **Descrição:** Deleta uma partitura específica.
- **Query Params:**
  - `id`: `string`
  - `key`: `string`
- **Resposta:**
  - **Código 200:**
  ```json
  {
    "message": "sheet deleted"
  }
  ```


## Endpoint: `/favorites`

### 1. **POST /favorites**
- **Descrição**: Cria um novo favorito.
- **Corpo da Requisição**:
  ```json
  {
    "userId": "cm38z7bjy000108lg9ht66gwa",
    "sheetId": "cm38z7jjs000208lg6ums3hwp"
  }
  ```
- **Resposta**:
  - **Sucesso**: `201 Created`
    ```json
    {
      "favorite": {
        "id": "cm38z8wnd000308lgegkj4qci",
        "createdAt": "2024-11-08T16:54:10.649Z",
        "userId": "cm38z7bjy000108lg9ht66gwa",
        "sheetId": "cm38z7jjs000208lg6ums3hwp"
	  }
    }
    ```
  - **Erro**: `400 Bad Request` (nenhum erro específico definido).

### 2. **DELETE /favorites/:id**
- **Descrição**: Deleta um favorito específico.
- **Resposta**:
  - **Sucesso**: `200 OK`
    ```json
    {
      "message": "favorite deleted"
    }
    ```
  - **Erro**: `400 Bad Request` (nenhum erro definido ainda).

### 3. **GET /favorites/:id**
- **Descrição**: Retorna uma lista de favoritos de um usuário específico.
- **Parâmetro**: `id` (identificador do usuário).
- **Resposta**:
  - **Sucesso**: `200 OK`
    ```json
    {
	      "favorites": [
	        {
	            "favoriteId": "cm38z8wnd000308lgegkj4qci",
	            "sheet": {
	                "id": "cm38z7jjs000208lg6ums3hwp",
	                "createdAt": "2024-11-05T01:04:23.711Z",
	                "updatedAt": "2024-11-05T01:04:23.711Z",
	                "title": "Dois Corações",
	                "songWriter": "Pedro Salgado",
	                "pdfUrl": "https://qzlpaffxclrcwakxchow.supabase.co/storage/v1/object/public/sheets/sheetuuid",
	                "mp3Url": "",
	                "badges": [
	                    "Tenor",
	                    "Dobrado"
	                ],
	                "userId": "cm38z7bjy000108lg9ht66gwa"
	            }
	        }
	    ]
    }
    ```
