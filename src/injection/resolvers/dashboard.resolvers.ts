import { Dashboard } from "../types/dashboard.type";
import { DashboardService } from "../services/dashboard.service";
import { Query, Resolver } from "@nestjs/graphql";

@Resolver("Dashboard")
export class DashboardResolvers {
    constructor(private readonly dashboardService: DashboardService) {
    }

    /**
     * @param context
     * @param args
     *
     * @returns { Dashboard | undefined }
     */
    @Query()
    public getDashboard(context, args: { name: string }): Dashboard | undefined {
        return this.dashboardService.getDashboard(args.name);
    }

    /**
     * @returns { Array<Dashboard> }
     */
    @Query()
    public getDashboards(): Array<Dashboard> {
        return this.dashboardService.getDashboards();
    }
}