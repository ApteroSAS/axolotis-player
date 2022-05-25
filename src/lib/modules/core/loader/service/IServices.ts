import { IService } from "@root/lib";

export interface IServices {
  /**
   * This method will search the service named moduleName and return it. If the service is not found it will be asynchronously downloaded then returned.
   * This is the intended use for a service.
   * @param moduleName
   */
  getService<T extends IService>(moduleName: string): Promise<T>;

  /**
   * This method will search the service named moduleName and return it immediately. If the service is not found it throws an error.
   * @param moduleName
   */
  getServiceSync<T extends IService>(moduleName: string): T;

  /**
   * This method register/add a service to this services manager
   * @param moduleName
   * @param service
   */
  setService(moduleName: string, service: IService);
}
