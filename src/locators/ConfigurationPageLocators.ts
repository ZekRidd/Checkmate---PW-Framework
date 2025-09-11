import { Locator, Page } from '@playwright/test';
import { BaseLocators } from './BaseLocators';

/**
 * Configuration Page Locators
 * Contains all locators for the Configuration page functionality
 */
export class ConfigurationPageLocators extends BaseLocators {
  // Page identification
  public readonly configurationPageTitle: Locator;
  public readonly configurationPageSubtitle: Locator;
  public readonly configurationPageBreadcrumb: Locator;
  public readonly configurationPageAssetsText: Locator;
  public readonly configurationPageAddAssetButton: Locator;
  
  // Configuration menu elements
  public readonly configurationPageStorageAssetsMenuItem: Locator;
  public readonly configurationPageAssetPathsMenuItem: Locator;

  // Navigation elements
  public readonly configurationPageNavigationMenu: Locator;
  public readonly configurationPagePlanningTab: Locator;
  public readonly configurationPageConfigurationTab: Locator;
  public readonly configurationPageDataManagementTab: Locator;
  public readonly configurationPageUserMenu: Locator;
  public readonly configurationPageLogoutButton: Locator;

  // Configuration sections (simplified - only used elements)

  // General Settings
  public readonly generalSettingsSection: Locator;
  public readonly applicationNameInput: Locator;
  public readonly applicationDescriptionInput: Locator;
  public readonly applicationLogoInput: Locator;
  public readonly timezoneSelect: Locator;
  public readonly languageSelect: Locator;
  public readonly dateFormatSelect: Locator;
  public readonly timeFormatSelect: Locator;
  public readonly currencySelect: Locator;
  public readonly themeSelect: Locator;

  // User Management
  public readonly userManagementSection: Locator;
  public readonly userTable: Locator;
  public readonly userTableHeader: Locator;
  public readonly userTableBody: Locator;
  public readonly userRows: Locator;
  public readonly addUserButton: Locator;
  public readonly editUserButton: Locator;
  public readonly deleteUserButton: Locator;
  public readonly userRoleSelect: Locator;
  public readonly userStatusSelect: Locator;
  public readonly userPermissionsCheckbox: Locator;

  // User form elements
  public readonly userForm: Locator;
  public readonly userNameInput: Locator;
  public readonly userEmailInput: Locator;
  public readonly userPasswordInput: Locator;
  public readonly userConfirmPasswordInput: Locator;
  public readonly userFirstNameInput: Locator;
  public readonly userLastNameInput: Locator;
  public readonly userPhoneInput: Locator;
  public readonly userDepartmentSelect: Locator;
  public readonly userManagerSelect: Locator;

  // System Settings
  public readonly systemSettingsSection: Locator;
  public readonly systemNameInput: Locator;
  public readonly systemVersionDisplay: Locator;
  public readonly databaseSettingsSection: Locator;
  public readonly backupSettingsSection: Locator;
  public readonly maintenanceModeToggle: Locator;
  public readonly debugModeToggle: Locator;
  public readonly logLevelSelect: Locator;
  public readonly maxFileSizeInput: Locator;
  public readonly sessionTimeoutInput: Locator;

  // Integrations (simplified - no Gmail API)
  public readonly integrationsSection: Locator;
  public readonly slackIntegrationToggle: Locator;
  public readonly slackWebhookInput: Locator;
  public readonly jiraIntegrationToggle: Locator;
  public readonly jiraUrlInput: Locator;
  public readonly jiraTokenInput: Locator;
  public readonly apiSettingsSection: Locator;
  public readonly apiKeyInput: Locator;
  public readonly apiRateLimitInput: Locator;

  // Notifications
  public readonly notificationsSection: Locator;
  public readonly emailNotificationsToggle: Locator;
  public readonly smsNotificationsToggle: Locator;
  public readonly pushNotificationsToggle: Locator;
  public readonly notificationTemplatesSection: Locator;
  public readonly emailTemplateSelect: Locator;
  public readonly smsTemplateSelect: Locator;
  public readonly notificationScheduleSelect: Locator;
  public readonly notificationRecipientsInput: Locator;

