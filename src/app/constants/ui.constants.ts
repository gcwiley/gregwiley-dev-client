// Snackbar / Toast
export const SNACK_BAR_DURATION_MS = 5000;
export const SNACK_BAR_DURATION_SHORT_MS = 2000;
export const SNACK_BAR_DURATION_LONG_MS = 8000;
export const SNACK_BAR_POSITION = { horizontal: 'end', vertical: 'top' } as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50] as const;

// Debounce / Timing
export const SEARCH_DEBOUNCE_MS = 300;
export const RESIZE_DEBOUNCE_MS = 150;
export const AUTO_SAVE_INTERVAL_MS = 30000;

// Breakpoints
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

// Animation Durations
export const ANIMATION_DURATION_MS = 300;
export const ANIMATION_DURATION_SLOW_MS = 500;

// Input Constraints
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const;

// Dialog
export const DIALOG_WIDTH_SM = '400px';
export const DIALOG_WIDTH_MD = '600px';
export const DIALOG_WIDTH_LG = '800px';

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'app-theme',
  locale: 'app-locale',
  sidenavOpen: 'sidenav-open',
  pageSize: 'preferred-page-size',
} as const;

// Date Formats
export const DATE_FORMAT_SHORT = 'MM/dd/yyyy';
export const DATE_FORMAT_LONG = 'MMMM d, yyyy';
export const DATE_FORMAT_WITH_TIME = 'MM/dd/yyyy h:mm a';

// Retry / Network
export const DEFAULT_RETRY_COUNT = 1;
export const DEFAULT_RETRY_DELAY_MS = 1000;