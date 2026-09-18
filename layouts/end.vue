<template>
  <!--
    Replaces the built-in `end` layout, whose scoped styles (black ground,
    centred, letter-spaced) would outrank the deck's global CSS.
  -->
  <div class="slidev-layout end">
    <slot />
  </div>
</template>
