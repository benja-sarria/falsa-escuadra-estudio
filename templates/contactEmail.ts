import { QueryInterface } from "@/types/contactFormTypes";

export interface TemaplateData {
    name: string;
    phone: QueryInterface["personalData"]["phone"];
    category: string;
    location: QueryInterface["personalData"]["city"];
    meassures: QueryInterface["query"]["meassures"];
    height?: QueryInterface["query"]["dimensions"]["height"];
    width?: QueryInterface["query"]["dimensions"]["width"];
    depth?: QueryInterface["query"]["dimensions"]["depth"];
    materials: QueryInterface["query"]["materials"];
    complementaryInfo: QueryInterface["query"]["complementaryInfo"];
}

export const generateTemplate = ({
    name,
    phone,
    category,
    location,
    meassures,
    height,
    width,
    depth,
    materials,
    complementaryInfo,
}: TemaplateData) => {
    let materialSpans = "";
    materials!.forEach((material) => {
        materialSpans += `<span
            style="
                font-weight: 600;
                border: 2px solid #b3762b;
                max-width: 10rem;
                padding: 0.25rem 1rem;
                border-radius: 2rem;
                margin: 0 .2rem;
                line-height: 1.5rem;
            "
        >
            ${material.name}</span
        >`;
    });

    return `
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nuevo contacto!</title>
    </head>
    <body
        style="
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                'Helvetica Neue', sans-serif;
        "
    >
        <div style="margin: auto; max-width: 25rem; padding: 2rem">
            <table
                style="
                    border: 2px solid #353535;
                    min-width: 25rem;
                    border-radius: 0.75rem;
                    overflow: hidden;
                "
            >
                <tbody>
                    <tr style="min-width: 25rem; background-color: #353535">
                        <td
                            style="
                                min-width: 8.33rem;
                                border: 2px solid #353535;
                                outline: 2px solid #353535;
                            "
                        ></td>
                        <td
                            style="
                                min-width: 8.33rem;
                                border: 2px solid #353535;
                                outline: 2px solid #353535;
                            "
                        >
                            <img
                                style="margin: 0 auto; max-width: 15rem"
                                src="cid:falsaescuadralogo"
                                alt="falsa-escuadra-estudio"
                            />
                        </td>
                        <td
                            style="
                                min-width: 8.33rem;
                                border: 2px solid #353535;
                                outline: 2px solid #353535;
                            "
                        ></td>
                    </tr>

                    <tr style="min-height: 2rem">
                        <td style="min-height: 2rem; color: transparent">__</td>
                    </tr>
                    <tr
                        style="
                            min-width: 15rem;
                            max-width: 15rem;
                            overflow: hidden;
                        "
                    >
                        <td
                            colspan="3"
                            style="
                                min-width: 12rem;
                                max-width: 12rem;
                                padding: 0 0 1rem 1.5rem;
                            "
                        >
                            <span style="color: #4c4b4b">Nombre completo:</span>
                            <span style="font-weight: 600"> ${name}</span>
                        </td>
                    </tr>
                    <tr
                        style="
                            min-width: 15rem;
                            max-width: 15rem;
                            overflow: hidden;
                        "
                    >
                        <td
                            colspan="3"
                            style="
                                min-width: 12rem;
                                max-width: 12rem;
                                padding: 0 0 1rem 1.5rem;
                            "
                        >
                            <span style="color: #4c4b4b">Teléfono:</span>
                            <span style="font-weight: 600"> ${phone}</span>
                        </td>
                    </tr>
                    <tr
                        style="
                            min-width: 15rem;
                            max-width: 15rem;
                            overflow: hidden;
                        "
                    >
                        <td
                            colspan="3"
                            style="
                                min-width: 12rem;
                                max-width: 12rem;
                                padding: 0 0 1rem 1.5rem;
                            "
                        >
                            <span style="color: #4c4b4b">Ubicación:</span>
                            <span style="font-weight: 600"> ${location}</span>
                        </td>
                    </tr>
                    <tr style="min-height: 2rem">
                        <td
                            colspan="3"
                            style="
                                margin-top: 0.5rem;
                                border-top: 2px solid #ededed;
                                padding-top: 0.5rem;
                                color: transparent;
                            "
                        >
                            __
                        </td>
                    </tr>
                    <tr
                        style="
                            min-width: 15rem;
                            max-width: 15rem;
                            overflow: hidden;
                        "
                    >
                        <td
                            colspan="3"
                            style="
                                min-width: 12rem;
                                max-width: 12rem;
                                padding: 0 0 1rem 1.5rem;
                            "
                        >
                            <span style="color: #4c4b4b">Categoría:</span>

                            <span
                                style="
                                    font-weight: 600;
                                    border: 2px solid #b3762b;
                                    max-width: 10rem;
                                    padding: 0.25rem 1rem;
                                    border-radius: 2rem;
                                "
                            >
                                ${category}</span
                            >
                        </td>
                    </tr>
                    ${
                        meassures
                            ? `<trstyle="
                            min-width: 15rem;
                            max-width: 15rem;
                            overflow: hidden;
                        "
                    >
                        <td
                            colspan="3"
                            style="
                                min-width: 12rem;
                                max-width: 12rem;
                                padding: 0 0 1rem 1.5rem;
                            "
                        >
                            <span style="color: #4c4b4b">Medidas:</span>

                            <span
                                style="
                                    font-weight: 600;
                                    max-width: 10rem;
                                    padding: 0.25rem 1rem;
                                    border-radius: 2rem;
                                "
                            >
                                ${height}cm x ${width}cm x ${depth}cm</span
                            >
                            <span
                                style="
                                    color: #898989;
                                    font-size: 0.85rem;
                                    font-style: italic;
                                "
                                >(Alto x Ancho x Prof)</span
                            >
                        </td>
                    </trstyle=>
                    `
                            : ""
                    }
${
    complementaryInfo
        ? ` <tr
style="
    min-width: 15rem;
    max-width: 15rem;
    overflow: hidden;
"
>
<td
    colspan="3"
    style="
        min-width: 12rem;
        max-width: 12rem;
        padding: 0 0 1rem 1.5rem;
    "
>
    <span style="color: #4c4b4b">Links adjuntos:</span>

    <span
        style="
            font-weight: 600;
            max-width: 10rem;
            padding: 0.25rem 1rem;
            border-radius: 2rem;
        "
    >
        ${complementaryInfo}</span
    >
</td>
</tr>`
        : ""
}
                   
                    <tr
                        style="
                            min-width: 15rem;
                            max-width: 15rem;
                            overflow: hidden;
                        "
                    >
                        <td
                            colspan="3"
                            style="
                                min-width: 12rem;
                                max-width: 12rem;
                                padding: 0 0 1rem 1.5rem;
                            "
                        >
                            <span style="color: #4c4b4b">Materiales:</span>
                       ${materialSpans}
                    </tr>
                    <tr style="min-height: 2rem">
                        <td
                            colspan="3"
                            style="
                                margin-top: 0.5rem;

                                padding-top: 0.5rem;
                                color: transparent;
                            "
                        >
                            __
                        </td>
                    </tr>
                    <tr style="min-height: 2rem">
                        <td
                            style="
                                min-width: 5.33rem;
                                border: 2px solid #353535;
                                outline: 2px solid #353535;
                                background-color: #353535;
                            "
                        ></td>
                        <td
                            style="
                                min-width: 14.33rem;
                                border: 2px solid #353535;
                                outline: 2px solid #353535;
                                background-color: #353535;
                            "
                        >
                            <img
                                style="
                                    margin: 0 auto;
                                    max-width: 15.33rem;
                                    outline: 2px solid #353535;
                                "
                                src="cid:falsaescuadrafooter"
                                alt="falsa-escuadra-estudio"
                            />
                        </td>
                        <td
                            style="
                                min-width: 5.33rem;
                                border: 2px solid #353535;
                                outline: 2px solid #353535;
                                background-color: #353535;
                            "
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</html>
`;
};
