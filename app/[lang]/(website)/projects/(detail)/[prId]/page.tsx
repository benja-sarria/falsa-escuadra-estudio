import styles from "@/app/[lang]/(website)/projects/(detail)/[prId]/page.module.scss";
import { ProjectDetailComponent } from "@/components/ProjectDetailComponent/ProjectDetailComponent";
import { ProjectsPortraitComponent } from "@/components/ProjectsPortraitComponent/ProjectsPortraitComponent";
import { HomeProductCarouselContainer } from "@/containers/HomeProductCarouselContainer/HomeProductCarouselContainer";
import { ProjectPrismaDao } from "@/models/daos/project.dao";
import { ProjectServices } from "@/services/project.services";
import { useParams, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";

export default async function ProjectDetail({ params }: { params: any }) {
    // const params = useParams();
    console.log("PARAMS", params);
    if (params.prId) {
        const paramId: string = params.prId;
        const productServices = new ProjectServices(new ProjectPrismaDao());
        const project = await productServices.getProjectService({
            productSlug: paramId,
        });
        console.log("PRODUCT", project);
        if ((project.success && project.data.length < 1) || project.error) {
            notFound();
        }
        console.log("RETURNING-COMPONENT");

        return (
            <main className={styles["main-container"]}>
                <ProjectDetailComponent project={project.data[0]} />
                <HomeProductCarouselContainer />
            </main>
        );
    }
    return notFound();
}
