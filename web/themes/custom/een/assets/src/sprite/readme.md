## How to add icon to the SVG sprite

```plain
Just move your image from svg folder here ('assets/src/sprite/').
File will be also compressed and copied to the svg folder in dist.
```

## How to use it icon in twig file

```html
<i class="icon">
    <svg class="icon--l" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <use xlink:href="#icon--play"/>
    </svg>
</i>
```

```plain
If you want another size of icon, you can change svg class "icon--l" to:

"icon--xs" (12x12)
"icon--s" (20x20)
"icon--m" (24x24)
"icon--l" (30x30)
"icon--xl" (48x48)
"icon--xxl" (64x64)

Or you can add your class in 'assets/src/sass/base/_sprite.scss'
```
