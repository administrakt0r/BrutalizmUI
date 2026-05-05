## 2025-05-15 - [Security Utility & MDX Performance]

**Learning:** Core security utilities (`isSafeUrl`, `safeJsonLd`) and MDX evaluation (`useMDXComponent`) are significant hot paths in this documentation-heavy site. Multiple chained `.replace()` calls and repeated `new Function()` evaluations for MDX code contribute to rendering overhead.

**Action:** Future Bolt runs should ensure regexes are hoisted to the module level in `src/lib/security.ts` and use single-pass replacement logic. Static JSON-LD objects should be pre-stringified at the module level in layout/page components. MDX evaluation results must be cached globally to avoid redundant work during client-side navigation.
