"use client";
import styles from "@/components/ProductDetailComponent/ProductDetailComponent.module.scss";
import { updateProductSubmit } from "@/app/actions";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { ReusableButtonComponent } from "../ReusableButtonComponent/ReusableButtonComponent";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
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

export const ProductDetailComponent = ({
    productTypes,
}: {
    productTypes: StandardSuccessResponse | undefined;
}) => {
    const openedDetail = useAppSelector(
        (state) => state.openedProductValue.value
    );
    const dispatch = useDispatch<AppDispatch>();
    const siteTexts = useAppSelector((state) => state.globalLanguage.value);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    useEffect(() => {
        console.log("[OPENED]", openedDetail);
    }, [openedDetail]);

    return (
        <div className={styles["product-detail-container"]}>
            <div className={styles["product-detail-left-column"]}>
                <div className={styles["product-left-column-top"]}>
                    <Swiper
                        loop={true}
                        spaceBetween={0}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className={styles["portrait-swiper"]}
                    >
                        {openedDetail?.toUpdate?.photos &&
                        openedDetail?.toUpdate?.photos.length > 0 ? (
                            openedDetail?.toUpdate?.photos.map(
                                (photo, index) => {
                                    return (
                                        <SwiperSlide
                                            key={`${photo.active}-${index}`}
                                        >
                                            <AutoAdjustImgComponent
                                                alt="project photo"
                                                givenClassName={
                                                    styles[
                                                        "project-portrait-photo"
                                                    ]
                                                }
                                                src={`${photo.file.stream()}`}
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
                                            />
                                        </SwiperSlide>
                                    );
                                }
                            )
                        ) : openedDetail?.original ? (
                            openedDetail?.original.photos.map((photo) => {
                                return (
                                    <SwiperSlide key={`${photo.id}`}>
                                        <div
                                            className={
                                                styles["portrait-swiper-slider"]
                                            }
                                        >
                                            <AutoAdjustImgComponent
                                                alt="project photo"
                                                givenClassName={
                                                    styles[
                                                        "project-portrait-photo"
                                                    ]
                                                }
                                                src={`${photo.src}`}
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
                                            />
                                            {photo.isPortrait && (
                                                <div
                                                    className={
                                                        styles[
                                                            "project-portrait-sign"
                                                        ]
                                                    }
                                                >
                                                    {siteTexts.messages
                                                        ? siteTexts.messages
                                                              .adminTexts
                                                              .editProductLayout
                                                              .isPortraitSign
                                                              .text
                                                        : ""}
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
                        {openedDetail?.toUpdate?.photos &&
                        openedDetail?.toUpdate?.photos.length > 0 ? (
                            openedDetail?.toUpdate?.photos.map(
                                (photo, index) => {
                                    return (
                                        <SwiperSlide
                                            style={{ width: "5rem" }}
                                            key={`${photo.active}-${index}`}
                                        >
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
                                                    src={`${photo.file.stream()}`}
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
                                            </div>
                                        </SwiperSlide>
                                    );
                                }
                            )
                        ) : openedDetail?.original ? (
                            openedDetail?.original.photos.map((photo) => {
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
                                                src={`${photo.src}`}
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
                    {/* <AutoAdjustImgComponent
                        alt="project photo"
                        givenClassName={styles["project-portrait-photo"]}
                        src={
                            openedDetail?.toUpdate?.photos &&
                            openedDetail?.toUpdate?.photos.length > 0
                                ? `${openedDetail?.toUpdate?.photos
                                      .find(
                                          (file: {
                                              file: File;
                                              active: boolean;
                                          }) => {
                                              return file.active;
                                          }
                                      )
                                      ?.file.stream()}`
                                : openedDetail?.original
                                ? `${openedDetail?.original.photos.find(
                                      (file) => {
                                          return file.isPortrait;
                                      }
                                  )}`
                                : "/img.png"
                        }
                        customCallback={(imgNode: HTMLImageElement) => {
                            autoFigureItOutMeasureLimit(
                                imgNode,
                                "--portrait-min-width",
                                "--portrait-max-height",
                                true
                            );
                        }}
                    />
                   */}
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
                                openedDetail?.toUpdate?.content
                                    ? openedDetail.toUpdate.content
                                    : openedDetail?.original?.content
                            }
                            onChange={(evt: SyntheticEvent) => {
                                dispatch(
                                    setOpenedProduct({
                                        update: {
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
