import classNames from 'classnames'
import invariant from 'invariant'


export default function prefixedClasses(prefix) {
  return function decorator(component) {
    invariant(!component.prototype.classes, "@prefixedClasses must be applied to a class with no `classes` property")
    invariant(!component.prototype.c, "@prefixedClasses must be applied to a class with no `c` property")

    const componentName = component.name

    component.prototype.classes = function classes(classNames, ...overrideClassNames) {
      return [
        `${prefix}-${componentName}`,
        this.c(classNames),
        this.props.className || "",
        this.c(overrideClassNames),
      ].join(' ')
    }

    component.prototype.c = function c(...args) {
      return (
        classNames(...args)
          .split(/\s+/)
          .filter(name => name !== "")
          .map(name => `${prefix}-${componentName}-${name}`)
          .join(' ')
      )
    }
  }
}