  // Security
  public readonly securitySection: Locator;
  public readonly passwordPolicySection: Locator;
  public readonly minPasswordLengthInput: Locator;
  public readonly passwordComplexityToggle: Locator;
  public readonly passwordExpiryInput: Locator;
  public readonly twoFactorAuthToggle: Locator;
  public readonly sessionSecuritySection: Locator;
  public readonly maxLoginAttemptsInput: Locator;
  public readonly lockoutDurationInput: Locator;
  public readonly ipWhitelistInput: Locator;
  public readonly sslCertificateSection: Locator;
  public readonly sslToggle: Locator;
  public readonly certificateUploadInput: Locator;

  // Configuration actions
  public readonly saveConfigurationButton: Locator;
  public readonly resetConfigurationButton: Locator;
  public readonly exportConfigurationButton: Locator;
  public readonly importConfigurationButton: Locator;
  public readonly testConnectionButton: Locator;
  public readonly validateSettingsButton: Locator;

  // Configuration modals
  public readonly configurationModal: Locator;
  public readonly configurationModalTitle: Locator;
  public readonly configurationModalContent: Locator;
  public readonly configurationModalCloseButton: Locator;
  public readonly confirmationModal: Locator;
  public readonly confirmationModalTitle: Locator;
  public readonly confirmationModalContent: Locator;
  public readonly confirmButton: Locator;
  public readonly cancelButton: Locator;

  // Status indicators
  public readonly loadingSpinner: Locator;
  public readonly successMessage: Locator;
  public readonly errorMessage: Locator;
  public readonly warningMessage: Locator;
  public readonly infoMessage: Locator;

  // Configuration validation
  public readonly validationErrors: Locator;
  public readonly fieldErrors: Locator;
  public readonly formErrors: Locator;

  // Configuration history
  public readonly configurationHistory: Locator;
  public readonly historyTable: Locator;
  public readonly historyRows: Locator;
  public readonly historyDateColumn: Locator;
  public readonly historyUserColumn: Locator;
  public readonly historyActionColumn: Locator;
  public readonly historyDetailsColumn: Locator;
  public readonly revertButton: Locator;

  // Configuration backup
  public readonly backupSection: Locator;
  public readonly createBackupButton: Locator;
  public readonly restoreBackupButton: Locator;
  public readonly backupList: Locator;
  public readonly backupItems: Locator;
  public readonly backupDateColumn: Locator;
  public readonly backupSizeColumn: Locator;
  public readonly backupActionsColumn: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page identification
    this.configurationPageTitle = this.page.locator('h1, .page-title, .configuration-title, [data-testid="configuration-title"]');
    this.configurationPageSubtitle = this.page.locator('h2, .page-subtitle, .configuration-subtitle, [data-testid="configuration-subtitle"]');
    this.configurationPageBreadcrumb = this.getBreadcrumb();
    this.configurationPageAssetsText = this.getAssetsText();
    this.configurationPageAddAssetButton = this.getAddAssetButton();
    
    // Configuration menu elements
    this.configurationPageStorageAssetsMenuItem = this.page.locator('text=/Storage Assets/i');
    this.configurationPageAssetPathsMenuItem = this.page.locator('text=/Asset Paths/i');

    // Navigation elements
    this.configurationPageNavigationMenu = this.getNavigationMenu();
    this.configurationPagePlanningTab = this.page.locator('a:has-text("Planning"), button:has-text("Planning")');
    this.configurationPageConfigurationTab = this.page.locator('a:has-text("Configuration"), button:has-text("Configuration")');
    this.configurationPageDataManagementTab = this.page.locator('a:has-text("Data Management"), button:has-text("Data Management")');
    this.configurationPageUserMenu = this.page.locator('.user-menu, .profile-menu, [data-testid="user-menu"]');
    this.configurationPageLogoutButton = this.page.locator('button:has-text("Logout"), .logout-btn, [data-testid="logout-button"]');

    // Configuration sections (simplified - only used elements)

