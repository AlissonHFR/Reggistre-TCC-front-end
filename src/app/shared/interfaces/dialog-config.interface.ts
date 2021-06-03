export interface DialogConfig {
    title: string;
    message: string;
    buttons?: DialogButton[]
}

export interface DialogButton {
    text: string,
    color: 'primary' | 'accent' | 'warn',
    icon?: string
}