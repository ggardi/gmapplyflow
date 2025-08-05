# Apply Online

Web application for managing online applications for the GM Apply Flow built with Laravel and React.

## About Apply Online

Apply Online: web application for users to submit applications through an online form. The application provides a simple interface for collecting and managing applicant information.

### Key Features

-   **Simple Application Form**: Clean, user-friendly form for submitting applications
-   **Data Management**: Efficient storage of application data
-   **Modern UI**: Built with React
-   **Secure Data Handling**: Internal processing without public API exposure

## Technology Stack

This application is built using Laravel with inertia and React

### Backend

-   **Laravel 10.x** - PHP web framework for robust backend functionality
-   **MySQL/PostgreSQL** - Database for data persistence
-   **PHP 8.1+** - Modern PHP for server-side logic

### Frontend

-   **React 19.x** - Modern JavaScript library for building user interfaces
-   **Inertia.js** - Modern monolithic approach connecting Laravel and React
-   **Vite** - Fast build tool and development server

### Development Tools

-   **Laravel Sail** - Docker-based development environment
-   **Laravel Pint** - Code style fixer
-   **PHPUnit** - PHP testing framework
-   **Faker** - Generate fake data for testing

## Getting Started

### Prerequisites

-   PHP 8.1 or higher
-   Composer
-   Node.js and npm
-   MySQL or PostgreSQL database

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd applyOnline
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database setup**

    - Configure your database connection in `.env`
    - Run migrations:

    ```bash
    php artisan migrate
    ```

6. **Start the development servers**

    ```bash
    # Terminal 1 - Laravel development server
    php artisan serve

    # Terminal 2 - Vite development server
    npm run dev
    ```

### Usage

1. Navigate to `http://localhost:8000` in your browser
2. Fill out the application form with required information
3. Submit your application
4. Applications are stored in the database for review

## Application Flow

The application follows a simple flow:

1. **Landing Page**: Users are presented with an application form
2. **Form Submission**: Users fill out their personal information (first name, last name, email)
3. **Data Processing**: Laravel backend validates and stores the application data
4. **Confirmation**: Users receive confirmation of successful submission

## Testing

Run the test suite using:

```bash
# Run PHP tests
php artisan test

# Or with PHPUnit directly
./vendor/bin/phpunit
```

## Contributing

We welcome contributions to improve the Apply Online application! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines

1. Follow PSR-12 coding standards for PHP
2. Use Laravel best practices
3. Write tests for new features
4. Update documentation as needed

## Security

If you discover any security vulnerabilities, please report them responsibly by contacting the development team directly rather than posting them publicly.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
