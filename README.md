# Deprecated in favor of [Insyde SCSS Styleguide](https://github.com/Insydebv/scss-styleguide/)

# CSS / SCSS Styleguide
*For writing well structured stylesheets.*  

Loosely based on the [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)

## Table of Contents

  1. [CSS](#css)
    - [Rule declaration](#rule-declaration)
    - [Selectors](#selectors)
        - [ID selectors](#id-selectors)
        - [Body classes](#body-classes)
    - [Properties](#properties)
    - [Formatting](#formatting)
  	- [Border](#border)
    - [Comments](#comments)
    - [OOCSS and BEM](#oocss-and-bem)
  1. [SCSS](#scss)
	- [General](#general)
	- [Vendor prefixes](#vendor-prefixes)
    - [Ordering](#ordering-of-property-declarations)
    - [Variables](#variables)
    - [If/else](#ifelse)
    - [Mixins](#mixins)
    - [Extend directive](#extend-directive)
    - [Nested selectors](#nested-selectors)
  1. [JavaScript hooks](#javascript-hooks)

## CSS

### Rule declaration
A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties.

* Put blank lines between rule declarations.
* Single line declarations are allowed and don't need blank lines between them.
```css
.listing {
	font-size: 18px;
	line-height: 1.2;
}

.item {
	font-size: 12px;
	line-height: inherit;
}

/* this is allowed */
.icon-chevron-up:before { content: '\e030'; }
.icon-chevron-down:before { content: '\e031'; }
```

### Selectors
In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. 
Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:
* Prefer dashes over camelCasing in class names. Underscores are okay when using BEM (see [BEM](#bem) below).
* Do not use ID selectors
* When using multiple selectors in a rule declaration, give each selector its own line.
* Avoid qualifying elements in selectors e.g. no `ul.list` but just `.list`.

```css
/* bad */
.my-element-class, .another-element, .dontCamelCase {
	/* ... */
}

/* good */
[aria-hidden],
.hidden-element {
	/* ... */
}
```

#### ID selectors
Again **DON'T USE ID SELECTORS!** You and only you will be held responsible for doing it anyway.

#### Body classes
Use of body classes should be prevented if at all possible. When using a body class is inevitable, apply it like a modifier e.g.
```css
.page--pagetype {
	/* ... */
}
```

### Properties
Properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

* In properties, put a space after, but not before, the `:` character.
* Never use color names e.g. yellow. These are for children, so use 6 number hex values instead.
* Remove trailing zeros for numeric values with a decimal point.
* Add spaces after commas.
* Values should be written in lowercase.
* Properties should be sorted alphabetically.

```css
/* bad */ {
  	color : #333;
  	border-top: 1px solid rgba(0,0,0,0.50);
  	background : #f1f;
  	border-radius: 50%;
}

/* good */ {
	background: #f1f1f1;
	border-radius: 50%;
	border-top: 1px solid rgba(0, 0, 0, 0.5);
	color: #333333;
}
```

### Formatting
* Use tabs for indentation.
* Use spaces for aligning properties in block lists.
* Put a space before the opening brace `{` in rule declarations.
* Put closing braces `}` of rule declarations on a new line.
* Don't use unnecessary indentation.
* Use single stringquotes e.g. `content: 'hello';`. These are easier to type (no shift required).

### Border

Use `0` instead of `none` to specify that a style has no border.

**Bad**

```css
.foo {
	border: none;
}
```

**Good**

```css
.foo {
	border: 0;
}
```

### Comments

* Prefer line comments (`//`) to block comments.
* Put comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting e.g. compatibility or browser-specific hacks.

### OOCSS and BEM

We encourage some combination of OOCSS and BEM for these reasons:

  * It helps create clear, strict relationships between CSS and HTML
  * It helps us create reusable, composable components
  * It allows for less nesting and lower specificity
  * It helps in building scalable stylesheets

**OOCSS**, or “Object Oriented CSS”, is an approach for writing CSS that encourages you to think about your stylesheets as a collection of “objects”: reusable, repeatable snippets that can be used independently throughout a website.
To learn more about OOCSS read [OOCSS wiki](https://github.com/stubbornella/oocss/wiki) and [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/).

**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing OOCSS.
To learn more about BEM read: [BEM 101](https://css-tricks.com/bem-101/) and [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).  
  
* Apply BEM to clearly distinguishable components (objects) e.g. don't do an entire pagefooter in one BEM instance. You can make separate components of linklists etc.
* Make the the components as small as possible, so it is easy the re-use those blocks in the future.
* Use only one level of BEM depth (no .block__element__element--modifier).

```css
/* block.css */
.block { }
.block--modifier { }
.block__title { }
.block__content { }
```

## SCSS

### General

* Use the `.scss` syntax, never the original `.sass` syntax
* Put blank lines between rule declarations, mixins and functions.
* Each Components (BEM or otherwise) gets its own file in /components, preceding the file name with an underscore: _component-name.scss

### Vendor prefixes

Don't write vendor prefixes, these will be auto added to the generated CSS by [Autoprefixer](https://github.com/postcss/autoprefixer).

```scss
/* bad */ {
  	border-radius: 50%;
  	-moz-border-radius: 50%;
  	-webkit-border-radius: 50%;
}

/* good */ {
	border-radius: 50%;
}
```

### Ordering of property declarations

1. Property declarations

    List all standard property declarations, anything that isn't an `@include` or a nested selector. Sort properties following alphabetically. 

    ```scss
    .button {
       background: $green;
       font-weight: bold;
       // ...
    }
    ```

2. `@include` declarations

    Grouping `@include`s at the beginning makes it easier to read the entire selector. Overwriting stuff in the include is also easier.

	```scss
       	.button {
       	   @include transition(background 0.5s ease);
       	   background: $green;
       	   font-weight: bold;
       	   // ...
       	}
    ```

3. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Don't add blank lines between blocks. Apply the same guidelines as above to your nested selectors.

	```scss
	.button {
		@include transition(background 0.5s ease);
		background: $green;
		font-weight: bold;
		.icon {
			margin-right: 10px;
		}
	}
	```

3. BEM selectors

   Nest BEM elements and modifiers. BEM selectors go after any declarations and before nested selectors. Modifiers come first and elements come second. Separate with a blank line. Writing modifier blocks is ok. 
	```scss
	.button {
		@include transition(background 0.5s ease);
		background: $green;
		font-weight: bold;
		&--expanded {
			width: 100%;
		}
		&--small  { width: 25%; }
    	&--medium { width: 50%; }
    	&--large  { width: 75%; }
		&__element {
			float: right;
		}
		.icon {
			margin-right: 10px;
		}
	}
	```
	
### Variables
Global variables should be declared in **_settings.scss**. BEM variables should be declared at the start of the BEM component and their names should resemble that of the component.
* Don't use hex values directly in rule declarations. Instead use variables like `$primary-color` where possible.
* Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names.

```scss
/* bad */
$primaryColor: rgba(0,0,0,0.5);

/* good */
$primary-color: rgba(0, 0, 0, 0.5);
```

### If/else
If and else should be placed on their own lines.
```scss
@if {
	...
}
@else {
	...
}
```

### Mixins

Mixins should be used to DRY up your code, add clarity, or abstract complexity--in much the same way as well-named functions. Mixins that accept no arguments can be useful for this, but note that if you are not compressing your payload (e.g. gzip), this may contribute to unnecessary code duplication in the resulting styles.
* Mixin names should be written in hyphenated lowercase.
* Global mixins should be placed in _mixins.scss. Component-only usage mixins should be in their respective component files.

### Extend directive

`@extend` should be avoided because it has unintuitive and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later (e.g. if they are in other files and the order the files are loaded shifts). Gzipping should handle most of the savings you would have gained by using `@extend`, and you can DRY up your stylesheets nicely with mixins.

### Nested selectors
**Do not nest selectors more than three levels deep!**

```scss
.page-container {
	.content {
		.profile {
			// STOP!
		}
	}
}
```
When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) *—OR—*
* Overly specific (powerful) *—OR—*
* Not reusable

Again: **never nest ID selectors!**

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well formed HTML and CSS, you should **never** need to do this.


## JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

Create JavaScript-specific classes to bind to, prefixed with `.js-` or use data-attributes when available:

```html
<button class="button button--cta large js-request-to-book">Request to Book</button>
```