    // General Settings
    this.generalSettingsSection = this.page.locator('.general-settings, .settings-general, [data-testid="general-settings"]');
    this.applicationNameInput = this.page.locator('input[name="applicationName"], #app-name, [data-testid="application-name"]');
    this.applicationDescriptionInput = this.page.locator('textarea[name="description"], #app-description, [data-testid="application-description"]');
    this.applicationLogoInput = this.page.locator('input[type="file"], #app-logo, [data-testid="application-logo"]');
    this.timezoneSelect = this.page.locator('select[name="timezone"], #timezone, [data-testid="timezone-select"]');
    this.languageSelect = this.page.locator('select[name="language"], #language, [data-testid="language-select"]');
    this.dateFormatSelect = this.page.locator('select[name="dateFormat"], #date-format, [data-testid="date-format-select"]');
    this.timeFormatSelect = this.page.locator('select[name="timeFormat"], #time-format, [data-testid="time-format-select"]');
    this.currencySelect = this.page.locator('select[name="currency"], #currency, [data-testid="currency-select"]');
    this.themeSelect = this.page.locator('select[name="theme"], #theme, [data-testid="theme-select"]');

    // User Management
    this.userManagementSection = this.page.locator('.user-management, .users-section, [data-testid="user-management"]');
    this.userTable = this.getTable();
    this.userTableHeader = this.getTableHeader();
    this.userTableBody = this.getTableBody();
    this.userRows = this.getTableRow();
    this.addUserButton = this.getAddButton();
    this.editUserButton = this.getEditButton();
    this.deleteUserButton = this.getDeleteButton();
    this.userRoleSelect = this.page.locator('select[name="role"], #user-role, [data-testid="user-role-select"]');
    this.userStatusSelect = this.page.locator('select[name="status"], #user-status, [data-testid="user-status-select"]');
    this.userPermissionsCheckbox = this.page.locator('input[type="checkbox"][name="permissions"], [data-testid="user-permissions"]');

    // User form elements
    this.userForm = this.getForm();
    this.userNameInput = this.page.locator('input[name="username"], #username, [data-testid="username-input"]');
    this.userEmailInput = this.page.locator('input[name="email"], #email, [data-testid="email-input"]');
    this.userPasswordInput = this.page.locator('input[name="password"], #password, [data-testid="password-input"]');
    this.userConfirmPasswordInput = this.page.locator('input[name="confirmPassword"], #confirm-password, [data-testid="confirm-password-input"]');
    this.userFirstNameInput = this.page.locator('input[name="firstName"], #first-name, [data-testid="first-name-input"]');
    this.userLastNameInput = this.page.locator('input[name="lastName"], #last-name, [data-testid="last-name-input"]');
    this.userPhoneInput = this.page.locator('input[name="phone"], #phone, [data-testid="phone-input"]');
    this.userDepartmentSelect = this.page.locator('select[name="department"], #department, [data-testid="department-select"]');
    this.userManagerSelect = this.page.locator('select[name="manager"], #manager, [data-testid="manager-select"]');

    // System Settings
    this.systemSettingsSection = this.page.locator('.system-settings, .settings-system, [data-testid="system-settings"]');
    this.systemNameInput = this.page.locator('input[name="systemName"], #system-name, [data-testid="system-name"]');
    this.systemVersionDisplay = this.page.locator('.system-version, .version-display, [data-testid="system-version"]');
    this.databaseSettingsSection = this.page.locator('.database-settings, .db-settings, [data-testid="database-settings"]');
    this.backupSettingsSection = this.page.locator('.backup-settings, .backup-config, [data-testid="backup-settings"]');
    this.maintenanceModeToggle = this.page.locator('input[type="checkbox"][name="maintenanceMode"], [data-testid="maintenance-mode"]');
    this.debugModeToggle = this.page.locator('input[type="checkbox"][name="debugMode"], [data-testid="debug-mode"]');
    this.logLevelSelect = this.page.locator('select[name="logLevel"], #log-level, [data-testid="log-level-select"]');
    this.maxFileSizeInput = this.page.locator('input[name="maxFileSize"], #max-file-size, [data-testid="max-file-size"]');
    this.sessionTimeoutInput = this.page.locator('input[name="sessionTimeout"], #session-timeout, [data-testid="session-timeout"]');

