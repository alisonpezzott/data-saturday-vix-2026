<script setup lang="ts">
/**
 * Deck footer: event on the left, author and slide counter on the right.
 * Lives in global-top (above the slides) because every layout paints an
 * opaque ground — a global-bottom layer would be hidden behind it.
 * Hidden on the cover, the closing slide and the organisers' full-bleed
 * artwork, where it would only be noise.
 */
</script>

<template>
  <footer
    v-if="!['cover', 'end', 'bleed'].includes($nav.currentLayout ?? '')"
    class="deck-footer"
    aria-hidden="true"
  >
    <span>Data &amp; AI Saturday · Vitória · 19 set 2026</span>
    <span>alisonpezzott · {{ $nav.currentPage }} / {{ $nav.total }}</span>
  </footer>
</template>

<style scoped>
.deck-footer {
  position: absolute;
  left: var(--pad-x, 3.5rem);
  right: var(--pad-x, 3.5rem);
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  font: 500 0.66rem/1 var(--font-mono, monospace);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-2, #a1a1aa); /* 7.7:1 on the ground */
  pointer-events: none;
}
</style>
