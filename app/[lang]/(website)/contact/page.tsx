import styles from "@/app/[lang]/(website)/(home)/page.module.scss";
import { ContactPortraitComponent } from "@/components/ContactPortraitComponent/ContactPortraitComponent";
import FormInputFieldMaskComponent from "@/components/FormInputFieldMaskComponent/FormInputFieldMaskComponent";
import { FormStepperComponent } from "@/components/FormStepperComponent/FormStepperComponent";

export default function Projects() {
    return (
        <main
            className={`${styles["main-container"]} ${styles["main-contact-container"]}`}
        >
            <ContactPortraitComponent />
            <FormStepperComponent></FormStepperComponent>
            <FormInputFieldMaskComponent>
                <></>
            </FormInputFieldMaskComponent>
        </main>
    );
}