    // Integrations (simplified - no Gmail API)
    this.integrationsSection = this.page.locator('.integrations, .integrations-section, [data-testid="integrations"]');
    this.slackIntegrationToggle = this.page.locator('input[type="checkbox"][name="slackIntegration"], [data-testid="slack-integration"]');
    this.slackWebhookInput = this.page.locator('input[name="slackWebhook"], #slack-webhook, [data-testid="slack-webhook"]');
    this.jiraIntegrationToggle = this.page.locator('input[type="checkbox"][name="jiraIntegration"], [data-testid="jira-integration"]');
    this.jiraUrlInput = this.page.locator('input[name="jiraUrl"], #jira-url, [data-testid="jira-url"]');
    this.jiraTokenInput = this.page.locator('input[name="jiraToken"], #jira-token, [data-testid="jira-token"]');
    this.apiSettingsSection = this.page.locator('.api-settings, .api-config, [data-testid="api-settings"]');
    this.apiKeyInput = this.page.locator('input[name="apiKey"], #api-key, [data-testid="api-key"]');
    this.apiRateLimitInput = this.page.locator('input[name="apiRateLimit"], #api-rate-limit, [data-testid="api-rate-limit"]');

    // Notifications
    this.notificationsSection = this.page.locator('.notifications, .notifications-section, [data-testid="notifications"]');
    this.emailNotificationsToggle = this.page.locator('input[type="checkbox"][name="emailNotifications"], [data-testid="email-notifications"]');
    this.smsNotificationsToggle = this.page.locator('input[type="checkbox"][name="smsNotifications"], [data-testid="sms-notifications"]');
    this.pushNotificationsToggle = this.page.locator('input[type="checkbox"][name="pushNotifications"], [data-testid="push-notifications"]');
    this.notificationTemplatesSection = this.page.locator('.notification-templates, .templates-section, [data-testid="notification-templates"]');
    this.emailTemplateSelect = this.page.locator('select[name="emailTemplate"], #email-template, [data-testid="email-template-select"]');
    this.smsTemplateSelect = this.page.locator('select[name="smsTemplate"], #sms-template, [data-testid="sms-template-select"]');
    this.notificationScheduleSelect = this.page.locator('select[name="notificationSchedule"], #notification-schedule, [data-testid="notification-schedule-select"]');
    this.notificationRecipientsInput = this.page.locator('input[name="notificationRecipients"], #notification-recipients, [data-testid="notification-recipients"]');

    // Security
    this.securitySection = this.page.locator('.security, .security-section, [data-testid="security"]');
    this.passwordPolicySection = this.page.locator('.password-policy, .policy-section, [data-testid="password-policy"]');
    this.minPasswordLengthInput = this.page.locator('input[name="minPasswordLength"], #min-password-length, [data-testid="min-password-length"]');
    this.passwordComplexityToggle = this.page.locator('input[type="checkbox"][name="passwordComplexity"], [data-testid="password-complexity"]');
    this.passwordExpiryInput = this.page.locator('input[name="passwordExpiry"], #password-expiry, [data-testid="password-expiry"]');
    this.twoFactorAuthToggle = this.page.locator('input[type="checkbox"][name="twoFactorAuth"], [data-testid="two-factor-auth"]');
    this.sessionSecuritySection = this.page.locator('.session-security, .session-section, [data-testid="session-security"]');
    this.maxLoginAttemptsInput = this.page.locator('input[name="maxLoginAttempts"], #max-login-attempts, [data-testid="max-login-attempts"]');
    this.lockoutDurationInput = this.page.locator('input[name="lockoutDuration"], #lockout-duration, [data-testid="lockout-duration"]');
    this.ipWhitelistInput = this.page.locator('input[name="ipWhitelist"], #ip-whitelist, [data-testid="ip-whitelist"]');
    this.sslCertificateSection = this.page.locator('.ssl-certificate, .ssl-section, [data-testid="ssl-certificate"]');
    this.sslToggle = this.page.locator('input[type="checkbox"][name="ssl"], [data-testid="ssl-toggle"]');
    this.certificateUploadInput = this.page.locator('input[type="file"], #certificate-upload, [data-testid="certificate-upload"]');

