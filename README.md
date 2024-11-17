# KebormedTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Prerequisites
Before running the application, ensure you have the following installed:
- **Node.js** (v14 or higher)  
- **Angular CLI** (v15 or higher): Install globally using `npm install -g @angular/cli`.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/leralysenko/kebormed-task.git
   ```
2. Navigate to the project folder:
   ```bash
   cd kebormed-task
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Folder Structure
```plaintext
src/
├── app/                # Core application logic
│   ├── components/     # Reusable components
│   ├── model/          # Interfaces and types for consistent data structure
│   ├── pages/          # Main pages
│   ├── services/       # API and shared services
│   ├── store/          # NgRx state management
│   └── app.module.ts   # Application root module
├── assets/             # Static assets (images, fonts, etc.)
└── styles/             # Global styles

## Dependencies
Key dependencies used in the project:
- **Angular Material**: UI components
- **NgRx**: State management
- **RxJS**: Reactive programming
