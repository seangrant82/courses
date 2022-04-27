import { UserCompletedCourse } from '../domain/events/UserCompletedCourse'
import { UserCompletedLesson } from '../domain/events/UserCompletedLesson'
import { UserEnrolled } from '../domain/events/UserEnrolled'
import { UserExecutedQuery } from '../domain/events/UserExecutedQuery'
import { UserLogin } from '../domain/events/UserLogin'
import { UI_EVENT_SANDBOX_TOGGLE, UI_EVENT_SUPPORT_TOGGLE, UserUiEvent } from '../domain/events/UserUiEvent'
import { UserUnenrolled } from '../domain/events/UserUnenrolled'
import { UserViewedCourse } from '../domain/events/UserViewedCourse'
import { UserViewedLesson } from '../domain/events/UserViewedLesson'
import { emitter } from '../events'
import { analyticsApiKey,
    ANALYTICS_EVENT_COMMAND_CYPHER,
    ANALYTICS_EVENT_COURSE_COMPLETION,
    ANALYTICS_EVENT_COURSE_ENROLL,
    ANALYTICS_EVENT_COURSE_UNENROLL,
    ANALYTICS_EVENT_COURSE_VIEW,
    ANALYTICS_EVENT_LESSON_COMPLETION,
    ANALYTICS_EVENT_LESSON_VIEW,
    ANALYTICS_EVENT_LOGIN,
    ANALYTICS_EVENT_TOGGLE_SANDBOX,
    ANALYTICS_EVENT_TOGGLE_SUPPORT,
    ANALYTICS_EVENT_SHOW_HINT,
    ANALYTICS_EVENT_SHOW_SOLUTION,
    trackEvent } from '../modules/analytics'

export default async function initAnalyticsListeners(): Promise<void> {
    if ( !analyticsApiKey() ) {
        return
    }

    emitter.on<UserLogin>(UserLogin, (event: UserLogin) => {
        trackEvent(ANALYTICS_EVENT_LOGIN, event.payload.sub!, {
            userId: event.payload.sub,
            email: event.payload.email,
        })
    })

    emitter.on<UserViewedCourse>(UserViewedCourse, event => {
        trackEvent(ANALYTICS_EVENT_COURSE_VIEW, event.user.sub, {
            courseSlug: event.course.slug,
            courseName: event.course.title,
            usecase: event.course.usecase,
            categories: event.course.categories.map(category => category.title),
        })
    })

    emitter.on<UserViewedLesson>(UserViewedLesson, event => {
        trackEvent(ANALYTICS_EVENT_LESSON_VIEW, event.user.sub, {
            courseSlug: event.course.slug,
            courseName: event.course.title,
            moduleSlug: event.module.slug,
            moduleName: event.module.title,
            lessonSlug: event.lesson.slug,
            lessoneName: event.lesson.title,
            usecase: event.course.usecase,
            categories: event.course.categories.map(category => category.title),
        })
    })

    emitter.on<UserEnrolled>(UserEnrolled, event => {
        trackEvent(ANALYTICS_EVENT_COURSE_ENROLL, event.user.sub, {
            courseSlug: event.course.slug,
            courseName: event.course.title,
            usecase: event.course.usecase,
            categories: event.course.categories.map(category => category.title),
        })
    })

    emitter.on<UserUnenrolled>(UserUnenrolled, event => {
        trackEvent(ANALYTICS_EVENT_COURSE_UNENROLL, event.user.sub, {
            courseSlug: event.course.slug,
            courseName: event.course.title,
            usecase: event.course.usecase,
            categories: event.course.categories.map(category => category.title),
        })
    })

    emitter.on<UserCompletedLesson>(UserCompletedLesson, event => {
            trackEvent(ANALYTICS_EVENT_LESSON_COMPLETION, event.user.sub, {
                courseSlug: event.course.slug,
                courseName: event.course.title,
                usecase: event.course.usecase,
                categories: event.course.categories.map(category => category.title),
                moduleSlug: event.module.slug,
                moduleName: event.module.title,
                lessonSlug: event.lesson.slug,
                lessonName: event.lesson.title,
            })
    })

    emitter.on<UserCompletedCourse>(UserCompletedCourse, event => {
        trackEvent(ANALYTICS_EVENT_COURSE_COMPLETION, event.user.sub, {
            courseSlug: event.course.slug,
            courseName: event.course.title,
            usecase: event.course.usecase,
            categories: event.course.categories.map(category => category.title),
        })
    })

    emitter.on<UserUiEvent>(UserUiEvent, event => {
        switch (event.type) {
            case UI_EVENT_SANDBOX_TOGGLE:
            case UI_EVENT_SUPPORT_TOGGLE:
            case UI_EVENT_SUPPORT_TOGGLE:
            case UI_EVENT_SUPPORT_TOGGLE:
                trackEvent(event.type, event.user.sub, event.meta)
        }
    })

    emitter.on<UserExecutedQuery>(UserExecutedQuery, event => {
        const {
            user,
            metaData,
            ...other
        } = event

        trackEvent(ANALYTICS_EVENT_COMMAND_CYPHER, event.user.sub, {
            ...metaData,
            ...other,
        })
    })
}
