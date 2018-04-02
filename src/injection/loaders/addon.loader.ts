import { Addon as AddonInterface, Injection } from "../interfaces";
import { InjectionLoader } from "./injection.loader";
import { InjectionType } from "@notadd/core/constants";
import { SettingService } from "@notadd/setting/services";

export class AddonLoader extends InjectionLoader {
    protected cacheForAddons: Array<AddonInterface> = [];

    protected filePathForCache = `${process.cwd()}/storages/caches/addon.json`;

    public get addons(): Array<AddonInterface> {
        if (!this.cacheForAddons.length) {
            this.loadAddonsFromCache();
        }

        return this.cacheForAddons;
    }

    constructor() {
        super();
        this.loadAddonsFromCache();
    }

    public refreshAddons() {
        this.cacheForAddons.splice(0, this.cacheForAddons.length);
    }

    public async syncWithSetting(setting: SettingService) {
        if (!this.cacheForAddons.length) {
            this.loadAddonsFromCache();
        }
        for(let i = 0; i < this.cacheForAddons.length; i ++) {
            const addon = this.cacheForAddons[i];
            const identification = addon.identification;
            addon.enabled = await setting.get(`addon.${identification}.enabled`, false);
            addon.installed = await setting.get(`addon.${identification}.installed`, false);
            this.cacheForAddons.splice(i, 1, addon);
        }

        return this;
    }

    protected loadAddonsFromCache() {
        this.cacheForAddons.splice(0, this.cacheForAddons.length);
        this.cacheForAddons = this
            .injections
            .filter((injection: Injection) => {
                return InjectionType.Addon === Reflect.getMetadata("__injection_type__", injection.target);
            })
            .map((injection: Injection) => {
                return {
                    authors: Reflect.getMetadata("authors", injection.target),
                    description: Reflect.getMetadata("description", injection.target),
                    enabled: false,
                    identification: Reflect.getMetadata("identification", injection.target),
                    installed: false,
                    location: injection.location,
                    name: Reflect.getMetadata("name", injection.target),
                    version: Reflect.getMetadata("version", injection.target),
                };
            });
    }
}

export const Addon = new AddonLoader();
