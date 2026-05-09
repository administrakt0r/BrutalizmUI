## 2025-05-13 - MDX Evaluation Bottleneck

**Learning:** MDX components are evaluated at runtime using `new Function()` in `src/components/app/mdx-components.tsx`. This is an expensive operation that repeats on every navigation or re-mount of MDX-based pages (like the documentation).

**Action:** Implement a global cache for evaluated MDX components with a FIFO eviction strategy to prevent redundant processing.
