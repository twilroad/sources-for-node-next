"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
class ConfigurationLoader {
    constructor() {
        this.pathForDatabaseConfigurationFile = path_1.join(process.cwd(), "configurations", "database.json");
        this.pathForGraphqlConfigurationFile = path_1.join(process.cwd(), "configurations", "graphql.json");
        this.pathForServerConfigurationFile = path_1.join(process.cwd(), "configurations", "server.json");
    }
    existsDatabaseConfiguration() {
        return fs_1.existsSync(this.pathForDatabaseConfigurationFile);
    }
    existsGraphqlConfiguration() {
        return fs_1.existsSync(this.pathForGraphqlConfigurationFile);
    }
    existsServerConfiguration() {
        return fs_1.existsSync(this.pathForServerConfigurationFile);
    }
    load(path) {
        return require(path);
    }
    loadDatabaseConfiguration() {
        return this.load(this.pathForDatabaseConfigurationFile);
    }
    loadGraphqlConfiguration() {
        return this.load(this.pathForGraphqlConfigurationFile);
    }
    loadServerConfiguration() {
        return this.load(this.pathForServerConfigurationFile);
    }
}
exports.ConfigurationLoader = ConfigurationLoader;
exports.Configuration = new ConfigurationLoader();