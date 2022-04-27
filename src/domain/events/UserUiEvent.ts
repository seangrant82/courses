import { User } from "../model/user";

export const UI_EVENT_SANDBOX_TOGGLE = 'sandbox-toggle'
export const UI_EVENT_SUPPORT_TOGGLE = 'support-toggle'
export const UI_EVENT_SHOW_HINT = 'show-hint'
export const UI_EVENT_SHOW_SOLUTION = 'show-solution'

export type UiEventType = typeof UI_EVENT_SANDBOX_TOGGLE
    | typeof UI_EVENT_SUPPORT_TOGGLE
    | typeof UI_EVENT_SHOW_HINT
    | typeof UI_EVENT_SHOW_SOLUTION

export const UI_EVENTS: UiEventType[] = [
    UI_EVENT_SANDBOX_TOGGLE,
    UI_EVENT_SUPPORT_TOGGLE,
    UI_EVENT_SHOW_HINT,
    UI_EVENT_SHOW_SOLUTION
]

export class UserUiEvent {
    constructor(
        public readonly user: User,
        public readonly type: UiEventType,
        public readonly meta: Record<string, any>
    ) {}
}
