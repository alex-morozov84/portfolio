import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Hook to check if the component is mounted on the client.
 * Uses useSyncExternalStore to avoid hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}
