import {
    ContactFormStageType,
    QueryCategoryInterface,
    QueryCategoryNameEnum,
    QueryCategoryTypeEnum,
    QueryComplementaryInfoType,
    QueryDimensionsInterface,
    QueryInterface,
    QueryMaterialsInterface,
    QueryMaterialsNameEnum,
    QueryMaterialsTypeEnum,
} from "@/types/contactFormTypes";
import {
    ProductReceivedType,
    ProductWithIncludeType,
} from "@/types/projectTypes";
import {
    parseFormData,
    validateFormData,
} from "@/utils/validations/validations";
import { Product } from "@prisma/client";
import {
    ActionCreatorWithPayload,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

type initialFormStateType = {
    value: QueryInterface;
};

export type FieldType = "text" | "select" | "upload" | "phone";

const initialFormErrors = {
    name: false,
    lastName: false,
    phone: false,
    category: false,
    height: false,
    width: false,
    depth: false,
    complementaryInfo: false,
    materials: false,
    city: false,
};

const initialFormStateValue: initialFormStateType = {
    value: {
        personalData: {
            name: "",
            lastName: "",
            phone: "",
            city: "",
        },
        query: {
            category: null,
            meassures: false,
            dimensions: {
                height: null,
                width: null,
                depth: null,
            },
            complementaryInfo: [],
            materials: [],
        },
        stage: 1,
        errors: initialFormErrors,
    },
};

type TextFieldPayload = {
    data: string | null;
    field: FieldNames;
};

export type ErrorObject = {
    [key in FieldNames]?: boolean;
} & { message?: string };

export const contactFormState = createSlice({
    name: "contactFormState",
    initialState: initialFormStateValue,
    reducers: {
        resetForm: () => {
            return initialFormStateValue;
        },

        setFormErrors: (state, action: { payload: ErrorObject; type: any }) => {
            state.value = {
                ...state.value,
                errors: { ...state.value.errors, ...action.payload },
            };
        },

        resetFormErrors: (state) => {
            state.value = {
                ...state.value,
                errors: initialFormErrors,
            };
        },

        setFullName: (state, action: { payload: TextFieldPayload }) => {
            if (action.payload.data) {
                const [name, ...rest] = action.payload.data.split(" ");
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    personalData: {
                        ...state.value.personalData,
                        name: name,
                        lastName: rest.toString().replaceAll(",", " ") ?? "",
                    },
                };

                state.value = parsedNewState;
            } else {
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    personalData: {
                        ...state.value.personalData,
                        name: null,
                        lastName: null,
                    },
                };

                state.value = parsedNewState;
            }
        },

        setCity: (state, action: { payload: TextFieldPayload }) => {
            const data = action.payload.data ?? null;

            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                personalData: {
                    ...state.value.personalData,
                    city: data,
                },
            };

            state.value = parsedNewState;
        },

        setPhone: (state, action: { payload: TextFieldPayload }) => {
            if (action.payload.data) {
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    personalData: {
                        ...state.value.personalData,
                        phone: action.payload.data,
                    },
                };
                state.value = parsedNewState;
            } else {
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    personalData: {
                        ...state.value.personalData,
                        phone: null,
                    },
                };
                state.value = parsedNewState;
            }
        },

        setCategory: (
            state,
            action: {
                payload: QueryCategoryInterface;
            }
        ) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    category: action.payload,
                },
            };
            state.value = parsedNewState;
        },

        setDimensions: (state, action: { payload: TextFieldPayload }) => {
            if (action.payload.data) {
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    query: {
                        ...state.value.query,
                        meassures: true,
                        dimensions: {
                            ...state.value.query.dimensions,
                            [action.payload.field]: action.payload.data,
                        },
                    },
                };

                state.value = parsedNewState;
            } else {
                const validation = {
                    depth:
                        action.payload.field === "depth"
                            ? action.payload.data
                            : state.value.query.dimensions.depth,
                    height:
                        action.payload.field === "height"
                            ? action.payload.data
                            : state.value.query.dimensions.height,
                    width:
                        action.payload.field === "width"
                            ? action.payload.data
                            : state.value.query.dimensions.width,
                };

                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    query: {
                        ...state.value.query,
                        meassures: Object.values(validation).every(
                            (value) => !value
                        )
                            ? false
                            : true,
                        dimensions: {
                            ...state.value.query.dimensions,
                            [action.payload.field]: null,
                        },
                    },
                };

                state.value = parsedNewState;
            }
        },

        addComplementaryInfo: (
            state,
            action: { payload: QueryComplementaryInfoType }
        ) => {
            const parsedComplementaryInfo = [
                ...state.value.query.complementaryInfo,
                action.payload,
            ];

            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    complementaryInfo: parsedComplementaryInfo,
                },
            };

            state.value = parsedNewState;
        },

        addMaterials: (
            state,
            action: { payload: QueryMaterialsInterface[] }
        ) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    materials: action.payload,
                },
            };

            state.value = parsedNewState;
        },

        advanceStage: (state) => {
            if (state.value.stage + 1 <= 7) {
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    stage: (state.value.stage + 1) as ContactFormStageType,
                };
                state.value = parsedNewState;
            }
        },

        rewindStage: (state) => {
            if (state.value.stage - 1 > 1) {
                const parsedNewState: initialFormStateType["value"] = {
                    ...state.value,
                    stage: (state.value.stage - 1) as ContactFormStageType,
                };
                state.value = parsedNewState;
            }
        },

        setStage: (state, action: PayloadAction<ContactFormStageType>) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                stage: action.payload,
            };
            state.value = parsedNewState;
        },
    },
});

