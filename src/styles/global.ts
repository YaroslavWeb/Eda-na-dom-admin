import { StyleSheet } from "react-native";

export const COLORS = {
    MAIN:    "#FFBE4D", // #E2A600
    FONT:    '#374140',
    BORDER:  '#181c1c',
    PRIMARY: '#3E9BFF',
    SUCCESS: '#28A745',
    DANGER:  '#DC3545'
};

export const globalStyles = StyleSheet.create({

    textTiny: { fontSize: 12 },
    textSmall: { fontSize: 14 },
    textMedium: { fontSize: 18 },
    textBig: { fontSize: 24 },
    textLarge: { fontSize: 32 },

    bgMain: { backgroundColor: COLORS.MAIN},
    bgPrimary:{backgroundColor: COLORS.PRIMARY},
    bgSuccess:{ backgroundColor: COLORS.SUCCESS},
    bgDanger:{backgroundColor: COLORS.DANGER},


    hr:{
        borderBottomColor: COLORS.BORDER,
        borderBottomWidth: 1,
        marginVertical:10
    }
});
