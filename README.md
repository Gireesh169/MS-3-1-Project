<<<<<<< HEAD
# 📚 ScholarSphere Digital
> **Next-Generation Distributed Academic Publishing & Content Rights Management Platform**  
> *Course Project | PS029: Digital Knowledge Platform & Content Access Management System*

<div align="center">

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.1-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-2024.0.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Netflix Eureka](https://img.shields.io/badge/Eureka-Service_Discovery-FF6F00?style=for-the-badge&logo=netflix&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-SOA_/_Microservices-0052CC?style=for-the-badge)

</div>

---

## 📖 Table of Contents
- [Executive Overview](#-executive-overview)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [Microservices Mesh & Status Matrix](#-microservices-mesh--status-matrix)
- [Core Platform Capabilities](#-core-platform-capabilities)
- [API Gateway & Routing](#-api-gateway--routing)
- [Complete API Reference](#-complete-api-reference)
- [Tech Stack Breakdown](#-tech-stack-breakdown)
- [Prerequisites & Database Setup](#-prerequisites--database-setup)
- [Quick Start: Step-by-Step Execution](#-quick-start-step-by-step-execution)
- [Repository Structure](#-repository-structure)
- [Design Thinking & Research Artifacts](#-design-thinking--research-artifacts)
- [SOA Principles & Viva Cheat Sheet](#-soa-principles--viva-cheat-sheet)

---

## 💡 Executive Overview

**ScholarSphere Digital** is a distributed, service-oriented publishing and access control platform designed to deliver academic textbooks, peer-reviewed journals, and technical research documents to subscription-based institutions and students. 

Engineered under the **Service-Oriented Architecture (SOA)** paradigm, the system completely isolates authentication, digital content repository management, dynamic subscription entitlements (DRM), and user reading telemetry into independent, loosely coupled microservices. All client traffic is securely proxied through a unified **Spring Cloud API Gateway** with **Netflix Eureka** dynamic service discovery and stateless **JWT (JSON Web Token)** role-based security.

---

## 🏛️ System Architecture & Data Flow

### High-Level Topology

```mermaid
graph TD
    Client["💻 Client Frontend<br/>(React 18 + Vite 6 + TailwindCSS)<br/><code>:5173</code>"]
    Gateway["🚪 API Gateway<br/>(Spring Cloud Gateway)<br/><code>:8090</code>"]
    Eureka["📡 Eureka Service Registry<br/>(Spring Cloud Netflix)<br/><code>:8761</code>"]

    subgraph "Core Microservices Mesh"
        Auth["🔐 Auth Service<br/><code>:8081</code>"]
        Content["📚 Content Service<br/><code>:8082</code>"]
        Access["🛡️ Access Service<br/><code>:8083</code>"]
        Usage["📊 Usage Service<br/><code>:8084</code>"]
    end

    subgraph "Database Isolation (PostgreSQL :5432)"
        DB_Auth[("🗄️ SOA-AUTH")]
        DB_Content[("🗄️ SOA-CONTENT")]
        DB_Access[("🗄️ SOA-ACCESS")]
        DB_Usage[("🗄️ SOA-USAGE")]
        Storage[("📂 Local File Store<br/>/uploads")]
    end

    Client -->|HTTP / REST| Gateway
    Gateway -.->|Service Lookup| Eureka
    Auth -.->|Register & Heartbeat| Eureka
    Content -.->|Register & Heartbeat| Eureka
    Access -.->|Register & Heartbeat| Eureka
    Usage -.->|Register & Heartbeat| Eureka

    Gateway -->|<code>/api/auth/**</code>| Auth
    Gateway -->|<code>/content/**</code>| Content
    Gateway -->|<code>/access/**</code>| Access
    Gateway -->|<code>/usage/**</code>| Usage

    Auth --> DB_Auth
    Content --> DB_Content
    Content --> Storage
    Access --> DB_Access
    Usage --> DB_Usage
```

### Complete End-to-End Reading Flow
=======
# ScholarSphere Digital — Microservices Architecture
> **PS029 : Digital Knowledge Platform & Content Access Management System**

ScholarSphere Digital is a distributed, service-oriented publishing and access control platform designed to deliver digital books, academic journals, and research documents to subscription-based users. The system isolates authentication, content cataloging, permission entitlement management, and usage metrics logging into independent microservices with JWT endpoint protection, Spring Cloud Gateway routing, and Netflix Eureka service discovery.

---

## 2. Technology Stack & Infrastructure

| Component | Technology | Version / Configuration |
| :--- | :--- | :--- |
| **Java Platform** | OpenJDK | Java 21 |
| **Framework** | Spring Boot | 3.4.1 |
| **Microservices Suite** | Spring Cloud | 2024.0.0 |
| **Service Registry** | Spring Cloud Netflix Eureka Server | Standalone mode (`8761`) |
| **API Gateway** | Spring Cloud Gateway | Reactive Gateway with Spring Cloud LoadBalancer (`8080`) |
| **Security & Auth** | Spring Security 6 & JJWT | Stateless JWT (HMAC-SHA256, 15 min expiry) |
| **Persistence / ORM** | Spring Data JPA / Hibernate | DDL Auto: `update`, Dialect: PostgreSQL |
| **Database** | PostgreSQL | Port `5432`, Separate databases per service |
| **Inter-Service Calls** | Spring Cloud OpenFeign | Declared in architecture (Planned for Access & Content) |

---

## 3. Current State Inventory: What Is Built vs What Is Pending

### Summary Status Table

| Microservice / Component | Implementation Status | Port | Database | Key Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Eureka Server** | Completed | `8761` | N/A | Service registration & dynamic discovery |
| **API Gateway** | Configured (Needs Minor Fix) | `8080` | N/A | Central routing & load balancing |
| **Authentication Service** | Completed | `8081` | `SOA-AUTH` | User registration, login, password hashing, JWT generation |
| **Content Service** | Completed | `8082` | `SOA-CONTENT` | Content metadata CRUD & file upload storage |
| **Access Service** | Completed | `8083` | `SOA-ACCESS` | Subscription plan management & permission verification |
| **Usage Service** | Missing / Pending | `8084` | `SOA-USAGE` | Reading history, engagement tracking & metrics |
| **Gateway JWT Validation** | Pending | Gateway | N/A | Gateway-level token verification & request filtering |
| **Inter-Service Feign Clients** | Pending | Access / Content | N/A | Automated permission verification & activity logging |
| **Frontend Web App** | Pending | TBD | N/A | User portal for catalog browsing, reader, and plans |

---

## 4. Microservices Deep Dive

### 1. Eureka Server (`Backend/EurekaServer`)
- **Port**: `8761`
- **Application Name**: `EurekaServer`
- **Role**: Service registry enabling dynamic service discovery without hardcoding IP addresses or ports.
- **Config Highlights**:
  - `eureka.client.register-with-eureka=false`
  - `eureka.client.fetch-registry=false`

---

### 2. API Gateway (`Backend/ApiGateway`)
- **Port**: `8080`
- **Application Name**: `APIGATEWAY`
- **Role**: Single entry point for all incoming client traffic. Dispatches requests to registered services using Eureka service IDs (`lb://<SERVICE_NAME>`).
- **Configured Routes**:
  - `Path=/api/auth/**` $\rightarrow$ `lb://AUTHENTICATIONSERVICE`
  - `Path=/content/**` $\rightarrow$ `lb://CONTENT-SERVICE`
  - `Path=/access/**` $\rightarrow$ `lb://CONTENT-SERVICE` *(Note: Route target currently misconfigured, see Section 6)*

---

### 3. Authentication Service (`Backend/AuthenticationService`)
- **Port**: `8081`
- **Application Name**: `AUTHENTICATIONSERVICE`
- **Database**: PostgreSQL `SOA-AUTH`
- **Role**: Handles user credentials, password encryption, and stateless token creation.
- **Domain Model**:
  - **`User`**:
    - `id` (Long, PK)
    - `username` (String, Unique)
    - `email` (String, Unique)
    - `password` (String, BCrypt hashed)
    - `role` (`Role`: `USER`, `ADMIN`)
    - `enabled` (boolean)
    - `createdAt` (LocalDateTime)
- **Security Mechanism**:
  - Stateless session with `JwtAuthenticationFilter`.
  - Secret key HMAC-SHA256 with 900,000 ms (15 min) token expiration.
- **REST Endpoints**:
  | Method | Endpoint | Request Body | Description |
  | :--- | :--- | :--- | :--- |
  | `POST` | `/api/auth/register` | `SignUpRequest` (`username`, `email`, `password`, `role`) | Registers user with encrypted password |
  | `POST` | `/api/auth/login` | `LoginInRequest` (`username`, `password`) | Verifies credentials and returns JWT token string |

---

### 4. Content Service (`Backend/ContentService`)
- **Port**: `8082`
- **Application Name**: `CONTENT-SERVICE`
- **Database**: PostgreSQL `SOA-CONTENT`
- **Role**: Manages digital content metadata and physically stores uploaded files on the local filesystem (`uploads/`).
- **Domain Model**:
  - **`Content`**:
    - `id` (Long, PK)
    - `title` (String)
    - `author` (String)
    - `description` (String)
    - `type` (`ContentType`: `BOOK`, `JOURNAL`, `RESEARCH_DOCUMENT`)
    - `fileName` (String)
    - `filePath` (String)
    - `createdAt` (LocalDateTime)
- **REST Endpoints**:
  | Method | Endpoint | Payload / Params | Description |
  | :--- | :--- | :--- | :--- |
  | `POST` | `/content/upload` | Multipart (`content`: JSON `ContentRequest`, `file`: MultipartFile) | Stores file in `uploads/` and persists metadata |
  | `GET` | `/content` | None | Returns list of all cataloged contents |
  | `GET` | `/content/{id}` | `id` (Path variable) | Retrieves a specific content item by ID |
  | `DELETE` | `/content/{id}` | `id` (Path variable) | Deletes record from DB and deletes file from disk |

---

### 5. Access Service (`Backend/AccessService`)
- **Port**: `8083`
- **Application Name**: `ACCESS-SERVICE`
- **Database**: PostgreSQL `SOA-ACCESS`
- **Role**: Controls digital rights management (DRM), subscription plans, user subscriptions, and permission checks for viewing/downloading specific content types.
- **Domain Models**:
  - **`SubscriptionPlan`**:
    - `id` (Long, PK)
    - `planType` (`PlanType`: `FREE`, `BASIC`, `PREMIUM`)
    - `price` (double)
    - `canView` (boolean)
    - `canDownload` (boolean)
    - `canAccessBooks` (boolean)
    - `canAccessJournals` (boolean)
    - `canAccessResearch` (boolean)
  - **`UserSubscription`**:
    - `id` (Long, PK)
    - `username` (String)
    - `planType` (`PlanType`)
    - `startDate` (LocalDateTime)
    - `endDate` (LocalDateTime)
    - `active` (boolean)
- **REST Endpoints**:
  | Method | Endpoint | Payload / Params | Description |
  | :--- | :--- | :--- | :--- |
  | `POST` | `/access/plans` | `PlanRequest` | Creates a subscription tier configuration |
  | `POST` | `/access/subscribe` | `SubscriptionRequest` (`username`, `planType`) | Subscribes a user for 1 month |
  | `GET` | `/access/subscription/{username}` | `username` (Path variable) | Fetches user's current subscription status |
  | `GET` | `/access/view/{username}/{contentType}` | `username`, `contentType` | Validates if user can view the specific content type |
  | `GET` | `/access/download/{username}/{contentType}` | `username`, `contentType` | Validates if user can download the specific content type |

---

### 6. Usage Service (Required by PS029 — Pending Implementation)
- **Planned Port**: `8084`
- **Planned Application Name**: `USAGE-SERVICE`
- **Planned Database**: PostgreSQL `SOA-USAGE`
- **Role**: Tracks user engagement, logs reading sessions, counts downloads, and records access audit trails to detect scrapers or access breaches.
- **Target Domain Model**:
  - **`ReadingHistory` / `UsageLog`**:
    - `id` (Long, PK)
    - `username` (String)
    - `contentId` (Long)
    - `actionType` (`VIEW`, `DOWNLOAD`)
    - `timestamp` (LocalDateTime)
    - `durationSeconds` (Integer)
    - `ipAddress` (String)

---

## 5. Inter-Service Communication Flow
>>>>>>> ac01a7e2003287589498a96922d12f091ddd2f03

```mermaid
sequenceDiagram
    autonumber
<<<<<<< HEAD
    actor User as 👤 Student / User
    participant Frontend as 💻 React UI (:5173)
    participant Gateway as 🚪 API Gateway (:8090)
    participant Auth as 🔐 Auth Service (:8081)
    participant Content as 📚 Content Service (:8082)
    participant Access as 🛡️ Access Service (:8083)
    participant Usage as 📊 Usage Service (:8084)

    User->>Frontend: Enter credentials & login
    Frontend->>Gateway: POST /api/auth/login
    Gateway->>Auth: Forward to lb://AUTHENTICATIONSERVICE
    Auth-->>Frontend: 200 OK + Stateless JWT (Signed HMAC-SHA256)
    
    User->>Frontend: Open Digital Document #42
    Frontend->>Gateway: GET /content/42 (Bearer JWT)
    Gateway->>Content: Forward to lb://CONTENT-SERVICE
    
    Content->>Access: GET /access/view/{username}/{type}
    alt Subscription Valid (e.g. PREMIUM / BASIC)
        Access-->>Content: 200 OK (Allowed: true)
        Content->>Usage: POST /usage/record (Book ID, User, Action: VIEW)
        Usage-->>Content: 201 Created (History logged)
        Content-->>Frontend: 200 OK + Metadata & Document Stream
        Frontend-->>User: Render Document in Custom Reader
    else Access Denied / Expired Plan
        Access-->>Content: 403 Forbidden (Allowed: false)
        Content-->>Frontend: 403 Forbidden ("Upgrade required")
        Frontend-->>User: Display Subscription Paywall Modal
=======
    actor User
    participant Gateway as API Gateway (8080)
    participant Auth as Auth Service (8081)
    participant Access as Access Service (8083)
    participant Content as Content Service (8082)
    participant Usage as Usage Service (8084)

    User->>Gateway: POST /api/auth/login
    Gateway->>Auth: Authenticate Credentials
    Auth-->>User: Return JWT Token

    User->>Gateway: GET /content/{id} (Bearer JWT)
    Gateway->>Content: Fetch content details
    Content->>Access: [OpenFeign] Check permissions (username, contentType)
    alt Permission Granted
        Access-->>Content: Allowed
        Content->>Usage: [OpenFeign] Log reading activity
        Content-->>User: Return Content Data / Stream File
    else Permission Denied
        Access-->>Content: Denied
        Content-->>User: 403 Forbidden
>>>>>>> ac01a7e2003287589498a96922d12f091ddd2f03
    end
```

---

<<<<<<< HEAD
## ⚡ Microservices Mesh & Status Matrix

| Component | Port | Spring App Name | Database | Status | Primary Responsibilities |
| :--- | :---: | :--- | :--- | :---: | :--- |
| **Eureka Server** | `8761` | `EurekaServer` | *None* | `✅ Active` | Dynamic registry, health heartbeats & lookup directory |
| **API Gateway** | `8090` | `APIGATEWAY` | *None* | `✅ Active` | Central ingress, Eureka load balancing, CORS & route filtering |
| **Auth Service** | `8081` | `AUTHENTICATIONSERVICE` | `SOA-AUTH` | `✅ Active` | BCrypt password hashing, registration, role management, JWT minting |
| **Content Service** | `8082` | `CONTENT-SERVICE` | `SOA-CONTENT` | `✅ Active` | Books, journals & research metadata CRUD + multipart storage (`uploads/`) |
| **Access Service** | `8083` | `ACCESS-SERVICE` | `SOA-ACCESS` | `✅ Active` | DRM subscription tier management (`FREE`, `BASIC`, `PREMIUM`), entitlement checks |
| **Usage Service** | `8084` | `USAGE-SERVICE` | `SOA-USAGE` | `✅ Active` | Engagement logs, reading session telemetry, book popularity metrics |
| **Frontend Web App** | `5173` | `scholarsphere-frontend` | *None* | `✅ Active` | 3D visual portal, catalog reader, student & admin dashboards |

---

## ✨ Core Platform Capabilities

### 🎓 1. Student / Reader Experience
- **Cinematic 3D Landing Page**: Interactive visual hero built with Three.js / React Three Fiber, showcasing platform features.
- **Dynamic Digital Catalog**: Filterable repository of Books, Academic Journals, and Technical Research Papers.
- **Embedded Document Reader**: Fullscreen immersive reader supporting book navigation, session duration tracking, and citation info.
- **Self-Service Subscriptions**: Dynamic tier selection (`FREE`, `BASIC`, `PREMIUM`) with instant rights activation.
- **Personal Reading Telemetry**: Comprehensive reading history, access frequency stats, and favorite genres.

### 🛡️ 2. Administrative Suite
- **Central Management Console**: High-level platform health, total documents cataloged, and active subscriber metrics.
- **Content Publisher**: Multipart file uploader with category tags, author metadata, and local file persistence.
- **Access & DRM Rights Control**: Granular permission adjustments across subscription tiers (e.g., view vs. download permissions per content type).
- **Usage & Engagement Analytics**: Visual Recharts analytics tracking top-accessed documents, hourly reading surges, and user engagement.

---

## 🌐 API Gateway & Routing

All incoming client traffic targets **`http://localhost:8090`**. The gateway decouples clients from microservice hostnames and ports using Eureka dynamic load balancing (`lb://`):

| Ingress Route Pattern | Target Microservice URI | Purpose |
| :--- | :--- | :--- |
| `/api/auth/**` | `lb://AUTHENTICATIONSERVICE` | User signup, credential verification, and token exchange |
| `/content/**` | `lb://CONTENT-SERVICE` | Catalog browsing, metadata retrieval, document upload/deletion |
| `/access/**` | `lb://ACCESS-SERVICE` | Subscription tiers, active user plan checks, permission validation |
| `/usage/**` | `lb://USAGE-SERVICE` | Reading session logging, personal histories, access analytics |

*Note: The API Gateway automatically applies unified CORS handling (`http://localhost:5173`) and strips duplicate headers from downstream services.*

---

## 📑 Complete API Reference

### 🔐 1. Authentication Service (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user with username, email, BCrypt password, and role |
| `POST` | `/api/auth/login` | Public | Validate credentials and return signed JWT token |

### 📚 2. Content Service (`/content`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/content` | Public / Auth | List all published books, journals, and research documents |
| `GET` | `/content/{id}` | Auth | Retrieve content metadata and file path by ID |
| `POST` | `/content/upload` | Admin | Upload multipart file with JSON metadata payload |
| `DELETE` | `/content/{id}` | Admin | Delete content entry and purge physical file from storage |

### 🛡️ 3. Access & DRM Service (`/access`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/access/subscription/{username}` | Auth | Fetch user's active subscription tier, start, and end date |
| `POST` | `/access/subscribe` | Auth | Subscribe user to `FREE`, `BASIC`, or `PREMIUM` tier for 30 days |
| `POST` | `/access/plans` | Admin | Create or update a subscription plan tier configuration |
| `GET` | `/access/view/{username}/{contentType}` | Service / Auth | Verify if user has entitlement to view document type |
| `GET` | `/access/download/{username}/{contentType}` | Service / Auth | Verify if user has entitlement to download document type |

### 📊 4. Usage Service (`/usage`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/usage/record` | Auth | Log a reading or download action with duration & IP |
| `GET` | `/usage/history/my-history` | Auth | Fetch authenticated user's chronological reading history |
| `GET` | `/usage/history/user/{userId}` | Admin | Fetch reading history for a specific user ID |
| `GET` | `/usage/count/book/{bookId}` | Auth | Get total times the current user accessed a specific book |
| `GET` | `/usage/stats/book/{bookId}` | Auth / Admin | Retrieve total reads, unique readers, and total duration for a book |
| `GET` | `/usage/stats/my-stats` | Auth | Aggregated reading stats for current user (total books, hours read) |
| `GET` | `/usage/stats/most-accessed` | Auth / Admin | Fetch top $N$ most popular books across the entire platform |

---

## 💻 Tech Stack Breakdown

- **Backend Architecture**: Microservices / Service-Oriented Architecture (SOA)
- **Language**: Java 21 (LTS)
- **Framework**: Spring Boot 3.4.1
- **Service Discovery**: Spring Cloud Netflix Eureka Server
- **Routing & Proxy**: Spring Cloud Gateway 2024.0.0 (Reactive with LoadBalancer)
- **Security & Authorization**: Spring Security 6 + JJWT (Stateless HMAC-SHA256, 15-min expiration)
- **Persistence & ORM**: Spring Data JPA / Hibernate (DDL `update`)
- **Database Engine**: PostgreSQL 16 (Independent database per microservice)
- **Frontend Stack**: React 18, Vite 6, Tailwind CSS 3, Axios
- **Frontend Libraries**: Framer Motion, Lucide Icons, Recharts, Three.js / React Three Fiber

---

## 🛠️ Prerequisites & Database Setup

### Prerequisites
1. **Java Development Kit (JDK)**: OpenJDK 21 installed (`java -version`).
2. **Apache Maven**: Version 3.9+ installed (`mvn -version`).
3. **Node.js & npm**: Node.js 18+ and npm 9+ (`node -v`, `npm -v`).
4. **PostgreSQL**: Running on port `5432`.

### 🗄️ PostgreSQL Database Setup
ScholarSphere isolates data across dedicated databases following microservice best practices. Execute the following SQL commands in PostgreSQL (`psql` or pgAdmin):

```sql
-- Create isolated microservice databases
CREATE DATABASE "SOA-AUTH";
CREATE DATABASE "SOA-CONTENT";
CREATE DATABASE "SOA-ACCESS";
CREATE DATABASE "SOA-USAGE";
```

*(Default credentials configured: user `postgres`, password `1619` on `localhost:5432`)*

---

## 🚀 Quick Start: Step-by-Step Execution

To ensure seamless discovery registration, launch the components in the following chronological sequence:

### 1️⃣ Step 1: Start Eureka Service Registry
```bash
cd Backend/EurekaServer
./mvnw spring-boot:run
```
*Wait until Eureka dashboard is live at 👉 **`http://localhost:8761`**.*

### 2️⃣ Step 2: Start the Core Microservices
Open separate terminal tabs for each service:

```bash
# Terminal 2: Authentication Service
cd Backend/AuthenticationService
./mvnw spring-boot:run

# Terminal 3: Content Service
cd Backend/ContentService
./mvnw spring-boot:run

# Terminal 4: Access Service
cd Backend/AccessService
./mvnw spring-boot:run

# Terminal 5: Usage Service
cd Backend/UsageService
./mvnw spring-boot:run
```
*Verify on Eureka (`http://localhost:8761`) that `AUTHENTICATIONSERVICE`, `CONTENT-SERVICE`, `ACCESS-SERVICE`, and `USAGE-SERVICE` appear with status **UP**.*

### 3️⃣ Step 3: Start Spring Cloud API Gateway
```bash
# Terminal 6: API Gateway
cd Backend/ApiGateway
./mvnw spring-boot:run
```
*Gateway will bind to port **`8090`**.*

### 4️⃣ Step 4: Start Frontend Client
```bash
# Terminal 7: React Frontend
cd frontend
npm install
npm run dev
```
*Open your browser and navigate to 👉 **`http://localhost:5173`**.*

---

## 📁 Repository Structure

```text
SOA-project/
├── Backend/
│   ├── EurekaServer/            # Netflix Eureka Service Discovery (Port 8761)
│   ├── ApiGateway/              # Spring Cloud Gateway (Port 8090)
│   ├── AuthenticationService/   # User accounts & JWT security (Port 8081)
│   ├── ContentService/          # Digital library catalog & file storage (Port 8082)
│   ├── AccessService/           # Subscription tiers & DRM verification (Port 8083)
│   └── UsageService/            # Reading logs & engagement analytics (Port 8084)
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, ProtectedRoute)
│   │   ├── context/             # AuthContext & global state providers
│   │   ├── layouts/             # DashboardLayout & navigation chrome
│   │   ├── pages/               # Student & Admin pages (Books, Reader, Analytics, etc.)
│   │   └── services/            # Axios API clients & auth interceptors
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── Customer Journey Map.jpg     # UX Journey workflow artifact
├── Empathy Map.jpg              # User persona & empathy mapping artifact
├── Poster for ScholarSphere.jpg # High-resolution project poster
├── problem Statement.jpeg       # Formal PS029 problem specification
└── Architecture.rtf             # SOA design notes and specification
```

---

## 🎨 Design Thinking & Research Artifacts

The system was designed following human-centered Design Thinking methodologies:

| Artifact | File Reference | Description |
| :--- | :--- | :--- |
| 🖼️ **Project Poster** | [`Poster for ScholarSphere.jpg`](Poster%20for%20ScholarSphere.jpg) | Visual presentation poster highlighting core modules and impact |
| 🗺️ **Customer Journey Map** | [`Customer Journey Map.jpg`](Customer%20Journey%20Map.jpg) | End-to-end journey stages: Discovery $\rightarrow$ Auth $\rightarrow$ Subscription $\rightarrow$ Reading $\rightarrow$ Metrics |
| 🧠 **Empathy Map** | [`Empathy Map.jpg`](Empathy%20Map.jpg) | Persona pain points (paywalls, scattered catalogs, reading tracking) |
| 📑 **Problem Statement** | [`problem Statement.jpeg`](problem%20Statement.jpeg) | Formal specifications and deliverables for **PS029** |
| 📐 **Architecture Specs** | [`Architecture.rtf`](Architecture.rtf) | In-depth technical breakdown and service contract definitions |

---

## 💡 SOA Principles & Viva Cheat Sheet

When explaining ScholarSphere during practical evaluations or viva reviews, highlight these foundational architectural choices:

1. **Loose Coupling & High Cohesion**:
   - Each service focuses strictly on a single business domain (Single Responsibility Principle). Modifying the subscription billing rules in `AccessService` has zero impact on the document streaming code in `ContentService`.
2. **Database-per-Service Pattern**:
   - Instead of a monolithic shared database, each service connects to its own private PostgreSQL database (`SOA-AUTH`, `SOA-CONTENT`, etc.). This enforces data encapsulation and prevents hidden transactional coupling.
3. **Dynamic Discovery over Hardcoded Routing**:
   - Services do not hardcode IP addresses or port numbers. Instead, they register with **Netflix Eureka**. When the API Gateway routes `/usage/**`, it queries Eureka for healthy instances of `USAGE-SERVICE` dynamically.
4. **Stateless Scalability with JWT**:
   - Authentication generates cryptographically signed JWT tokens carrying user identity and roles (`USER` vs `ADMIN`). The backend services do not maintain server-side sessions, enabling horizontal scaling without sticky session overhead.
5. **Single Ingress Point (API Gateway Pattern)**:
   - Clients only ever need to talk to port `8090`. The Gateway encapsulates internal network complexity, standardizes CORS, and prevents exposing internal microservice ports to public networks.

---

<div align="center">

**Developed for Course Project — Service-Oriented Architecture (SOA)**  
*KL University | Digital Knowledge Platform & Content Access Management System (PS029)*

</div>
=======
## 6. Discrepancies & Issues Identified in Existing Code

1. **API Gateway Route Target Bug**:
   - In `Backend/ApiGateway/src/main/resources/application.properties`:
     ```properties
     spring.cloud.gateway.routes[2].id=ACCESS-SERVICE
     spring.cloud.gateway.routes[2].uri=lb://CONTENT-SERVICE  # <-- BUG: Points to CONTENT-SERVICE
     spring.cloud.gateway.routes[2].predicates[0]=Path=/access/**
     ```
     **Fix Required**: Change `lb://CONTENT-SERVICE` to `lb://ACCESS-SERVICE`.

2. **AccessService Maven Artifact Misnaming**:
   - In `Backend/AccessService/pom.xml`:
     ```xml
     <artifactId>contentService</artifactId>
     <name>ContentService</name>
     ```
     **Fix Required**: Update to `access-service` / `AccessService`.

3. **Missing `UsageService`**:
   - Explicitly listed in Problem Statement `PS029` and `Architecture.rtf` but not yet created in `Backend/`.

4. **Missing OpenFeign Integration**:
   - Documented in architecture design, but `spring-cloud-starter-openfeign` is not yet added in `AccessService` or `ContentService` to enable service-to-service validation.

5. **Global Gateway Security Filter**:
   - The Gateway currently forwards requests without validating the JWT token or stripping/passing claims downstream.

---

## 7. Recommended Next Steps

1. **Fix Gateway Routing and POM naming**:
   - Point `/access/**` to `lb://ACCESS-SERVICE`.
   - Correct the artifact naming in `AccessService/pom.xml`.
2. **Implement the Missing `UsageService`**:
   - Create Spring Boot service on port `8084` with Eureka client, PostgreSQL database `SOA-USAGE`, entities for `ReadingHistory` and `UsageLog`, and tracking endpoints.
3. **Add OpenFeign Inter-Service Communication**:
   - Connect `ContentService` $\rightarrow$ `AccessService` to enforce permission verification before serving files.
   - Connect `ContentService` $\rightarrow$ `UsageService` to log view/download events.
4. **Implement Gateway Authentication Filter**:
   - Add a global filter on API Gateway to validate JWT tokens and protect secured routes.
5. **Frontend Application**:
   - Build a responsive user interface for login, viewing subscriptions, catalog browsing, reading, and downloading.
>>>>>>> ac01a7e2003287589498a96922d12f091ddd2f03
