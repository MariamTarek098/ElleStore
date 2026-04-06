
export interface WishlistResponse {
  status: string
  count: number
  data: ProductType[]
}
export interface ProductType {
  sold?: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryType
  brand: BrandType
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface CategoryType {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandType {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Cart{
  numOfCartItems: number
  cartId: string
  data: CartResponse
}

export interface CartResponse {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: ProductType
  price: number
}



export interface OrderType {
  shippingAddress: ShippingAddress
  taxPrice: number,
  shippingPrice: number,
  totalOrderPrice: number,
  paymentMethodType: string,
  isPaid: boolean,
  isDelivered: boolean,
  _id: string,
  user: User,
  cartItems: Product[],
  createdAt: string,
  updatedAt: string,
  id: number,
  __v: number,
}
export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
  postalCode?: string
}

export interface OrderPlaceType {
  shippingAddress:{
       details: string,
    phone: string,
    city: string,
  postalCode?: string
  }
}



export interface UserAddress { 
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

export interface AddressResponse {
  results: number
  status: string
  data: UserAddress[]
}



export interface ProfileInputs {
  name: string;
  email: string;
  phone: string;
}


export interface PassInputs {
  currentPassword: string;
  password: string;
  rePassword: string;
}


