import { post } from "./http"

// src/domain/events/UserUiEvent.ts
type UiEventType = 'sandbox-toggle' | 'support-toggle' | 'show-hint' | 'show-solution'

export function logUiEvent(type: UiEventType, data: Record<string, any> = {}) {
    post(`/account/event/${type}`, {
        courseName: window.analytics.course.title, courseSlug: window.analytics.course.slug,
        moduleName: window.analytics.module?.title, moduleSlug: window.analytics.module?.slug,
        lessonName: window.analytics.lesson?.title, lessonSlug: window.analytics.lesson?.slug,
        pageName: document.title,
        ...data,
    })
}
