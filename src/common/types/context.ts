import { Context as MoleculerContext } from "moleculer";

// Define a custom Context type with userId in the meta
interface CustomContext<P = any> extends MoleculerContext<P> {
  meta: {
    userId: string;
    token?: string;
    headers?: Record<string, string>; 
  };
}

export default CustomContext;
