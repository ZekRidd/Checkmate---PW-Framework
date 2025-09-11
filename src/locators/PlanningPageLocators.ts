import { Locator, Page } from '@playwright/test';
import { BaseLocators } from './BaseLocators';

/**
 * Planning Page Locators
 * Contains all locators for the Planning page functionality
 */
export class PlanningPageLocators extends BaseLocators {
  // Page identification
  public readonly planningPageTitle: Locator;
  public readonly planningPageSubtitle: Locator;
  public readonly planningPageBreadcrumb: Locator;
  public readonly planningPageMainScheduleText: Locator;

  // Navigation elements
  public readonly planningPageNavigationMenu: Locator;
  public readonly planningPagePlanningTab: Locator;
  public readonly planningPageConfigurationTab: Locator;
  public readonly planningPageDataManagementTab: Locator;
  public readonly planningPageUserMenu: Locator;
  public readonly planningPageLogoutButton: Locator;

  // Planning specific elements
  public readonly planningPageContainer: Locator;
  public readonly planningPageCycleSelector: Locator;
  public readonly planningPageCycleDropdown: Locator;
  public readonly planningPageCycleList: Locator;
  public readonly planningPageCurrentCycle: Locator;
  public readonly planningPageCycleName: Locator;
  public readonly planningPageCycleDateRange: Locator;
  public readonly planningPageCycleStatus: Locator;

  // Planning actions
  public readonly planningPageCreateNewPlanButton: Locator;
  public readonly planningPageEditPlanButton: Locator;
  public readonly planningPageDeletePlanButton: Locator;
  public readonly planningPageDuplicatePlanButton: Locator;
  public readonly planningPageExportPlanButton: Locator;
  public readonly planningPageImportPlanButton: Locator;

  // Plan list/table
  public readonly planTable: Locator;
  public readonly planTableHeader: Locator;
  public readonly planTableBody: Locator;
  public readonly planRows: Locator;
  public readonly planNameColumn: Locator;
  public readonly planStatusColumn: Locator;
  public readonly planDateColumn: Locator;
  public readonly planActionsColumn: Locator;

  // Plan details
  public readonly planDetailsModal: Locator;
  public readonly planDetailsTitle: Locator;
  public readonly planDetailsContent: Locator;
  public readonly planDetailsCloseButton: Locator;

  // Plan form elements
  public readonly planNameInput: Locator;
  public readonly planDescriptionInput: Locator;
  public readonly planStartDateInput: Locator;
  public readonly planEndDateInput: Locator;
  public readonly planStatusSelect: Locator;
  public readonly planPrioritySelect: Locator;
  public readonly planCategorySelect: Locator;
  public readonly planTagsInput: Locator;

  // Plan form buttons
  public readonly savePlanButton: Locator;
  public readonly cancelPlanButton: Locator;
  public readonly resetPlanButton: Locator;

  // Search and filter
  public readonly searchInput: Locator;
  public readonly filterDropdown: Locator;
  public readonly sortButton: Locator;
  public readonly viewToggle: Locator;
  public readonly refreshButton: Locator;

  // Status indicators
  public readonly loadingSpinner: Locator;
  public readonly successMessage: Locator;
  public readonly errorMessage: Locator;
  public readonly warningMessage: Locator;

  // Planning metrics/statistics
  public readonly metricsContainer: Locator;
  public readonly totalPlansMetric: Locator;
  public readonly activePlansMetric: Locator;
  public readonly completedPlansMetric: Locator;
  public readonly overduePlansMetric: Locator;

  // Planning calendar view
  public readonly calendarView: Locator;
  public readonly calendarGrid: Locator;
  public readonly calendarMonth: Locator;
  public readonly calendarWeek: Locator;
  public readonly calendarDay: Locator;
  public readonly calendarNavigation: Locator;
  public readonly calendarPrevButton: Locator;
  public readonly calendarNextButton: Locator;
  public readonly calendarTodayButton: Locator;

  // Planning timeline
  public readonly timelineView: Locator;
  public readonly timelineContainer: Locator;
  public readonly timelineItems: Locator;
  public readonly timelineMilestones: Locator;
  public readonly timelineDependencies: Locator;

  // Planning collaboration
  public readonly commentsSection: Locator;
  public readonly commentInput: Locator;
  public readonly commentSubmitButton: Locator;
  public readonly commentList: Locator;
  public readonly commentItems: Locator;

  // Planning notifications
  public readonly notificationsBell: Locator;
  public readonly notificationsDropdown: Locator;
  public readonly notificationItems: Locator;
  public readonly notificationCount: Locator;

