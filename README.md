# Insyde SCSS Styleguide
*For writing well structured stylesheets.*


## Table of Contents

  1. [SCSS](#scss)
    - [Syntax](#syntax)
    - [Rule Declaration](#rule-declaration)
    - [Selectors](#selectors)
        - [ID Selectors](#id-selectors)
    - [Properties](#properties)
    - [Formatting](#formatting)
    - [Variables](#variables)
    - [Comments](#comments)
  1. [OOCSS and BEM](#oocss-and-bem)
    - [JavaScript hooks](#javascript-hooks)
    - [Border](#border)
    - [Ordering](#ordering-of-property-declarations)
    - [Variables](#variables)
    - [Mixins](#mixins)
    - [Extend directive](#extend-directive)
    - [Nested selectors](#nested-selectors)

## SCSS

### Syntax

* Use the `.scss` syntax, never the original `.sass` syntax

## Rule declaration
A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

* Put blank lines between rule declarations
```scss
.listing {
	font-size: 18px;
	line-height: 1.2;
}

.item {
	font-size: 12px;
	line-height: inherit;
}
```

## Selectors
In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:
* Prefer dashes over camelCasing in class names.
  - Underscores and are okay if you are using BEM (see [OOCSS and BEM](#bem) below).
* Do not use ID selectors
* When using multiple selectors in a rule declaration, give each selector its own line.
* Avoid qualifying elements in selectors e.g. no ul.list but just .list.

```scss
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

### ID selectors
**DONT USE THEM!** You and only you will be held responsible for doing it anyway.

### Body classes
Use of body classes should be prevented if at all possible.
* When using a body class is inevitable, apply it like a modifier e.g.
```scss
.page--pagetype {
	/* ... */
}
```

## Properties
Properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

* In properties, put a space after, but not before, the `:` character.
* Don't use color names or hex values directly in rule declarations. Instead use variables ($primary-color) where possible.
* Don't write vendor prefixes, these will be auto added to the generated CSS by [Autoprefixer](https://github.com/postcss/autoprefixer).
* Remove trailing zeros for numeric values with a decimal point.
* Don't add spaces after commas in rgba values.

```scss
/* bad */ {
  	color : #333;
  	background : #f1f1f1;
  	border-top: 1px solid rgba(0, 0, 0, 0.5);
}

/* good */ {
	background: $body-bg;
	border-top: 1px solid rgba(0,0,0,0.5);
	color: $body-color;
}
```

## Formatting
* Use tabs for indentation.
* Put a space before the opening brace `{` in rule declarations.
* Put closing braces `}` of rule declarations on a new line.
* Don't use unnecessary indentation.


## Comments

* Prefer line comments (`//`) to block comments.
* Put comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting e.g. compatibility or browser-specific hacks.

## BEM

**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing OOCSS.  
Read more about BEM: [CSS Trick's BEM 101](https://css-tricks.com/bem-101/), [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

* Apply BEM to clearly distinguishable components (objects) e.g. don't do an entire pagefooter in one BEM instance.
* Make the the components as small as possible, so it is easy the re-use those blocks in the future.
* Each components gets its own file in /components, preceding the filename with an underscore: _component-name.scss
* Use only one level of bem depth (no .block__element__element--modifier).
* Nest BEM elements and modifiers.

```scss
/* _block.scss */
.block {
	@include mixin;
	color: $paragraph-color;
	
	&__element {
		/* ... */
	}
	
	&--modifier {
		/* ... */
	}
}
```

### ID selectors

Just DONT USE THEM! You and only you will be held responsible for doing it anyway.

### JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

Create JavaScript-specific classes to bind to, prefixed with `.js-` or use data-attributes when available:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

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


### Ordering of property declarations

1. Property declarations

    List all standard property declarations, anything that isn't an `@include` or a nested selector. Sort properties alphabetically.

    ```scss
    .button {
       background: $green;
       font-weight: bold;
       // ...
    }
    ```

2. `@include` declarations

    Grouping `@include`s at the end makes it easier to read the entire selector.

	```scss
       	.button {
       	   background: $green;
       	   font-weight: bold;
       	   @include transition(background 0.5s ease);
       	   // ...
       	}
       	```

3. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

	```scss
	.button {
		background: $green;
		font-weight: bold;
		@include transition(background 0.5s ease);
	
		.icon {
			margin-right: 10px;
		}
	}
	```

3. BEM selectors

   BEM selectors go after any `@include`'s and before nested selectors. Modifiers come first and elements come second. Seperate with a blank line.

	```scss
	.button {
		background: $green;
		font-weight: bold;
		@include transition(background 0.5s ease);

		&--expanded {
			width: 100%;
		}

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
* Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names.

```scss
/* bad */
$primaryColor: rgba(0,0,0,0.5);

/* good */
$primary-color: rgba(0,0,0,0.5);
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