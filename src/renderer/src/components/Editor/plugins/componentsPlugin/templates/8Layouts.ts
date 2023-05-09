const categoryName = '8 layouts'

export const EightLayoutTemplate = [
  {
    id: '8-block',
    label: '8 block',
    content: `<section class="flex-container">
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
  <div class="flex-item-8-block"></div>
</section>
<style>
.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-item-8-block {
  flex-basis: calc(100% / 8);
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '6/2-block',
    label: '6/2 block',
    content: `<section class="flex-container">
    <div class="flex-item-86"></div>
    <div class="flex-item-82"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}

.flex-item-86 {
  flex-basis: 75%;
  height: 100px;
  margin: 3px;
}

.flex-item-82 {
  flex-basis: 25%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '5/3-block',
    label: '5/3 block',
    content: `<section class="flex-container">
    <div class="flex-item-85"></div>
    <div class="flex-item-83"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}

.flex-item-85 {
  flex-basis: 62%;
  height: 100px;
  margin: 3px;
}

.flex-item-83 {
  flex-basis: 38%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '4/4-block',
    label: '4/4 block',
    content: `<section class="flex-container">
    <div class="flex-item-84"></div>
    <div class="flex-item-84"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}
.flex-item-84 {
  flex-basis: 50%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '3/5-block',
    label: '3/5 block',
    content: `<section class="flex-container">
    <div class="flex-item-83"></div>
    <div class="flex-item-85"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}

.flex-item-83 {
  flex-basis: 38%;
  height: 100px;
  margin: 3px;
}

.flex-item-85 {
  flex-basis: 62%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '2/6-block',
    label: '2/6 block',
    content: `<section class="flex-container">
    <div class="flex-item-82"></div>
    <div class="flex-item-86"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}
.flex-item-86 {
  flex-basis: 75%;
  height: 100px;
  margin: 3px;
}

.flex-item-82 {
  flex-basis: 25%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: 'full8-block',
    label: 'full block',
    content: `<section class="flex-container">
    <div class="flex-item-8full"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}
.flex-item-8full {
  flex-basis: 100%;
  height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
]
