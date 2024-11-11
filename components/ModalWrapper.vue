<template>
  <div class="fixed left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-gray-600/80 outline-none"
    tabindex="-1">
    <div class="pointer-events-none flex items-center flex-col relative">
      <div
        class="pointer-events-auto fixed top-1/4 flex w-11/12 max-w-md flex-col rounded-md border-none bg-white bg-clip-padding text-current outline-none">
        <div class="flex flex-shrink-0 bg-m-brown-100 items-center justify-between rounded-t-md px-4 py-2">
          <h3 class="text-lg uppercase font-bold">
            <slot name="title" />
          </h3>
          <button type="button"
            class="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            @click="closeModal">
            <span class="[&>svg]:h-6 [&>svg]:w-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>

        <!-- Modal body -->
        <div class="relative flex-auto p-4">
          <slot name="body" />
        </div>

        <!-- Modal footer -->
        <div
          class="grid col-span-2 grid-flow-col gap-8 rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>
