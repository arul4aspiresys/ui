import { NavItem } from "../models/nav-item.model";

export const menuConfig: NavItem[] = [
    {
        title: 'Customer',
        iconName: 'person',
        permissions: ['ADMIN'],
        children: [
            {
                title: 'Create',
                iconName: 'add_circle',
                permissions: ['ADMIN'],
                route: 'login',
            },
            {
                title: 'List',
                iconName: 'list',
                permissions: ['ADMIN'],
            }
        ]
    },
    {
        title: 'Cart',
        iconName: 'shopping_cart',
        permissions: ['USER']
    },
    {
        title: 'Products',
        iconName: 'inventory_2',
        permissions: ['USER', 'ADMIN'],
        children: [
            {
                title: 'Create',
                iconName: 'add_circle',
                permissions: ['ADMIN'],
            },
            {
                title: 'List',
                iconName: 'list',
                permissions: ['USER', 'ADMIN'],
                route: 'products/list'
            }
        ]
    },
    {
        title: 'Order History',
        iconName: 'view_list',
        permissions: ['USER']
    }
];