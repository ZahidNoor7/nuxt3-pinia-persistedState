// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends Plugin<infer T> ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../node_modules/.pnpm/@pinia+nuxt@0.4.8/node_modules/@pinia/nuxt/dist/runtime/plugin.vue3").default> &
  InjectionType<typeof import("../components.plugin").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.4.0/node_modules/nuxt/dist/head/runtime/plugins/unhead").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.4.0/node_modules/nuxt/dist/app/plugins/router").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.4.0/node_modules/nuxt/dist/app/plugins/chunk-reload.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@pinia-plugin-persistedstate+nuxt@1.1.1_amz4aixu24t7iq73gx72poy44y/node_modules/@pinia-plugin-persistedstate/nuxt/dist/runtime/plugin").default>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}
// TODO: remove when webstorm has support for augumenting 'vue' directly
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
