<script setup lang="ts">
/**
 * Screenshot slide: a short heading from the slot, then the image inside a
 * framed box that takes whatever height is left, with a mono caption under it.
 *
 *     ---
 *     layout: shot
 *     image: /06-done-matrix.png
 *     caption: Done · matriz de projetos · item do workspace, aberto no portal
 *     alt: Matriz de projetos do app Done dentro do portal do Fabric
 *     ---
 *
 *     # Uma linha de título
 */
withDefaults(
  defineProps<{
    image: string
    caption?: string
    alt?: string
  }>(),
  { caption: undefined, alt: undefined },
)
</script>

<template>
  <div class="slidev-layout shot">
    <div class="shot__head">
      <slot />
    </div>
    <figure class="shot__fig">
      <img :src="image" :alt="alt ?? caption ?? ''" />
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.shot {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 2.4rem;
  padding-bottom: 2.8rem;
}

.shot__head :deep(h1) {
  font-size: 1.4rem;
  margin: 0;
}

.shot__fig {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
}

/* The image takes the height that is left and derives its width from its own
   aspect ratio, so the frame hugs the picture whether the capture is a wide
   browser viewport (Done, 2.1:1) or a full 16:10 screen (Receita Saudável).
   `width: auto` + `align-self: flex-start` is what stops the flex container
   from stretching the box to the full column width. */
.shot__fig img {
  flex: 1;
  min-height: 0;
  width: auto;
  max-width: 100%;
  align-self: flex-start;
  object-fit: contain;
  object-position: top left;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  background: var(--surface);
}

.shot__fig figcaption {
  font: 400 0.7rem/1.4 var(--font-mono);
  letter-spacing: 0.02em;
  color: var(--fg-2);
}
</style>
