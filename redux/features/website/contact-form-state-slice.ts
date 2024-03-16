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

const initialFormStateValue: initialFormStateType = {
    value: {
        personalData: {
            name: "",
            lastName: "",
            phone: "",
        },
        query: {
            category: null,
            dimensions: {
                height: null,
                width: null,
                depth: null,
            },
            complementaryInfo: [],
            materials: [],
        },
        stage: 1,
    },
};

type TextFieldPayload = {
    data: string;
    field: FieldNames;
};

export const contactFormState = createSlice({
    name: "contactFormState",
    initialState: initialFormStateValue,
    reducers: {
        resetForm: () => {
            return initialFormStateValue;
        },

        setFullName: (state, action: { payload: TextFieldPayload }) => {
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
        },

        setPhone: (state, action: { payload: TextFieldPayload }) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                personalData: {
                    ...state.value.personalData,
                    phone: action.payload.data,
                },
            };
            state.value = parsedNewState;
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
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    dimensions: {
                        ...state.value.query.dimensions,
                        [action.payload.field]: action.payload.data,
                    },
                },
            };

            state.value = parsedNewState;
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
            if (state.value.stage + 1 <= 6) {
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
    setCategory,
    setDimensions,
    addComplementaryInfo,
    addMaterials,
    advanceStage,
    rewindStage,
    setStage,
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
    | "category"
    | "height"
    | "width"
    | "depth"
    | "complementary"
    | "materials";

export type DimensionsType = "height" | "width" | "depth";

export type LabelNames =
    | "name"
    | "phone"
    | "category"
    | "dimensions"
    | "complementary"
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
}

export const stageFields: {
    [id in ContactFormStageType]: CurrentFieldInterface;
} = {
    1: {
        data: "name",
        type: "text",
        placeholder: "Escribe aqui...",
    },
    2: { data: "phone", type: "phone", placeholder: "Escribe aqui..." },
    3: {
        data: "category",
        type: "select",
        options: {
            furnitureDesign: "Diseño de mobiliario",
            interior: "Diseño de interiores",
            custom: "Produccion de mobiliario a medida",
        },
    },
    4: {
        data: "dimensions",
        qty: ["height", "width", "depth"],
        type: "text",
        placeholder: {
            height: "Escribe la altura de tu diseño...",
            width: "Escribe el ancho de tu diseño...",
            depth: "Escribe la profundidad de tu diseño...",
        },
    },
    5: {
        data: "complementary",
        type: "upload",
    },
    6: {
        data: "materials",
        type: "select",
        options: {
            iron: "Hierro",
            solidWood: "Madera maciza",
            laminatedWood: "Madera laminada",
            melamina: "Melamina",
        },
    },
};