  // Planning settings
  public readonly settingsButton: Locator;
  public readonly settingsModal: Locator;
  public readonly settingsContent: Locator;
  public readonly settingsCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page identification
    this.planningPageTitle = this.page.locator('h1, .page-title, .planning-title, [data-testid="planning-title"]');
    this.planningPageSubtitle = this.page.locator('h2, .page-subtitle, .planning-subtitle, [data-testid="planning-subtitle"]');
    this.planningPageBreadcrumb = this.getBreadcrumb();
    this.planningPageMainScheduleText = this.getMainScheduleText();

    // Navigation elements
    this.planningPageNavigationMenu = this.getNavigationMenu();
    this.planningPagePlanningTab = this.page.locator('a:has-text("Planning"), button:has-text("Planning")');
    this.planningPageConfigurationTab = this.page.locator('a:has-text("Configuration"), button:has-text("Configuration")');
    this.planningPageDataManagementTab = this.page.locator('a:has-text("Data Management"), button:has-text("Data Management")');
    this.planningPageUserMenu = this.page.locator('.user-menu, .profile-menu, [data-testid="user-menu"]');
    this.planningPageLogoutButton = this.page.locator('button:has-text("Logout"), .logout-btn, [data-testid="logout-button"]');

    // Planning specific elements
    this.planningPageContainer = this.page.locator('.planning-container, .planning-content, [data-testid="planning-container"]');
    this.planningPageCycleSelector = this.page.locator('.cycle-selector, .cycle-dropdown, [data-testid="cycle-selector"]');
    this.planningPageCycleDropdown = this.page.locator('select[name="cycle"], .cycle-select, [data-testid="cycle-dropdown"]');
    this.planningPageCycleList = this.page.locator('.cycle-list, .cycle-items, [data-testid="cycle-list"]');
    this.planningPageCurrentCycle = this.page.locator('.current-cycle, .active-cycle, [data-testid="current-cycle"]');
    this.planningPageCycleName = this.page.locator('.cycle-name, .cycle-title, [data-testid="cycle-name"]');
    this.planningPageCycleDateRange = this.page.locator('.cycle-date-range, .cycle-dates, [data-testid="cycle-date-range"]');
    this.planningPageCycleStatus = this.page.locator('.cycle-status, .cycle-state, [data-testid="cycle-status"]');

    // Planning actions
    this.planningPageCreateNewPlanButton = this.getAddButton();
    this.planningPageEditPlanButton = this.getEditButton();
    this.planningPageDeletePlanButton = this.getDeleteButton();
    this.planningPageDuplicatePlanButton = this.page.locator('button:has-text("Duplicate"), .duplicate-btn, [data-testid="duplicate-plan"]');
    this.planningPageExportPlanButton = this.page.locator('button:has-text("Export"), .export-btn, [data-testid="export-plan"]');
    this.planningPageImportPlanButton = this.page.locator('button:has-text("Import"), .import-btn, [data-testid="import-plan"]');

    // Plan list/table
    this.planTable = this.getTable();
    this.planTableHeader = this.getTableHeader();
    this.planTableBody = this.getTableBody();
    this.planRows = this.getTableRow();
    this.planNameColumn = this.page.locator('th:has-text("Name"), .plan-name-column, [data-testid="plan-name-column"]');
    this.planStatusColumn = this.page.locator('th:has-text("Status"), .plan-status-column, [data-testid="plan-status-column"]');
    this.planDateColumn = this.page.locator('th:has-text("Date"), .plan-date-column, [data-testid="plan-date-column"]');
    this.planActionsColumn = this.page.locator('th:has-text("Actions"), .plan-actions-column, [data-testid="plan-actions-column"]');

    // Plan details
    this.planDetailsModal = this.getModal();
    this.planDetailsTitle = this.getModalTitle();
    this.planDetailsContent = this.getModalContent();
    this.planDetailsCloseButton = this.getModalCloseButton();

    // Plan form elements
    this.planNameInput = this.page.locator('input[name="planName"], input[name="name"], #plan-name, [data-testid="plan-name-input"]');
    this.planDescriptionInput = this.page.locator('textarea[name="description"], #plan-description, [data-testid="plan-description-input"]');
    this.planStartDateInput = this.page.locator('input[name="startDate"], input[type="date"], #plan-start-date, [data-testid="plan-start-date"]');
    this.planEndDateInput = this.page.locator('input[name="endDate"], input[type="date"], #plan-end-date, [data-testid="plan-end-date"]');
    this.planStatusSelect = this.page.locator('select[name="status"], #plan-status, [data-testid="plan-status-select"]');
    this.planPrioritySelect = this.page.locator('select[name="priority"], #plan-priority, [data-testid="plan-priority-select"]');
    this.planCategorySelect = this.page.locator('select[name="category"], #plan-category, [data-testid="plan-category-select"]');
    this.planTagsInput = this.page.locator('input[name="tags"], #plan-tags, [data-testid="plan-tags-input"]');

