"use client";

import { UpdatedPhotosInterface } from "@/redux/features/admin-opened-product-slice";

import { useEffect } from "react";

export const GlideCarouselComponent = ({ items }: { items: any[] }) => {
    useEffect(() => {}, []);

    return (
        <div className="glide">
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {items.map((photo: UpdatedPhotosInterface) => {
                        return (
                            <li
                                key={photo as unknown as string}
                                className="glide__slide"
                            >
                                0
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
