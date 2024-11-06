<template>
  <button type="button" class="inline-flex flex-col items-center justify-center px-5 bg-gray-800 group">
    <slot name="icon" />
    <span class="text-xs text-gray-100 uppercase font-bold"><slot name="text" /></span>
  </button>
</template>