    // Plan form buttons
    this.savePlanButton = this.getSaveButton();
    this.cancelPlanButton = this.getCancelButton();
    this.resetPlanButton = this.page.locator('button:has-text("Reset"), .reset-btn, [data-testid="reset-plan"]');

    // Search and filter
    this.searchInput = this.getSearchInput();
    this.filterDropdown = this.getFilterDropdown();
    this.sortButton = this.getSortButton();
    this.viewToggle = this.page.locator('.view-toggle, .view-switcher, [data-testid="view-toggle"]');
    this.refreshButton = this.page.locator('button:has-text("Refresh"), .refresh-btn, [data-testid="refresh-button"]');

    // Status indicators
    this.loadingSpinner = this.getLoadingSpinner();
    this.successMessage = this.getSuccessMessage();
    this.errorMessage = this.getErrorMessage();
    this.warningMessage = this.getWarningMessage();

    // Planning metrics/statistics
    this.metricsContainer = this.page.locator('.metrics-container, .statistics, [data-testid="planning-metrics"]');
    this.totalPlansMetric = this.page.locator('.total-plans, .metric-total, [data-testid="total-plans-metric"]');
    this.activePlansMetric = this.page.locator('.active-plans, .metric-active, [data-testid="active-plans-metric"]');
    this.completedPlansMetric = this.page.locator('.completed-plans, .metric-completed, [data-testid="completed-plans-metric"]');
    this.overduePlansMetric = this.page.locator('.overdue-plans, .metric-overdue, [data-testid="overdue-plans-metric"]');

    // Planning calendar view
    this.calendarView = this.page.locator('.calendar-view, .planning-calendar, [data-testid="calendar-view"]');
    this.calendarGrid = this.page.locator('.calendar-grid, .calendar-table, [data-testid="calendar-grid"]');
    this.calendarMonth = this.page.locator('.calendar-month, .month-view, [data-testid="calendar-month"]');
    this.calendarWeek = this.page.locator('.calendar-week, .week-view, [data-testid="calendar-week"]');
    this.calendarDay = this.page.locator('.calendar-day, .day-view, [data-testid="calendar-day"]');
    this.calendarNavigation = this.page.locator('.calendar-navigation, .calendar-nav, [data-testid="calendar-navigation"]');
    this.calendarPrevButton = this.page.locator('.calendar-prev, .prev-month, [data-testid="calendar-prev"]');
    this.calendarNextButton = this.page.locator('.calendar-next, .next-month, [data-testid="calendar-next"]');
    this.calendarTodayButton = this.page.locator('.calendar-today, .today-btn, [data-testid="calendar-today"]');

    // Planning timeline
    this.timelineView = this.page.locator('.timeline-view, .planning-timeline, [data-testid="timeline-view"]');
    this.timelineContainer = this.page.locator('.timeline-container, .timeline-content, [data-testid="timeline-container"]');
    this.timelineItems = this.page.locator('.timeline-item, .timeline-entry, [data-testid="timeline-item"]');
    this.timelineMilestones = this.page.locator('.timeline-milestone, .milestone, [data-testid="timeline-milestone"]');
    this.timelineDependencies = this.page.locator('.timeline-dependency, .dependency, [data-testid="timeline-dependency"]');

    // Planning collaboration
    this.commentsSection = this.page.locator('.comments-section, .planning-comments, [data-testid="comments-section"]');
    this.commentInput = this.page.locator('textarea[name="comment"], #comment-input, [data-testid="comment-input"]');
    this.commentSubmitButton = this.page.locator('button:has-text("Comment"), .comment-submit, [data-testid="comment-submit"]');
    this.commentList = this.page.locator('.comment-list, .comments, [data-testid="comment-list"]');
    this.commentItems = this.page.locator('.comment-item, .comment, [data-testid="comment-item"]');

    // Planning notifications
    this.notificationsBell = this.page.locator('.notifications-bell, .notification-icon, [data-testid="notifications-bell"]');
    this.notificationsDropdown = this.page.locator('.notifications-dropdown, .notification-list, [data-testid="notifications-dropdown"]');
    this.notificationItems = this.page.locator('.notification-item, .notification, [data-testid="notification-item"]');
    this.notificationCount = this.page.locator('.notification-count, .badge, [data-testid="notification-count"]');

