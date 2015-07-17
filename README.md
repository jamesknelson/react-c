# react-c

**react-c** provides structure to your component's CSS. It does this by providing two methods to help you write properly-scoped CSS classes, an ES7 decorator to specify your project prefix, and guidelines for writing clean CSS with LESS/SCSS.

With react-c, writing clean CSS is *so simple* that you no longer have any excuse to *not* do it.

## Example

The best way to understand react-c is to see it in use, so let's have a look at how it is used in a slightly simplified copy of [numbat-ui](https://github.com/jamesknelson/numbat-ui)'s Paper component:

```
import React from "react"
import c from "react-c"

@c("nui")
class Paper extends React.Component {
  static propTypes = {
    rounded: React.PropTypes.bool,
  }

  static defaultProps = {
    rounded: true,
  }

  render() {
    return (
      <div className={this.cRoot({rounded: this.props.rounded})}>
        <div className={this.c('inner')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
```

Rendering a `Paper` component with default properties will produce the following:

```
<div class="nui-Paper nui-Paper-rounded">
  <div class="nui-Paper-inner">
    ...
  </div>
</div>
```

This output in turn is styled using LESS or SCSS, using the `&-` selector to prevent Carpal Tunnel Syndrome:

```
.nui-Paper {
  //...

  &-rounded {
    //...
  }

  &-inner {
    //...
  }

  &-rounded &-inner {
    //...
  }
}
```

## Usage

### 1. Install with NPM:

```
npm install react-c --save
```

### 2. Import the module:

```
import c from 'react-c' // ES6
```

*or*

```
var c = require('react-c') // CommonJS
```

### 3. Add react-c to your component:

You have two options to do this. If you're building modules by inheriting from React.Component, I recommend using ES7 decorators:

```
@c("projectname")
class MyComponent extends React.Component {
  ...
}
```

Otherwise, just apply pass your components to the `c(prefix)` manually:

```
var MyComponent = React.createClass({
  ...
})

c("projectname")(MyComponent)
```

### 4. Add classes to your components using `c` and `cRoot`

- `c(...)`

  *Example output:* `'projectname-MyComponent-a projectname-MyComponent-b'`

  Generates a `className` string using the [classnames](https://github.com/JedWatson/classnames) module, but with all classes prefixed with the component's name and specified prefix.

- `cRoot(initial, final)`
  
  *Example output:* `'projectname-MyComponent projectname-MyComponent-initial this-prop-className projectname-MyComponent-final'`

  Returns the component name, followed by the result of passing `initial` and `final` parameters are through `c(...)`, with the value of `this.props.className` (if any) sandwiched between.

  Given browsers give the later classes higher priority, this makes it possible give your classes higher or lower priority than those added from `this.props.className`.

  This function is generally used on the root component in your `render()` function, thus the name. You probably shouldn't use it more than once.

#### How `c` and `cRoot` know what your class is called

react-c uses `component.prototype.displayName || component.name` to decide what your component is called. This can break down in the following cases:

- You're using React.createClass, but not using JSX. This is because `component.prototype.displayName` is [set by the JSX compiler](https://facebook.github.io/react/docs/jsx-in-depth.html#the-transform). Set `displayName` manually in this case.
- You're applying the ES7 decorator *after* another decorator which modifies `component.name`. This can happen if it returns a `class` which extends the original, for example.

### 5. Write your LESS/SASS with `&-`

TODO: explain the `&-` selector in LESS/SASS

## FAQ

### Is react-c BEM compliant?

No.

doesn't distinguish between modifiers and elements

### Why should I use react-c over BEM-based modules like react-bem?

Simplicity.

## Related Projects

**react-c** is part of [react-base](https://github.com/jamesknelson/react-base) - a collection of Higher-Order Components to *make your life easier*. was extracted from `numbat-ui`.

**react-base** (and react-c) were extracted from [numbat-ui](https://github.com/jamesknelson/numbat-ui) - a collection of UI components for React based on Google's Material Design.
