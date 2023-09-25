"use client";

import { ProductsSectionContainer } from "@/containers/ProductsSectionContainer/ProductsSectionContainer";
import { useAppSelector } from "@/redux/store";

export const AdminMainContentComponent = () => {
    const section = useAppSelector((state) => state.activeSection.value);
    return section === "products" ? (
        <ProductsSectionContainer />
    ) : (
        /*    <FormStepperContainer
            steps={[
                "Select campaign settings",
                "Create an ad group",
                "Create an ad",
            ]}
        /> */
        <></>
    );
};
