1. One Endpoint , One File
2. Index.ts per module to export all endpoints and types
3. Use backend-service/util/use-fetcher.ts as a wrapper for fetch when need authentication
4. All service should have type with response and payload. If don't need payload can skip it.
5. Create type.ts per module and all types should on this file.