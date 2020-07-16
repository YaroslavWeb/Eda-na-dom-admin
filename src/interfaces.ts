export interface ICity {
  readonly id     : string
  name            : string
  baners          : {deliveryID: string, deliveryName:string, uri: string}[]
}

export interface ICategory {
  readonly id     : string
  name            : string
  image           : string
}

export interface IDelivery {
  readonly id     : string
  name            : string
  logo            : string
  city            : string
  categories      : string[]
  timeOpen        : string
  timeClose       : string
  delivFree       : string
  delivPrice      : string
  payment         : boolean[]
  addresses       : string[]
  promocode       : string
  promoDesc       : string
  linkSite        : string
  linkAppGoogle   : string
  linkAppApple    : string
  linkInst        : string
  phoneNumber     : string
  baners          : string[]
  place           : {categoryID: string, point: number}[]
  rating          : {points: number, votes: number}
}
