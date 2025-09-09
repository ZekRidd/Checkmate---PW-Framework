# Checkmate Test Framework

A comprehensive test automation framework built with Playwright and TypeScript, following the Page Object Model (POM) pattern for testing the Checkmate application.

## 🚀 Features

- **Page Object Model (POM)** - Clean, maintainable test structure
- **Environment-based Configuration** - Centralized configuration management
- **Gmail API Integration** - Automated email verification code retrieval
- **TypeScript Support** - Type-safe development
- **Docker Support** - Run tests anywhere with Docker
- **Multiple Test Suites** - Modular test organization
- **Comprehensive Reporting** - HTML, JSON, and JUnit reports
- **Screenshot & Video Recording** - On test failures
- **Trace Recording** - For debugging failed tests

## 📁 Project Structure

```
Checkmate/
├── src/
│   ├── config/
│   │   └── environment.ts          # Environment configuration manager
│   ├── locators/
│   │   ├── BaseLocators.ts         # Base locator class
│   │   ├── LoginPageLocators.ts    # Login page locators
│   │   ├── PlanningPageLocators.ts # Planning page locators
│   │   ├── ConfigurationPageLocators.ts # Configuration page locators
│   │   ├── DataManagementPageLocators.ts # Data Management page locators
│   │   └── index.ts                # Locator exports
│   ├── pages/
│   │   ├── base-page.ts            # Base page class
│   │   ├── login-page.ts           # Login page
│   │   ├── planning-page.ts        # Planning page
│   │   ├── configuration-page.ts   # Configuration page
│   │   ├── data-management-page.ts # Data Management page
│   │   └── index.ts                # Page exports
│   └── utils/
│       ├── gmail-helper.ts         # Gmail API integration
│       └── login-helper.ts         # Login utility functions
├── tests/
│   ├── login-and-navigation.spec.ts    # Login and navigation tests
│   ├── planning-page.spec.ts           # Planning page specific tests
│   ├── configuration-page.spec.ts      # Configuration page specific tests
│   └── data-management-page.spec.ts    # Data Management page specific tests
├── docker-compose.yml              # Docker services configuration
├── Dockerfile                      # Docker container definition
├── DOCKER.md                       # Docker usage guide
├── playwright.config.ts            # Playwright configuration
├── setup-gmail.ts                  # Gmail API setup script
├── .env                            # Environment variables (not in git)
└── package.json                    # Dependencies and scripts
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env` file with your configuration:

```env
# Application Environment
NODE_ENV=development
APP_ENV=test

# Application URLs
BASE_URL=your-application-url
LOGIN_URL=/login
DASHBOARD_URL=/dashboard

# Test Credentials
TEST_EMAIL=your-test-email@gmail.com
TEST_USER_NAME=Test User
TEST_USER_ROLE=user

# Gmail API Configuration
GMAIL_SENDER_EMAIL=your-sender-email@domain.com
GMAIL_CREDENTIALS_FILE=credentials.json
GMAIL_TOKEN_FILE=token.json

# Test Configuration
EMAIL_WAIT_TIME_MS=10000
CODE_WAIT_MINUTES=1
MAX_RETRY_ATTEMPTS=3
TEST_TIMEOUT_MS=60000

# Browser Configuration
HEADLESS_MODE=false
BROWSER_TYPE=chromium
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720

# Reporting
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=true
TRACE_ON_RETRY=true
```

### 3. Gmail API Setup (Required for Login Tests)

**⚠️ Important**: Gmail API setup is required to run login tests. Without this setup, tests will fail.

1. **Create Google Cloud Project:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Gmail API

2. **Create OAuth 2.0 Credentials:**

   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Desktop application"
   - Download the credentials JSON file
   - Rename it to `credentials.json` and place in project root

3. **Configure OAuth Consent Screen:**

   - Go to "OAuth consent screen"
   - Set User Type to "External"
   - Add app name, support email, and developer contact
   - Add scopes: `https://www.googleapis.com/auth/gmail.readonly`
   - Add test users (your Gmail address)

4. **Setup Gmail API:**
   ```bash
   npm run setup-gmail
   ```
   - Follow the prompts to authorize the application
   - This will create `token.json` file

