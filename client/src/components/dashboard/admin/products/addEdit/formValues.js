import * as Yup from "yup";

export const formValues = {
  category: "",
    brand: "",
    model: "",
    flavor:"",
    puffs: "",
    nicotinePercentage: "",
    price: "",
    suggestedRetailPrice:"",
    available: "",
    shipping: true,
    images:[]
};


export const getValuesToEdit = (product) => {
  return {
    category: product.category,
    brand: product.brand._id,
    model: product.model,
    flavor: product.flavor,
    puffs: product.puffs,
    nicotinePercentage: product.nicotinePercentage,
    price: product.price,
    suggestedRetailPrice: product.suggestedRetailPrice,
    available: product.available,
    shipping: product.shipping,
    images: product.images
  }
}

export const validation = () =>
  Yup.object({
    category: Yup.string()
      .required("Please specify the category"),
      // .oneOf(["Disposable Vape", "Delta"], "Only two categories are available right now: Disposable Vape and Delta"),
    model: Yup.string().required("Please specify the model name"),
    brand: Yup.string().required("Please specify the brand name"),
    flavor: Yup.string().required("Please specify the flavor name"),
    puffs: Yup.number()
      .required("Please specify the number of puffs")
      .min(0, "Number of puffs can not be below 0.")
      .max(50000, "Number of puffs can not be more than 50,000"),
    nicotinePercentage: Yup.number()
      .required("Please specify the number of puffs")
      .min(0, "Nictine percentage can not be below 0.")
      .max(30, "Nicotine percentage can not be more than 30"),
    price: Yup.number()
      .required("Please specify the price")
      .min(0, "The price can not me less than 0")
      .max(500, "The price can not exceed $500"),
    suggestedRetailPrice: Yup.number()
      .required("Please specify the suggested retail price")
      .min(0, "The price can not me less than 0")
      .max(1000, "The price can not exceed $1000"),
    available: Yup.number()
      .required("Please specify the number boxes of this item available now.")
      .min(0, "The number can not me less than 0")
      .max(100000, "The numer can not me more than 100,000"),
    shipping: Yup.boolean().required("Do you offer shipping"),
  });
