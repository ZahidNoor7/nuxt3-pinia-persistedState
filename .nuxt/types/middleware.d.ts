import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/muhammadzahidnoor/Desktop/Projects/NuxtJS/nuxt-pinia/node_modules/.pnpm/nuxt@3.4.0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}