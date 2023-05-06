const categoryName = 'layouts'

export const LayoutTemplate = [
  {
    id: '7-block',
    label: '7 blocks',
    content: `<section class="flex-container">
  <div class="flex-item"></div>
  <div class="flex-item"></div>
  <div class="flex-item"></div>
  <div class="flex-item"></div>
  <div class="flex-item"></div>
  <div class="flex-item"></div>
  <div class="flex-item"></div>
</section>
<style>
.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-item {
  flex-basis: calc(100% / 7);
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: 'my-custom-block-2',
    label: 'My Custom Block 2',
    content: '<div class="my-custom-block-2">Goodbye, world!</div>',
    category: categoryName,
    attributes: {
      class: 'my-custom-block-2'
    }
  }
]
