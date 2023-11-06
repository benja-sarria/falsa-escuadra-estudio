"use client";
import styles from "@/components/ProductDetailComponent/ProductDetailComponent.module.scss";
import {
    deleteProductPhoto,
    updateProductPhoto,
    updateProductSubmit,
} from "@/app/actions";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import {
    UpdatedPhotosInterface,
    resetOpenedProduct,
    setOpenedProduct,
} from "@/redux/features/admin-opened-product-slice";
import { resetAdminDetailOpened } from "@/redux/features/admin-detail-open";
import { StandardAPIError } from "@/utils/api/standarizedErrors";
import { StandardSuccessResponse } from "@/utils/api/standarizedSuccessResponse";
import { ProductTypes } from "@prisma/client";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { autoFigureItOutMeasureLimit } from "@/utils/img/proportions";
import StarRateIcon from "@mui/icons-material/StarRate";
import { AdminPhotoStripeComponent } from "../AdminPhotoStripeComponent/AdminPhotoStripeComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ReusableActionButtonComponent } from "../ReusableActionButtonComponent/ReusableActionButtonComponent";
import { AvailableProductActionsType } from "@/types/projectTypes";
import { toBase64, toBuffer } from "@/utils/img/base64";
import { usePathname } from "next/navigation";

export const ProductDetailComponent = ({
    productTypes,
}: {
    productTypes: StandardSuccessResponse | undefined;
}) => {
    const openedDetail = useAppSelector(
        (state) => state.openedProductValue.value
    );
    const dispatch = useDispatch<AppDispatch>();
    const [activeId, setActiveId] = useState<string | undefined>(undefined);
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const pathname = usePathname();
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    useEffect(() => {
        console.log("[OPENED]", openedDetail);
    }, [openedDetail]);

    useEffect(() => {
        if (openedDetail && openedDetail.original) {
            setActiveId(`${openedDetail?.original.photos[0].id}`);
        }
    }, []);

    return (
        <div className={styles["product-detail-container"]}>
            <div className={styles["product-detail-left-column"]}>
                <div className={styles["product-left-column-top"]}>
                    <div className={styles["product-main-swiper-container"]}>
                        <Swiper
                            onActiveIndexChange={(swiper) => {
                                console.log(
                                    swiper.slides[swiper.activeIndex].dataset[
                                        "photoId"
                                    ]
                                );
                                setActiveId(
                                    swiper.slides[swiper.activeIndex].dataset[
                                        "photoId"
                                    ]
                                );
                            }}
                            loop={true}
                            spaceBetween={0}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className={styles["portrait-swiper"]}
                        >
                            {openedDetail?.toUpdate &&
                            openedDetail?.toUpdate.photos ? (
                                openedDetail?.toUpdate.photos.map((photo) => {
                                    return (
                                        <SwiperSlide
                                            key={`${photo.id}`}
                                            data-photo-id={photo.id}
                                            onClick={
                                                !photo.src
                                                    ? () => {
                                                          const inputPhoto =
                                                              document.querySelector(
                                                                  `#image-${photo.id}`
                                                              ) as HTMLElement;
                                                          console.log(
                                                              "[INPUT-PHOTO]",
                                                              inputPhoto
                                                          );

                                                          if (inputPhoto) {
                                                              inputPhoto.click();
                                                          }
                                                      }
                                                    : () => {}
                                            }
                                        >
                                            <div
                                                className={`${
                                                    styles[
                                                        "portrait-swiper-slider"
                                                    ]
                                                }${
                                                    !photo.src
                                                        ? ` ${styles["clickable-swipe"]}`
                                                        : ""
                                                }`}
                                            >
                                                <AutoAdjustImgComponent
                                                    alt="project photo"
                                                    givenClassName={
                                                        styles[
                                                            "project-portrait-photo"
                                                        ]
                                                    }
                                                    src={`${
                                                        photo.isUpdated &&
                                                        photo.file
                                                            ? `${photo.file.prefix}${photo.file.data}`
                                                            : photo.src
                                                            ? photo.src
                                                            : "/static/placeholder.webp"
                                                    }`}
                                                    customCallback={(
                                                        imgNode: HTMLImageElement
                                                    ) => {
                                                        autoFigureItOutMeasureLimit(
                                                            imgNode,
                                                            "--portrait-min-width",
                                                            "--portrait-max-height",
                                                            true
                                                        );
                                                    }}
                                                />{" "}
                                                <div
                                                    className={
                                                        styles[
                                                            "project-portrait-sign-container"
                                                        ]
                                                    }
                                                >
                                                    {photo.isUpdated && (
                                                        <ReusableActionButtonComponent
                                                            action={
                                                                "edit-img" as AvailableProductActionsType
                                                            }
                                                            invertOrder
                                                            execute={(
                                                                evt: SyntheticEvent
                                                            ) => {
                                                                evt.stopPropagation();
                                                                evt.preventDefault();

                                                                const formData =
                                                                    new FormData();
                                                                formData.append(
                                                                    "photoSlug",
                                                                    `${photo.id}`
                                                                );

                                                                const affectedPhoto =
                                                                    openedDetail.toUpdate?.photos?.find(
                                                                        (
                                                                            searchedPhoto
                                                                        ) => {
                                                                            return (
                                                                                searchedPhoto.id ===
                                                                                photo.id
                                                                            );
                                                                        }
                                                                    ) as UpdatedPhotosInterface;

                                                                if (
                                                                    affectedPhoto
                                                                ) {
                                                                    formData.append(
                                                                        "postSlug",
                                                                        `${openedDetail.toUpdate?.productSlug}`
                                                                    );
                                                                    formData.append(
                                                                        "newImage",
                                                                        JSON.stringify(
                                                                            affectedPhoto.file
                                                                        )
                                                                    );
                                                                    formData.append(
                                                                        "validatePath",
                                                                        `${pathname}`
                                                                    );
                                                                    updateProductPhoto(
                                                                        formData
                                                                    );
                                                                }
                                                            }}
                                                            icon={
                                                                <SaveIcon
                                                                    sx={{
                                                                        fontSize:
                                                                            "2rem",
                                                                        width: "2rem",
                                                                        filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.52))",
                                                                    }}
                                                                />
                                                            }
                                                            text={
                                                                siteTexts.messages
                                                                    ? siteTexts
                                                                          .messages
                                                                          .adminTexts
                                                                          .editProductLayout
                                                                          .saveUpdatedImg
                                                                          .text
                                                                    : ""
                                                            }
                                                            styleVariants={[
                                                                "light-variant",
                                                                "shadowed-content",
                                                            ]}
                                                        />
                                                    )}
                                                    {photo.isPortrait && (
                                                        <div
                                                            className={
                                                                styles[
                                                                    "project-portrait-sign"
                                                                ]
                                                            }
                                                        >
                                                            {siteTexts.messages
                                                                ? siteTexts
                                                                      .messages
                                                                      .adminTexts
                                                                      .editProductLayout
                                                                      .isPortraitSign
                                                                      .text
                                                                : ""}
                                                            <StarRateIcon
                                                                sx={{
                                                                    fontSize:
                                                                        "1rem",
                                                                    position:
                                                                        "relative",
                                                                    bottom: ".1rem",
                                                                    filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.52))",
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    name={`image-${photo.id}`}
                                                    aria-label="image"
                                                    type="file"
                                                    accept="/image"
                                                    className={
                                                        styles[
                                                            "file-input-element"
                                                        ]
                                                    }
                                                    id={`image-${photo.id}`}
                                                    onChange={async (
                                                        evt: SyntheticEvent
                                                    ) => {
                                                        console.log(
                                                            "[VALUE]",
                                                            evt
                                                        );
                                                        const files = (
                                                            evt.target as HTMLInputElement
                                                        ).files;
                                                        if (
                                                            files &&
                                                            files?.length > 0 &&
                                                            openedDetail
                                                                ?.toUpdate
                                                                ?.photos
                                                        ) {
                                                            const affectedPhoto =
                                                                openedDetail.toUpdate?.photos?.find(
                                                                    (
                                                                        searchedPhoto
                                                                    ) => {
                                                                        return (
                                                                            searchedPhoto.id ===
                                                                            photo.id
                                                                        );
                                                                    }
                                                                ) as UpdatedPhotosInterface;

                                                            const indexOfAltered =
                                                                openedDetail.toUpdate?.photos?.indexOf(
                                                                    affectedPhoto
                                                                ) as number;
                                                            const parsedSrc =
                                                                (await toBuffer(
                                                                    files.item(
                                                                        0
                                                                    ) as File
                                                                )) as any;

                                                            console.log(
                                                                "STREAM",
                                                                parsedSrc
                                                            );
                                                            const updatedPhoto =
                                                                {
                                                                    ...affectedPhoto,
                                                                    file: parsedSrc,
                                                                    isUpdated:
                                                                        true,
                                                                };
                                                            const updatedArray =
                                                                [
                                                                    ...openedDetail
                                                                        .toUpdate
                                                                        .photos,
                                                                ];
                                                            updatedArray.splice(
                                                                indexOfAltered,
                                                                1,
                                                                updatedPhoto
                                                            );

                                                            dispatch(
                                                                setOpenedProduct(
                                                                    {
                                                                        update: {
                                                                            ...openedDetail?.toUpdate,
                                                                            photos: [
                                                                                ...updatedArray,
                                                                            ],
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </Swiper>
                        <div className={styles["project-manage-actions"]}>
                            {siteTexts.messages &&
                                siteTexts.messages.adminTexts.editProductLayout
                                    .photoEditButtons &&
                                Object.keys(
                                    siteTexts.messages.adminTexts
                                        .editProductLayout.photoEditButtons
                                ).length > 0 &&
                                Object.keys(
                                    siteTexts.messages.adminTexts
                                        .editProductLayout.photoEditButtons
                                ).map((actionKey: string) => {
                                    return (
                                        <ReusableActionButtonComponent
                                            key={actionKey}
                                            action={
                                                "edit-img" as AvailableProductActionsType
                                            }
                                            invertOrder
                                            execute={(() => {
                                                const actions = {
                                                    change: () => {
                                                        const inputPhoto =
                                                            document.querySelector(
                                                                `#image-${activeId}`
                                                            ) as HTMLElement;
                                                        console.log(
                                                            "[INPUT-PHOTO]",
                                                            inputPhoto
                                                        );

                                                        if (inputPhoto) {
                                                            inputPhoto.click();
                                                        }
                                                    },
                                                    remove: () => {
                                                        console.log(
                                                            "[EXECUTING]"
                                                        );

                                                        const formData =
                                                            new FormData();
                                                        formData.append(
                                                            "photoSlug",
                                                            `${activeId}`
                                                        );
                                                        deleteProductPhoto(
                                                            formData
                                                        );
                                                    },
                                                };
                                                return actions[
                                                    actionKey as keyof typeof actions
                                                ];
                                            })()}
                                            icon={(() => {
                                                const icons = {
                                                    change: (
                                                        <ImageIcon
                                                            sx={{
                                                                fontSize:
                                                                    "1rem",

                                                                filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.52))",
                                                            }}
                                                        />
                                                    ),
                                                    remove: (
                                                        <DeleteIcon
                                                            sx={{
                                                                fontSize:
                                                                    "1rem",

                                                                filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.52))",
                                                            }}
                                                        />
                                                    ),
                                                };
                                                return icons[
                                                    actionKey as keyof typeof icons
                                                ];
                                            })()}
                                            text={
                                                siteTexts.messages
                                                    ? siteTexts.messages
                                                          .adminTexts
                                                          .editProductLayout
                                                          .photoEditButtons[
                                                          actionKey
                                                      ].text
                                                    : ""
                                            }
                                            styleVariants={["light-variant"]}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <Swiper
                        onSwiper={(swiper) => {
                            setThumbsSwiper(swiper);
                        }}
                        spaceBetween={0}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className={styles["thumbnails-swiper"]}
                    >
                        {openedDetail?.toUpdate &&
                        openedDetail?.toUpdate.photos ? (
                            openedDetail?.toUpdate.photos.map((photo) => {
                                return (
                                    <SwiperSlide key={`${photo.id}`}>
                                        <div
                                            className={
                                                styles[
                                                    "thumbnails-swiper-inner"
                                                ]
                                            }
                                        >
                                            <AutoAdjustImgComponent
                                                alt="project photo"
                                                givenClassName={
                                                    styles[
                                                        "project-portrait-photo"
                                                    ]
                                                }
                                                src={`${
                                                    photo.isUpdated &&
                                                    photo.file
                                                        ? `${photo.file.prefix}${photo.file.data}`
                                                        : photo.src
                                                        ? photo.src
                                                        : "/static/placeholder.webp"
                                                }`}
                                                customCallback={(
                                                    imgNode: HTMLImageElement
                                                ) => {
                                                    autoFigureItOutMeasureLimit(
                                                        imgNode,
                                                        "--portrait-mini-min-width",
                                                        "--portrait-mini-max-height",
                                                        true
                                                    );
                                                }}
                                            />
                                            {photo.isPortrait && (
                                                <div
                                                    className={
                                                        styles[
                                                            "project-portrait-sign"
                                                        ]
                                                    }
                                                >
                                                    <StarRateIcon
                                                        sx={{
                                                            fontSize: "1rem",
                                                            position:
                                                                "relative",
                                                            bottom: ".1rem",
                                                            filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.52))",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </Swiper>
                </div>
                <div className={styles["product-left-column-bottom"]}></div>
            </div>
            <div className={styles["product-detail-right-column"]}>
                <form
                    action={updateProductSubmit}
                    className={styles["product-detail-form-component"]}
                >
                    <label
                        htmlFor="title"
                        className={`${styles["form-label-item"]}`}
                    >
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.title?.label}`}
                        </div>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className={`${styles["form-input-item"]}`}
                            value={
                                openedDetail?.toUpdate?.title
                                    ? openedDetail.toUpdate.title
                                    : openedDetail?.original?.title
                            }
                            onChange={(evt: SyntheticEvent) => {
                                dispatch(
                                    setOpenedProduct({
                                        update: {
                                            title: `${
                                                (evt.target as HTMLFormElement)
                                                    .value
                                            }`,
                                        },
                                    })
                                );
                            }}
                        />
                    </label>
                    <label
                        htmlFor="productType"
                        className={`${styles["form-label-item"]}`}
                    >
                        {" "}
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.productType?.label}`}{" "}
                        </div>
                        <select
                            name="productType"
                            id="productType"
                            className={`${styles["form-input-item"]}`}
                        >
                            {productTypes &&
                                productTypes.data.map(
                                    (productType: ProductTypes) => {
                                        console.log(
                                            "[OPTION]",
                                            productType.type
                                        );
                                        return (
                                            <option
                                                value={`${productType.id}`}
                                                key={`${productType.type}-${productType.id}`}
                                                style={{
                                                    backgroundColor:
                                                        "var(--falsa-escuadra-blue)",
                                                }}
                                            >
                                                {`${
                                                    siteTexts?.messages
                                                        ?.adminTexts
                                                        ?.editProductForm
                                                        ?.productType?.options[
                                                        productType.type
                                                    ].text
                                                }`}
                                            </option>
                                        );
                                    }
                                )}
                        </select>
                    </label>
                    <label
                        htmlFor="content"
                        className={`${styles["form-label-item"]}`}
                    >
                        {" "}
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.content?.label}`}{" "}
                        </div>
                        <textarea
                            name="content"
                            id="content"
                            className={`${styles["form-input-item"]} ${styles["text-area"]}`}
                            value={
                                openedDetail?.toUpdate?.content &&
                                openedDetail.toUpdate.content
                            }
                            onChange={(evt: SyntheticEvent) => {
                                dispatch(
                                    setOpenedProduct({
                                        update: {
                                            ...openedDetail?.toUpdate,
                                            content: `${
                                                (evt.target as HTMLFormElement)
                                                    .value
                                            }`,
                                        },
                                    })
                                );
                            }}
                        />
                    </label>

                    {/*   <label
                        htmlFor="productImgs"
                        className={`${styles["form-label-item"]}`}
                    >
                        {" "}
                        <div className={styles["label-title"]}>
                            {`${siteTexts?.messages?.adminTexts?.editProductForm?.productType?.label}`}{" "}
                        </div>
                        <input
                            name="productImgs"
                            id="productImgs"
                            type="file"
                            multiple
                            className={`${styles["form-input-item"]}`}
                        />
                    </label> */}
                </form>
                <div className={`${styles["close-detail-button"]}`}>
                    <ReusableButtonComponent
                        text={<CloseIcon />}
                        onClickHandler={() => {
                            dispatch(resetOpenedProduct());
                            dispatch(resetAdminDetailOpened());
                        }}
                        styleVariants={["admin-go-back-btn"]}
                    />
                </div>
            </div>
        </div>
    );
};