export const {
    resetForm,
    setFullName,
    setPhone,
    setCity,
    setCategory,
    setDimensions,
    addComplementaryInfo,
    addMaterials,
    advanceStage,
    rewindStage,
    setStage,
    setFormErrors,
    resetFormErrors,
} = contactFormState.actions;
export default contactFormState.reducer;

export type StateOptions = string &
    QueryCategoryInterface &
    QueryDimensionsInterface &
    QueryComplementaryInfoType;

export type FieldNames =
    | "name"
    | "lastName"
    | "phone"
    | "city"
    | "category"
    | "height"
    | "width"
    | "depth"
    | "complementaryInfo"
    | "materials";

export type DimensionsType = "height" | "width" | "depth";

export type LabelNames =
    | "name"
    | "phone"
    | "city"
    | "category"
    | "dimensions"
    | "complementaryInfo"
    | "materials";

export type CategoryOptionsType = {
    [key in QueryCategoryTypeEnum]: QueryCategoryNameEnum[keyof QueryCategoryNameEnum];
};

export type MaterialsOptionsType = {
    [key in QueryMaterialsTypeEnum]: QueryMaterialsNameEnum[keyof QueryMaterialsNameEnum];
};

export interface CurrentFieldInterface {
    qty?: DimensionsType[];
    data: LabelNames;
    type: FieldType;
    placeholder?: string | { [key in DimensionsType]: string };
    options?: CategoryOptionsType | MaterialsOptionsType;
    validate?: FieldNames[];
}

export const stageFields: {
    [id in ContactFormStageType]: CurrentFieldInterface;
} = {
    1: {
        data: "name",
        type: "text",
        placeholder: "Escribe aqui...",
        validate: ["name", "lastName"],
    },
    2: {
        data: "phone",
        type: "phone",
        placeholder: "Escribe aqui...",
        validate: ["phone"],
    },
    3: {
        data: "city",
        type: "text",
        placeholder: "Por favor ingresa tu ciudad y dirección...",
        validate: ["city"],
    },
    4: {
        data: "category",
        type: "select",
        options: {
            furnitureDesign: "Diseño de mobiliario",
            interior: "Diseño de interiores",
            custom: "Produccion de mobiliario a medida",
        },
        validate: ["category"],
    },
    5: {
        data: "dimensions",
        qty: ["height", "width", "depth"],
        type: "text",
        placeholder: {
            height: "Escribe la altura de tu diseño...",
            width: "Escribe el ancho de tu diseño...",
            depth: "Escribe la profundidad de tu diseño...",
        },
        validate: ["height", "width", "depth"],
    },
    6: {
        data: "complementaryInfo",
        placeholder: "Adjunta un link a un archivo o carpeta de Google Drive",
        type: "upload",
    },
    7: {
        data: "materials",
        type: "select",
        options: {
            iron: "Hierro",
            solidWood: "Madera maciza",
            laminatedWood: "Madera laminada",
            melamina: "Melamina",
        },
        validate: ["materials"],
    },
};
