import {
    ContactFormStageType,
    QueryCategoryInterface,
    QueryComplementaryInfoType,
    QueryDimensionsInterface,
    QueryInterface,
    QueryMaterialsInterface,
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

export const contactFormState = createSlice({
    name: "contactFormState",
    initialState: initialFormStateValue,
    reducers: {
        resetForm: () => {
            return initialFormStateValue;
        },

        setName: (state, action: { payload: string }) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                personalData: {
                    ...state.value.personalData,
                    name: action.payload,
                },
            };

            state.value = parsedNewState;
        },
        setLastName: (state, action: { payload: string }) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                personalData: {
                    ...state.value.personalData,
                    lastName: action.payload,
                },
            };
            state.value = parsedNewState;
        },

        setPhone: (state, action: { payload: string }) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                personalData: {
                    ...state.value.personalData,
                    phone: action.payload,
                },
            };
            state.value = parsedNewState;
        },
        setCategory: (state, action: { payload: QueryCategoryInterface }) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    category: action.payload,
                },
            };
            state.value = parsedNewState;
        },

        setDimensions: (
            state,
            action: { payload: QueryDimensionsInterface }
        ) => {
            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    dimensions: action.payload,
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

        addMaterials: (state, action: { payload: QueryMaterialsInterface }) => {
            const parsedStateMaterials = state?.value?.query?.materials
                ? state?.value?.query?.materials
                : [];
            const parsedMaterials = [...parsedStateMaterials, action.payload];

            const parsedNewState: initialFormStateType["value"] = {
                ...state.value,
                query: {
                    ...state.value.query,
                    materials: parsedMaterials,
                },
            };

            state.value = parsedNewState;
        },

        advanceStage: (state) => {
            if (state.value.stage + 1 < 6) {
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
    setName,
    setLastName,
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

export const stageFields: {
    [id in ContactFormStageType]: {
        qty: FieldNames[];
        type: FieldType;
    };
} = {
    1: {
        qty: ["name", "lastName"],
        type: "text",
    },
    2: { qty: ["phone"], type: "phone" },
    3: {
        qty: ["category"],
        type: "select",
    },
    4: {
        qty: ["height", "width", "depth"],
        type: "text",
    },
    5: {
        qty: ["complementary"],
        type: "upload",
    },
    6: { qty: ["materials"], type: "select" },
};
