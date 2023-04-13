import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/muhammadzahidnoor/Desktop/Projects/NuxtJS/nuxt-pinia/node_modules/.pnpm/nuxt@3.4.0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}