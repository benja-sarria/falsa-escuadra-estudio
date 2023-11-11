import { FormStepperComponent } from "@/components/FormStepperComponent/FormStepperComponent";

export const FormStepperContainer = ({ steps }: { steps: string[] }) => {
    return <FormStepperComponent steps={steps} />;
};
