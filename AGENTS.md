<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read
the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

### Codebase
- Please add a comment explaining what the logic is for even inside a function or element if it need explanation or
  little complex
- When you found a bug, please fix it and notify me
- Instead of using `max-w-[260px]` in tailwind use `max-w-65` tailwind. So if 12px it will be max-w-3
- For JSX Section add a comment what section it is
- If the component or the logic is too complex or bloated please consider refactoring it into a separate component or custom hooks. It can be multiple hooks.
- If needs additional css when in tailwind can not achieve or too messy please use emotion react in css syntax `css={css`color: green;`}`
- The codebase must be in english and the app copywrite is in Bahasa Indonesia. The user will see in bahasa but as developer for variable, function and the codebase must be in english
- One Function must be one responsibility and one file. 
- One Component must be one responsibility and one file.
- Form and Validation is using zod and useForm @tanstack/react-form. So will use useForm and form.Field
- When using zustand, always use selector to get the state. e.g const count = useCounterStore((state) => state.count);
- Always using zustand for store and context passing

### Moduling / Project Structure
1. Backend Service use barrel export with naming for example `backend-service/auth/index.ts` and its have index.ts on `backend-service` so in consumer we can choose import directly from `backend-service/auth` or for more readable we can import from `backend-service`
2. **Client-Side Page** (`client-side-page/`) structure follows the route module hierarchy. For a module like `client-side-page/admin/user/admin`:
   - **Page root**: The main component must be named `Page{Module}.tsx` (e.g., `PageAdmin.tsx`) and live at the module root.
   - **Section folders**: Complex page sections or components that own child components are placed in a kebab-case folder named after the section (e.g., `item-list/`, `account-list/`). The primary component for that folder uses PascalCase matching the folder concept (e.g., `ItemList.tsx` inside `item-list/`).
   - **Nested child folders**: If a section component has specific children, create a further kebab-case subfolder (e.g., `item-card/` inside `item-list/`). Child files inside use short, descriptive PascalCase names scoped to that folder (e.g., `ManagerCard.tsx`, `RoleBadge.tsx`, `ItemActions.tsx`).
   - **Flat children**: Simple components that do not need children can be placed directly in the module root or section folder without an extra subfolder.
   - **No barrel exports**: Do not add `index.ts` files inside `client-side-page` folders; import directly from the source file.
   - **Colocation**: Keep page-specific hooks (`use{Feature}.ts`) and constants (`constants.ts`) inside the section folder they belong to.
3. **Feature-scoped utilities**: If a utility function, custom hook, or store is only consumed by one feature module, create a `utils/` folder inside that module and place it there (e.g., `client-side-page/app/home/utils/useSomething.ts`). Do not put single-use utilities in the global `hooks/` or `libs/` directories.
4. **Avoid duplicated utilities**: Before creating any new utility function, search the codebase (via graph tools or grep) to check if an equivalent already exists. If a pure helper such as `getUserInitials` is defined inside a component, refactor it into the nearest `utils/` folder and update all callers so the logic is not duplicated.
5. **Shared components**: When creating a shared / reusable component, place it under `components/atomic` and assign it to the correct atomic-design tier:
   - `atom/` — smallest, single-element building blocks (e.g., `Button`, `Input`, `Badge`).
   - `molecule/` — simple groups of atoms (e.g., `SearchInput`, `MenuDropdown`, `MobilePagination`).
   - `organism/` — complex sections composed of molecules/atoms (e.g., `AccountCardGridSkeleton`).
   - `layout/` — page-level shells, providers, or structural wrappers (e.g., `AdminAccountPageShell`).
   Pick the smallest tier that accurately describes the component.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
