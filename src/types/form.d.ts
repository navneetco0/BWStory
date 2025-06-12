import { StyleProp, TextInputProps, TouchableOpacityProps } from "react-native";

export interface ILabel {
    label: string;
    required?: boolean;
    style?: StyleProp
}

export interface ICInput extends TextInputProps {
    label: string;
    required?: boolean;
    placeholder?: string;
    error?: string
}

export interface IErrorBox {
    error?: string;
}
