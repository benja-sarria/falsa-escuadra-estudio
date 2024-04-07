"use client";

import { useAppSelector } from "@/redux/store";
import { PieceItemComponent } from "@/components/ContactPieceComponent/PieceItemComponent";
import styles from "@/components/ContactPieceComponent/ContactPieceComponent.module.scss";

const namespace = "contact-piece-component";

export const ContactPieceComponent = () => {
    const pieceTexts = useAppSelector(
        (state) => state.globalLanguage.value.messages?.contactPiece
    );
    if (!pieceTexts) {
        return <></>;
    }
    return (
        <div className={styles[namespace]}>
            {Object.keys(pieceTexts).map((info) => (
                <PieceItemComponent
                    key={info}
                    piece={pieceTexts[info as keyof typeof pieceTexts]}
                />
            ))}
        </div>
    );
};
