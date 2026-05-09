## 2025-05-15 - Hot-path security and MDX evaluation optimizations

**Learning:** Core security utility functions in `src/lib/security.ts` (e.g., `isSafeUrl`, `sanitizeColor`) are frequently called during rendering and metadata generation. Moving constants and regexes to the module level and using single-pass replacements significantly reduces allocation churn. Furthermore, MDX code evaluated via `new Function()` in `src/components/app/mdx-components.tsx` can be cached globally to avoid repeated expensive evaluation during client-side navigation.

**Action:** Always prefer module-level hoisting for regexes and constants in utility files. Use a bounded global cache for expensive evaluation operations like MDX or complex parsing that depends on static input.
