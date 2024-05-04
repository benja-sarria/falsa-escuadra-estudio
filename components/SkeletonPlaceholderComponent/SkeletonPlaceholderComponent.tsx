import { Skeleton } from "@mui/material";

export type SkeletonPropsType = {
    meassures?: { width: number | string; height: number | string };
    color: string;
    variant: "text" | "rounded" | "rectangular" | "circular";
    animation: false | "pulse" | "wave" | undefined;
    afterEffect: string;
    className: string;
};

export const SkeletonPlaceholderComponent = ({
    meassures,
    variant,
    color,
    animation,
    afterEffect,
    className,
}: SkeletonPropsType) => {
    return (
        <Skeleton
            className={className}
            variant={variant}
            width={meassures?.width}
            height={meassures?.height}
            sx={{
                backgroundColor: color,
                "-webkit-mask-image": "-webkit-radial-gradient(red, blue)",
                "&::after": {
                    animationDuration: "2s",
                    background: afterEffect,
                },
            }}
            animation={animation}
        />
    );
};
