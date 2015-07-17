import classNames from 'classnames'
import invariant from 'invariant'


export default function c(prefix) {
  return function decorator(component) {
    invariant(!component.prototype.cRoot, "@c must be applied to a class with no `cRoot` property")
    invariant(!component.prototype.c, "@c must be applied to a class with no `c` property")

    const componentName = component.prototype.displayName || component.name

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
