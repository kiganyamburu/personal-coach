const DEFAULT_API_BASE_URL = "http://localhost:3000/api";

export function getApiBaseUrl(): string {
  // Vite exposes env vars on import.meta.env
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return (envBase || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return `${base}${path}`;
}


