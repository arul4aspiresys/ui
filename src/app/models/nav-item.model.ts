export interface NavItem {
    title: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
    permissions?: string[];
}