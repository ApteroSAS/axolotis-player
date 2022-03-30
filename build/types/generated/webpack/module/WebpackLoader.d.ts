export declare function loadModules(): {
    [id: string]: () => Promise<{
        module: any;
        classname: string;
    }>;
};