    // Planning settings
    this.settingsButton = this.page.locator('button:has-text("Settings"), .settings-btn, [data-testid="settings-button"]');
    this.settingsModal = this.page.locator('.settings-modal, .planning-settings, [data-testid="settings-modal"]');
    this.settingsContent = this.page.locator('.settings-content, .settings-form, [data-testid="settings-content"]');
    this.settingsCloseButton = this.page.locator('.settings-close, .close-settings, [data-testid="settings-close"]');
  }

  // Planning specific methods
  public async getCurrentCycleName(): Promise<string> {
    return await this.getElementText(this.planningPageCycleName);
  }

  public async getCurrentCycleStatus(): Promise<string> {
    return await this.getElementText(this.planningPageCycleStatus);
  }

  public async getCurrentCycleDateRange(): Promise<string> {
    return await this.getElementText(this.planningPageCycleDateRange);
  }

  public async selectCycle(cycleName: string): Promise<void> {
    await this.clickElement(this.planningPageCycleSelector);
    await this.clickElement(this.page.locator(`option:has-text("${cycleName}"), .cycle-item:has-text("${cycleName}")`));
  }

  public async createNewPlan(planData: {
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    priority?: string;
    category?: string;
    tags?: string;
  }): Promise<void> {
    await this.clickElement(this.planningPageCreateNewPlanButton);
    await this.fillInput(this.planNameInput, planData.name);
    
    if (planData.description) {
      await this.fillInput(this.planDescriptionInput, planData.description);
    }
    
    if (planData.startDate) {
      await this.fillInput(this.planStartDateInput, planData.startDate);
    }
    
    if (planData.endDate) {
      await this.fillInput(this.planEndDateInput, planData.endDate);
    }
    
    if (planData.status) {
      await this.selectOption(this.planStatusSelect, planData.status);
    }
    
    if (planData.priority) {
      await this.selectOption(this.planPrioritySelect, planData.priority);
    }
    
    if (planData.category) {
      await this.selectOption(this.planCategorySelect, planData.category);
    }
    
    if (planData.tags) {
      await this.fillInput(this.planTagsInput, planData.tags);
    }
    
    await this.clickElement(this.savePlanButton);
  }

  public async searchPlans(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
  }

  public async filterPlansByStatus(status: string): Promise<void> {
    await this.selectOption(this.filterDropdown, status);
  }

  public async getPlanCount(): Promise<number> {
    const rows = await this.planRows.count();
    return rows;
  }

  public async getPlanByIndex(index: number): Promise<Locator> {
    return this.planRows.nth(index);
  }

  public async getPlanByName(name: string): Promise<Locator> {
    return this.page.locator(`tr:has-text("${name}")`);
  }

  public async editPlanByName(name: string): Promise<void> {
    const planRow = await this.getPlanByName(name);
    await this.clickElement(planRow.locator('.edit-btn, button:has-text("Edit")'));
  }

  public async deletePlanByName(name: string): Promise<void> {
    const planRow = await this.getPlanByName(name);
    await this.clickElement(planRow.locator('.delete-btn, button:has-text("Delete")'));
  }

  public async switchToCalendarView(): Promise<void> {
    await this.clickElement(this.calendarView);
  }

  public async switchToTimelineView(): Promise<void> {
    await this.clickElement(this.timelineView);
  }

  public async navigateCalendar(direction: 'prev' | 'next' | 'today'): Promise<void> {
    switch (direction) {
      case 'prev':
        await this.clickElement(this.calendarPrevButton);
        break;
      case 'next':
        await this.clickElement(this.calendarNextButton);
        break;
      case 'today':
        await this.clickElement(this.calendarTodayButton);
        break;
    }
  }

  public async addComment(comment: string): Promise<void> {
    await this.fillInput(this.commentInput, comment);
    await this.clickElement(this.commentSubmitButton);
  }

  public async getNotificationCount(): Promise<number> {
    const countText = await this.getElementText(this.notificationCount);
    return parseInt(countText) || 0;
  }

  public async openNotifications(): Promise<void> {
    await this.clickElement(this.notificationsBell);
  }

  public async openSettings(): Promise<void> {
    await this.clickElement(this.settingsButton);
  }

  public async closeSettings(): Promise<void> {
    await this.clickElement(this.settingsCloseButton);
  }
}
