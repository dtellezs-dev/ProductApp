# ProductApp Full-Stack Application  
**Frontend:** Angular 16  
**Backend:** .NET 9 SDK (Web API + SQLite)  

## 🧠 Project Overview  
This is a full-stack web application for managing products.  
- Users can log in, view a list of products, search, sort, create and edit products.  
- Backend built with .NET 9, clean architecture (Domain / Application / Infrastructure) and SQLite database.  
- Frontend built with Angular 16, using reactive forms, routing, guard for authentication, lazy loading, and Bootstrap UI.

## 🔍 Features  
- Authentication (login/logout) with route protection.  
- Products list: search by name, sort by price.  
- Create/Edit product form with validation.  
- Clean folder structure and modular architecture.  
- Docker-ready structure (if needed) and easy to run locally.

## 🛠️ Technologies  
- Angular 16  
- .NET 9 SDK  
- SQLite (via Entity Framework Core)  
- Bootstrap for UI styling  
- RxJS, Angular Router, Angular Forms  
- Clean architecture for backend (Domain / Application / Infrastructure)  

## 🚀 Getting Started  
### Prerequisites  
- .NET 9 SDK installed  
- Node.js + npm installed  
- Angular CLI installed globally (`npm install -g @angular/cli`)  
- Optional: SQLite viewer for inspecting the database  

### Setup & Run  
#### Backend  
```bash
cd backend/ProductApp.Api
dotnet restore
dotnet ef database update      # creates database + tables
dotnet run                     # starts the API at http://localhost:5000


#### Frontend  
```bash
cd frontend/product-app
npm install
ng serve --open                # starts Angular dev server at http://localhost:4200

## 📂 Directory Structure
```bash
ProductApp/
  ├── backend/
  │   ├── ProductApp.Api/
  │   ├── ProductApp.Application/
  │   ├── ProductApp.Domain/
  │   └── ProductApp.Infrastructure/
  └── frontend/
      └── product-app/
          ├── src/app/
          ├── angular.json
          └── ...

## ✅ Usage Flow
Open the browser at http://localhost:4200.

Log in (use credentials or mock login).

Navigate to Products page: view list, search, sort.

Create a new product (via “New Product” button).

Edit an existing product (via “Edit” link).

Logout to test route protection.

## 🔐 Authentication & Security

Auth guard protects routes like /products, /products/new, /products/edit/:id.

On logout, local storage is cleared and user redirected to login page.

Only authenticated users can access product management pages.

## 📄 Known Limitations & Future Improvements

Authentication is currently mocked (no real backend token handling).

No pagination implemented for large product sets (could be added).

UI is moderately styled; further improvements (themes, responsiveness) possible.

Additional endpoints (delete product, user management) could be added in future versions.

## Crafted by David Téllez – ing.davidtellez@gmail.com