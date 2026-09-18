<script setup lang="ts">
/**
 * Full-bleed slide: one image edge to edge, no padding, no heading, no footer.
 *
 * For finished artwork that already carries its own layout and typography —
 * the organisers' event cover, a sponsor board — where anything the deck adds
 * on top is damage. Deliberately not `shot`, which frames and captions a
 * screenshot taken *by* the deck.
 *
 *     ---
 *     layout: bleed
 *     image: /00-org-sponsors.png
 *     alt: Patrocinadores oficiais do Data & AI Saturday Vitória 2026
 *     ---
 *
 * `contain`, not `cover`: letterboxing against the ground is cheap, cropping a
 * sponsor's logo is not. Named `bleed` rather than `full` so it does not shadow
 * the built-in `full` layout. `global-top.vue` hides the deck footer here.
 */
withDefaults(
  defineProps<{
    image: string
    alt?: string
  }>(),
  { alt: undefined },
)
</script>

<template>
  <div class="slidev-layout bleed">
    <img :src="image" :alt="alt ?? ''" />
  </div>
</template>

<style scoped>
.bleed {
  padding: 0;
  display: flex;
}

.bleed img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
