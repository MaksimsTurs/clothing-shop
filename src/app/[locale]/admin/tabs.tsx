import ProductList from "./component/_product/productList";
import ProductSectionList from "./component/_product-section/productSectionList";
import UserList from './component/_user/userList'
import OrderList from "./component/_order/orderList";

import Product from "./component/_product/product";
import User from "./component/_user/user";
import ProductSection from "./component/_product-section/productSection";
import Order from "./component/_order/order";

import ProductForm from "./component/_product/productForm";
import ProductSectionForm from "./component/_product-section/productSectionForm";

import { Settings2Icon, AlignJustify, PackagePlus, Shirt, ShoppingBasket, UserRound } from "lucide-react";

import Settings from "./component/settings";

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
  'category': {
    title: 'Категории',
    icon: <AlignJustify />,
    listComponent: <ProductSectionList/>,
    dataComponent: <ProductSection/>,
  },
  'create-product': {
    title: 'Создать продукт',
    icon: <PackagePlus />,
    listComponent: <ProductForm/>
  },
  'create-category': {
    title: 'Создать категорию',
    icon: <PackagePlus />,
    listComponent: <ProductSectionForm/>
  },
  'website-settings': {
    title: 'Настройки Сайта',
    icon: <Settings2Icon />,
    listComponent: <Settings/>
  }
}