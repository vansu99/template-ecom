/* eslint-disable no-unused-vars */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  params?: Record<string, string>;
  cancelKey?: string | null;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

export type RequestInterceptor = (config: RequestConfig) => RequestConfig;
export type ResponseInterceptor = <T>(response: ApiResponse<T>) => ApiResponse<T>;
export type ErrorHandler = (error: ApiError) => void;

class ApiClient {
  private readonly baseURL: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptor: RequestInterceptor | null;
  private responseInterceptor: ResponseInterceptor | null;
  private errorHandler: ErrorHandler | null;
  private abortControllers: Map<string, AbortController>;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.requestInterceptor = null;
    this.responseInterceptor = null;
    this.errorHandler = null;
    this.abortControllers = new Map();
  }

  public setHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  public setErrorHandler(handler: ErrorHandler): void {
    this.errorHandler = handler;
  }

  public setRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptor = interceptor;
  }

  public setResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptor = interceptor;
  }

  private buildQueryParams(params: Record<string, string>): string {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : '';
  }

  private async handleError(error: Error): Promise<never> {
    const apiError: ApiError = error;

    if (this.errorHandler) {
      this.errorHandler(apiError);
    }

    throw apiError;
  }

  public cancelRequest(key: string): void {
    const controller = this.abortControllers.get(key);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(key);
    }
  }

  public async request<T = unknown>(
    endpoint: string,
    {
      method = 'GET',
      headers = {},
      body,
      timeout = 5000,
      retries = 3,
      params = {},
      cancelKey = null,
    }: RequestConfig = {},
  ): Promise<T> {
    let config: RequestInit & { headers: Record<string, string> } = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
    };

    if (body instanceof FormData) {
      delete config.headers['Content-Type'];
      config.body = body;
    } else if (body) {
      config.body = JSON.stringify(body);
    }

    const query = this.buildQueryParams(params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    config.signal = controller.signal;

    if (cancelKey) {
      this.abortControllers.set(cancelKey, controller);
    }

    if (this.requestInterceptor) {
      config = this.requestInterceptor(config as RequestConfig) as RequestInit & {
        headers: Record<string, string>;
      };
    }

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(this.baseURL + endpoint + query, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          throw (
            (new Error(errorData.message || 'Request failed'),
            {
              status: response.status,
              data: errorData,
            })
          );
        }

        let responseData: T = await response.json();

        if (this.responseInterceptor) {
          const interceptedResponse = this.responseInterceptor({
            data: responseData,
            status: response.status,
            headers: response.headers,
          });
          responseData = interceptedResponse.data as T;
        }

        if (cancelKey) {
          this.abortControllers.delete(cancelKey);
        }

        return responseData;
      } catch (error) {
        if (
          i === retries - 1 ||
          (error instanceof Error && error.name === 'AbortError')
        ) {
          await this.handleError(error as Error);
        }
      }
    }

    throw new Error('Maximum retries exceeded');
  }

  // Convenience methods with proper typing
  public get<T = unknown>(
    endpoint: string,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  public put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  public delete<T = unknown>(
    endpoint: string,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  public patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  public head<T = unknown>(
    endpoint: string,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'HEAD' });
  }

  public options<T = unknown>(
    endpoint: string,
    options?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'OPTIONS' });
  }
}

export const https = new ApiClient();
