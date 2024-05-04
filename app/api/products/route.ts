import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";
import { NextResponse } from "next/server";

export async function GET() {
    const productServices = new ProjectServices(new ProjectPrismaDao());
    const products = await productServices.getProjectService(undefined);

    return NextResponse.json({ ...products });
}
