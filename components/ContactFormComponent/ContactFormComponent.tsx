import FormInputFieldMaskComponent from "../FormInputFieldMaskComponent/FormInputFieldMaskComponent";
import { FormStepperComponent } from "../FormStepperComponent/FormStepperComponent";
import styles from "@/components/ContactFormComponent/ContactFormComponent.module.scss";

const namespace = "contact-form-component";

export const ContactFormComponent = () => {
    return (
        <div className={styles[`${namespace}`]}>
            <FormStepperComponent />
            <FormInputFieldMaskComponent>
                <></>
            </FormInputFieldMaskComponent>
        </div>
    );
};
