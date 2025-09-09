import { Locator, Page } from '@playwright/test';

/**
 * Base locator class containing common locator patterns and methods
 * All page-specific locator classes should extend this class
 */
export abstract class BaseLocators {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common locator patterns
  protected getButtonByText(text: string): Locator {
    return this.page.locator(`button:has-text("${text}")`);
  }

  protected getLinkByText(text: string): Locator {
    return this.page.locator(`a:has-text("${text}")`);
  }

  protected getInputByPlaceholder(placeholder: string): Locator {
    return this.page.locator(`input[placeholder="${placeholder}"]`);
  }

  protected getInputByName(name: string): Locator {
    return this.page.locator(`input[name="${name}"]`);
  }

  protected getInputById(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  protected getElementByDataTestId(testId: string): Locator {
    return this.page.locator(`[data-testid="${testId}"]`);
  }

  protected getElementByClass(className: string): Locator {
    return this.page.locator(`.${className}`);
  }

  protected getElementByRole(role: string, name?: string): Locator {
    if (name) {
      return this.page.locator(`[role="${role}"]:has-text("${name}")`);
    }
    return this.page.locator(`[role="${role}"]`);
  }

  protected getSelectByLabel(label: string): Locator {
    return this.page.locator(`select:has-text("${label}")`);
  }

  protected getCheckboxByLabel(label: string): Locator {
    return this.page.locator(`input[type="checkbox"]:near(:text("${label}"))`);
  }

  protected getRadioByLabel(label: string): Locator {
    return this.page.locator(`input[type="radio"]:near(:text("${label}"))`);
  }

  // Common navigation elements
  protected getNavigationMenu(): Locator {
    return this.page.locator('nav, .navigation, .menu, .navbar');
  }

  protected getBreadcrumb(): Locator {
    return this.page.locator('.breadcrumb, .breadcrumbs, [aria-label="breadcrumb"]');
  }

  protected getPageTitle(): Locator {
    return this.page.locator('h1, .page-title, .title, [data-testid="page-title"]');
  }

  protected getPageSubtitle(): Locator {
    return this.page.locator('h2, .page-subtitle, .subtitle, [data-testid="page-subtitle"]');
  }

  // Login page elements
  protected getUsernameInput(): Locator {
    return this.page.locator('#username');
  }

  protected getContinueButton(): Locator {
    return this.page.locator('button[type="submit"]:has-text("Continue")');
  }

  protected getVerificationCodeInput(): Locator {
    return this.page.locator('input[type="text"]:not(.hide)');
  }

  protected getMainScheduleText(): Locator {
    return this.page.locator('text="Main Schedule"');
  }

  protected getAssetsText(): Locator {
    return this.page.locator('text=/Assets/i');
  }

  protected getAddAssetButton(): Locator {
    return this.page.locator('button:has-text("Add Asset")');
  }

  protected getFileUploadsText(): Locator {
    return this.page.locator('text=/File Uploads/i');
  }

  // Common form elements
  protected getForm(): Locator {
    return this.page.locator('form');
  }

  protected getFormField(label: string): Locator {
    return this.page.locator(`label:has-text("${label}") + input, label:has-text("${label}") + select, label:has-text("${label}") + textarea`);
  }

  protected getFormError(): Locator {
    return this.page.locator('.error, .form-error, .field-error, .validation-error, [role="alert"]');
  }

  protected getFormSuccess(): Locator {
    return this.page.locator('.success, .form-success, .field-success, .alert-success');
  }

  // Common action elements
  protected getSaveButton(): Locator {
    return this.page.locator('button:has-text("Save"), button:has-text("Submit"), button[type="submit"]');
  }

  protected getCancelButton(): Locator {
    return this.page.locator('button:has-text("Cancel"), button:has-text("Close")');
  }

  protected getDeleteButton(): Locator {
    return this.page.locator('button:has-text("Delete"), button:has-text("Remove")');
  }

  protected getEditButton(): Locator {
    return this.page.locator('button:has-text("Edit"), button:has-text("Modify")');
  }

  protected getAddButton(): Locator {
    return this.page.locator('button:has-text("Add"), button:has-text("Create"), button:has-text("New")');
  }

  // Common table elements
  protected getTable(): Locator {
    return this.page.locator('table, .table');
  }

  protected getTableHeader(): Locator {
    return this.page.locator('thead, .table-header, th');
  }

  protected getTableBody(): Locator {
    return this.page.locator('tbody, .table-body');
  }

  protected getTableRow(index?: number): Locator {
    if (index !== undefined) {
      return this.page.locator(`tr:nth-child(${index + 1})`);
    }
    return this.page.locator('tr');
  }

  protected getTableCell(row: number, column: number): Locator {
    return this.page.locator(`tr:nth-child(${row + 1}) td:nth-child(${column + 1})`);
  }

  // Common modal elements
  protected getModal(): Locator {
    return this.page.locator('.modal, .dialog, [role="dialog"]');
  }

  protected getModalTitle(): Locator {
    return this.page.locator('.modal-title, .dialog-title, [role="dialog"] h1, [role="dialog"] h2');
  }

  protected getModalContent(): Locator {
    return this.page.locator('.modal-content, .dialog-content, [role="dialog"] .content');
  }

  protected getModalCloseButton(): Locator {
    return this.page.locator('.modal-close, .dialog-close, [aria-label="close"], button:has-text("×")');
  }

  // Common loading and status elements
  protected getLoadingSpinner(): Locator {
    return this.page.locator('.loading, .spinner, .loader, [aria-label="loading"]');
  }

  protected getSuccessMessage(): Locator {
    return this.page.locator('.success, .alert-success, .message-success, [role="alert"]:has-text("success")');
  }

  protected getErrorMessage(): Locator {
    return this.page.locator('.error, .alert-error, .message-error, [role="alert"]:has-text("error")');
  }

  protected getWarningMessage(): Locator {
    return this.page.locator('.warning, .alert-warning, .message-warning, [role="alert"]:has-text("warning")');
  }

  protected getInfoMessage(): Locator {
    return this.page.locator('.info, .alert-info, .message-info, [role="alert"]:has-text("info")');
  }

  // Common search and filter elements
  protected getSearchInput(): Locator {
    return this.page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
  }

  protected getFilterDropdown(): Locator {
    return this.page.locator('select, .filter-dropdown, [data-testid*="filter"]');
  }

  protected getSortButton(): Locator {
    return this.page.locator('button:has-text("Sort"), .sort-button, [data-testid*="sort"]');
  }

  // Utility methods
  protected waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    return locator.waitFor({ timeout });
  }

  protected isElementVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  protected getElementText(locator: Locator): Promise<string> {
    return locator.textContent().then(text => text || '');
  }

  protected getElementAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  protected clickElement(locator: Locator): Promise<void> {
    return locator.click();
  }

  protected fillInput(locator: Locator, value: string): Promise<void> {
    return locator.fill(value);
  }

  protected clearInput(locator: Locator): Promise<void> {
    return locator.clear();
  }

  protected selectOption(locator: Locator, value: string): Promise<void> {
    return locator.selectOption(value).then(() => {});
  }

  protected checkCheckbox(locator: Locator): Promise<void> {
    return locator.check();
  }

  protected uncheckCheckbox(locator: Locator): Promise<void> {
    return locator.uncheck();
  }

  protected hoverElement(locator: Locator): Promise<void> {
    return locator.hover();
  }

  protected doubleClickElement(locator: Locator): Promise<void> {
    return locator.dblclick();
  }

  protected rightClickElement(locator: Locator): Promise<void> {
    return locator.click({ button: 'right' });
  }
}
