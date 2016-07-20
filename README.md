# Insyde SCSS Styleguide
*For writing well structured stylesheets.*  

Loosely based on the [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)

## Table of Contents

  1. [In general](#in-general)
    - [Syntax](#syntax)
    - [Rule declaration](#rule-declaration)
    - [Selectors](#selectors)
        - [ID selectors](#id-selectors)
        - [Body classes](#body-classes)
    - [Properties](#properties)
    - [Formatting](#formatting)
    - [Variables](#variables)
    - [Comments](#comments)
  1. [BEM](#bem)
  1. [JavaScript hooks](#javascript-hooks)
  1. [Border](#border)
  1. [Ordering](#ordering-of-property-declarations)
  1. [Variables](#variables)
  1. [Mixins](#mixins)
  1. [If/else](#if/else)
  1. [Extend directive](#extend-directive)
  1. [Nested selectors](#nested-selectors)

## In general

### Syntax

* Use the `.scss` syntax, never the original `.sass` syntax

### Rule declaration
A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

* Put blank lines between rule declarations, mixins and functions. Single line declarations are allowed and don't new blank lines between them.
```scss
.listing {
	font-size: 18px;
	line-height: 1.2;
}

.item {
	font-size: 12px;
	line-height: inherit;
}

/* this is allowed */
.icon-chevron-up    { &:before { content: "\e030"; } }
.icon-chevron-down  { &:before { content: "\e031"; } }
```

### Selectors
In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. 
Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:
* Prefer dashes over camelCasing in class names. Underscores are okay when using BEM (see [BEM](#bem) below).
* Do not use ID selectors
* When using multiple selectors in a rule declaration, give each selector its own line.
* Avoid qualifying elements in selectors e.g. no `ul.list` but just `.list`.

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

#### ID selectors
Again **DON'T USE ID SELECTORS!** You and only you will be held responsible for doing it anyway.

#### Body classes
Use of body classes should be prevented if at all possible. When using a body class is inevitable, apply it like a modifier e.g.
```scss
.page--pagetype {
	/* ... */
}
```

## Properties
Properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

* In properties, put a space after, but not before, the `:` character.
* Never use color names e.g. yellow. These are for children, so use 6 number hex values instead.
* Don't use hex values directly in rule declarations. Instead use variables ($primary-color) where possible.
* Don't write vendor prefixes, these will be auto added to the generated CSS by [Autoprefixer](https://github.com/postcss/autoprefixer).
* Remove trailing zeros for numeric values with a decimal point.
* Don't add spaces after commas in rgba values.
* Values should be written in lowercase.

```scss
/* bad */ {
  	color : #333;
  	border-top: 1px solid rgba(0, 0, 0, 0.50);
  	background : #f1f;
  	border-radius: 50%;
  	-moz-border-radius: 50%;
  	-webkit-border-radius: 50%;
}

/* good */ {
	// _settings.scss
	$body-color: #333333;
	$body-bg: #f1f1f1;
	// end _settings.scss
	
	background: $body-bg;
	border-radius: 50%;
	color: $body-color;
	border-top: 1px solid rgba(0,0,0,0.5);
}
```

## Formatting
* Use tabs for indentation.
* Use spaces for aligning properties in block lists.
* Put a space before the opening brace `{` in rule declarations.
* Put closing braces `}` of rule declarations on a new line.
* Don't use unnecessary indentation.


## Comments

* Prefer line comments (`//`) to block comments.
* Put comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting e.g. compatibility or browser-specific hacks.

# BEM

**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing OOCSS.  
Read more about BEM: [CSS Trick's BEM 101](https://css-tricks.com/bem-101/), [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

* Apply BEM to clearly distinguishable components (objects) e.g. don't do an entire pagefooter in one BEM instance. You can make seperate components of linklists etc.
* Make the the components as small as possible, so it is easy the re-use those blocks in the future.
* Each components gets its own file in /components, preceding the filename with an underscore: _component-name.scss
* Use only one level of bem depth (no .block__element__element--modifier).
* Nest BEM elements and modifiers.

```scss
/* _block.scss */
.block {
	/* ... */
	
	&__element {
		/* ... */
	}
	
	&--modifier {
		/* ... */
	}
}
```

# JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

Create JavaScript-specific classes to bind to, prefixed with `.js-` or use data-attributes when available:

```html
<button class="button button--cta large js-request-to-book">Request to Book</button>
```

# Border

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


# Ordering of property declarations

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

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

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

   BEM selectors go after any declarations and before nested selectors. Modifiers come first and elements come second. Seperate with a blank line. Writing modifier blocks is ok.

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
	
# Variables
Global variables should be declared in **_settings.scss**. BEM variables should be declared at the start of the BEM component and their names should resemble that of the component.
* Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names.

```scss
/* bad */
$primaryColor: rgba(0,0,0,0.5);

/* good */
$primary-color: rgba(0,0,0,0.5);
```

# If/else
If and else should be placed on their own lines.
```scss
@if {
	...
}
@else {
	...
}
```

# Mixins

Mixins should be used to DRY up your code, add clarity, or abstract complexity--in much the same way as well-named functions. Mixins that accept no arguments can be useful for this, but note that if you are not compressing your payload (e.g. gzip), this may contribute to unnecessary code duplication in the resulting styles.
* Mixin names should be written in hyphenated lowercase.
* Global mixins should be placed in _mixins.scss. Component-only usage mixins should be in their respective component files.

# Extend directive

`@extend` should be avoided because it has unintuitive and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later (e.g. if they are in other files and the order the files are loaded shifts). Gzipping should handle most of the savings you would have gained by using `@extend`, and you can DRY up your stylesheets nicely with mixins.

# Nested selectors
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