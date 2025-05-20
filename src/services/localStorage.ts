/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILocalStorage {
  clear(): void;
  get(key: string): unknown;
  remove(key: string): void;
  set(key: string, data: unknown): void;
}

export default class LocalStorage implements ILocalStorage {
  private cacheKey: string;

  tryCatchWrapper = (fn: () => void) => {
    try {
      return fn();
    } catch (e) {
      console.warn('LocalStorage error: ', e);
    }
  };

  constructor(cacheKey = 'CACHE_KEY') {
    this.cacheKey = cacheKey;
    if (typeof window !== 'undefined') {
      this.tryCatchWrapper(() => {
        if (!window.localStorage.getItem(this.cacheKey)) {
          window.localStorage.setItem(this.cacheKey, JSON.stringify({}));
        }
      });
    }
  }

  get(key: string): any {
    if (typeof window !== 'undefined') {
      return this.tryCatchWrapper(() => {
        const value = window.localStorage.getItem(key);

        if (value) {
          const cache = JSON.parse(window.localStorage.getItem(this.cacheKey) || '');
          const expireAt = cache && cache[key] ? new Date(cache[key]) : null;
          const now = new Date();
          if (expireAt && expireAt > now) {
            return JSON.parse(value);
          }
        }
      });
    }
    return null;
  }

  set(key: string, data: any, cacheInMinutes: number = 60 * 24): void {
    this.tryCatchWrapper(() => {
      window.localStorage.setItem(key, JSON.stringify(data));

      const value = window.localStorage.getItem(this.cacheKey) || '';
      if (value) {
        const cache = JSON.parse(value);
        const expireAt = new Date();
        expireAt.setMinutes(expireAt.getMinutes() + cacheInMinutes);
        cache[key] = expireAt;
        window.localStorage.setItem(this.cacheKey, JSON.stringify(cache));
      }
    });
  }

  merge(key: string, data: unknown): void {
    const dataInCache = this.get(key);
    let content = null;
    content =
      dataInCache && Array.isArray(dataInCache) && Array.isArray(data)
        ? [...dataInCache, ...data]
        : data;
    this.set(key, content);
  }

  remove(key: string): void {
    this.tryCatchWrapper(() => {
      window.localStorage.removeItem(key);
    });
  }

  clear(): void {
    this.tryCatchWrapper(() => {
      window.localStorage.clear();
    });
  }

  usage(): void {
    this.tryCatchWrapper(() => {
      let total = '';
      console.warn('Current local storage: ');

      for (const key in window.localStorage) {
        // eslint-disable-next-line no-prototype-builtins
        if (window.localStorage.hasOwnProperty(key)) {
          total += window.localStorage[key];
          const size = ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2);
          console.error(`${key} = ${size} KB`);
        }
      }

      const spaceUsed = total ? ((total.length * 16) / (8 * 1024)).toFixed(2) : 0;
      const spaceRemaining = spaceUsed ? 5120 - parseInt(spaceUsed, 10) : 0;
      console.warn(`Total space used: ${spaceUsed} KB`);
      console.warn(`Approx. space remaining: ${spaceRemaining} KB`);
    });
  }
}

const defaultKey = '@GO_TICKETS';
export const RECENTLY_VIEWED = `${defaultKey}:HOME_RECENTLY_VIEWED`;
export const RECENT_SEARCH = `${defaultKey}:RECENT_SEARCH`;