    // Configuration actions
    this.saveConfigurationButton = this.getSaveButton();
    this.resetConfigurationButton = this.page.locator('button:has-text("Reset"), .reset-btn, [data-testid="reset-configuration"]');
    this.exportConfigurationButton = this.page.locator('button:has-text("Export"), .export-btn, [data-testid="export-configuration"]');
    this.importConfigurationButton = this.page.locator('button:has-text("Import"), .import-btn, [data-testid="import-configuration"]');
    this.testConnectionButton = this.page.locator('button:has-text("Test"), .test-btn, [data-testid="test-connection"]');
    this.validateSettingsButton = this.page.locator('button:has-text("Validate"), .validate-btn, [data-testid="validate-settings"]');

    // Configuration modals
    this.configurationModal = this.getModal();
    this.configurationModalTitle = this.getModalTitle();
    this.configurationModalContent = this.getModalContent();
    this.configurationModalCloseButton = this.getModalCloseButton();
    this.confirmationModal = this.page.locator('.confirmation-modal, .confirm-dialog, [data-testid="confirmation-modal"]');
    this.confirmationModalTitle = this.page.locator('.confirmation-title, .confirm-title, [data-testid="confirmation-title"]');
    this.confirmationModalContent = this.page.locator('.confirmation-content, .confirm-content, [data-testid="confirmation-content"]');
    this.confirmButton = this.page.locator('button:has-text("Confirm"), .confirm-btn, [data-testid="confirm-button"]');
    this.cancelButton = this.getCancelButton();

    // Status indicators
    this.loadingSpinner = this.getLoadingSpinner();
    this.successMessage = this.getSuccessMessage();
    this.errorMessage = this.getErrorMessage();
    this.warningMessage = this.getWarningMessage();
    this.infoMessage = this.getInfoMessage();

    // Configuration validation
    this.validationErrors = this.page.locator('.validation-error, .field-error, [data-testid="validation-error"]');
    this.fieldErrors = this.page.locator('.field-error, .input-error, [data-testid="field-error"]');
    this.formErrors = this.page.locator('.form-error, .form-validation-error, [data-testid="form-error"]');

    // Configuration history
    this.configurationHistory = this.page.locator('.configuration-history, .config-history, [data-testid="configuration-history"]');
    this.historyTable = this.page.locator('.history-table, .config-history-table, [data-testid="history-table"]');
    this.historyRows = this.page.locator('.history-row, .config-history-row, [data-testid="history-row"]');
    this.historyDateColumn = this.page.locator('.history-date, .config-date, [data-testid="history-date"]');
    this.historyUserColumn = this.page.locator('.history-user, .config-user, [data-testid="history-user"]');
    this.historyActionColumn = this.page.locator('.history-action, .config-action, [data-testid="history-action"]');
    this.historyDetailsColumn = this.page.locator('.history-details, .config-details, [data-testid="history-details"]');
    this.revertButton = this.page.locator('button:has-text("Revert"), .revert-btn, [data-testid="revert-button"]');

