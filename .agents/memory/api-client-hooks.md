---
name: api-client-react hook pattern
description: How to add new API hooks to the hand-written api-client-react library
---

The api-client-react package has NO code-generator script. All hooks are hand-written.

**To add new hooks:**
1. Append TypeScript interfaces to `lib/api-client-react/src/generated/api.schemas.ts`
2. Add the new types to the `import type { ... } from './api.schemas'` block in `api.ts`
3. Append hook functions to `lib/api-client-react/src/generated/api.ts` following the orval pattern:
   - `get<Entity>Url()`, `<entity>()` fetch fn, `getListQueryKey()`, `getQueryOptions()`, `useList<Entity>()`
   - `useCreate<Entity>`, `useUpdate<Entity>`, `useDelete<Entity>` mutations
4. Run `pnpm --filter @workspace/api-client-react exec tsc --build` to regenerate dist/index.d.ts
5. Then run frontend typecheck: `pnpm --filter @workspace/new-euro exec tsc --noEmit`

**Why:** The lib uses project references (composite:true, emitDeclarationOnly:true). The frontend resolves hooks via dist/index.d.ts. Skipping step 4 causes TS6305 errors across all consumers.

**Admin vs public list hooks:** Always add a separate admin hook (e.g. useListGalleryAdmin -> /api/gallery/admin) for admin pages that need to see unpublished items.
