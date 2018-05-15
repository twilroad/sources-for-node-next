import "reflect-metadata";
import { INJECTION_TYPE } from "../constants";
import { InjectionType } from "@notadd/core/constants/injection.constants";
import { ModuleMetadata } from "../metadatas/module.metadata";

export function Module(metadata: ModuleMetadata): ClassDecorator {
    metadata.modules = metadata.imports && !metadata.modules ? metadata.imports : metadata.modules;

    return (target: any) => {
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, metadata[property], target);
            }
        }
        Reflect.defineMetadata(INJECTION_TYPE, InjectionType.Module, target);
    };
}
