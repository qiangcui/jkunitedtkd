export type AppView = 'home' | 'about-us' | 'gallery' | 'education' | 'schedule';

export type EducationTab =
  | 'rankings'
  | 'taegeuk'
  | 'wonshim'
  | 'flags'
  | 'terminology'
  | 'philosophy';

export interface RouteState {
  view: AppView;
  hash?: string;
  educationTab?: EducationTab;
}

function normalizePath(pathname: string): string {
  const lower = pathname.toLowerCase();
  if (!lower || lower === '/') return '/';
  return lower.endsWith('/') ? lower.slice(0, -1) : lower;
}

/** Legacy WordPress paths and current site routes. */
const ROUTE_MAP: Record<string, RouteState> = {
  '/': { view: 'home' },
  '/about-us': { view: 'about-us' },
  '/about': { view: 'about-us' },
  '/gallery': { view: 'gallery' },
  '/education': { view: 'education', educationTab: 'rankings' },
  '/schedule': { view: 'schedule' },
  '/class-schedule-old': { view: 'schedule' },
  '/class-schedule': { view: 'schedule' },
  '/class-timetable': { view: 'schedule' },
  '/contact-us': { view: 'home', hash: '#hours' },
  '/philosophy': { view: 'education', educationTab: 'philosophy' },
  '/start-and-end-class': { view: 'education', educationTab: 'philosophy' },
  '/taeguk-poomsae': { view: 'education', educationTab: 'taegeuk' },
  '/taegeuk-poomsae': { view: 'education', educationTab: 'taegeuk' },
  '/upcoming-events-specials': { view: 'home', hash: '#programs' },
  '/upcoming-events': { view: 'home', hash: '#programs' },
};

export function resolveRoute(pathname: string): RouteState {
  return ROUTE_MAP[normalizePath(pathname)] ?? { view: 'home' };
}

export function buildPath(state: RouteState): string {
  const { view, hash, educationTab } = state;

  if (view === 'home') {
    if (hash === '#hours') return '/contact-us/';
    if (hash === '#programs') return '/upcoming-events-specials/';
    if (hash && hash !== '#home') return `/${hash}`;
    return '/';
  }

  if (view === 'about-us') return '/about-us/';
  if (view === 'gallery') return '/gallery/';
  if (view === 'schedule') return '/class-schedule-old/';

  if (view === 'education') {
    if (educationTab === 'philosophy') return '/philosophy/';
    if (educationTab === 'taegeuk') return '/taeguk-poomsae/';
    return '/education/';
  }

  return '/';
}

export function pathForView(
  view: AppView,
  hash?: string,
  educationTab?: EducationTab,
): string {
  return buildPath({ view, hash, educationTab });
}
