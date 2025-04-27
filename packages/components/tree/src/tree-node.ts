export interface TreeNodeProps {
    id: string;
    label: string;
    children?: TreeNodeProps[];
    showChild: boolean;
    isChecked?: boolean;
    [key: string]: any;
}