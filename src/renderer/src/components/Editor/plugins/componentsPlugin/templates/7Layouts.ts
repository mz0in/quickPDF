const categoryName = '7 layouts'

export const SevenLayoutTemplate = [
  {
    id: '7-block',
    label: '7 block',
    content: `<section class="flex-container">
  <div class="flex-item-7-block"></div>
  <div class="flex-item-7-block"></div>
  <div class="flex-item-7-block"></div>
  <div class="flex-item-7-block"></div>
  <div class="flex-item-7-block"></div>
  <div class="flex-item-7-block"></div>
  <div class="flex-item-7-block"></div>
</section>
<style>
.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-item-7-block {
  flex-basis: calc(100% / 7);
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '5/2-block',
    label: '5/2 block',
    content: `<section class="flex-container">
    <div class="flex-item-75"></div>
    <div class="flex-item-72"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
 /*  flex-direction: column; */
}

.flex-item-75 {
  flex-basis: 71%;
  height: 100px;
  margin: 3px;
}

.flex-item-72 {
  flex-basis: 29%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '4/3-block',
    label: '4/3 block',
    content: `<section class="flex-container">
    <div class="flex-item-74"></div>
    <div class="flex-item-73"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}

.flex-item-74 {
  flex-basis: 58%;
  height: 100px;
  margin: 3px;
}

.flex-item-73 {
  flex-basis: 42%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '3/4-block',
    label: '3/4 block',
    content: `<section class="flex-container">
    <div class="flex-item-73"></div>
    <div class="flex-item-74"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}

.flex-item-73 {
  flex-basis: 42%;
  height: 100px;
  margin: 3px;
}

.flex-item-74 {
  flex-basis: 58%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: '2/5-block',
    label: '2/5 block',
    content: `<section class="flex-container">
    <div class="flex-item-72"></div>
    <div class="flex-item-75"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}

.flex-item-72 {
  flex-basis: 29%;
  height: 100px;
  margin: 3px;
}

.flex-item-75 {
  flex-basis: 71%;
  min-height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
  {
    id: 'full-block',
    label: 'full block',
    content: `<section class="flex-container">
    <div class="flex-item-full"></div>
  </section>
  
<style>
.flex-container {
  display: flex;
  width: 100%;
}
.flex-item-full {
  flex-basis: 100%;
  height: 100px;
  margin: 3px;
}
</style>
`,
    category: categoryName
  },
]