    // Configuration backup
    this.backupSection = this.page.locator('.backup-section, .config-backup, [data-testid="backup-section"]');
    this.createBackupButton = this.page.locator('button:has-text("Create Backup"), .create-backup-btn, [data-testid="create-backup"]');
    this.restoreBackupButton = this.page.locator('button:has-text("Restore"), .restore-backup-btn, [data-testid="restore-backup"]');
    this.backupList = this.page.locator('.backup-list, .config-backup-list, [data-testid="backup-list"]');
    this.backupItems = this.page.locator('.backup-item, .config-backup-item, [data-testid="backup-item"]');
    this.backupDateColumn = this.page.locator('.backup-date, .config-backup-date, [data-testid="backup-date"]');
    this.backupSizeColumn = this.page.locator('.backup-size, .config-backup-size, [data-testid="backup-size"]');
    this.backupActionsColumn = this.page.locator('.backup-actions, .config-backup-actions, [data-testid="backup-actions"]');
  }

  // Configuration specific methods (simplified - only used elements)

  public async updateGeneralSettings(settings: {
    applicationName?: string;
    description?: string;
    timezone?: string;
    language?: string;
    dateFormat?: string;
    timeFormat?: string;
    currency?: string;
    theme?: string;
  }): Promise<void> {
    if (settings.applicationName) {
      await this.fillInput(this.applicationNameInput, settings.applicationName);
    }
    if (settings.description) {
      await this.fillInput(this.applicationDescriptionInput, settings.description);
    }
    if (settings.timezone) {
      await this.selectOption(this.timezoneSelect, settings.timezone);
    }
    if (settings.language) {
      await this.selectOption(this.languageSelect, settings.language);
    }
    if (settings.dateFormat) {
      await this.selectOption(this.dateFormatSelect, settings.dateFormat);
    }
    if (settings.timeFormat) {
      await this.selectOption(this.timeFormatSelect, settings.timeFormat);
    }
    if (settings.currency) {
      await this.selectOption(this.currencySelect, settings.currency);
    }
    if (settings.theme) {
      await this.selectOption(this.themeSelect, settings.theme);
    }
  }

  public async createUser(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    department?: string;
    phone?: string;
  }): Promise<void> {
    await this.clickElement(this.addUserButton);
    await this.fillInput(this.userNameInput, userData.username);
    await this.fillInput(this.userEmailInput, userData.email);
    await this.fillInput(this.userPasswordInput, userData.password);
    await this.fillInput(this.userConfirmPasswordInput, userData.password);
    await this.fillInput(this.userFirstNameInput, userData.firstName);
    await this.fillInput(this.userLastNameInput, userData.lastName);
    
    if (userData.role) {
      await this.selectOption(this.userRoleSelect, userData.role);
    }
    if (userData.department) {
      await this.selectOption(this.userDepartmentSelect, userData.department);
    }
    if (userData.phone) {
      await this.fillInput(this.userPhoneInput, userData.phone);
    }
    
    await this.clickElement(this.saveConfigurationButton);
  }

  public async editUser(username: string, updates: {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    status?: string;
  }): Promise<void> {
    const userRow = this.page.locator(`tr:has-text("${username}")`);
    await this.clickElement(userRow.locator('.edit-btn, button:has-text("Edit")'));
    
    if (updates.email) {
      await this.fillInput(this.userEmailInput, updates.email);
    }
    if (updates.firstName) {
      await this.fillInput(this.userFirstNameInput, updates.firstName);
    }
    if (updates.lastName) {
      await this.fillInput(this.userLastNameInput, updates.lastName);
    }
    if (updates.role) {
      await this.selectOption(this.userRoleSelect, updates.role);
    }
    if (updates.status) {
      await this.selectOption(this.userStatusSelect, updates.status);
    }
    
    await this.clickElement(this.saveConfigurationButton);
  }

  public async deleteUser(username: string): Promise<void> {
    const userRow = this.page.locator(`tr:has-text("${username}")`);
    await this.clickElement(userRow.locator('.delete-btn, button:has-text("Delete")'));
    await this.clickElement(this.confirmButton);
  }

  public async configureIntegration(integration: 'slack' | 'jira', config: {
    enabled: boolean;
    webhook?: string;
    url?: string;
    token?: string;
  }): Promise<void> {
    switch (integration) {
      case 'slack':
        if (config.enabled) {
          await this.checkCheckbox(this.slackIntegrationToggle);
          if (config.webhook) {
            await this.fillInput(this.slackWebhookInput, config.webhook);
          }
        } else {
          await this.uncheckCheckbox(this.slackIntegrationToggle);
        }
        break;
      case 'jira':
        if (config.enabled) {
          await this.checkCheckbox(this.jiraIntegrationToggle);
          if (config.url) {
            await this.fillInput(this.jiraUrlInput, config.url);
          }
          if (config.token) {
            await this.fillInput(this.jiraTokenInput, config.token);
          }
        } else {
          await this.uncheckCheckbox(this.jiraIntegrationToggle);
        }
        break;
    }
  }

  public async configureSecurity(securitySettings: {
    minPasswordLength?: number;
    passwordComplexity?: boolean;
    passwordExpiry?: number;
    twoFactorAuth?: boolean;
    maxLoginAttempts?: number;
    lockoutDuration?: number;
    ssl?: boolean;
  }): Promise<void> {
    if (securitySettings.minPasswordLength) {
      await this.fillInput(this.minPasswordLengthInput, securitySettings.minPasswordLength.toString());
    }
    if (securitySettings.passwordComplexity !== undefined) {
      if (securitySettings.passwordComplexity) {
        await this.checkCheckbox(this.passwordComplexityToggle);
      } else {
        await this.uncheckCheckbox(this.passwordComplexityToggle);
      }
    }
    if (securitySettings.passwordExpiry) {
      await this.fillInput(this.passwordExpiryInput, securitySettings.passwordExpiry.toString());
    }
    if (securitySettings.twoFactorAuth !== undefined) {
      if (securitySettings.twoFactorAuth) {
        await this.checkCheckbox(this.twoFactorAuthToggle);
      } else {
        await this.uncheckCheckbox(this.twoFactorAuthToggle);
      }
    }
    if (securitySettings.maxLoginAttempts) {
      await this.fillInput(this.maxLoginAttemptsInput, securitySettings.maxLoginAttempts.toString());
    }
    if (securitySettings.lockoutDuration) {
      await this.fillInput(this.lockoutDurationInput, securitySettings.lockoutDuration.toString());
    }
    if (securitySettings.ssl !== undefined) {
      if (securitySettings.ssl) {
        await this.checkCheckbox(this.sslToggle);
      } else {
        await this.uncheckCheckbox(this.sslToggle);
      }
    }
  }

  public async saveConfiguration(): Promise<void> {
    await this.clickElement(this.saveConfigurationButton);
  }

  public async resetConfiguration(): Promise<void> {
    await this.clickElement(this.resetConfigurationButton);
    await this.clickElement(this.confirmButton);
  }

  public async exportConfiguration(): Promise<void> {
    await this.clickElement(this.exportConfigurationButton);
  }

  public async importConfiguration(filePath: string): Promise<void> {
    await this.clickElement(this.importConfigurationButton);
    // File upload logic would go here
  }

  public async testConnection(integration: string): Promise<void> {
    await this.clickElement(this.testConnectionButton);
  }

  public async validateSettings(): Promise<void> {
    await this.clickElement(this.validateSettingsButton);
  }

  public async createBackup(): Promise<void> {
    await this.clickElement(this.createBackupButton);
  }

  public async restoreBackup(backupName: string): Promise<void> {
    const backupItem = this.page.locator(`.backup-item:has-text("${backupName}")`);
    await this.clickElement(backupItem.locator('.restore-btn, button:has-text("Restore")'));
    await this.clickElement(this.confirmButton);
  }

  public async getConfigurationHistory(): Promise<Array<{date: string, user: string, action: string, details: string}>> {
    const history = [];
    const rows = await this.historyRows.count();
    
    for (let i = 0; i < rows; i++) {
      const row = this.historyRows.nth(i);
      const date = await this.getElementText(row.locator(this.historyDateColumn));
      const user = await this.getElementText(row.locator(this.historyUserColumn));
      const action = await this.getElementText(row.locator(this.historyActionColumn));
      const details = await this.getElementText(row.locator(this.historyDetailsColumn));
      
      history.push({ date, user, action, details });
    }
    
    return history;
  }

  public async revertToHistoryEntry(entryIndex: number): Promise<void> {
    const row = this.historyRows.nth(entryIndex);
    await this.clickElement(row.locator(this.revertButton));
    await this.clickElement(this.confirmButton);
  }
}