5. **Create .env file:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

### 4. Alternative: Run Tests Without Gmail API

If you don't want to setup Gmail API, you can run tests that don't require login:

```bash
# Run only page navigation tests (without login)
npx playwright test tests/planning-page.spec.ts --grep "Should verify Planning page elements"
```

## 🧪 Running Tests

### Local Testing

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run specific test suites
npm run test:login
npm run test:planning
npm run test:configuration
npm run test:data-management
```

### Docker Testing

```bash
# Build Docker image
npm run docker:build

# Run all tests in Docker
npm run docker:run

# Run specific test suite in Docker
docker-compose up planning-tests
docker-compose up configuration-tests

# Interactive Docker session
npm run docker:interactive
```

## 📝 Test Structure

### Page Object Model

- **BasePage**: Common methods and utilities
- **LoginPage**: Login functionality
- **PlanningPage**: Planning page operations
- **ConfigurationPage**: Configuration page operations
- **DataManagementPage**: Data Management page operations

### Test Suites

1. **Login and Navigation** (`login-and-navigation.spec.ts`)

   - Login verification
   - Planning page verification
   - Configuration navigation
   - Data Management navigation

2. **Planning Page** (`planning-page.spec.ts`)

   - Planning page specific tests
   - Planning functionality tests

3. **Configuration Page** (`configuration-page.spec.ts`)

   - Configuration page specific tests
   - Configuration functionality tests

4. **Data Management Page** (`data-management-page.spec.ts`)
   - Data Management page specific tests
   - Data Management functionality tests

## 🐳 Docker Usage

### Quick Start

```bash
# Build and run
docker-compose up checkmate-tests

# Run specific service
docker-compose up planning-tests
```

### Advanced Usage

```bash
# Interactive mode
docker-compose run --rm checkmate-tests /bin/sh

# View logs
docker-compose logs -f checkmate-tests
```

For detailed Docker usage, see [DOCKER.md](DOCKER.md).

## 🔧 Configuration

### Environment Variables

All configuration is managed through environment variables:

- **Application URLs**: Base URL, login URL, dashboard URL
- **Test Credentials**: Email, user name, role
- **Gmail API**: Sender email, credentials file, token file
- **Test Settings**: Wait times, retry attempts, timeouts
- **Browser Settings**: Headless mode, viewport size
- **Reporting**: Screenshot, video, trace settings

### Security

- **Personal information** is stored in `.env` file (not in git)
- **Environment.ts** contains no personal data
- **Gmail credentials** are mounted as volumes in Docker

## 📊 Reporting

The framework generates comprehensive reports:

- **HTML Report**: Interactive test results
- **JSON Report**: Machine-readable results
- **JUnit Report**: CI/CD integration
- **Screenshots**: On test failures
- **Videos**: On test failures
- **Traces**: For debugging

## 🚀 CI/CD Integration

The framework is ready for CI/CD integration:

- Environment variables for different environments
- JUnit XML reports for test result parsing
- Screenshot and video artifacts
- Configurable retry and timeout settings
- Docker support for consistent environments

## 🔍 Debugging

### Enable Trace Recording

Set `TRACE_ON_RETRY=true` in your environment configuration.

### View Traces

```bash
npx playwright show-trace test-results/trace.zip
```

### Debug Mode

```bash
npm run test:debug
```

## 📚 Best Practices

1. **Environment Configuration**: Always use environment variables for configuration
2. **Page Object Model**: Keep page logic in page objects
3. **Wait Strategies**: Use proper wait strategies instead of hard waits
4. **Error Handling**: Implement proper error handling and reporting
5. **Test Data**: Use environment configuration for test data
6. **Modular Tests**: Organize tests by page/functionality
7. **Docker Usage**: Use Docker for consistent testing environments

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Update environment configuration as needed
4. Add proper error handling
5. Update documentation
6. Add tests for new functionality

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:

1. Check the [DOCKER.md](DOCKER.md) for Docker-related issues
2. Review environment configuration
3. Ensure Gmail API setup is correct
4. Check test logs and reports
# Checkmate
