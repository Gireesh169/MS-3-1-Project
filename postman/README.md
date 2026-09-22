# ScholarSphere Digital — Postman Collection Guide

This folder contains the complete, ready-to-import Postman collection for all microservices in the **ScholarSphere Digital** project.

## File Location
- Collection file: [`ScholarSphere_Digital.postman_collection.json`](./ScholarSphere_Digital.postman_collection.json)
- Also mirrored in project root: [`../ScholarSphere_Digital.postman_collection.json`](../ScholarSphere_Digital.postman_collection.json)

---

## How to Import into Postman
1. Open **Postman**.
2. Click the **Import** button in the top left.
3. Drag and drop `ScholarSphere_Digital.postman_collection.json` or browse to select it.
4. Click **Import**.

---

## Collection Structure

The collection is organized into a single root collection with service-based subfolders:

```text
ScholarSphere Digital Microservices
├── 01 - Authentication Service (:8081 via Gateway :8080)
│   ├── 1.1 Register User
│   ├── 1.2 Register Admin
│   ├── 1.3 Login User (Auto-captures Token)
│   ├── 1.4 Login Admin (Auto-captures Admin Token)
│   └── 1.5 Direct Service Login (:8081)
│
├── 02 - Content Service (:8082 via Gateway :8080)
│   ├── 2.1 Upload Content (Multipart)
│   ├── 2.2 Get All Content (With Token)
│   ├── 2.3 Get Content By ID
│   ├── 2.4 Delete Content By ID
│   ├── 2.5 Security Test - No Token (Expected 401)
│   ├── 2.6 Security Test - Invalid Token (Expected 401)
│   ├── 2.7 Direct Service Access (:8082) - No Token (Expected 401)
│   └── 2.8 Direct Service Access (:8082) - With Token (Expected 200)
│
├── 03 - Access Service (:8083 via Gateway :8080)
│   ├── 3.1 Create Subscription Plan
│   ├── 3.2 Subscribe User to Plan
│   ├── 3.3 Get User Subscription
│   ├── 3.4 Check View Access
│   ├── 3.5 Check Download Access
│   ├── 3.6 Security Test - No Token (Expected 401)
│   ├── 3.7 Security Test - Invalid Token (Expected 401)
│   ├── 3.8 Direct Service Access (:8083) - No Token (Expected 401)
│   └── 3.9 Direct Service Access (:8083) - With Token (Expected 200)
│
└── 04 - Gateway Fallback & Health
    ├── 4.1 Fallback - Auth Service
    ├── 4.2 Fallback - Content Service
    └── 4.3 Fallback - Access Service
```

---

## Collection Variables

The collection includes pre-configured variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `gateway_url` | `http://localhost:8080` | API Gateway endpoint |
| `auth_service_url` | `http://localhost:8081` | Authentication Service direct endpoint |
| `content_service_url` | `http://localhost:8082` | Content Service direct endpoint |
| `access_service_url` | `http://localhost:8083` | Access Service direct endpoint |
| `jwt_token` | *(Auto-populated)* | Saved automatically when running Login |
| `admin_jwt_token` | *(Auto-populated)* | Saved automatically when running Admin Login |
| `username` | `gireesh` | Test username |
| `content_id` | `1` | ID for content get/delete |
| `content_type` | `BOOK` | Content type for access checks |

---

## Automatic JWT Token Capture

When you run **1.3 Login User**, Postman executes this built-in test script:

```javascript
var responseText = pm.response.text().trim();
try {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.collectionVariables.set('jwt_token', jsonData.token);
    } else {
        pm.collectionVariables.set('jwt_token', responseText);
    }
} catch (e) {
    pm.collectionVariables.set('jwt_token', responseText);
}
```

This means:
1. Run **1.1 Register User**
2. Run **1.3 Login User**
3. That's it! `jwt_token` is automatically stored, and all subsequent requests in **02 - Content Service** and **03 - Access Service** will automatically use this Bearer token!
