import type { ReactNode } from 'react';
import React, { createContext as reactCreateContext, useContext } from 'react';

/**
 * A factory function that creates a React context with a hook and provider component
 *
 * @example
 *
 * // Create a context
 * const { Provider: UserProvider, useUser } = createContextModule<User>('User');
 *
 * // Use the provider
 * function App() {
 *   const user = { name: 'John', age: 30 };
 *   return <UserProvider value={user}>{children}</UserProvider>;
 * }
 *
 * // Use the hook in a component
 * function Profile() {
 *   const user = useUser();
 *   return <div>{user.name}</div>;
 * }
 *
 * @template T The type of the context value
 * @param {string} displayName The display name for the context (used in React DevTools)
 * @param {T} [defaultValue] Optional default value for the context
 * @returns An object containing the context, a hook to use the context, and a provider component
 */
export function createContextModule<T>(displayName: string, defaultValue?: T) {
  // Create the React context with the provided default value
  const Context = reactCreateContext<T | undefined>(defaultValue ?? undefined);

  // Set the display name for React DevTools
  Context.displayName = displayName;

  /**
   * Custom hook to use the context
   * Throws an error if used outside of the provider
   */
  function useContextHook(): T {
    const context = useContext(Context);

    if (!context) {
      throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
    }

    return context;
  }

  /**
   * Provider component for the context
   */
  function ContextProvider({ children, value }: { children: ReactNode; value: T }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  // Set the display name for the provider component for React DevTools
  ContextProvider.displayName = `${displayName}Provider`;

  return {
    Context,
    Provider: ContextProvider,
    // The hook name follows the convention of `use${ContextName}`
    useContextHook,
  } as const;
}

/**
 * Example usage:
 *
 * // Create a context
 * const { Provider: UserProvider, useUser } = createContext<User>('User');
 *
 * // Use the provider
 * function App() {
 *   const user = { name: 'John', age: 30 };
 *   return <UserProvider value={user}>{children}</UserProvider>;
 * }
 *
 * // Use the hook in a component
 * function Profile() {
 *   const user = useUser();
 *   return <div>{user.name}</div>;
 * }
 */
