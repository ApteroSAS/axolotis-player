//TODO separate the concept of of webpack module and world component (see WebpackLoader)
//Add the concept of service that can lazy load - using everywhere with the same name and no parameters
// eg three and ammo are singleton service
// using tuple package + class name like webpack module
// idea add a system entity in the world that list all the services and maintains unicity?
// using or not the world API - World entity have a type but the name is set in the class - a little dirty since i do not want to hardcode the package in the class as a name.
//lazy load entity would be cool tho

export interface WebpackLazyModule {
  /* constructor(); should have a constructor */
}
