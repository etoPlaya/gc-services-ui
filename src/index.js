import * as components from './components';

const DSLibrary = {
  install(app) {
    // Auto import all components
    for (const componentKey in components) {
      app.use(components[componentKey]);
    }
  }
}

export default DSLibrary;

// export all components as vue plugin
export * from './components';