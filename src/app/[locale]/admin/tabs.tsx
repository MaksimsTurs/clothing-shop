import ProductList from "./component/_product/productList";
import ProductActionList from "./component/_product-action/productActionList";
import ProductCategoryList from "./component/_product-category/productCategoryList";
import UserList from './component/_user/userList'
import OrderList from "./component/_order/orderList";

import Product from "./component/_product/product";
import User from "./component/_user/user";
import ProductAction from "./component/_product-action/productAction";
import Order from "./component/_order/order";
import ProductCategory from './component/_product-category/productCategory'

import ProductForm from "./component/_product/productForm";
import ProductActionForm from "./component/_product-action/productActionForm";
import ProductCategoryForm from "./component/_product-category/productCategoryForm";
import SettingsFormm from "./component/settings";

import { PackagePlus, Shirt, ShoppingBasket, UserRound, Percent, AlignJustifyIcon, Settings } from "lucide-react";


export default {
  'product': {
    title: 'Продукты',
    icon: <Shirt />,
    listComponent: <ProductList/>,
    dataComponent: <Product/>,
  },
  'user': {
    title: 'Юзеры',
    icon: <UserRound />,
    listComponent: <UserList/>,
    dataComponent: <User/>,
  },
  'order': {
    title: 'Заказы',
    icon: <ShoppingBasket />,
    listComponent: <OrderList/>,
    dataComponent: <Order/>,
  },
  'action': {
    title: 'Акции',
    icon: <Percent />,
    listComponent: <ProductActionList/>,
    dataComponent: <ProductAction/>,
  },
  'category': {
    title: 'Категории',
    icon: <AlignJustifyIcon />,
    listComponent: <ProductCategoryList/>,
    dataComponent: <ProductCategory/>,
  },
  'website-settings': {
    title: 'Настройки Сайта',
    icon: <Settings />,
    listComponent: <SettingsFormm/>,
    dataComponent: undefined
  },
  'create-product': {
    title: 'Добавить продукт',
    icon: <PackagePlus />,
    listComponent: <ProductForm/>,
    dataComponent: undefined
  },
  'create-category': {
    title: 'Добавить категорию',
    icon: <PackagePlus />,
    listComponent: <ProductCategoryForm/>,
    dataComponent: undefined
  },
  'create-action': {
    title: 'Добавить акцию',
    icon: <PackagePlus />,
    listComponent: <ProductActionForm/>,
    dataComponent: undefined
  }
}