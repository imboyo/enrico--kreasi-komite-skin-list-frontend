# Graph Report - enrico--kreasi-komite-skin-list-frontend  (2026-05-10)

## Corpus Check
- 408 files · ~65,399 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1551 nodes · 2564 edges · 123 communities (100 shown, 23 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 146 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `88d7aedf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 99|Community 99]]

## God Nodes (most connected - your core abstractions)
1. `simulateMockRequest()` - 53 edges
2. `cn()` - 42 edges
3. `parseOrThrow()` - 41 edges
4. `fetcher()` - 41 edges
5. `Button` - 31 edges
6. `MockControlInput` - 25 edges
7. `APP_URL` - 22 edges
8. `useAuthStore` - 20 edges
9. `TextInput` - 16 edges
10. `FormFieldError()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `SkinCareAdminCard()` --calls--> `cn()`  [INFERRED]
  components/atomic/organism/SkinCareAdminCard.tsx → libs/util/cn.ts
- `Dialog()` --calls--> `cn()`  [INFERRED]
  components/atomic/molecule/Dialog.tsx → libs/util/cn.ts
- `ListToolbar()` --calls--> `cn()`  [INFERRED]
  components/atomic/molecule/ListToolbar.tsx → libs/util/cn.ts
- `ProgressBar()` --calls--> `cn()`  [INFERRED]
  components/atomic/molecule/ProfileGlassCard.tsx → libs/util/cn.ts
- `MobileContainer()` --calls--> `cn()`  [INFERRED]
  components/atomic/atom/MobileContainer.tsx → libs/util/cn.ts

## Communities (123 total, 23 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (53): AdminSidebar(), LogoutSection(), NAV_ITEMS, AdminTopbar(), AdminLayoutProps, AppSidebar(), LogoutSection(), NAV_ITEMS (+45 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (37): AdminManagerAccountsPage(), metadata, getSkinCareCategorySummary(), CategorySummaryItem, CategorySummaryTotals, GetSkinCareCategorySummaryResponse, Fallback(), FallbackProps (+29 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (50): AccountListMeta, AccountListPayload, AccountListResponse, AccountPasswordPayload, AccountPasswordResponse, AccountRecord, AccountRole, AccountStatus (+42 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (36): Checkbox, CheckboxProps, Colors(), HomeChecklistItem, HomeChecklistResponse, HomeChecklistSection(), HomeChecklistSectionProps, MakeUps() (+28 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (24): FEATURES, HIGHLIGHTS, PageAbout(), TEAM_MEMBERS, ContactChannelsSection(), ContactHeroSection(), SupportNotesSection(), contactChannels (+16 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (30): deleteAccount(), initiateEmailChange(), verifyEmailChange(), updateAccountInfo(), initiatePhoneNumberChange(), verifyPhoneNumberChange(), uploadPhotoProfile(), getProfile() (+22 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (23): Badge(), badgeActionVariants, badgeLabelVariants, BadgeProps, badgeVariants, DashboardShortcutsSection(), PageEditProfile(), MOCK_DERMAL_METRICS (+15 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (23): AccountEditPassword(), PasswordField(), AccountEditPasswordFormApi, AccountEditPasswordFormValues, accountEditPasswordSchema, useAccountEditPasswordForm(), validateAccountEditPasswordField(), AddAdminDialog() (+15 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (21): geistMono, metadata, viewport, Props, iconMap, Toast(), ToastItem, ToastProps (+13 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (33): 1. List Skin Treat, 2. Create Skin Treat, 3. Update Skin Treat, 4. Delete Skin Treat, Allowed Filter Fields, Allowed Sort Fields, code:json (POST /user/skin-treat/list), code:json ({) (+25 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (23): AddSkinTreatSheet(), AddSkinTreatSheetProps, addSkinTreatSchema, AddSkinTreatValues, useAddSkinTreatForm(), UseAddSkinTreatFormParams, validateAddSkinTreatField(), FloatingAddButton() (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (31): 1. List User Accounts, 2. Get User Account Detail, 3. Update User Account, 4. Change User Password, 5. Delete User Account, 6. User Creation Note, Admin Account User API Documentation, Allowed Sort / Filter Fields (+23 more)

### Community 12 - "Community 12"
Cohesion: 0.1
Nodes (26): getUserBarriers(), GetUserBarriersControlInput, GetUserBarriersResponse, UserBarrierFallbackMode, UserSkinCareBarrierItem, getUserColors(), GetUserColorsControlInput, GetUserColorsResponse (+18 more)

### Community 13 - "Community 13"
Cohesion: 0.16
Nodes (21): BooleanRef, MessagesQueryData, MessagesRef, ScrollContainerRef, SetBoolean, SetMessages, SetNullableString, ShowToast (+13 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (21): AccountEditPhoneNumber(), OtpField(), Props, OtpStep(), Props, PhoneStep(), Props, SuccessIndicator() (+13 more)

### Community 15 - "Community 15"
Cohesion: 0.07
Nodes (29): 1. List Admin Accounts, 2. Get Admin Detail, 3. Create Admin Account, 4. Update Admin Account, 5. Change Admin Password, 6. Delete Admin Account, Admin Account Admin API Documentation, Allowed Relations (+21 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (16): ProfileAvatarLink(), ProfileAvatarLinkProps, AvatarEditTrigger(), AvatarEditTriggerProps, AvatarMedia(), AvatarMediaProps, EditableAvatar(), EditableAvatarProps (+8 more)

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (23): addAdminAccount(), loginChain(), loginVerify(), register(), registerVerify(), AddAdminAccountPayload, AddAdminAccountResponse, ForgotPasswordChainPayload (+15 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (24): getAdminSkinChatThreadMessages(), listAdminSkinChatThread(), replyAdminSkinChatThread(), AdminSkinChatAccountRole, AdminSkinChatAccountStatus, AdminSkinChatFilterDto, AdminSkinChatFilterItem, AdminSkinChatFilterOperator (+16 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (18): FormFieldError(), Props, RegisterFormApi, RegisterFormValues, registerSchema, useRegisterForm(), validateRegisterField(), useRegisterMutation() (+10 more)

### Community 20 - "Community 20"
Cohesion: 0.1
Nodes (20): addAdminSkinCare(), deleteAdminSkinCare(), editAdminSkinCare(), listAdminSkinCare(), AddAdminSkinCarePayload, AddAdminSkinCareResponse, AdminSkinCare, AdminSkinCareCategory (+12 more)

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (24): 1. List Skin Goals, 2. Add Skin Goal, 3. Update Skin Goal, 4. Delete Skin Goal, Allowed Filter Fields, Allowed Sort Fields, code:json (POST /user/skin-goal/list), code:json ({) (+16 more)

### Community 22 - "Community 22"
Cohesion: 0.13
Nodes (17): InvalidRegisterOtpError, REGISTERED_WHATSAPP_NUMBERS, registerOtpApi, requestRegisterOtp(), RequestRegisterOtpPayload, verifyRegisterOtp(), VerifyRegisterOtpPayload, register() (+9 more)

### Community 23 - "Community 23"
Cohesion: 0.16
Nodes (16): DashboardItemEditFormApi, dashboardItemEditSchema, DashboardItemEditValues, useDashboardItemEditForm(), UseDashboardItemEditFormParams, validateDashboardItemField(), ItemDialog(), ItemDialogEditForm() (+8 more)

### Community 24 - "Community 24"
Cohesion: 0.11
Nodes (15): PageAskAi(), Button, ButtonProps, buttonVariants, iconSlotVariants, ConfirmationDialog(), LogoutConfirmDialog(), LogoutConfirmDialogProps (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.12
Nodes (15): Direction, useMultiStepForm(), UseMultiStepFormOptions, REGISTER_FLOW_STEPS, useRegisterFlow(), LoginAvatar(), PageRegister(), RegisterFormStep() (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (17): createSkinTreat(), deleteSkinTreat(), CreateSkinTreatPayload, CreateSkinTreatResponse, DeleteSkinTreatResponse, ListSkinTreatPayload, ListSkinTreatResponse, SkinTreat (+9 more)

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (22): 1. Get Messages, 2. Send Message, 3. Clean Messages, code:json (POST /user/skin-chat/messages), code:json ({), code:json (POST /user/skin-chat/messages), code:json (POST /user/skin-chat/messages), code:json ({) (+14 more)

### Community 28 - "Community 28"
Cohesion: 0.14
Nodes (14): OtpInput, ForgotPasswordFlowState, ForgotPasswordOtpStep(), Props, ForgotPasswordFlowState, ForgotPasswordResetStep(), Props, ForgotPasswordSuccessStep() (+6 more)

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (13): LoginFormApi, LoginFormValues, loginSchema, validateLoginField(), LoginFormStep(), LoginFormStepProps, LoginHeading(), LoginPasswordField() (+5 more)

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (16): dashboardItemDeleteSchema, DashboardItemNotFoundError, deleteDashboardItem(), DeleteDashboardItemPayload, DeleteDashboardItemResponse, DashboardItemCategory, deleteDashboardItemFromStore(), updateDashboardItemInStore() (+8 more)

### Community 31 - "Community 31"
Cohesion: 0.12
Nodes (15): ChatThreadPreviewLink(), ChatThreadPreviewLinkProps, GeneralContainer(), GeneralContainerProps, dropdownContentIn, dropdownContentOut, MenuDropdown(), MenuDropdownItem() (+7 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (14): addSkinGoal(), AddSkinGoalApiResponse, deleteSkinGoal(), listSkinGoal(), AddSkinGoalPayload, AddSkinGoalResponse, DeleteSkinGoalResponse, ListSkinGoalPayload (+6 more)

### Community 33 - "Community 33"
Cohesion: 0.16
Nodes (10): ADMIN_CHATS, AdminChatConversation, getAdminChats(), GetAdminChatsResponse, ConversationList(), ConversationListProps, ConversationListItem(), ConversationListItemProps (+2 more)

### Community 34 - "Community 34"
Cohesion: 0.21
Nodes (13): ItemDialogHeader(), ItemDialogHeaderProps, ConfirmationDialogProps, Dialog(), DialogBody(), DialogDescription(), DialogFooter(), DialogHeader() (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.16
Nodes (12): cleanMessages(), getMessages(), normalizeGetMessagesResponse(), RawGetMessagesResponse, sendMessage(), CleanMessagesResponse, GetMessagesPayload, GetMessagesResponse (+4 more)

### Community 36 - "Community 36"
Cohesion: 0.17
Nodes (10): PasswordFieldProps, SharedPasswordFieldFormApi, StringFieldName, OtpInputProps, PasswordToggleButton(), TextInput, TextInputProps, textInputSlotVariants (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.19
Nodes (8): ChatInput(), ChatInputProps, CHAT_SUPPORT_POINTS, PageChat(), RightSection(), RightSectionProps, ChatTopbar(), ChatTopbarProps

### Community 38 - "Community 38"
Cohesion: 0.18
Nodes (10): getUserScars(), GetUserScarsControlInput, GetUserScarsResponse, UserScarFallbackMode, UserSkinCareScarItem, GetScarsControlInput, GetScarsResponse, ScarFallbackMode (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.18
Nodes (10): getUserMakeUps(), GetUserMakeUpsControlInput, GetUserMakeUpsResponse, UserMakeUpFallbackMode, UserSkinCareMakeUpItem, GetMakeUpsControlInput, GetMakeUpsResponse, MAKE_UPS (+2 more)

### Community 40 - "Community 40"
Cohesion: 0.2
Nodes (9): addSkinGoal(), AddSkinGoalPayload, AddSkinGoalResponse, MockServerDownError, normalizeBoolean(), NormalizedMockControl, normalizeMockControl(), normalizeNumber() (+1 more)

### Community 41 - "Community 41"
Cohesion: 0.18
Nodes (10): getUserRoutines(), GetUserRoutinesControlInput, GetUserRoutinesResponse, UserRoutineFallbackMode, UserSkinCareRoutineItem, GetRoutinesControlInput, GetRoutinesResponse, RoutineFallbackMode (+2 more)

### Community 42 - "Community 42"
Cohesion: 0.2
Nodes (8): Popover(), Props, ForgotPasswordFlowState, ForgotPasswordWhatsappStep(), Props, Props, WhatsappFieldSlim, WhatsappNumberField()

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (9): updateName(), UpdateNamePayload, UpdateNameResponse, ADMIN_USERS, AdminUser, AdminUserStatus, getAdminUsers(), GetAdminUsersResponse (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (8): EmailAlreadyInUseError, InvalidOtpError, requestEmailOtp(), RequestEmailOtpPayload, TAKEN_EMAILS, UpdateEmailResponse, verifyEmailOtp(), VerifyEmailOtpPayload

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (6): EditAdminDialog(), EditAdminDialogProps, EditAdminFormErrors, editAdminFormSchema, EditAdminFormValues, useEditAdminForm()

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (6): cardVariants, floatTransition, pageVariants, MobileContainer(), MobileContainerProps, ambientOrbs

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (10): 1. Stream File, 2. Download File, Error Responses, File API Documentation, Response `200 OK`, Response `200 OK`, Response Headers, Response Headers (+2 more)

### Community 48 - "Community 48"
Cohesion: 0.24
Nodes (8): STATUS_LABEL, StatusBadge(), StatusBadgeProps, statusBadgeVariants, statusLabelVariants, USER_STATUS_CLASS_NAME, USER_STATUS_LABEL, USER_STATUS_LABEL_CLASS_NAME

### Community 50 - "Community 50"
Cohesion: 0.36
Nodes (4): appendIncomingMessages(), ChatBubbleProps, mapDescendingPageToRenderOrder(), ChatMessage

### Community 51 - "Community 51"
Cohesion: 0.33
Nodes (6): AccountEditName(), AccountEditNameFormApi, AccountEditNameFormValues, accountEditNameSchema, useAccountEditNameForm(), validateAccountEditNameField()

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (6): InvalidCredentialsError, LoginControlInput, LoginPayload, LoginResponse, LoginUser, MOCK_USER

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (6): ADMIN_MANAGERS, AdminManager, AdminManagerRole, AdminManagerStatus, getAdminManagers(), GetAdminManagersResponse

### Community 55 - "Community 55"
Cohesion: 0.29
Nodes (4): ItemList(), ADMIN_ACCOUNT_QUERY_KEY, ADMIN_SORT_REQUEST_MAP, useAdminAccountList()

### Community 56 - "Community 56"
Cohesion: 0.29
Nodes (5): ADMIN_SORT_OPTIONS, ADMIN_STATUS_FILTER_OPTIONS, AdminListToolbarProps, AdminSortValue, AdminStatusFilterValue

### Community 57 - "Community 57"
Cohesion: 0.33
Nodes (4): downloadFile(), streamFile(), fetcher(), silentRefresh()

### Community 58 - "Community 58"
Cohesion: 0.4
Nodes (5): AdminSupportConversation, getAdminSupportReplySummary(), GetAdminSupportReplySummaryResponse, getLatestSupportConversations(), SUPPORT_CONVERSATIONS

### Community 59 - "Community 59"
Cohesion: 0.33
Nodes (4): CustomerListToolbarProps, USER_SORT_OPTIONS, USER_STATUS_FILTER_OPTIONS, UserSortValue

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (3): AdminChatThread(), AdminChatThreadProps, useChatConversation()

### Community 61 - "Community 61"
Cohesion: 0.47
Nodes (4): buildHttpErrorMessage(), ErrorBody, getErrorMessage(), HttpError

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (5): 1. Skin Care Category Summary, Admin Analytic API Documentation, Cache Behavior, code:json ({), Response `200 OK`

### Community 63 - "Community 63"
Cohesion: 0.4
Nodes (4): APP_SHELL_ROUTES, networkPromise, responseClone, url

### Community 64 - "Community 64"
Cohesion: 0.5
Nodes (4): AdminSkinTabNavigation(), getActiveTabId(), SKINS_TABS, SkinsTabId

### Community 66 - "Community 66"
Cohesion: 0.4
Nodes (3): PageAdminChat(), useVisibleConversations(), UseVisibleConversationsParams

### Community 67 - "Community 67"
Cohesion: 0.4
Nodes (4): Codebase, graphify, Moduling / Project Structure, This is NOT the Next.js you know

### Community 68 - "Community 68"
Cohesion: 0.4
Nodes (4): Codebase, graphify, Moduling / Project Structure, This is NOT the Next.js you know

### Community 69 - "Community 69"
Cohesion: 0.4
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 71 - "Community 71"
Cohesion: 0.5
Nodes (3): SkinCareAdminCard(), SkinCareCardItem, SkinCareItemCardProps

## Knowledge Gaps
- **475 isolated node(s):** `nextConfig`, `LOCAL_STORAGE_KEY`, `eslintConfig`, `config`, `RequestRegisterOtpPayload` (+470 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `parseOrThrow()` connect `Community 5` to `Community 32`, `Community 1`, `Community 2`, `Community 35`, `Community 10`, `Community 17`, `Community 18`, `Community 20`, `Community 26`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 31` to `Community 0`, `Community 1`, `Community 34`, `Community 3`, `Community 4`, `Community 6`, `Community 71`, `Community 8`, `Community 46`, `Community 16`, `Community 48`, `Community 80`, `Community 23`, `Community 24`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `Button` connect `Community 24` to `Community 0`, `Community 1`, `Community 34`, `Community 37`, `Community 6`, `Community 7`, `Community 42`, `Community 10`, `Community 14`, `Community 49`, `Community 19`, `Community 51`, `Community 23`, `Community 25`, `Community 28`, `Community 29`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 39 inferred relationships involving `cn()` (e.g. with `SkinTotalCard()` and `ItemCard()`) actually correct?**
  _`cn()` has 39 INFERRED edges - model-reasoned connections that need verification._
- **Are the 40 inferred relationships involving `parseOrThrow()` (e.g. with `addAdminAccount()` and `loginChain()`) actually correct?**
  _`parseOrThrow()` has 40 INFERRED edges - model-reasoned connections that need verification._
- **Are the 39 inferred relationships involving `fetcher()` (e.g. with `downloadFile()` and `streamFile()`) actually correct?**
  _`fetcher()` has 39 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `LOCAL_STORAGE_KEY`, `eslintConfig` to the rest of the system?**
  _475 weakly-connected nodes found - possible documentation gaps or missing edges._